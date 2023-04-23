import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
Vue.use(VueI18n)

const languages = {
  'zh': require('./zh'),
  'en': require('./en')
}
const i18n = new VueI18n({
  // locale: localStorage.getItem('locale') || 'zh',
  // locale: getLanguage() || 'zh',
  locale: getLanguage(),
  messages: languages
})
export function getLanguage () {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) {
    console.log('lang is cookie language')
    return chooseLanguage
  }

  // if has not choose language
  /*  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(languages)
    for (const locale of locales) {
      if (language.indexOf(locale) > -1) {
        return locale
      }
    }*/
  return 'zh'
}
export default i18n
