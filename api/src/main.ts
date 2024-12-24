import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WsIoAdapter } from "./ws/ws-io-adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsIoAdapter(app));

  await app.listen(3000);
}
bootstrap();
