import { ApiProperty } from "@nestjs/swagger";
import { TripStatus } from "@prisma/client";
import { IsDate, IsEnum, IsNumber, IsUUID } from "class-validator";

export class CreateViajeDto {


  @IsUUID()
  @ApiProperty({
    example: 'ruta123',
    description: 'Identificador único de la ruta',
  })
  rutaId: string;

  @IsUUID()
  @ApiProperty({
    example: 'bus123',
    description: 'Identificador único del bus',
  })
  busId: string;

  @IsDate()
  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Fecha y hora de partida del viaje',
  })
  fechaPartida: Date;

  @IsNumber()
  @ApiProperty({
    example: 100.1,
    description: 'Precio del viaje en la moneda local',
  })
  precio: number;

  @IsEnum(TripStatus)
  @ApiProperty({
    example: TripStatus.PROGRAMADO,
    description: 'Estado del viaje',
    enum: TripStatus
  })
  estado: TripStatus;
}
