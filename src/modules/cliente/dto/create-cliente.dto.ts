import { ApiProperty } from "@nestjs/swagger";
import { TypeDocument } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class CreateClienteDto {

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
  @ApiProperty({
    example: 'prueba@prueba.com',
    description: 'Correo del cliente',
  })
  correo: string;

}
