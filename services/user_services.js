import { getDependency } from "../dependency.js";
import bcrypt from "bcrypt";

export class UserServices {
    constructor() {
        this.userRepo = getDependency("userRepo");
    }

    async getList() {
        return await this.userRepo.find();
    }

    async add(user) {
        if (!user.user_name)
            throw new Error("El nombre de usuario es obligatorio");

        if (!user.password)
            throw new Error("La contraseña es obligatoria");

        if (user.password === "1234")
            throw new Error("La contraseña no puede ser '1234'");

        const existentUser = await this.userRepo.findOne({
            user_name: user.user_name
        });
        if (existentUser)
            throw new Error("El nombre de usuario ya existe");

        user.password = bcrypt.hashSync(user.password, 10);

        return this.userRepo.create(user);
    }

    async update(username, data) {
        if (data.password) {
            if (data.password === "1234")
                throw new Error("La contraseña no puede ser '1234'");
            data.password = bcrypt.hashSync(data.password, 10);
        }

        return await this.userRepo.findOneAndUpdate(
            { user_name: username },
            data,
            { new: true, runValidators: true }
        );
    }

    async delete(username) {
        return await this.userRepo.findOneAndDelete({ user_name: username });
    }
}