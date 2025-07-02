import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';
import config from '@config/app.config';


i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: config.fallback_locale,
    preload: config.supported_languages,
    defaultNS: 'translation',
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
    },
    detection: {
      order: ['header', 'querystring', 'cookie'],
      caches: ['cookie']
    },
  });

export default { i18next, middleware };
