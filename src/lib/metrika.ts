/**
 * Yandex Metrika helpers.
 * Safe when the counter script is blocked (AdBlock) or still loading.
 *
 * Counter 42579109 is initialized once in index.html — never init here.
 * Goals send only the goal name; never pass email or personal data.
 *
 * DIAGNOSTIC: set METRIKA_ENABLED back to true and restore the counter
 * block in index.html after connectivity diagnosis.
 */

declare global {
	interface Window {
		ym?: (
			counterId: number,
			method: string,
			...args: unknown[]
		) => void
		dataLayer?: unknown[]
	}
}

/**
 * Master switch for reachGoal calls.
 * Counter script itself lives in index.html (currently commented out).
 */
export const METRIKA_ENABLED = false

/** Official ForestMusic counter ID (must be used only once on the page). */
export const METRIKA_ID = 42579109

/**
 * Track a Metrika reachGoal event without throwing if ym is unavailable.
 * Pass only a goal name string — never email, PII, or form contents.
 */
export function trackGoal (name: string): void {
	try {
		if (!METRIKA_ENABLED) {
			return
		}

		if (typeof window === 'undefined') {
			return
		}

		if (!name || typeof name !== 'string') {
			return
		}

		const ym = window.ym
		if (typeof ym !== 'function') {
			return
		}

		ym(METRIKA_ID, 'reachGoal', name)
	} catch {
		// Intentionally swallow — analytics must never break the site.
	}
}

/** Named conversion events used across CTAs and portfolio links. */
export const MetrikaGoals = {
	heroContact: 'hero_contact_click',
	portfolioRustore: 'portfolio_rustore_click',
	headerContact: 'header_contact_click',
	email: 'email_click',
	emailCopy: 'email_copy',
	telegram: 'telegram_click',
	max: 'max_click',
	rustoreCatalog: 'rustore_catalog_click',
	webProject: 'web_project_click',
	calc1: 'calc1_click',
	firstCalc: 'first_calc_click',
	pipetka: 'pipetka_click',
} as const
