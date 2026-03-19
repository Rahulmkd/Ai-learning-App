import React from "react";
import Hero from "../../components/layout/Hero";
import Footer from "../../components/layout/Footer";
import AiFeatures from "../../components/ai/AIFeatures";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/common/Spinner";

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
      <section id="hero">
        <Hero />
      </section>

      <section id="AiFeatures">
        <AiFeatures />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
