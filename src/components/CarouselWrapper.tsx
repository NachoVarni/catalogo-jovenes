"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { useState } from "react";

interface CarouselWrapperProps {
    product: {
        id: string;
        name: string;
        material: string;
        image1: string;
        image2: string;
        image3: string | null;
        color?: string | null;
        size?: string | null;
        temples?: string | null;
        isAvailableForPurchase: boolean;
        createdAt: Date;
        updatedAt: Date;
    }
}

export const CarouselWrapper = ({ product }: CarouselWrapperProps) => {

    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    const openZoomedImage = (imageUrl: string) => {
        setZoomedImage(imageUrl ? imageUrl : '');
    };

    const closeZoomedImage = () => {
        setZoomedImage(null);
    };

    return (
        <>
            <Carousel className="w-8/12 md:w-2/5 m-auto">
                <CarouselContent className="-ml-2 md:-ml-4">
                    <CarouselItem className="pl-2 md:pl-4">
                        <Image
                            src={product.image1}
                            width={500}
                            height={300}
                            alt={product.name}
                            className="w-full h-auto cursor-pointer"
                            onClick={() => openZoomedImage(product.image1)}
                        />
                    </CarouselItem>

                    <CarouselItem className="pl-2 md:pl-4">
                        <Image
                            src={product.image2}
                            width={500}
                            height={300}
                            alt={product.name}
                            className="w-full h-auto"
                            onClick={() => openZoomedImage(product.image2)}
                        /></CarouselItem>
                    {product.image3 &&
                        <CarouselItem className="pl-2 md:pl-4">
                            <Image
                            src={product.image3}
                            width={500}
                            height={300}
                            alt={product.name}
                            className="w-full h-auto"
                            onClick={() => openZoomedImage(product.image3 || '')}
                            />
                        </CarouselItem>}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            {zoomedImage !== null && (
                <div className="zoomed-image-container bg-black/50 fixed top-0 left-0 w-full h-full flex justify-cemter items-center z-50 cursor-pointer" onClick={closeZoomedImage}>
                    <Image src={zoomedImage || ''} alt="zoomed-image" fill style={{ objectFit: 'contain' }} />
                </div>
            )}
        </>
    )
}