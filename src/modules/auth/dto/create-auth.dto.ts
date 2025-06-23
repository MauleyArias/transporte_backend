import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CrearAuthDto {

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'shirley@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  correo: string;

  @IsStrongPassword()
  @ApiProperty({
    example: 'Muyseguro123*',
    description: 'Contraseña del usuario',
  })
  contrasenia: string;
}
