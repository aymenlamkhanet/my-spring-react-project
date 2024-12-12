import Navbar from "./Navbar";
import Affiche from "./Affiche";
import CompanyInfo from "./CompanyInfo";
import CarShowcase from "./CarShowcase";
import CarCard from "./CarCard";
import LocationFeedback from "./LocationFeedback";
import Footer from "./Footer";
import "./App.css";

const items = ["Home", "About", "Contact"];

function HomeP() {
  return (
    <>
      <Navbar items={items} />
      <Affiche />
      <CompanyInfo />
      <CarShowcase />
      <CarCard />
      <LocationFeedback />
      <Footer />
    </>
  );
}

export default HomeP;
