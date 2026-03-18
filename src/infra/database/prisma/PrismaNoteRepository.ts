import { Injectable } from '@nestjs/common';
import { CreateNoteRequest } from 'src/core/@types/http/request/CreateNoteRequest';
import { UpdateNoteRequest } from 'src/core/@types/http/request/UpdateNoteRequest';
import { Note } from 'src/core/domain/models/Note';
import { NoteAdapter } from 'src/core/interfaces/adapters/NoteAdapter';
import { PrismaNoteMapper } from 'src/core/mappers/prisma/note/PrismaNoteMapper';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaNoteRepository extends NoteAdapter {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async create(note: CreateNoteRequest): Promise<Note> {
    const newNote = await this.prismaService.note.create({
      data: {
        title: note.title,
        description: note.description,
        userId: note.userId,
      },
    });

    return PrismaNoteMapper.toDomain(newNote);
  }

  async fetchByUserId(userId: string): Promise<Note[]> {
    const notes = await this.prismaService.note.findMany({
      where: {
        userId,
      },
    });

    return notes.map(PrismaNoteMapper.toDomain);
  }

  async findById(id: string): Promise<Note | null> {
    const foundNote = await this.prismaService.note.findUnique({
      where: {
        id,
      },
    });

    return foundNote ? PrismaNoteMapper.toDomain(foundNote) : null;
  }

  async update(note: UpdateNoteRequest): Promise<Note> {
    const updatedNote = await this.prismaService.note.update({
      where: {
        id: note.id,
      },
      data: {
        title: note.title,
        description: note.description,
      },
    });

    return PrismaNoteMapper.toDomain(updatedNote);
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.note.delete({
      where: {
        id,
      },
    });
  }
}
