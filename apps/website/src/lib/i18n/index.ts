import { en } from './en';

export { en };

/**
 * A key of the English dictionary.
 */
export type TranslationKey = keyof typeof en;

/**
 * Values used to replace `{name}` placeholders in a translation.
 */
export type TranslationParams = Record<string, string | number>;

/**
 * Translate a key, replacing `{name}` placeholders with the given params.
 */
export function t(key: TranslationKey, params?: TranslationParams): string {
	let value: string = en[key];
	if (params) {
		for (const [name, param] of Object.entries(params)) {
			value = value.replaceAll(`{${name}}`, String(param));
		}
	}
	return value;
}
