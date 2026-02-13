"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const ProviderSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    contact: z.string().optional(),
    url: z.string().url("URL inválida").optional().or(z.literal("")),
})

export async function createProvider(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        contact: formData.get("contact"),
        url: formData.get("url"),
    }

    const result = ProviderSchema.safeParse(rawData)

    if (!result.success) {
        return { success: false, error: result.error.errors[0].message }
    }

    try {
        await prisma.provider.create({
            data: {
                name: result.data.name,
                contact: result.data.contact,
                url: result.data.url || null,
            },
        })
        revalidatePath("/providers")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Error al crear proveedor" }
    }
}

export async function deleteProvider(id: string) {
    try {
        await prisma.provider.delete({
            where: { id },
        })
        revalidatePath("/providers")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Error al eliminar proveedor" }
    }
}
