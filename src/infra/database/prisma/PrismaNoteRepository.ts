import { Injectable } from '@nestjs/common';
import { CreateNoteRequest } from 'src/core/@types/http/request/CreateNoteRequest';
import { UpdateNoteRequest } from 'src/core/@types/http/request/UpdateNoteRequest';
import { Note } from 'src/core/domain/models/Note';
import { NoteAdapter } from 'src/core/interfaces/adapters/NoteAdapter';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaNoteRepository extends NoteAdapter {
  constructor(private prismaService: PrismaService) {
    super();
  }

  create(note: CreateNoteRequest): Promise<Note> {
    throw new Error('Method not implemented.');
  }

  fetchByUserId(userId: string): Promise<Note[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Note> {
    throw new Error('Method not implemented.');
  }

  update(note: UpdateNoteRequest): Promise<Note> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
