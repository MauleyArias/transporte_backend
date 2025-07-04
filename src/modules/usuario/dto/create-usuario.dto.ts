import { ApiProperty } from "@nestjs/swagger";
import { TypeDocument } from "@prisma/client";
import { IsArray, IsEmail, IsEnum, IsString, IsUUID } from "class-validator";

export class CreateUsuarioDto {

  @IsString()
  @ApiProperty({
    example: '123456789',
    description: 'Número de documento del cliente',
  })
  numeroDocumento: string;

  @IsEnum(TypeDocument)
  @ApiProperty({
    example: TypeDocument.DNI,
    description: 'Tipo de documento del cliente',
    enum: TypeDocument,
  })
  tipoDocumento: TypeDocument;

  @IsUUID()
  @ApiProperty({
    example: 1,
    description: 'Identificador del rol del cliente',
  })
  rolId: string;

  @IsArray()
  @ApiProperty({
    example: ['suc123', 'suc321'],
    description: 'Identificadores de las sucursales'
  })
  sucursalesIds: string[];

  @IsString()
  @ApiProperty({
    example: 'Pablo',
    description: 'Nombre del cliente',
  })
  nombre: string;

  @IsString()
  @ApiProperty({
    example: 'Rios',
    description: 'Apellido del cliente',
  })
  apellido: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'example@example.com',
    description: 'Correo del cliente',
  })
  correo: string;
}
