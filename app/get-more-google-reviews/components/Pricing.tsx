export default function Pricing() {
  const plans = [
    { name: "Starter", reviews: 10, delivery: "3–5 days" },
    { name: "Growth", reviews: 20, delivery: "5–10 days" },
    { name: "Pro", reviews: 50, delivery: "15–25 days" },
  ];

  return (
    <section className="p-12 grid md:grid-cols-3 gap-6">
      {plans.map((plan, i) => (
        <div key={i} className="border p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold">{plan.name}</h2>
          <p>{plan.reviews} Reviews</p>
          <p>{plan.delivery}</p>

          <button className="mt-4 bg-black text-white px-4 py-2 rounded">
            Request Quote
          </button>
        </div>
      ))}
    </section>
  );
}