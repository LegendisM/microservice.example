import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getHello(): string {
    return this.profileService.getHello();
  }
}
