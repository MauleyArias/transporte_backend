import { ApiProperty } from "@nestjs/swagger";
import { TypeStateBus } from "@prisma/client";
import { IsEnum, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateBusDto {


  @IsUUID()
  @ApiProperty({
    example: 'duenio123',
    description: 'Identificador único del dueño del bus',
  })
  duenioId: string;

  @IsUUID()
  @ApiProperty({
    example: 'conductor123',
    description: 'Identificador único del conductor',
  })
  conductorId: string;

  @IsString()
  @ApiProperty({
    example: 'ABC123',
    description: 'Número de placa del bus',
  })
  numeroPlaca: string;

  @IsNumber()
  @ApiProperty({
    example: 50,
    description: 'Capacidad del bus en número de pasajeros',
  })
  capacidad: number;

  @IsString()
  @ApiProperty({
    example: 'Mercedes-Benz',
    description: 'Modelo del bus',
  })
  model: string;

  @IsEnum(TypeStateBus)
  @ApiProperty({
    example: TypeStateBus.ACTIVO,
    description: 'Estado del bus',
    enum: TypeStateBus
  })
  estado: TypeStateBus;
}
