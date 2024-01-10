import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { Request, Response } from 'express';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as express from 'express';
import * as hbs from 'hbs';

const methodOverride = require('method-override');

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  console.log('bootstrap!');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //전역 파이프에 validationPipe를 추가한다.
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      secret: 'very-important-secret',
      resave: false,  //세션 항상 저장할지 여부
      saveUninitialized: false,
      cookie: {
        maxAge: 1000000,
        httpOnly: true,
        secure: false,
      }, //10초
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.use(methodOverride('_method'));
 // app.useStaticAssets(join(__dirname,'..', '..','uploads'));
  app.useStaticAssets(join(__dirname, '..', '..', 'nest-auth-test', 'uploads'));

  await app.listen(3000);
}
bootstrap();
