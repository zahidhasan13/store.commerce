import SingleProductPage from "@/components/SingleProductPage";
import { Product } from "@/types/product";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found!</p>
      </div>
    );
  }

  const product: Product = await response.json();

  return <SingleProductPage product={product} />;
}
