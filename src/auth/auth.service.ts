import { Injectable } from "@nestjs/common/decorators";
import { User, Bookmark } from "@prisma/client";
import { AuthDTO } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ForbiddenException } from "@nestjs/common";


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDTO) {
        // generate the password
        const hash = await argon.hash(dto.password)
        // save the new user in the bd

        try {
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
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') { // duplicated constraint error
                    throw new ForbiddenException('Credentials taken')
                }  
            } else {
                throw new Error(error)
            }
        }

        
    }

    async signin(dto:AuthDTO) {
        // find the user
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        
        if (!user) throw new ForbiddenException('Credentials incorrect')

        // check if password matches

        const pwMatches = await argon.verify(user.hash, dto.password)

        if (!pwMatches) throw new ForbiddenException('Password incorrect')
        
        delete user.hash;

        return user;
        
    }
}