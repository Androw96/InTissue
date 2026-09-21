'use client';
import { createContext, useContext, type ReactNode } from 'react';
import { translate, type Language } from '@/lib/i18n';
const LanguageContext = createContext<Language>('hu');
export function LanguageProvider({
  language,
  children,
}: {
  language: Language;
  children: ReactNode;
}) {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const language = useContext(LanguageContext);
  return { language, t: (value: string) => translate(value, language) };
}
export function Text({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  function localize(value: ReactNode): ReactNode {
    return typeof value === 'string'
      ? t(value)
      : Array.isArray(value)
        ? value.map(localize)
        : value;
  }
  return <>{localize(children)}</>;
}
export function LanguageSwitcher() {
  const { language } = useLanguage();
  function change(next: Language) {
    if (next === language) return;
    document.cookie = `intissue_language=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    location.reload();
  }
  return (
    <div
      className="language-switch"
      role="group"
      aria-label={language === 'hu' ? 'Nyelvválasztás' : 'Choose language'}
    >
      <button
        type="button"
        lang="hu"
        aria-pressed={language === 'hu'}
        onClick={() => change('hu')}
      >
        HU
      </button>
      <button
        type="button"
        lang="en"
        aria-pressed={language === 'en'}
        onClick={() => change('en')}
      >
        EN
      </button>
    </div>
  );
}
export function LocalizedImage(props: React.ComponentProps<'img'>) {
  const { t } = useLanguage();
  return (
    <img
      {...props}
      alt={props.alt ? t(props.alt) : props.alt}
      title={props.title ? t(props.title) : props.title}
    />
  );
}
export function LocalizedInput(props: React.ComponentProps<'input'>) {
  const { t } = useLanguage();
  return (
    <input
      {...props}
      placeholder={props.placeholder ? t(props.placeholder) : props.placeholder}
      aria-label={props['aria-label'] ? t(props['aria-label']) : undefined}
    />
  );
}
export function LocalizedTextarea(props: React.ComponentProps<'textarea'>) {
  const { t } = useLanguage();
  return (
    <textarea
      {...props}
      placeholder={props.placeholder ? t(props.placeholder) : props.placeholder}
    />
  );
}
export function LocalizedButton(props: React.ComponentProps<'button'>) {
  const { t } = useLanguage();
  return (
    <button
      {...props}
      aria-label={props['aria-label'] ? t(props['aria-label']) : undefined}
    />
  );
}
