# Sistema de Gestión para Gomería

Este es un sistema web completo para la gestión de una gomería, incluyendo control de stock, proveedores, punto de venta (POS) y estadísticas.

## Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Base de Datos**: PostgreSQL (via Prisma ORM)
- **Estilos**: TailwindCSS
- **Autenticación**: NextAuth.js
- **Iconos**: Lucide React

## Requisitos Previos

- Node.js 18+
- PostgreSQL (Local o Cloud como Vercel/Neon/Supabase)

## Configuración Inicial

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar Base de Datos**:
   Renombra `.env` y configura tu `DATABASE_URL` y crea un `NEXTAUTH_SECRET`:
   ```env
   DATABASE_URL="postgresql://usuario:password@localhost:5432/gomeria_db"
   NEXTAUTH_SECRET="tu_secreto_super_seguro"
   ```

3. **Sincronizar Base de Datos**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Crear usuario administrador**:
   Puedes insertar un usuario directamente en la base de datos o usar Prisma Studio:
   ```bash
   npx prisma studio
   ```
   Crea un registro en la tabla `User` con `role: "ADMIN"`.
   *Nota: Las contraseñas deben estar hasheadas con bcrypt. Para desarrollo, puedes modificar la lógica de login o crear un script de seed.*

## Ejecución

### Desarrollo
```bash
npm run dev
```
Accede a http://localhost:3000

### Producción
```bash
npm run build
npm start
```

## Funcionalidades

- **Login**: `/login` (Credenciales).
- **Dashboard**: `/` (Resumen de ventas y stock).
- **Ventas (POS)**: `/sales` (Buscador rápido, carrito, métodos de pago).
- **Productos**: `/products` (CRUD, Alerta de bajo stock, Precios).
- **Proveedores**: `/providers` (Gestión de contacto y enlaces).

## Estructura del Proyecto

- `src/app`: Rutas y páginas (Next.js App Router).
- `src/components`: Componentes UI reutilizables (shadcn/ui).
- `src/lib`: Utilidades y configuración (Prisma, Auth).
- `prisma`: Esquema de base de datos.
