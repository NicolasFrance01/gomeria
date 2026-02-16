import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Store, User, CreditCard, Bell } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-primary">Configuración</h2>
                <p className="text-muted-foreground">Administre las preferencias generales del sistema.</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Sidebar for Settings */}
                <div className="space-y-1">
                    <Button variant="secondary" className="w-full justify-start font-medium bg-slate-100 text-slate-900 border-l-4 border-l-primary rounded-l-none rounded-r-md">
                        <Store className="mr-2 h-4 w-4" />
                        General
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground hover:bg-slate-50">
                        <User className="mr-2 h-4 w-4" />
                        Usuarios
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground hover:bg-slate-50">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Facturación
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground hover:bg-slate-50">
                        <Bell className="mr-2 h-4 w-4" />
                        Notificaciones
                    </Button>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos del Negocio</CardTitle>
                            <CardDescription>Información que aparecerá en los comprobantes y reportes.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="businessName">Nombre Comercial</Label>
                                    <Input id="businessName" defaultValue="Gomería Ejemplo S.A." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cuit">CUIT / Tax ID</Label>
                                    <Input id="cuit" defaultValue="30-12345678-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Dirección Fiscal</Label>
                                <Input id="address" defaultValue="Av. Corrientes 1234, CABA" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input id="phone" defaultValue="+54 11 4444-5555" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email de Contacto</Label>
                                    <Input id="email" type="email" defaultValue="contacto@gomeriaejemplo.com" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Preferencias del Sistema</CardTitle>
                            <CardDescription>Configuración regional y de moneda.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Moneda Principal</Label>
                                    <Input id="currency" defaultValue="Peso Argentino (ARS)" disabled className="bg-slate-50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Zona Horaria</Label>
                                    <Input id="timezone" defaultValue="America/Argentina/Buenos_Aires (GMT-3)" disabled className="bg-slate-50" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancelar</Button>
                        <Button>Guardar Cambios</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
