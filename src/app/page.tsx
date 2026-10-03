import CategoryGrid from "@/components/Homepage/allCategories";
import FeatureStrip from "@/components/Homepage/FeatureStrip";
import HeroSection from "@/components/Homepage/Hero";
import TrendingProducts from "@/components/Homepage/TrendingProducts";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureStrip />
      <CategoryGrid />
      <TrendingProducts />
    </>
  );
}
