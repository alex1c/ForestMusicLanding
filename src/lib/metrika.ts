/**
 * Yandex Metrika helpers.
 * Safe when the counter script is blocked (AdBlock) or still loading.
 */

declare global {
	interface Window {
		ym?: (
			counterId: number,
			method: string,
			...args: unknown[]
		) => void
	}
}

/** Official ForestMusic counter ID (must be used only once on the page). */
export const METRIKA_ID = 42579109

/**
 * Track a Metrika goal/reachGoal event without throwing if ym is unavailable.
 */
export function trackGoal (name: string): void {
	try {
		if (typeof window === 'undefined') {
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
	telegram: 'telegram_click',
	email: 'email_click',
} as const
