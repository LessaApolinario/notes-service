import { Module } from '@nestjs/common';
import { NoteAdapter } from 'src/core/interfaces/adapters/NoteAdapter';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNoteRepository } from './prisma/PrismaNoteRepository';

@Module({
  providers: [
    PrismaService,
    PrismaNoteRepository,
    {
      provide: NoteAdapter,
      useClass: PrismaNoteRepository,
    },
  ],
  exports: [PrismaService, NoteAdapter, PrismaNoteRepository],
})
export class DatabaseModule {}
