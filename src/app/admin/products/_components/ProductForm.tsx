"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addProduct, updateProduct } from "../../_actions/products"
import { useActionState } from "react";
import { Product } from "@prisma/client"
import Image from "next/image"

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action, isPending] = useActionState(
    product == null ? addProduct : updateProduct.bind(null, product?.id ?? ""),
    {}
  );

  if (Object.keys(error).length > 0) {
    console.error("Error:", JSON.stringify(error, null, 2));
  }
  

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error?.name && <div className="text-destructive">{error?.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Material</Label>
        <Textarea
          id="material"
          name="material"
          required
          defaultValue={product?.material}
        />
        {error?.material && (
          <div className="text-destructive">{error?.material}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <Textarea
          id="color"
          name="color"
          defaultValue={product?.color || ""}
        />
        {error?.color && (
          <div className="text-destructive">{error?.color}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="size">Tamaño</Label>
        <Textarea
          id="size"
          name="size"
          defaultValue={product?.size || ""}
        />
        {error?.size && (
          <div className="text-destructive">{error?.size}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="recommendation">Patillas</Label>
        <Textarea
          id="temples"
          name="temples"
          defaultValue={product?.temples || ""}
        />
        {error?.temples && (
          <div className="text-destructive">{error?.temples}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image 1</Label>
        <Input type="file" id="image1" name="image1" required={product == null} />
        {product != null && (
          <Image
            src={product.image1}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {error?.image1 && <div className="text-destructive">{error?.image1}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">Image 2</Label>
        <Input type="file" id="image2" name="image2" required={product == null} />
        {product != null && (
          <Image
            src={product.image2}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {error?.image2 && <div className="text-destructive">{error?.image2}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image 3</Label>
        <Input type="file" id="image3" name="image3" />
        {product?.image3 != null && (
          <Image
            src={product.image3}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {error?.image3 && <div className="text-destructive">{error?.image3}</div>}
      </div>
      <SubmitButton isPending={isPending} />
    </form>
  )
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? "Saving..." : "Save"}
    </Button>
  );
}