import { PermisoEntity } from "@/modules/permiso/entities/permiso.entity";

export const RolEntity = {
  id: true,
  nombre: true,
  permisos: {
    select: PermisoEntity
  }
};