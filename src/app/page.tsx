import CategoryGrid from "@/components/Homepage/allCategories";
import FeatureStrip from "@/components/Homepage/FeatureStrip";
import FlashSaleBanner from "@/components/Homepage/FlashSaleBanner";
import HeroSection from "@/components/Homepage/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureStrip />
      <CategoryGrid />
    </>
  );
}
