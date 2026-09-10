/**
 * Local portfolio catalog for ForestMusic apps published on RuStore.
 * Keep this file as the single source of truth — never scrape RuStore at runtime.
 */
export interface AppItem {
	slug: string
	title: string
	shortDescription: string
	category: string
	tags: string[]
	rustoreUrl?: string
	icon?: string
	/** Optional real app screenshot path (local asset only). */
	screenshot?: string
	/** Optional second screenshot for layered device composition. */
	screenshotSecondary?: string
	/** Visual grouping for related construction calculators. */
	series?: 'construction'
}

/**
 * Developer catalog on RuStore — used when a package-specific URL is unknown.
 */
export const RUSTORE_DEVELOPER_URL =
	'https://www.rustore.ru/catalog/developer/pw0k858f'

/**
 * Total published apps label for marketing copy.
 * Not derived from homepage portfolio length — the landing shows a curated subset.
 */
export const publishedAppsCountLabel = '20+'

/**
 * Published ForestMusic applications available for the site catalog.
 */
export const apps: AppItem[] = [
	{
		slug: 'auto-journal',
		title: 'Автожурнал',
		shortDescription:
			'Учёт топлива, расходов, ТО и стоимости поездок в одном приложении.',
		category: 'Транспорт',
		tags: ['авто', 'расходы', 'ТО', 'учёт'],
		rustoreUrl:
			'https://www.rustore.ru/catalog/app/com.calculatorplatform.autojournal',
		icon: '/apps/auto-journal/icon.webp',
		screenshot: '/apps/auto-journal/screen-1.webp',
		screenshotSecondary: '/apps/auto-journal/screen-2.webp',
	},
	{
		slug: 'blood-pressure',
		title: 'Дневник давления',
		shortDescription:
			'Дневник давления, пульса, лекарств и показателей здоровья.',
		category: 'Здоровье',
		tags: ['давление', 'пульс', 'здоровье'],
		rustoreUrl:
			'https://www.rustore.ru/catalog/app/com.calculatorplatform.bpdiary',
		icon: '/apps/blood-pressure/icon.webp',
		screenshot: '/apps/blood-pressure/screen-1.webp',
		screenshotSecondary: '/apps/blood-pressure/screen-2.webp',
	},
	{
		slug: 'garden',
		title: 'Моя дача',
		shortDescription:
			'Дневник дачи и огорода: посадки, грядки, задачи, урожай и расходы.',
		category: 'Инструменты',
		tags: ['дача', 'огород', 'урожай'],
		rustoreUrl:
			'https://www.rustore.ru/catalog/app/com.calculatorplatform.gardendiary',
		icon: '/apps/garden/icon.webp',
		screenshot: '/apps/garden/screen-1.webp',
		screenshotSecondary: '/apps/garden/screen-2.webp',
	},
	{
		slug: 'study',
		title: 'Моя учёба',
		shortDescription:
			'Помощник для учёбы: расписание, задания и личный учебный дневник.',
		category: 'Образование',
		tags: ['учёба', 'расписание', 'дневник'],
		rustoreUrl: RUSTORE_DEVELOPER_URL,
		icon: '/apps/study/icon.webp',
	},
	{
		slug: 'pet-diary',
		title: 'Дневник питомца',
		shortDescription:
			'Уход за питомцем: здоровье, лекарства, прививки, записи и напоминания.',
		category: 'Питомцы',
		tags: ['питомцы', 'здоровье', 'напоминания'],
		rustoreUrl:
			'https://www.rustore.ru/catalog/app/com.calculatorplatform.petdiary',
		icon: '/apps/pet-diary/icon.webp',
	},
	{
		slug: 'converter',
		title: 'Конвертер Про',
		shortDescription:
			'Универсальный конвертер единиц: вес, длина, объём, температура и другие категории.',
		category: 'Инструменты',
		tags: ['конвертер', 'единицы', 'расчёты'],
		rustoreUrl:
			'https://www.rustore.ru/catalog/app/com.forestmusic.converter_android',
		icon: '/apps/converter/icon.webp',
	},
	{
		slug: 'foundation',
		title: 'Калькулятор фундамента',
		shortDescription:
			'Расчёт бетона, арматуры и стоимости ленточного, плитного и столбчатого фундамента.',
		category: 'Строительство',
		tags: ['фундамент', 'бетон', 'арматура'],
		rustoreUrl:
			'https://www.rustore.ru/catalog/app/com.calculatorplatform.foundation',
		icon: '/apps/foundation/icon.webp',
		series: 'construction',
	},
	{
		slug: 'wallpaper',
		title: 'Калькулятор обоев',
		shortDescription:
			'Расчёт количества рулонов обоев с учётом размеров комнаты, рисунка и запаса.',
		category: 'Строительство',
		tags: ['обои', 'ремонт', 'расчёт'],
		rustoreUrl:
			'https://www.rustore.ru/catalog/app/com.calculatorplatform.wallpaper',
		icon: '/apps/wallpaper/icon.webp',
		series: 'construction',
	},
	{
		slug: 'tile',
		title: 'Калькулятор плитки',
		shortDescription:
			'Расчёт плитки, запаса, упаковок и стоимости для пола или стен.',
		category: 'Строительство',
		tags: ['плитка', 'ремонт', 'смета'],
		rustoreUrl:
			'https://www.rustore.ru/catalog/app/com.calculatorplatform.tile',
		icon: '/apps/tile/icon.webp',
		series: 'construction',
	},
]

const FEATURED_SLUGS = [
	'auto-journal',
	'blood-pressure',
	'garden',
] as const

const OTHER_SLUGS = [
	'study',
	'pet-diary',
	'converter',
	'foundation',
	'wallpaper',
	'tile',
] as const

function getAppsBySlugs (slugs: readonly string[]): AppItem[] {
	return slugs
		.map((slug) => apps.find((app) => app.slug === slug))
		.filter((app): app is AppItem => Boolean(app))
}

/** Three spotlight products with larger featured cards. */
export const featuredApps: AppItem[] = getAppsBySlugs(FEATURED_SLUGS)

/** Compact portfolio grid — icons only, no screenshot areas. */
export const otherApps: AppItem[] = getAppsBySlugs(OTHER_SLUGS)
