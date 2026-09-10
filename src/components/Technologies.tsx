const PRIMARY_TECHNOLOGIES = [
	'Android',
	'React Native',
	'TypeScript',
	'Kotlin',
	'SQLite',
	'REST API',
	'SQL',
	'1С',
	'Web',
] as const

const SECONDARY_TECHNOLOGIES = [
	'Expo',
	'Git',
	'PHP',
] as const

/**
 * Technologies block — Android-first, with 1C as a full competence.
 */
export function Technologies () {
	return (
		<section
			className="section tech-section"
			aria-labelledby="tech-title"
		>
			<div className="container">
				<header className="section-header">
					<h2 className="section-title" id="tech-title">
						Технологии
					</h2>
					<p className="section-lead">
						Основной фокус — Android и цифровые продукты. При
						необходимости собираю связки Android + Web + API + 1С.
					</p>
				</header>

				<ul className="tech-list" aria-label="Основные технологии">
					{PRIMARY_TECHNOLOGIES.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>

				<p className="tech-secondary-label">Также использую</p>
				<ul
					className="tech-list tech-list-secondary"
					aria-label="Дополнительные технологии"
				>
					{SECONDARY_TECHNOLOGIES.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</div>
		</section>
	)
}
