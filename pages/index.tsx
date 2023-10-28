// import { Inter } from "next/font/google";
import Contact from "@/components/home/Contact";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import PricingSection from "@/components/home/Pricing";
import Schedule from "@/components/home/Schedule";
import Footer from "@/components/ui/Footer";
import Text from "@/components/home/Text";
import Layout from "@/components/ui/layout/Layout";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<Layout>
			<Hero />
			<Schedule />
			<Text />
			<PricingSection />
			<Features />
			{/* <div className="container mx-auto my-8">
        <Mosaic images={images} />
      </div> */}
			<Contact />
			<Footer />
		</Layout>
	);
}
