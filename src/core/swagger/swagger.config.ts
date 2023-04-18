import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function configureSwagger(app: any) {
  const config = new DocumentBuilder()
    .setTitle('Nest Express')
    .setDescription('The NEST-EXPRESS API description')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
