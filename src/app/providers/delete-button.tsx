"use client"

import { useState } from "react"
import { deleteProvider } from "@/app/actions/providers"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function DeleteProviderButton({ id, name }: { id: string, name: string }) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (confirm(`¿Estás seguro de eliminar a ${name}?`)) {
            setLoading(true)
            await deleteProvider(id)
            setLoading(false)
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
            disabled={loading}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
