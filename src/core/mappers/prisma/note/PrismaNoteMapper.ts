import { Note as PrismaNote } from '@prisma/client';
import { Note } from 'src/core/domain/models/Note';

export class PrismaNoteMapper {
  static toDomain(note: PrismaNote): Note {
    return {
      id: note.id,
      title: note.title,
      description: note.description,
      userId: note.userId,
      createdAt: note.createdAt.toDateString(),
      updatedAt: note.updatedAt.toDateString(),
    };
  }
}
