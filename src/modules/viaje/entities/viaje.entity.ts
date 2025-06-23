import { BusEntity } from "@/modules/bus/entities/bus.entity";
import { RutaEntity } from "@/modules/ruta/entities/ruta.entity";

export const ViajeEntity = {
  id: true,
  ruta: {
    select: RutaEntity,
  },
  bus: {
    select: BusEntity,
  },
  fechaPartida: true,
  precio: true,
  estado: true,
}
