import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { type CreateNoteRequest } from 'src/core/@types/http/request/CreateNoteRequest';
import { type UpdateNoteRequest } from 'src/core/@types/http/request/UpdateNoteRequest';
import { NoteUseCase } from 'src/core/interfaces/usecases/NoteUseCase';

@Controller('/notes')
export class NoteController {
  constructor(private noteUseCase: NoteUseCase) {}

  @Post('/:user_id')
  @HttpCode(201)
  async createNote(@Body() note: CreateNoteRequest) {
    const foundUser = await this.noteUseCase.findByTitle(note.title);

    if (foundUser) {
      throw new ConflictException('Note already exists');
    }

    return await this.noteUseCase.create(note);
  }

  @Get('/:user_id')
  @HttpCode(200)
  async fetchNotesByUserId(@Param('user_id') userId: string) {
    return await this.noteUseCase.fetchByUserId(userId);
  }

  @Get('/:id')
  @HttpCode(200)
  async fetchNoteById(@Param('id') id: string) {
    const foundNote = await this.noteUseCase.findById(id);

    if (!foundNote) {
      throw new NotFoundException('Note not found');
    }

    return foundNote;
  }

  @Post('/:id')
  @HttpCode(200)
  async updateNote(@Body() note: UpdateNoteRequest) {
    const foundNote = await this.noteUseCase.findById(note.id);

    if (!foundNote) {
      throw new NotFoundException('Note not found');
    }

    return await this.noteUseCase.update(note);
  }

  @Delete('/:id')
  @HttpCode(204)
  async removeNote(@Param('id') id: string) {
    const foundNote = await this.noteUseCase.findById(id);

    if (!foundNote) {
      throw new NotFoundException('Note not found');
    }

    await this.noteUseCase.remove(id);
  }
}
