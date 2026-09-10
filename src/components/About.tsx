import { publishedAppsCountLabel } from '../data/apps'

const FACTS = [
	'20+ лет разработки корпоративных систем',
	'Собственные программные продукты',
	'Android / ForestMusic',
	'Разработка приложений под заказ',
] as const

/**
 * About the developer behind the ForestMusic brand.
 * Emphasizes the path: corporate systems → own products → Android → custom apps.
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
							прикладных информационных систем — сначала в
							корпоративной среде, затем в собственных продуктах.
						</p>
						<p>
							Опыт корпоративной разработки и руководства
							IT-направлениями стал основой для серии Android-
							приложений ForestMusic. Сейчас я проектирую и
							разрабатываю приложения под заказ: от интерфейса и
							структуры данных до тестирования и публикации в
							RuStore.
						</p>
					</div>

					<ol className="about-path" aria-label="Профессиональный путь">
						<li>20+ лет разработки корпоративных систем</li>
						<li>Собственные программные продукты</li>
						<li>Android / ForestMusic</li>
						<li>
							Разработка приложений под заказ ·{' '}
							{publishedAppsCountLabel} в RuStore
						</li>
					</ol>
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
