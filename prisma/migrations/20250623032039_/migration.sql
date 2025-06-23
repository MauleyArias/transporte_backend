-- CreateEnum
CREATE TYPE "TypeDocument" AS ENUM ('DNI', 'RUC', 'PASAPORTE');

-- CreateEnum
CREATE TYPE "TypeStateBus" AS ENUM ('ACTIVO', 'MANTENIMIENTO');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('PROGRAMADO', 'EN_PROGRESO', 'FINALIZADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('COMPRADO', 'USADO', 'CANCELADO', 'RESERVADO');

-- CreateTable
CREATE TABLE "personas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "numero_documento" VARCHAR NOT NULL,
    "tipo_documento" "TypeDocument" NOT NULL,
    "nombre" VARCHAR NOT NULL,
    "apellido" VARCHAR NOT NULL,
    "correo" VARCHAR,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "codigo_activacion" VARCHAR,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "personas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "persona_id" UUID NOT NULL,
    "rol_id" UUID NOT NULL,
    "password" VARCHAR NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("persona_id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "persona_id" UUID NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("persona_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permisos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR NOT NULL,
    "descripcion" VARCHAR,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rutas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "origen" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "distancia_km" INTEGER NOT NULL,
    "tiempo_estimado_minutos" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rutas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "duenio_id" UUID NOT NULL,
    "conductor_id" UUID NOT NULL,
    "numero_placa" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "estado" "TypeStateBus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "buses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "viajes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ruta_id" UUID NOT NULL,
    "bus_id" UUID NOT NULL,
    "fecha_partida" TIMESTAMP(3) NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "estado" "TripStatus" NOT NULL DEFAULT 'PROGRAMADO',
    "asientos_vendidos" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "viajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cliente_id" UUID NOT NULL,
    "viaje_id" UUID NOT NULL,
    "sucursal_id" UUID NOT NULL,
    "nombre_pasajero" VARCHAR NOT NULL,
    "numero_asiento" INTEGER NOT NULL,
    "estado" "TicketStatus" NOT NULL DEFAULT 'COMPRADO',
    "precio" DOUBLE PRECISION NOT NULL,
    "fecha_compra" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ticket_id" UUID NOT NULL,
    "metodo_pago" VARCHAR NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fechaPago" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recuperar_contrasenias" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "persona_id" UUID NOT NULL,
    "codigo" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recuperar_contrasenias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sesiones" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "persona_id" UUID NOT NULL,
    "token" VARCHAR NOT NULL,
    "direccion_ip" VARCHAR NOT NULL,
    "agente_usuario" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sesiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sucursales" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR NOT NULL,
    "direccion" VARCHAR,
    "telefono" VARCHAR NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sucursales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aditorias" (
    "id" TEXT NOT NULL,
    "persona_id" UUID NOT NULL,
    "acion" TEXT NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidad_id" TEXT NOT NULL,
    "dato_anterior" JSONB,
    "dato_posterior" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT,

    CONSTRAINT "aditorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermisoToRol" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PermisoToRol_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SucursalToUsuario" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_SucursalToUsuario_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "personas_numero_documento_key" ON "personas"("numero_documento");

-- CreateIndex
CREATE UNIQUE INDEX "personas_correo_key" ON "personas"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_persona_id_key" ON "usuarios"("persona_id");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_persona_id_key" ON "clientes"("persona_id");

-- CreateIndex
CREATE UNIQUE INDEX "buses_numero_placa_key" ON "buses"("numero_placa");

-- CreateIndex
CREATE UNIQUE INDEX "sesiones_token_key" ON "sesiones"("token");

-- CreateIndex
CREATE INDEX "_PermisoToRol_B_index" ON "_PermisoToRol"("B");

-- CreateIndex
CREATE INDEX "_SucursalToUsuario_B_index" ON "_SucursalToUsuario"("B");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buses" ADD CONSTRAINT "buses_duenio_id_fkey" FOREIGN KEY ("duenio_id") REFERENCES "usuarios"("persona_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buses" ADD CONSTRAINT "buses_conductor_id_fkey" FOREIGN KEY ("conductor_id") REFERENCES "usuarios"("persona_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viajes" ADD CONSTRAINT "viajes_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viajes" ADD CONSTRAINT "viajes_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "buses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_viaje_id_fkey" FOREIGN KEY ("viaje_id") REFERENCES "viajes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("persona_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_sucursal_id_fkey" FOREIGN KEY ("sucursal_id") REFERENCES "sucursales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recuperar_contrasenias" ADD CONSTRAINT "recuperar_contrasenias_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesiones" ADD CONSTRAINT "sesiones_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aditorias" ADD CONSTRAINT "aditorias_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermisoToRol" ADD CONSTRAINT "_PermisoToRol_A_fkey" FOREIGN KEY ("A") REFERENCES "permisos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermisoToRol" ADD CONSTRAINT "_PermisoToRol_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SucursalToUsuario" ADD CONSTRAINT "_SucursalToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "sucursales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SucursalToUsuario" ADD CONSTRAINT "_SucursalToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios"("persona_id") ON DELETE CASCADE ON UPDATE CASCADE;
