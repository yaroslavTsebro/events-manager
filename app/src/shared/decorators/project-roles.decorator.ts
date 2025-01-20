import { SetMetadata } from '@nestjs/common';
import { UserTaskListRole } from '../contracts/entities/user-task-list';

export const TASK_LIST_ROLES_KEY = 'task_list_roles';

export const ProjectRoles = (...roles: UserTaskListRole[]) => SetMetadata(TASK_LIST_ROLES_KEY, roles);