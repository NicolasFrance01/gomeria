
# Guía de Despliegue en Vercel

## Prerrequisitos
- Cuenta en [Vercel](https://vercel.com)
- Proyecto subido a GitHub (o repositorio similar)
- Base de datos Neon configurada

## Pasos

1. **Importar Proyecto en Vercel**:
   - Conecta tu cuenta de GitHub.
   - Selecciona el repositorio `gomeria`.

2. **Configurar Variables de Entorno**:
   En la sección "Environment Variables" del proyecto en Vercel, agrega:
   
   - `DATABASE_URL`: (Tu URL de conexión pooling de Neon)
   - `DIRECT_URL`: (Tu URL de conexión directa de Neon)
   - `NEXTAUTH_SECRET`: (Genera uno con `openssl rand -base64 32` o usa un string largo y seguro)
   - `NEXTAUTH_URL`: `https://tu-proyecto.vercel.app` (Una vez desplegado)

3. **Deploy**:
   - Vercel detectará automáticamente que es un proyecto Next.js.
   - Click en "Deploy".

4. **Post-Deploy**:
   - Si no has ejecutado las migraciones en Neon desde tu local, Vercel puede intentar construir pero fallar si intenta conectarse a una DB vacía en runtime para auth.
   - Asegúrate de haber hecho `npx prisma db push` desde tu máquina local apuntando a la base de datos de producción (Neon), como ya hemos configurado.

## Verificación
- Abre la URL que te da Vercel.
- Intenta loguearte con el usuario admin creado (`admin` / `admin123`).
