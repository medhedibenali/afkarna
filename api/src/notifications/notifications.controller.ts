import { Controller, Get, Query } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { SearchDto } from "../common/dto/search.dto";
import { User } from "../auth/decorators/user.decorator";
import { User as UserEntity } from "../users/entities/user.entity";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get("")
  findAll(@Query() searchDto: SearchDto, @User() { id: userId }: UserEntity) {
    return this.notificationsService.findAll(
      searchDto,
      { recipientId: userId },
      undefined,
      { createdAt: "DESC" },
    );
  }
}
