import 'dotenv/config';
import dns from 'node:dns';
import mongoose from 'mongoose';
import cors from 'cors';

// Forzar DNS de Google para resolver registros SRV de Atlas
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Modelo de Service
const serviceSchema = new mongoose.Schema(
  {
    imagen: {
      type: String,
      required: [true, 'La URL de la imagen es obligatoria'],
      trim: true,
    },
    titulo: {
      type: String,
      required: [true, 'El título del servicio es obligatorio'],
      trim: true,
      maxlength: [120, 'El título no puede exceder 120 caracteres'],
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    descuento: {
      type: Number,
      default: 0,
      min: [0, 'El descuento no puede ser negativo'],
      max: [100, 'El descuento no puede superar el 100%'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
      maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

// Conexión a MongoDB con caché
let cachedDb = null;

async function connectDB() {
  if (cachedDb) {
    return cachedDb;
  }

  const conn = await mongoose.connect(process.env.MONGODB_URI);
  cachedDb = conn;
  return cachedDb;
}

// Handler principal
export default async function handler(req, res) {
  // CORS
  const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  };

  // Aplicar CORS manualmente
  res.setHeader('Access-Control-Allow-Origin', corsOptions.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    const { id } = req.query;

    // GET /api/services
    if (req.method === 'GET' && !id) {
      const services = await Service.find().sort({ createdAt: -1 });
      return res.json(services);
    }

    // GET /api/services/:id
    if (req.method === 'GET' && id) {
      const service = await Service.findById(id);
      if (!service) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      return res.json(service);
    }

    // POST /api/services
    if (req.method === 'POST') {
      const service = await Service.create(req.body);
      return res.status(201).json(service);
    }

    // PUT /api/services/:id
    if (req.method === 'PUT' && id) {
      const service = await Service.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!service) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      return res.json(service);
    }

    // DELETE /api/services/:id
    if (req.method === 'DELETE' && id) {
      const service = await Service.findByIdAndDelete(id);
      if (!service) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      return res.json({ message: 'Servicio eliminado correctamente' });
    }

    return res.status(405).json({ message: 'Método no permitido' });
  } catch (error) {
    console.error('Error en la API:', error);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
}
