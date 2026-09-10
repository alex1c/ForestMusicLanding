/**
 * Single source of truth for public contact channels.
 * Enable email mailto and MAX URL here when the accounts are ready.
 */
export const contacts = {
	telegram: {
		label: 'Telegram',
		url: 'https://t.me/alex1c_spb',
		enabled: true,
	},
	max: {
		label: 'MAX',
		/** Set the real MAX profile/chat URL when available. */
		url: '',
		enabled: false,
	},
	email: {
		address: 'hello@forest-music.ru',
		/**
		 * Keep false until the mailbox exists.
		 * When true, Contact renders a working mailto link.
		 */
		mailtoEnabled: false,
	},
} as const

export const telegramUrl = contacts.telegram.url
