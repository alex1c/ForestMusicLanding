const FACTS = [
	'20+ лет коммерческой разработки',
	'Опыт руководства IT-разработкой',
	'Корпоративные системы и интеграции',
	'Собственные Android-приложения в RuStore',
] as const

/**
 * About the developer behind the ForestMusic brand.
 */
export function About () {
	return (
		<section className="section" id="about" aria-labelledby="about-title">
			<div className="container about-grid">
				<div>
					<header className="section-header">
						<h2 className="section-title" id="about-title">
							Кто стоит за ForestMusic
						</h2>
					</header>

					<div className="about-text">
						<p>
							Меня зовут Алексей Иванов. Я разработчик и автор
							проектов ForestMusic. Более 20 лет занимаюсь
							программированием, автоматизацией и созданием
							прикладных информационных систем.
						</p>
						<p>
							За это время работал разработчиком и руководителем
							IT-направлений, создавал корпоративные системы,
							интеграции и веб-решения. Сейчас одно из основных
							направлений моей работы — Android-приложения: от
							проектирования интерфейса и структуры данных до
							тестирования и публикации.
						</p>
					</div>
				</div>

				<ul className="about-facts">
					{FACTS.map((fact) => (
						<li key={fact}>{fact}</li>
					))}
				</ul>
			</div>
		</section>
	)
}
