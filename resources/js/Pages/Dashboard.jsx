import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Hero from "@/Components/Hero";
import LinksSection from "@/Components/LinksSection";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard() {
    return (
        <div className="container mx-auto">
            <Header />
            <Hero />
            <LinksSection />
            <Footer />
        </div>
    );
}
