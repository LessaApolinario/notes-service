import { Module } from '@nestjs/common';
import { NoteUseCase } from 'src/core/interfaces/usecases/NoteUseCase';
import { DatabaseModule } from '../database/database.module';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    NoteService,
    {
      provide: NoteUseCase,
      useExisting: NoteService,
    },
  ],
  controllers: [NoteController],
  exports: [NoteUseCase, NoteService],
})
export class NoteModule {}
