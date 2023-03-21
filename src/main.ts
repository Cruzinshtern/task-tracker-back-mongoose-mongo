import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const PORT = process.env.PORT || process.env.DEFAULT_PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`server started on....${PORT}`));
}
bootstrap();
