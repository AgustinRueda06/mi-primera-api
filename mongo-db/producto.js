import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 }
}, { timestamps: true });

export const ProductModel = mongoose.model('Product', productSchema);