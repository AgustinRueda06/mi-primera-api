import { getDependency } from "../dependency.js";

export class SessionsServices {
    constructor() {
        this.sessionRepo = getDependency("sessionRepo");
    }

    async getByToken(token) {
        return await this.sessionRepo.findOne({ authorizationToken: token });
    }
}