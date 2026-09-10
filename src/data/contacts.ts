/**
 * Public contact channels for ForestMusic.
 *
 * First release: email only.
 * Telegram / MAX can be enabled later without redesigning the contact UI.
 */

const emailUser = 'rustore-alex1c'
const emailDomain = 'yandex.ru'

/**
 * Build the public email address at runtime (avoid a single literal in JSX).
 */
export function getPublicEmail (): string {
	return `${emailUser}@${emailDomain}`
}

/**
 * Build a mailto: URL at runtime.
 */
export function getMailtoUrl (): string {
	return `mailto:${getPublicEmail()}`
}

/** Display parts for anti-harvesting visual (joined with [@] in UI). */
export const emailDisplay = {
	user: emailUser,
	domain: emailDomain,
} as const

export const contacts = {
	email: {
		enabled: true,
		user: emailUser,
		domain: emailDomain,
	},
	/**
	 * Future ForestMusic Telegram channel / contact.
	 * Keep disabled until an official (non-personal) URL is ready.
	 */
	telegram: {
		label: 'Telegram',
		url: '',
		enabled: false,
	},
	/**
	 * Future MAX messenger contact.
	 */
	max: {
		label: 'MAX',
		url: '',
		enabled: false,
	},
} as const
