"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type SaleItem = {
    productId: string
    quantity: number
    unitPrice: number
}

export async function createSale(items: SaleItem[], paymentMethod: string) {
    if (items.length === 0) {
        return { success: false, error: "El carrito está vacío" }
    }

    const total = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0)

    try {
        // Transaction to ensure data integrity
        await prisma.$transaction(async (tx) => {
            // 1. Create Sale
            const sale = await tx.sale.create({
                data: {
                    total,
                    paymentMethod,
                    details: {
                        create: items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                        })),
                    },
                },
            })

            // 2. Decrement Stock
            for (const item of items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                })
            }
        })

        revalidatePath("/sales")
        revalidatePath("/products")
        revalidatePath("/") // Update dashboard
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error: "Error al procesar la venta. Verifique el stock." }
    }
}
