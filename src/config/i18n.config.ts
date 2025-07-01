import i18n from 'i18n';
import path from 'path';
import app from '@config/app.config'; 

i18n.configure({
  locales: app.supported_languages, // Add other locales as needed
  defaultLocale: app.locale,
  directory: path.join(__dirname, '../locales'),
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
  cookie: 'lang', // optional if you're supporting frontend cookies
});

export default i18n;
