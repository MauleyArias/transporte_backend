import { PersonaEntity } from "@/common/entity/persona.entity";

export const BusEntity = {
  id: true,
  ownerUsuario:{
    select:{
      persona:{
        select: PersonaEntity,
      },
    }
  },
  driverUsuario: {
    select:{
      persona:{
        select: PersonaEntity,
      },
    }
  },
  numeroPlaca: true,
  capacidad: true,
  model: true,
  estado: true,
}
