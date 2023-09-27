import { Header } from "../Header/Header";
import { Hero } from "../Hero/Hero";
import { Footer } from "../Footer/Footer";
import { Operations } from "../Operations/Operations";
import { NavBar } from "../NavBar/NavBar";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NavBar />
        <Operations />
      </main>
      <Footer />
    </>
  );
};
