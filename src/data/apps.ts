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
	screenshot?: string
	/** Highlighted apps shown first in the portfolio grid. */
	featured?: boolean
	/** Visual grouping for related construction calculators. */
	series?: 'construction'
}

/**
 * Developer catalog on RuStore — used when a package-specific URL is unknown.
 */
export const RUSTORE_DEVELOPER_URL =
	'https://www.rustore.ru/catalog/developer/pw0k858f'

/**
 * Published ForestMusic applications.
 * Featured lifestyle apps are listed first; construction calculators share a series.
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
		featured: true,
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
		featured: true,
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
		featured: true,
	},
	{
		slug: 'study',
		title: 'Моя учёба',
		shortDescription:
			'Помощник для учёбы: расписание, задания и личный учебный дневник.',
		category: 'Образование',
		tags: ['учёба', 'расписание', 'дневник'],
		rustoreUrl: RUSTORE_DEVELOPER_URL,
		featured: true,
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
		featured: true,
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
		slug: 'construction',
		title: 'Строительный калькулятор',
		shortDescription:
			'Расчёт строительных материалов для ремонта: бетон, штукатурка и другие задачи.',
		category: 'Строительство',
		tags: ['ремонт', 'материалы', 'калькулятор'],
		rustoreUrl: RUSTORE_DEVELOPER_URL,
		series: 'construction',
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

/** Published app count derived from the catalog array. */
export const appsCount = apps.length
