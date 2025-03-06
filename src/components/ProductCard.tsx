"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

type ProductCardProps = {
  id: string
  name: string
  image1: string
  material: string
}

export function ProductCard({
  id,
  name,
  image1,
  material
}: ProductCardProps) {

  const router = useRouter()

  const handleProductClick = () => {
    router.push(`/productos/${material}/${id}`)
  }

  return (
    <Card onClick={handleProductClick} className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-[3/2]">
        <Image
          src={image1}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1023px) 50vw, 33vw"
          alt={name} />
      </div>
      <CardHeader>
        <CardTitle className="text-blue font-bold">Modelo {name}</CardTitle>
      </CardHeader>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}