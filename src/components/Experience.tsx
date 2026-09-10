const COMPANIES = [
	'Liberty Страхование',
	'КИТ Финанс',
	'ГАЙДЕ',
	'Прогресс-Нева',
	'Пулковская',
] as const

/**
 * Compact prior work experience — previous employers, not ForestMusic clients.
 */
export function Experience () {
	return (
		<section
			className="section experience-section"
			id="experience"
			aria-labelledby="experience-title"
		>
			<div className="container">
				<header className="section-header">
					<h2 className="section-title" id="experience-title">
						20+ лет в разработке
					</h2>
					<p className="section-lead">
						Опыт корпоративной разработки и управления IT
					</p>
				</header>

				<div className="experience-body">
					<p>
						До собственных продуктов ForestMusic работал
						разработчиком и руководителем IT-направлений в крупных
						российских и международных компаниях: корпоративные
						системы, финансовое ПО, интеграции, базы данных и
						автоматизация бизнес-процессов.
					</p>
					<p>
						В Liberty Страхование Алексей руководил направлением
						финансового ПО и работал с корпоративными интеграциями,
						включая обмен данными с головным офисом компании в
						Бостоне. В ГАЙДЕ руководил управлением автоматизации и
						программного обеспечения.
					</p>

					<p className="experience-label">
						Опыт корпоративной разработки и управления IT
					</p>
					<p className="experience-companies">
						{COMPANIES.join(' · ')}
					</p>
				</div>
			</div>
		</section>
	)
}
