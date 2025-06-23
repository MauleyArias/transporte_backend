import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSucursalDto {


  @IsString()
  @ApiProperty({
    example: 'Product 1',
    description: 'Nombre de la sucursal',
  })
  nombre: string;

  @IsString()
  @ApiProperty({
    example: 'direccion 123',
    description: 'Dirección de la sucursal',
  })
  direccion: string;

  @IsString()
  @ApiProperty({
    example: '123123',
    description: 'Teléfono de la sucursal',
  })
  telefono: string;
}
