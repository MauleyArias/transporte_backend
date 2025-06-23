import { PersonaEntity } from "@/common/entity/persona.entity";
import { SucursalEntity } from "@/modules/sucursal/entities/sucursal.entity";
import { ViajeEntity } from "@/modules/viaje/entities/viaje.entity";

export const TicketEntity = {
  id: true,
  cliente: {
    select: {
      persona:{
        select: PersonaEntity
      }
    }
  },
  viaje: {
    select : ViajeEntity,
  },
  sucursal:{
    select: SucursalEntity,
  },
  nombrePasajero: true,
  numeroAsiento: true,
  estado: true,
  precio: true,
  fechaCompra: true,
}
