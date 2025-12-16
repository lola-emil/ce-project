import { defineStore } from 'pinia';
import { i18n } from '../i18n';
import { ref } from 'vue';

type Locale = 'en' | 'fil' | 'en' | 'ceb';
export const useLocaleStore = defineStore('locale', () => {
    const locale = ref<Locale>((<Locale>localStorage.getItem('locale')) || 'en');

    const setLocale = (newLocale: Locale) => {
        locale.value = newLocale;
        i18n.global.locale.value = newLocale;
        localStorage.setItem('locale', newLocale);
    }

    const initLocale = () => {
        const saved = localStorage.getItem('locale') as Locale;

        if (saved) {
            locale.value = saved;
            i18n.global.locale.value = saved;
        }
    }

    return {
        locale,
        setLocale,
        initLocale
    }
});