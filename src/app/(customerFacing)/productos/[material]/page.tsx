import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { Suspense } from "react"
import { HeaderProducts } from "@/components/HeaderProducts"

async function getProducts(material: string) {
  const products = await db.product.findMany({
    where: {
      isAvailableForPurchase: true,
      material
    },
    orderBy: { name: "asc" },
  });

  return products ?? [];
}

export async function generateStaticParams() {
  const materials = await db.product.findMany({
    distinct: ['material'], // Get all unique materials
  });

  return materials.map((product) => ({
    material: product.material,
  }));
}

export default async function MaterialPage({ params }: { params: { material: string } }) {

  const { material } = await params;

  if (!material) {
    return <div className="text-red-500">Error: Material not found</div>;
  }

  const products = await getProducts(material);

  const sortedProducts = products?.sort((a, b) => Number(a.name) - Number(b.name));

  return (
    <div>
      <HeaderProducts goBackTo="/" />
      <h1 className="text-black pt-4 my-6 text-center text-3xl font-bold uppercase">MODELOS DISPONIBLES</h1>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-5">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} {...product} material={material} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
