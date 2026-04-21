export default function Pricing() {
  const plans = [
    { name: "Starter Pack", reviews: 10, price: "$50" },
    { name: "Growth Pack", reviews: 20, price: "$99" },
    { name: "Pro Pack", reviews: 50, price: "$199" },
  ];

  return (
    <section className="p-12 grid md:grid-cols-3 gap-6">
      {plans.map((plan, i) => (
        <div key={i} className="border p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold">{plan.name}</h2>
          <p>{plan.reviews} Reviews</p>
          <p>{plan.price} USD</p>

          <button className="mt-4 bg-black text-white px-4 py-2 rounded">
            Buy Now
          </button>
        </div>
      ))}
    </section>
  );
}
