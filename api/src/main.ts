import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WsIoAdapter } from "./ws/ws-io-adapter";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useWebSocketAdapter(new WsIoAdapter(app));
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
