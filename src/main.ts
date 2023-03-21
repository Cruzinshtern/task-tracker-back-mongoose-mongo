import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const PORT = process.env.PORT || process.env.DEFAULT_PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`server started on....${PORT}`));
}
bootstrap();
