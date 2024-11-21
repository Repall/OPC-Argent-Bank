export default function Home() {
  return (
    <>
      {/* <div className="text-secondary bg-back-tree">
        <img className="cover h-[400px] relative" src="/src/assets/img/bank-tree.jpeg" alt="" />
        <section className="bg-white w-[300px] m-8 p-8 text-left my-auto absolute top-12 right-12">
          <h2 className="hidden">Promoted Content</h2>
          <p className="font-bold">No fees.</p>
          <p className="font-bold">No minimum deposit.</p>
          <p className="font-bold">High interest rates.</p>
          <p className="text-sm">Open a savings account with Argent Bank today !</p>
        </section>
      </div> */}
      <section className="grid grid-cols-3 border-b-2 border-gray-300">
        <h2 className="hidden">Features</h2>
        <div className="flex flex-col items-center p-10">
          <img className="m-3 size-[152px] rounded-full border-[10px] border-primary p-4" src="/src/assets/img/icon-chat.png" alt="icon chat" />
          <h3 className="mb-2 mt-5 text-center text-lg font-bold ">You are our #1 priority</h3>
          <p className="text-center">
            Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className="flex flex-col items-center p-10">
          <img
            className="m-3 size-[152px] rounded-full border-[10px] border-primary p-4"
            src="/src/assets/img/icon-money.png"
            alt="icon money"
          />
          <h3 className="mb-2 mt-5 text-center text-lg font-bold">More savings means higher rates</h3>
          <p className="text-center">The more you save with us, the higher your interest rate will be !</p>
        </div>
        <div className="flex flex-col items-center p-10">
          <img
            className="m-3 size-[152px] rounded-full border-[10px] border-primary p-4"
            src="/src/assets/img/icon-security.png"
            alt="icon security"
          />
          <h3 className="mb-2 mt-5 text-center text-lg font-bold">Security you can trust</h3>
          <p className="text-center">We use top of the line encryption to make sure your data and money is always safe.</p>
        </div>
      </section>
    </>
  );
}
