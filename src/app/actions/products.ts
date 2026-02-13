"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { ProductCategory } from "@prisma/client"

const ProductSchema = z.object({
    name: z.string().min(1, "Nombre obligatorio"),
    brand: z.string().optional(),
    size: z.string().optional(),
    category: z.nativeEnum(ProductCategory),
    buyPrice: z.coerce.number().min(0, "Precio inválido"),
    sellPrice: z.coerce.number().min(0, "Precio inválido"),
    stock: z.coerce.number().int().min(0, "Stock inválido"),
    minStock: z.coerce.number().int().min(0).default(0),
    providerId: z.string().optional().nullable(),
})

export async function createProduct(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        brand: formData.get("brand"),
        size: formData.get("size"),
        category: formData.get("category"),
        buyPrice: formData.get("buyPrice"),
        sellPrice: formData.get("sellPrice"),
        stock: formData.get("stock"),
        minStock: formData.get("minStock"),
        providerId: formData.get("providerId") || null,
    }

    const result = ProductSchema.safeParse(rawData)

    if (!result.success) {
        const error = (result.error as any).errors[0]?.message || "Datos inválidos"
        return { success: false, error }
    }

    try {
        await prisma.product.create({
            data: result.data,
        })
        revalidatePath("/products")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error: "Error al crear producto" }
    }
}

export async function updateProduct(id: string, formData: FormData) {
    // Similar to create, but with id
    const rawData = {
        name: formData.get("name"),
        brand: formData.get("brand"),
        size: formData.get("size"),
        category: formData.get("category"),
        buyPrice: formData.get("buyPrice"),
        sellPrice: formData.get("sellPrice"),
        stock: formData.get("stock"),
        minStock: formData.get("minStock"),
        providerId: formData.get("providerId") || null,
    }

    const result = ProductSchema.safeParse(rawData)

    if (!result.success) {
        const error = (result.error as any).errors[0]?.message || "Datos inválidos"
        return { success: false, error }
    }

    try {
        await prisma.product.update({
            where: { id },
            data: result.data,
        })
        revalidatePath("/products")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Error al actualizar producto" }
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        })
        revalidatePath("/products")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Error al eliminar producto" }
    }
}
