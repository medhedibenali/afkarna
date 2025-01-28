import { Injectable } from "@nestjs/common";
import { Notification } from "./entities/notification.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CrudService } from "src/common/crud/crud.service";

@Injectable()
export class NotificationsService extends CrudService<Notification> {
    constructor(
        @InjectRepository(Notification) notificationRepository: Repository<
            Notification
        >,
    ) {
        super(notificationRepository);
    }
}
