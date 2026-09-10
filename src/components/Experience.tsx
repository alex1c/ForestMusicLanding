const COMPANIES = [
	'Liberty Страхование',
	'КИТ Финанс',
	'ГАЙДЕ',
	'Прогресс-Нева',
	'Пулковская',
] as const

/**
 * Compact prior work experience — previous employers, not ForestMusic clients.
 * Written in first person to match the rest of the personal site.
 *
 * Optional certificate preview: place
 * public/experience/rospatent-certificate.webp
 * and set hasRospatentCertificatePreview to true.
 */
const hasRospatentCertificatePreview = false
const ROSPATENT_CERTIFICATE_SRC = '/experience/rospatent-certificate.webp'

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

				<div className="experience-layout">
					<div className="experience-body">
						<p>
							До ForestMusic я работал разработчиком и
							руководителем IT-направлений в крупных российских и
							международных компаниях. Занимался корпоративными
							системами, финансовым ПО, интеграциями, базами
							данных и автоматизацией бизнес-процессов.
						</p>
						<p>
							В Liberty Страхование я руководил направлением
							финансового ПО и участвовал в корпоративных
							интеграциях, включая обмен данными с головным
							офисом в Бостоне.
						</p>
						<p>
							В ГАЙДЕ руководил управлением автоматизации и
							программного обеспечения, разрабатывал корпоративные
							решения и системы управленческой отчётности.
						</p>
						<p>
							Одно из внедрённых мной решений — система
							агрегирования сводной отчётности для финансового
							анализа — было зарегистрировано в Роспатенте как
							база данных.
						</p>

						<p className="experience-label">
							Опыт корпоративной разработки и управления IT
						</p>
						<p className="experience-companies">
							{COMPANIES.join(' · ')}
						</p>
					</div>

					<aside className="experience-cred" aria-label="Роспатент">
						{hasRospatentCertificatePreview ? (
							<img
								className="experience-cred-preview"
								src={ROSPATENT_CERTIFICATE_SRC}
								alt="Свидетельство о государственной регистрации базы данных"
								loading="lazy"
								decoding="async"
								width={160}
								height={220}
							/>
						) : null}
						<p className="experience-cred-org">Роспатент</p>
						<p className="experience-cred-title">
							Зарегистрированная база данных
						</p>
						<p className="experience-cred-number">№ 2016620392</p>
						<p className="experience-cred-note">
							Свидетельство о государственной регистрации базы
							данных
						</p>
					</aside>
				</div>
			</div>
		</section>
	)
}
