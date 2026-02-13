"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { createProvider } from "@/app/actions/providers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : "Guardar"}
        </Button>
    )
}

export function ProviderForm() {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")

    async function clientAction(formData: FormData) {
        const res = await createProvider(formData)
        if (res.error) {
            setError(res.error)
        } else {
            setOpen(false)
            setError("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Proveedor
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agregar Proveedor</DialogTitle>
                </DialogHeader>
                <form action={clientAction} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" name="name" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contact">Contacto (Tel/Email)</Label>
                        <Input id="contact" name="contact" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="url">Web / Link</Label>
                        <Input id="url" name="url" placeholder="https://..." />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div className="flex justify-end">
                        <SubmitButton />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
