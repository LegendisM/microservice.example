import { DynamicModule } from '@nestjs/common';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';

export class LanguageModule {
  static register(storagePath: string): DynamicModule {
    return {
      module: LanguageModule,
      imports: [
        I18nModule.forRoot({
          fallbackLanguage: 'fa',
          loaderOptions: {
            path: storagePath
          },
          resolvers: [HeaderResolver]
        })
      ],
      exports: [I18nModule]
    }
  }
}
