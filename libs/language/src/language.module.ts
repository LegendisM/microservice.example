import path from 'path';
import { DynamicModule } from '@nestjs/common';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';

export class LanguageModule {
  static register(): DynamicModule {
    return {
      module: LanguageModule,
      imports: [
        I18nModule.forRoot({
          fallbackLanguage: 'fa',
          loaderOptions: {
            path: path.join(__dirname, '../../../static/i18n')
          },
          resolvers: [HeaderResolver]
        })
      ],
      exports: [I18nModule]
    }
  }
}
