import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "../../config/api.config";
import { Notification } from "./model/notification";

@Injectable({
    providedIn: "root"
})
export class NotificationService {
    constructor(private http: HttpClient) {}

    getNotifications() {
        return this.http.get<{ data: Notification[]}>(`${API.url}/notifications`);
    }

    acceptInvitation(invitationId :string){
        return this.http.post(`${API.url}/invitations/${invitationId}/accept`, {});
    }

    refuseInvitation(invitationId: string){
        return this.http.post(`${API.url}/invitations/${invitationId}/decline`, {});
    }

    inviteUserToWorkSpace(invitedUserEmail : string, workSpaceId: string){
        return this.http.post(`${API.url}/invitations`, {workspace: workSpaceId, invitedUser: invitedUserEmail});
    }

}
