const SERVICES = [
	{
		title: 'Бизнес-приложения',
		text: 'Инструменты для сотрудников, клиентов и внутренних процессов.',
	},
	{
		title: 'Дневники и системы учёта',
		text: 'История, аналитика, напоминания, экспорт и локальные данные.',
	},
	{
		title: 'Калькуляторы',
		text: 'От простых расчётов до сложной предметной логики.',
	},
	{
		title: 'Каталоги и справочники',
		text: 'Поиск, фильтрация, карточки, избранное и локальная база.',
	},
	{
		title: 'Интеграции',
		text: 'REST API, web-сервисы, импорт/экспорт и внешние системы.',
	},
	{
		title: 'Доработка и публикация',
		text: 'Развитие существующего Android-приложения и подготовка релиза.',
	},
] as const

/**
 * Services section describing what I can build for clients.
 */
export function Services () {
	return (
		<section
			className="section"
			id="services"
			aria-labelledby="services-title"
		>
			<div className="container">
				<header className="section-header">
					<h2 className="section-title" id="services-title">
						Что могу разработать
					</h2>
				</header>

				<div className="services-grid">
					{SERVICES.map((service, index) => (
						<article className="service-card" key={service.title}>
							<span className="service-index">
								{String(index + 1).padStart(2, '0')}
							</span>
							<h3>{service.title}</h3>
							<p>{service.text}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
