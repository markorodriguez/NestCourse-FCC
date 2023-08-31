import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:admin@127.0.0.1:5432/nest?schema=public'
                }
            }
        })
    }
}