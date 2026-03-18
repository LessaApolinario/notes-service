import { Controller } from '@nestjs/common';
import { NoteUseCase } from 'src/core/interfaces/usecases/NoteUseCase';

@Controller()
export class NoteController {
  constructor(private noteUseCase: NoteUseCase) {}
}
