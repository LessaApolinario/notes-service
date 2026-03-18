import { CreateNoteRequest } from 'src/core/@types/http/request/CreateNoteRequest';
import { UpdateNoteRequest } from 'src/core/@types/http/request/UpdateNoteRequest';
import { Note } from 'src/core/domain/models/Note';

export abstract class NoteAdapter {
  abstract create(note: CreateNoteRequest): Promise<Note>;
  abstract fetchByUserId(userId: string): Promise<Note[]>;
  abstract findById(id: string): Promise<Note | null>;
  abstract findByTitle(title: string): Promise<Note | null>;
  abstract update(note: UpdateNoteRequest): Promise<Note>;
  abstract remove(id: string): Promise<void>;
}
