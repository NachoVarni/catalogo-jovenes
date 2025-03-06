import db from "@/db/db"
import { notFound } from "next/navigation"
import { CarouselWrapper } from "@/components/CarouselWrapper"
import { HeaderProducts } from "@/components/HeaderProducts"

// Fetch product by ID
async function getProductById(id: string) {
    const product = await db.product.findUnique({ where: { id } })
    if (!product) {
        notFound() // Show 404 if product doesn't exist
    }
    return product
}

// Product page component
export default async function ProductPage({ params }: { params: { id: string, material: string } }) {

    const { material, id } = await params;

    if (!material) {
        return <div className="text-red-500">Error: Material not found</div>;
    }

    if (!id) {
        return <div className="text-red-500">Error: Id not found</div>;
    }

    const product = await getProductById(id)

    return (
        <div className="mx-auto">
            <HeaderProducts goBackTo={`productos/${material}`} />
            <div>
                <h1 className="text-blue text-3xl text-center font-bold my-8">MODELO {product.name}</h1>
                <div className="flex flex-col md:flex-row">
                    <CarouselWrapper product={product} />
                    <div className="flex flex-col w-8/12 md:w-2/5 m-auto md:m-0 md:p-0">
                        {product.color && <p className="text-blue text-lg"><span className="font-bold">COLOR: </span>{product.color}</p>}
                        {product.size && <p className="text-blue text-lg"><span className="font-bold">TAMAÑO: </span>{product.size}</p>}
                        {product.temples && <p className="text-blue text-lg"><span className="font-bold">PATILLAS: </span>{product.temples}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
