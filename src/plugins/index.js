
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import { createI18n } from 'vue-i18n'
import messages from './locales/messages'



const i18n = createI18n({
  locale: 'ar', 
  messages,
  rtl: {
    customLocale: true,
  },
})

export function registerPlugins (app) {
     app
    .use(vuetify)
    .use(router)
    .use(i18n)
}
