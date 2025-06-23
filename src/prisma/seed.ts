import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function main() {
  const prisma = new PrismaClient();

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('Muyseguro123*', salt);
    const user = await prisma.persona.create({
      data: {
        numeroDocumento: '123456789',
        tipoDocumento: 'DNI',
        nombre: 'Shirley',
        apellido: 'Arias',
        correo: 'shirley@gmail.com',
      },
    });
    const permisos = await prisma.permiso.createManyAndReturn({
      data: [
        { nombre: 'Crear Usuarios' },
        { nombre: 'Crear Clientes' },
        { nombre: 'Crear Productos' },
        { nombre: 'Crear Sucursales' },
        { nombre: 'Crear Categorias' },
        { nombre: 'Crear Rols' }
      ]
    });

    const rol = await prisma.rol.create({
      data: {
        nombre: 'admin',
        permisos: {
          connect: permisos.map(permiso => ({ id: permiso.id }))
        }
      }
    });
    await prisma.usuario.create({
      data: {
        personaId: user.id,
        rolId: rol.id,
        password: hashedPassword,
        sucursales: {
          create: {
            nombre: 'Casa Matríz',
            direccion: 'Avenida X',
            telefono: '74747282'
          }
        }
      }
    });
    console.log('✅ Datos de semilla insertados correctamente.');

  } catch (error) {
    console.error('❌ Error al insertar datos de semilla:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
