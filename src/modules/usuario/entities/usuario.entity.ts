import { PersonaEntity } from "@/common/entity/persona.entity";
import { RolEntity } from "@/modules/rol/entities/rol.entity";
import { SucursalEntity } from "@/modules/sucursal/entities/sucursal.entity";


export const UsuarioEntity = {
  ...PersonaEntity,
  usuario: {
    select:{
      rol:{
        select: RolEntity
      },
      sucursales:{
        select: SucursalEntity,
      }
    }
  }
};