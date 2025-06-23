import { ApiProperty } from "@nestjs/swagger";
import { TicketStatus } from "@prisma/client";
import { IsEnum, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateTicketDto {


  @IsUUID()
  @ApiProperty({
    example: 'duenio123',
    description: 'Identificador único del cliente',
  })
  clienteId: string;

  @IsUUID()
  @ApiProperty({
    example: 'conductor123',
    description: 'Identificador único del viaje',
  })
  viajeId: string;

  @IsUUID()
  @ApiProperty({
    example: 'conductor123',
    description: 'Identificador de la sucursal',
  })
  sucursalId: string;

  @IsString()
  @ApiProperty({
    example: 'ABC123',
    description: 'Nombre del pasajero',
  })
  nombrePasajero: string;

  @IsNumber()
  @ApiProperty({
    example: 50,
    description: 'Número de asiento en el bus',
  })
  numeroAsiento: number;

  @IsEnum(TicketStatus)
  @ApiProperty({
    example: TicketStatus.COMPRADO,
    description: 'Estado del ticket',
    enum: TicketStatus
  })
  estado: TicketStatus;

  @IsNumber()
  @ApiProperty({
    example: 100.0,
    description: 'Precio del ticket',
  })
  precio: number;
}
