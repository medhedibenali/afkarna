import { IsNotEmpty, IsString } from "class-validator";

export class CreateInvitationDto {
    @IsString()
    workspaceId: string;

    @IsString()
    invitedUserId: string;
}

