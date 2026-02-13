import { prisma } from "@/lib/prisma"
import { ProviderForm } from "./provider-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, User } from "lucide-react"
import { DeleteProviderButton } from "./delete-button"

export const dynamic = 'force-dynamic'

export default async function ProvidersPage() {
    const providers = await prisma.provider.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Proveedores</h1>
                <ProviderForm />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {providers.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                            <p>No hay proveedores registrados aún.</p>
                        </CardContent>
                    </Card>
                ) : (
                    providers.map((provider) => (
                        <Card key={provider.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {provider.name}
                                </CardTitle>
                                <User className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-1 text-sm">
                                    {provider.contact && (
                                        <div className="font-medium">{provider.contact}</div>
                                    )}
                                    {provider.url && (
                                        <a
                                            href={provider.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-blue-500 hover:underline"
                                        >
                                            Ver sitio <ExternalLink className="ml-1 h-3 w-3" />
                                        </a>
                                    )}
                                    {!provider.contact && !provider.url && (
                                        <span className="text-muted-foreground italic">Sin datos de contacto</span>
                                    )}
                                </div>
                            </CardContent>
                            <div className="absolute top-2 right-2">
                                <DeleteProviderButton id={provider.id} name={provider.name} />
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
