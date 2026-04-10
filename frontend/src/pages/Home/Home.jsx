import React from "react";
import Hero from "../../components/layout/Hero";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/common/Spinner";
import AiSection from "../../components/layout/AiSection";
import Navbar from "../../components/layout/Navbar";

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <main className="font-poppins">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>

      <section id="AiSection">
        <AiSection />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
