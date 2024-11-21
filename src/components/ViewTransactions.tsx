
export default function ViewTransactions({title, balance, availableBalance}) {
  return (
    <section className="mx-auto my-0 mb-8 flex w-4/5 flex-col items-center justify-between bg-white p-6 md:flex-row">
      <h3 className="hidden">Accounts</h3>
      <div className="text-left">
        <h4>{title}</h4>
        <p className="text-4xl font-bold text-secondary">{balance}</p>
        <p>{availableBalance}</p>
      </div>
      <div>
        <button className="mt-4 w-full cursor-default border-primary bg-primary p-2 font-bold text-white">View transactions</button>
      </div>
    </section>
  );
}
