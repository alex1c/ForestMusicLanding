const TECHNOLOGIES = [
	'Android',
	'React Native',
	'Expo',
	'TypeScript',
	'Kotlin',
	'SQLite',
	'REST API',
	'SQL',
	'Git',
] as const

/**
 * Compact secondary block listing core technologies.
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
				</header>

				<ul className="tech-list">
					{TECHNOLOGIES.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>

				<p className="tech-note">
					Дополнительный опыт: web-разработка, PHP, 1С/ERP и
					интеграции корпоративных систем.
				</p>
			</div>
		</section>
	)
}
