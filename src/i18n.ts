import { createI18n } from 'vue-i18n'
import fil from './locales/fil.json'
import ceb from './locales/ceb.json'
import en from "./locales/en.json";

export const i18n = createI18n({
  legacy: false,       // use Composition API
  locale: 'en',        // default
  fallbackLocale: 'en',
  messages: {
    en,
    fil,
    ceb
  }
});
