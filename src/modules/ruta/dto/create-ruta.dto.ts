import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRutaDto {


  @IsString()
  @ApiProperty({
    example: 'Product 1',
    description: 'Origen de la ruta',
  })
  origen: string;

  @IsString()
  @ApiProperty({
    example: 'Product 1',
    description: 'Destino de la ruta',
  })
  destino: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Distancia de la ruta en kilómetros',
  })
  distanciaKm: number;

  @IsNumber()
  @ApiProperty({
    example: 123,
    description: 'Tiempo estimado de la ruta en minutos',
  })
  tiempoEstimadoMinutos: number;
}
