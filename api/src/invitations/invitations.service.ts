import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CrudService } from "src/common/crud/crud.service";
import { Invitation } from "./entities/invitation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { InvitationStatus } from "./enums/invitation-status.enum";
import { CreateInvitationDto } from "./dto/create-invitation.dto";
import { UsersService } from "src/users/users.service";
import { NotificationsService } from "src/notifications/notifications.service";

@Injectable()
export class InvitationsService extends CrudService<Invitation> {
  constructor(
    @InjectRepository(Invitation) invitationsRepository: Repository<Invitation>,
    private readonly notificationService: NotificationsService,
    private readonly usersService: UsersService,
  ) {
    super(invitationsRepository);
  }

  async createInvitation({
    workspace: workspaceId,
    invitedUser: invitedUserEmail,
  }: CreateInvitationDto) {
    const invitedUser =
      await this.usersService.findOneByEmail(invitedUserEmail);

    if (!invitedUser) {
      throw new NotFoundException();
    }

    const { id } = await this.create({ workspaceId, invitedUser });

    return this.findOne(id, { invitedUser: true });
  }

  async updateStatus(
    id: string,
    { id: invitedUserId }: User,
    status: InvitationStatus,
  ) {
    if (status === InvitationStatus.Pending) {
      throw new Error("Non valid new invitation status.");
    }

    const invitation = await this.repository.findOneByOrFail({
      id,
      invitedUserId,
    });

    if (invitation.status !== InvitationStatus.Pending) {
      throw new BadRequestException();
    }

    invitation.status = status;

    const savedInvitation = await this.repository.save(invitation);
    const notification =
      await this.notificationService.findNotifByTriggerId(savedInvitation);
    notification.handled = true;
    notification.read = true;
    await this.notificationService.updateNotif(notification);
  }
}
