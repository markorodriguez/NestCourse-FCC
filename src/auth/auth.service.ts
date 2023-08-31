import { Injectable } from "@nestjs/common/decorators";
import { User, Bookmark } from "@prisma/client";

@Injectable({})
export class AuthService {

    signup() {
        return { message: "I am signup route" }
    }

    signin() {
        return { message: "I am signin route" }
    }
}