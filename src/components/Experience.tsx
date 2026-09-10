const COMPANIES = [
	'Liberty Страхование',
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
						До собственных Android-продуктов Алексей много лет
						занимался корпоративной разработкой, автоматизацией и
						интеграцией информационных систем, работал разработчиком
						и руководителем IT-направлений.
					</p>
				</header>

				<div className="experience-body">
					<p>
						В Liberty Страхование Алексей руководил направлением
						финансового ПО и работал с корпоративными интеграциями,
						включая обмен данными с головным офисом компании в
						Бостоне. В ГАЙДЕ руководил управлением автоматизации и
						программного обеспечения.
					</p>

					<p className="experience-label">Опыт работы</p>
					<p className="experience-companies">
						{COMPANIES.join(' · ')}
					</p>
				</div>
			</div>
		</section>
	)
}
