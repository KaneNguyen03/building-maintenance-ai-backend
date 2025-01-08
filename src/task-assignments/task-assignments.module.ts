import { Module } from '@nestjs/common';
import { TaskAssignmentsController } from './task-assignments.controller';
import { TaskAssignmentsService } from './task-assignments.service';

@Module({
  controllers: [TaskAssignmentsController],
  providers: [TaskAssignmentsService]
})
export class TaskAssignmentsModule {}
