import { Module } from "@nestjs/common";
import { WsGateway } from "./ws.gateway";
import { WsService } from "./ws.service";
import { WorkspaceItemModule } from "src/workspace-item/workspace-item.module";

@Module({
  imports: [WorkspaceItemModule],
  providers: [WsGateway, WsService],
  exports: [WsService],
})
export class WsModule {}
