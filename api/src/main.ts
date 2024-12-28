import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsIoAdapter } from './ws/ws-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsIoAdapter(app));
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, authorization',
  });

  await app.listen(3000);
}
bootstrap();
