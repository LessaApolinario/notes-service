import { Injectable } from '@nestjs/common';
import { CreateNoteRequest } from 'src/core/@types/http/request/CreateNoteRequest';
import { UpdateNoteRequest } from 'src/core/@types/http/request/UpdateNoteRequest';
import { Note } from 'src/core/domain/models/Note';
import { NoteAdapter } from 'src/core/interfaces/adapters/NoteAdapter';
import { NoteUseCase } from 'src/core/interfaces/usecases/NoteUseCase';

@Injectable()
export class NoteService extends NoteUseCase {
  constructor(private noteAdapter: NoteAdapter) {
    super();
  }

  create(note: CreateNoteRequest): Promise<Note> {
    return this.noteAdapter.create(note);
  }

  fetchByUserId(userId: string): Promise<Note[]> {
    return this.noteAdapter.fetchByUserId(userId);
  }

  findById(id: string): Promise<Note | null> {
    return this.noteAdapter.findById(id);
  }

  findByTitle(title: string): Promise<Note | null> {
    return this.noteAdapter.findByTitle(title);
  }

  update(note: UpdateNoteRequest): Promise<Note> {
    return this.noteAdapter.update(note);
  }

  remove(id: string): Promise<void> {
    return this.noteAdapter.remove(id);
  }
}
