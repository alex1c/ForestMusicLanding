/**
 * Real web projects that complement the Android portfolio.
 * Screenshots are stored locally — never hotlink or capture at runtime.
 */
export interface WebProject {
	slug: string
	title: string
	shortDescription: string
	url: string
	tags: string[]
	screenshot?: string
}

export const webProjects: WebProject[] = [
	{
		slug: 'calc1',
		title: 'Calc1.ru',
		shortDescription:
			'Платформа онлайн-калькуляторов для финансов, строительства, здоровья, математики, IT и повседневных задач. Более 100 калькуляторов, мультиязычный проект с тематическими категориями.',
		url: 'https://calc1.ru/',
		tags: ['Web App', 'Multilingual', 'Calculators'],
		screenshot: '/web/calc1/screenshot.webp',
	},
	{
		slug: 'first-calc',
		title: 'First Calc',
		shortDescription:
			'Англоязычный каталог онлайн-калькуляторов и прикладных инструментов.',
		url: 'https://first-calc.com/',
		tags: ['Web App', 'International', 'Tools'],
		screenshot: '/web/first-calc/screenshot.webp',
	},
	{
		slug: 'pipetkaonline',
		title: 'PipetkaOnline',
		shortDescription:
			'Онлайн-инструменты для работы с цветом: определение цветов, палитры, контраст, конвертация и инструменты для UI. 17+ инструментов.',
		url: 'https://pipetkaonline.ru/',
		tags: ['Web Tools', 'Color', 'UI / Design'],
		screenshot: '/web/pipetkaonline/screenshot.webp',
	},
]
