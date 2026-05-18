import AreasCard from "../components/AreasCard";
import ConnectionCard from "../components/ConnectionCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import WomanTechCard from "../components/WomanTechCard";

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <AreasCard />
            <ConnectionCard />
            <WomanTechCard />
            <Footer />
        </>
    );
}