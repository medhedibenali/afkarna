import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { InvitationsService } from "./invitations.service";
import { CreateInvitationDto } from "./dto/create-invitation.dto";
import { SearchDto } from "src/common/dto/search.dto";
import { User } from "src/auth/decorators/user.decorator";
import { User as UserEntity } from "src/users/entities/user.entity";
import { InvitationStatus } from "./enums/invitation-status.enum";

@Controller("invitations")
export class InvitationsController {
    constructor(private readonly invitationsService: InvitationsService) { }

    @Post()
    create(@Body() createInvitationDto: CreateInvitationDto) {
        return this.invitationsService.createInvitation(createInvitationDto);
    }

    @Get()
    findAll(@Query() searchDto: SearchDto, @User() user: UserEntity) {
        return this.invitationsService.findAll(searchDto, {
            invitedUser: user,
        });
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.invitationsService.findOne(id);
    }

    @Post(":id/accept")
    accept(@Param("id") id: string, @User() user: UserEntity) {
        return this.invitationsService.updateStatus(
            id,
            user,
            InvitationStatus.Accepted,
        );
    }

    @Post(":id/decline")
    decline(@Param("id") id: string, @User() user: UserEntity) {
        return this.invitationsService.updateStatus(
            id,
            user,
            InvitationStatus.Declined,
        );
    }
}
