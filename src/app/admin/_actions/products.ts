"use server"

import db from "@/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createClient } from '@supabase/supabase-js';

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  (file: File) => file.size === 0 || file.type.startsWith("image/")
)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  temples: z.string().optional(),
  material: z.string().min(1),
  image1: imageSchema.refine((file: File) => file.size > 0, "Required"),
  image2: imageSchema.refine((file: File) => file.size > 0, "Required"),
  image3: imageSchema.optional()
})

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))

  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  const uploadImage = async (file: File) => {
    if (!file) {
      return '';
    }
    const filePath = `products/${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage
      .from('products')
      .upload(filePath, file, {
        contentType: file.type,
      });

    if (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    return `https://pzjbegnvpltcaukzdoij.supabase.co/storage/v1/object/public/products/${filePath}`;
  };

  const [image1Url, image2Url, image3Url] = await Promise.all([
    uploadImage(data.image1),
    uploadImage(data.image2),
    data.image3 && data.image3.size > 0 ? uploadImage(data.image3) : Promise.resolve(null),
  ]);

    await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: data.name,
        color: data.color,
        size: data.size,
        temples: data.temples,
        material: data.material,
        image1: image1Url,
        image2: image2Url,
        image3: image3Url || null
      },
    });

    revalidatePath("/");
    revalidatePath("/products");
    redirect("/admin/products");
  
}

const editSchema = addSchema.extend({
  image1: imageSchema.optional(),
  image2: imageSchema.optional(),
  image3: imageSchema.optional(),
})

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {

  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()

    const uploadImage = async (file: File) => {
      const filePath = `products/${crypto.randomUUID()}-${file.name}`;
      const { error } = await supabase.storage
        .from('products')
        .upload(filePath, file, {
          contentType: file.type,
        });
  
      if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
  
      // Get the public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);
  
      return publicUrlData.publicUrl;
    };

    const deleteImage = async (imageUrl: string) => {
      const path = decodeURIComponent(imageUrl.split('/products/')[1]); // Extract file path
      await supabase.storage.from('products').remove([path]);
    };
  
    // Check if new images are provided, upload new images, and delete the old ones
    let image1Path = product.image1;
    if (data.image1 && data.image1.size > 0) {
      await deleteImage(product.image1); // Remove the old image from Supabase
      image1Path = await uploadImage(data.image1); // Upload the new image
    }
  
    let image2Path = product.image2;
    if (data.image2 && data.image2.size > 0) {
      await deleteImage(product.image2);
      image2Path = await uploadImage(data.image2);
    }

    let image3Path = product.image3;
  
    if (data.image3 && data.image3.size > 0 && product.image3) {
      await deleteImage(product.image3);
      image3Path = await uploadImage(data.image3);
    }
    
    
  

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      material: data.material,
      color: data.color,
      size: data.size,
      temples: data.temples,
      image1: image1Path,
      image2: image2Path,
      image3: image3Path
    },
  })

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/admin/products")
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } })

  revalidatePath("/")
  revalidatePath("/products")
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })

  if (product == null) return notFound()

    const deleteImage = async (imageUrl: string) => {
      // Extract the relative path from the URL and decode it
      const path = decodeURIComponent(imageUrl.split('/products/')[1]); // Ensure correct folder and decode URL
      if (!path) {
        console.error(`Could not extract file path from: ${imageUrl}`);
        return;
      }
      
      const { error } = await supabase.storage.from('products').remove([`${path}`]); // Use the correct relative path
      if (error) {
        console.error(`Failed to delete image: ${error.message}`);
      } else {
        console.log(`Successfully deleted image: products/${path}`);
      }
    };
  
    // Delete all images from Supabase storage
    if (product.image1) await deleteImage(product.image1);
    if (product.image2) await deleteImage(product.image2);
    if (product.image3) await deleteImage(product.image3);

  revalidatePath("/")
  revalidatePath("/products")
}