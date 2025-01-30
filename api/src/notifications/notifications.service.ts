import { Injectable } from "@nestjs/common";
import { Notification } from "./entities/notification.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CrudService } from "src/common/crud/crud.service";
import { Trigger } from "./entities/trigger.entity";

@Injectable()
export class NotificationsService extends CrudService<Notification> {
  constructor(
    @InjectRepository(Notification)
    notificationRepository: Repository<Notification>,
  ) {
    super(notificationRepository);
  }

  async updateNotif(notification: Notification) {
    await this.repository.save(notification);
  }

  async findNotifByTriggerId(trigger: Trigger) {
    return await this.repository.findOneOrFail({
      where: { triggerId: trigger.id },
    });
  }
}
