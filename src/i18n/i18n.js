import { i18n } from "@lingui/core";

export const locales = {
    en: "English",
    cs: "French",
};

export const defaultLocale = "en";

// load the compiled catalog for the locale on demand (the vite plugin compiles .po on import)
export async function dynamicActivate(locale) {
    const { messages } = await import(`../locales/${locale}/messages.po`);
    i18n.load(locale, messages);
    i18n.activate(locale);
}

export { i18n };
