import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
        return this.$connect();
    }

}
