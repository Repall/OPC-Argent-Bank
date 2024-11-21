import { NavLink } from "react-router-dom";

export default function P404() {
  return (
    <section className="main bg-background text-white">
      <div className="flex flex-col justify-center px-5 text-center text-lg font-bold text-red-400">
        <p className="pb-8 text-3xl uppercase">Oups !</p>
        <p>La page que vous demandez n'exsite pas.</p>
      </div>
      <NavLink to="/" className="flex justify-center underline">
        Retourner sur la page d'accueil
      </NavLink>
    </section>
  );
}
