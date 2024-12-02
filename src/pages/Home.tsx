import bankTree from "../assets/img/bank-tree.jpeg"
import InforamtionHome from "../components/InformationsHome";
import chatIcon from "../assets/img/icon-chat.png"
import moneyIcon from "../assets/img/icon-money.png"
import secuityIcon from "../assets/img/icon-security.png"

export default function Home() {
  return (
    <>
      <div className="text-secondary relative bg-back-tree">
        <img className="h-[400px] w-full object-cover" src={bankTree} alt="image accueil" />
        <section className="bg-white w-[300px] sm:w-[350px] mx-auto my-8 p-8 text-left absolute top-12 max-sm:inset-x-0 sm:right-12">
          <h2 className="hidden ">Promoted Content</h2>
          <p className="font-bold text-2xl">No fees.</p>
          <p className="font-bold text-2xl">No minimum deposit.</p>
          <p className="font-bold text-2xl">High interest rates.</p>
          <p className="text-xl">Open a savings account with Argent Bank today !</p>
        </section>
      </div>
      <section className="md:grid md:grid-cols-3 border-b-2 border-gray-300">
        <h2 className="hidden">Features</h2>
        <InforamtionHome
          title="You are our #1 priority"
          item={chatIcon}
          description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes"
          />
          <InforamtionHome
          title="More savings means higher rates"
          item={moneyIcon}
          description="The more you save with us, the higher your interest rate will be !"
          />
          <InforamtionHome
          title="Security you can trust"
          item={secuityIcon}
          description="We use top of the line encryption to make sure your data and money is always safe."
          />
      </section>
    </>
  );
}
