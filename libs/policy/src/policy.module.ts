import { Module } from '@nestjs/common';
import { PolicyFactory } from './policy.factory';
import { PolicyService } from './policy.service';

@Module({
  providers: [PolicyFactory, PolicyService],
  exports: [PolicyService],
})
export class PolicyModule { }
