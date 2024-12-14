import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { Reflector } from "@nestjs/core"
import { JwtService } from '@nestjs/jwt';

import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Setting
  app.enableCors({origin: 'http://localhost:3000',
                  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                  allowedHeaders: ['Content-Type', 'Authorization','accept'],
                  credentials: true,}) 
 
  
  // Apply Payload validation 
  app.useGlobalPipes(new ValidationPipe({
                                        whitelist:true,
                                        transform:true
                                      }))
 
  
  app.use(cookieParser())
  await app.listen(process.env.PORT || 8000);
}
bootstrap();


