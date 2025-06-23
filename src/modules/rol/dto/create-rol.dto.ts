import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateRolDto {

  @IsString()
  @ApiProperty({
    example: 'Admin',
    description: 'Nombre del rol',
  })
  nombre: string;
  
  @IsArray()
  @ApiProperty({
    example: ['per123','per321'],
    description: 'Lista de permisos del rol',
  })
  permisoIds: string[];
}
