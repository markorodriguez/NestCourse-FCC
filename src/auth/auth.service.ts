import { Injectable } from "@nestjs/common/decorators";
import { User, Bookmark } from "@prisma/client";
import { AuthDTO } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "src/prisma/prisma.service";


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDTO) {
        // generate the password
        const hash = await argon.hash(dto.password)
        // save the new user in the bd
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            },
            /*
            select: {
                id: true,
                email: true,
                createdAt: true
            }
            */ // allow us return just what we want
        })

        delete user.hash // temporal solution
        
        // return the saved user
        return user;
    }

    signin() {
        return { message: "I am signin route" }
    }
}