import { Header } from "../Header/Header";
// import { Hero } from "../Hero/Hero";
import { Footer } from "../Footer/Footer";
import { Operations } from "../Operations/Operations";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        {/* <Hero /> */}
        <Operations />
      </main>
      <Footer />
    </>
  );
};
