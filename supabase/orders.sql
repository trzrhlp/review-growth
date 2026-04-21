create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  plan text not null,
  amount_usd integer not null,
  full_name text not null,
  email text not null,
  phone text not null,
  business_name_or_google_maps_link text not null,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  paid_at timestamptz,
  nowpayments_order_id text not null unique,
  nowpayments_invoice_id text,
  nowpayments_payment_id text,
  nowpayments_invoice_url text,
  nowpayments_payment_status text,
  last_webhook_event_key text,
  payment_method_default text not null,
  payment_method_alternatives jsonb not null default '[]'::jsonb,
  email_sent boolean not null default false,
  email_sent_at timestamptz,
  constraint orders_status_check check (status in ('pending', 'paid', 'payment_failed'))
);

create index if not exists orders_nowpayments_payment_id_idx
  on public.orders (nowpayments_payment_id);

create or replace function public.set_orders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists orders_set_updated_at on public.orders;

create trigger orders_set_updated_at
before update on public.orders
for each row
execute function public.set_orders_updated_at();

create or replace function public.mark_order_paid(
  p_order_id uuid,
  p_payment_id text,
  p_payment_status text,
  p_event_key text
)
returns jsonb
language plpgsql
as $$
declare
  updated_order public.orders%rowtype;
  existing_order public.orders%rowtype;
begin
  update public.orders
  set
    status = 'paid',
    paid_at = coalesce(paid_at, timezone('utc', now())),
    nowpayments_payment_id = coalesce(p_payment_id, nowpayments_payment_id),
    nowpayments_payment_status = p_payment_status,
    last_webhook_event_key = p_event_key
  where id = p_order_id
    and coalesce(last_webhook_event_key, '') <> p_event_key
  returning * into updated_order;

  if found then
    return jsonb_build_object(
      'order', to_jsonb(updated_order),
      'alreadyProcessed', false
    );
  end if;

  select * into existing_order
  from public.orders
  where id = p_order_id;

  if not found then
    return jsonb_build_object('order', null, 'alreadyProcessed', false);
  end if;

  if existing_order.last_webhook_event_key = p_event_key then
    return jsonb_build_object(
      'order', to_jsonb(existing_order),
      'alreadyProcessed', true
    );
  end if;

  return jsonb_build_object(
    'order', to_jsonb(existing_order),
    'alreadyProcessed', false
  );
end;
$$;

create or replace function public.mark_order_payment_failed(
  p_order_id uuid,
  p_payment_id text,
  p_payment_status text,
  p_event_key text
)
returns jsonb
language plpgsql
as $$
declare
  updated_order public.orders%rowtype;
  existing_order public.orders%rowtype;
begin
  update public.orders
  set
    status = case when status = 'paid' then status else 'payment_failed' end,
    nowpayments_payment_id = coalesce(p_payment_id, nowpayments_payment_id),
    nowpayments_payment_status = p_payment_status,
    last_webhook_event_key = p_event_key
  where id = p_order_id
    and coalesce(last_webhook_event_key, '') <> p_event_key
  returning * into updated_order;

  if found then
    return jsonb_build_object(
      'order', to_jsonb(updated_order),
      'alreadyProcessed', false
    );
  end if;

  select * into existing_order
  from public.orders
  where id = p_order_id;

  if not found then
    return jsonb_build_object('order', null, 'alreadyProcessed', false);
  end if;

  if existing_order.last_webhook_event_key = p_event_key then
    return jsonb_build_object(
      'order', to_jsonb(existing_order),
      'alreadyProcessed', true
    );
  end if;

  return jsonb_build_object(
    'order', to_jsonb(existing_order),
    'alreadyProcessed', false
  );
end;
$$;

create or replace function public.sync_order_payment_status(
  p_order_id uuid,
  p_payment_id text,
  p_payment_status text,
  p_event_key text
)
returns jsonb
language plpgsql
as $$
declare
  updated_order public.orders%rowtype;
  existing_order public.orders%rowtype;
begin
  update public.orders
  set
    nowpayments_payment_id = coalesce(p_payment_id, nowpayments_payment_id),
    nowpayments_payment_status = p_payment_status,
    last_webhook_event_key = p_event_key
  where id = p_order_id
    and coalesce(last_webhook_event_key, '') <> p_event_key
  returning * into updated_order;

  if found then
    return jsonb_build_object(
      'order', to_jsonb(updated_order),
      'alreadyProcessed', false
    );
  end if;

  select * into existing_order
  from public.orders
  where id = p_order_id;

  if not found then
    return jsonb_build_object('order', null, 'alreadyProcessed', false);
  end if;

  if existing_order.last_webhook_event_key = p_event_key then
    return jsonb_build_object(
      'order', to_jsonb(existing_order),
      'alreadyProcessed', true
    );
  end if;

  return jsonb_build_object(
    'order', to_jsonb(existing_order),
    'alreadyProcessed', false
  );
end;
$$;
