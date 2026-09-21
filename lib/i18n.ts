import { english } from './translations.ts';
export type Language = 'hu' | 'en';
export function translate(value: string, language: Language): string {
  if (language === 'hu') return value;
  const key = value.replace(/\s+/g, ' ').trim();
  const result = english[key];
  if (!result) {
    const suffix = ' – videó megnyitása';
    if (value.endsWith(suffix))
      return (
        translate(value.slice(0, -suffix.length), language) + ' – open video'
      );
    const requestPrefix = 'Az igénylést rögzítettük. Azonosító: ';
    if (value.startsWith(requestPrefix))
      return (
        'Your request has been recorded. Reference: ' +
        value.slice(requestPrefix.length)
      );
    const totalPrefix = 'Összes térítési díj: ';
    if (value.startsWith(totalPrefix))
      return (
        'Total reimbursement fee: ' +
        value
          .slice(totalPrefix.length)
          .replace(
            '. Az igénylés külön visszaigazolást igényel.',
            '. Your request requires separate confirmation.',
          )
      );
    return value;
  }
  return value.match(/^\s*/)?.[0] + result + (value.match(/\s*$/)?.[0] ?? '');
}
