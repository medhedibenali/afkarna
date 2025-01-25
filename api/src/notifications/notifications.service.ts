import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationType } from './enums/notification-type.enum';
import { Invitation } from './entities/invitation.entity';
import { UsersService } from 'src/users/users.service';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { User } from 'src/users/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SendInvitationEvent } from 'src/events/send-invitation.event';

@Injectable()
export class NotificationsService {

  constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>,
  @InjectRepository(Invitation) private invitationRepository: Repository<Invitation>,
  private userService: UsersService,
  private workspaceService: WorkspaceService,
  private eventEmitter: EventEmitter2
) {
  }

  async create(createNotificationDto: CreateNotificationDto) {
    // Check if workspace and user exist
    const invitedUser = await this.userService.findOneByEmail(createNotificationDto.invitedUserId);

    if (!invitedUser) {
      throw new Error('User not found');
    }

    const workspace = await this.workspaceService.findOneByRootCollectionId(createNotificationDto.workspaceId);

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    const notification = this.notificationRepository.create();
    const savedNotification = await this.notificationRepository.save(notification);

    createNotificationDto.type === NotificationType.Inivition ?
    await this._createNotificationTypeInivition(workspace, invitedUser, savedNotification) : await this._createNotificationTypeDiscussionItem(); 

  }

  async _createNotificationTypeInivition (
    workspace: Workspace,
    invitedUser: User,
    savedNotification: Notification
  ) : Promise<void> {
    const invitation = this.invitationRepository.create({ workspace, invitedUser, notification: savedNotification });
    const savedInvitation = await this.invitationRepository.save(invitation);

    this.eventEmitter.emit('invitation.created', new SendInvitationEvent(savedInvitation));
  }

  async _createNotificationTypeDiscussionItem() : Promise<void> {
  }
}
