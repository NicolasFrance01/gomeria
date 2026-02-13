export const dynamic = 'force-dynamic'

export default function PingPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold text-green-600">PONG!</h1>
            <p className="mt-4 text-xl">El sistema está funcionando.</p>
            <p className="mt-2 text-sm text-gray-500">Hora: {new Date().toISOString()}</p>
            <p className="mt-4">
                Si ves esto, Next.js está corriendo correctamente.
                El problema del 404 en el inicio probablemente sea la Autenticación o la URL del login.
            </p>
        </div>
    )
}
