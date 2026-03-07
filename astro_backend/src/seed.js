import 'dotenv/config';
import dns from 'node:dns';
import mongoose from 'mongoose';
import Service from './models/Service.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const sampleServices = [
  {
    imagen: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    titulo: 'Netflix Premium',
    precio: 5.99,
    descuento: 20,
    descripcion: 'Pantalla completa en 4K Ultra HD. Acceso a todo el catálogo sin restricciones. Hasta 4 dispositivos simultáneos.',
  },
  {
    imagen: 'https://images.unsplash.com/photo-1574375927938-d5a98e8d7e28?w=400&h=300&fit=crop',
    titulo: 'Disney+ Premium',
    precio: 4.99,
    descuento: 15,
    descripcion: 'Todo el contenido de Disney, Marvel, Star Wars y National Geographic. Calidad 4K HDR con Dolby Atmos.',
  },
  {
    imagen: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop',
    titulo: 'HBO Max',
    precio: 5.49,
    descuento: 10,
    descripcion: 'Series exclusivas, películas de estreno y documentales. Contenido de Warner Bros, DC y más.',
  },
  {
    imagen: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop',
    titulo: 'Spotify Premium',
    precio: 3.49,
    descuento: 0,
    descripcion: 'Música sin anuncios ni interrupciones. Descarga y escucha offline. Calidad de audio superior.',
  },
  {
    imagen: 'https://images.unsplash.com/photo-1615986201152-7686a4867f30?w=400&h=300&fit=crop',
    titulo: 'IPTV Full HD',
    precio: 8.99,
    descuento: 25,
    descripcion: 'Más de 5000 canales en vivo de todo el mundo. Deportes, películas, series y más. Guía EPG incluida.',
  },
  {
    imagen: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=400&h=300&fit=crop',
    titulo: 'Amazon Prime Video',
    precio: 4.49,
    descuento: 5,
    descripcion: 'Catálogo exclusivo de series y películas originales. Incluye canales adicionales y contenido en 4K.',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado para seeding...');

    await Service.deleteMany({});
    console.log('Colección de servicios limpiada.');

    const created = await Service.insertMany(sampleServices);
    console.log(`${created.length} servicios insertados correctamente.`);

    await mongoose.connection.close();
    console.log('Conexión cerrada. Seed completado.');
    process.exit(0);
  } catch (error) {
    console.error('Error durante el seed:', error.message);
    process.exit(1);
  }
};

seedDB();
