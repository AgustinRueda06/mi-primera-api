import { ProductModel } from '../mongo-db/producto.js';

export class ProductService {
    async getAll() {
        return await ProductModel.find();
    }

    async add(productData) {
        const product = new ProductModel(productData);
        return await product.save();
    }

    async update(id, productData) {
        return await ProductModel.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}