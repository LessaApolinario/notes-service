import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { NoteUseCase } from 'src/core/interfaces/usecases/NoteUseCase';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/ZodValidationPipe';

const createNoteRequestBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.string(),
});

type CreateNoteRequestBody = z.infer<typeof createNoteRequestBodySchema>;

const updateNoteRequestBodySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

type UpdateNoteRequestBody = z.infer<typeof updateNoteRequestBodySchema>;

@Controller('/notes')
export class NoteController {
  constructor(private noteUseCase: NoteUseCase) {}

  @Post('/create')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createNoteRequestBodySchema))
  async createNote(@Body() note: CreateNoteRequestBody) {
    const foundUser = await this.noteUseCase.findByTitle(note.title);

    if (foundUser) {
      throw new ConflictException('Note already exists');
    }

    return await this.noteUseCase.create(note);
  }

  @Get('/user/:user_id')
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

  @Patch('/update')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(updateNoteRequestBodySchema))
  async updateNote(@Body() note: UpdateNoteRequestBody) {
    const foundNote = await this.noteUseCase.findById(note.id);

    if (!foundNote) {
      throw new NotFoundException('Note not found');
    }

    return await this.noteUseCase.update(note);
  }

  @Delete('/remove/:id')
  @HttpCode(204)
  async removeNote(@Param('id') id: string) {
    const foundNote = await this.noteUseCase.findById(id);

    if (!foundNote) {
      throw new NotFoundException('Note not found');
    }

    await this.noteUseCase.remove(id);
  }
}
