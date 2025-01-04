import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WsIoAdapter } from "./ws/ws-io-adapter";
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsIoAdapter(app));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
