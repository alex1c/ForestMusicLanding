import { MetrikaGoals, trackGoal } from '../lib/metrika'

const TELEGRAM_URL = 'https://t.me/alex1c_spb'

/**
 * First-viewport hero: brand positioning, CTAs, and abstract app composition.
 * Real screenshots can replace the abstract phone panels later.
 */
export function Hero () {
	return (
		<section className="hero" aria-labelledby="hero-title">
			<div className="container hero-grid">
				<div className="hero-copy">
					<p className="eyebrow">ForestMusic · Android Development</p>
					<h1 id="hero-title">
						Разработка Android-приложений
						<br />
						от идеи до публикации
					</h1>
					<p className="hero-lead">
						Проектирую и разрабатываю прикладные Android-приложения
						для бизнеса и частных проектов. От идеи и интерфейса до
						тестирования и публикации в RuStore.
					</p>

					<div className="hero-actions">
						<a
							className="btn btn-primary"
							href={TELEGRAM_URL}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => trackGoal(MetrikaGoals.heroContact)}
						>
							Обсудить приложение
						</a>
						<a className="btn btn-secondary" href="#apps">
							Посмотреть работы
						</a>
					</div>

					<ul className="hero-points">
						<li>20+ лет в разработке</li>
						<li>Реальные приложения в RuStore</li>
						<li>Полный цикл: идея → релиз</li>
					</ul>
				</div>

				<div className="hero-visual" aria-hidden="true">
					<div className="hero-composition">
						<div className="hero-phone hero-phone-a">
							<div className="hero-status" />
							<div className="hero-screen">
								<div className="hero-line wide" />
								<div className="hero-line mid" />
								<div className="hero-line short" />
								<div className="hero-card-row">
									<div className="hero-mini-card" />
									<div className="hero-mini-card" />
								</div>
							</div>
							<span className="hero-badge">Android · RuStore</span>
						</div>

						<div className="hero-phone hero-phone-b">
							<div className="hero-status" />
							<div className="hero-screen">
								<div className="hero-line mid" />
								<div className="hero-line wide" />
								<div className="hero-card-row">
									<div className="hero-mini-card" />
									<div className="hero-mini-card" />
								</div>
								<div className="hero-line short" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
