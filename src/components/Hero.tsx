import { telegramUrl } from '../data/contacts'
import { MetrikaGoals, trackGoal } from '../lib/metrika'

/**
 * Decorative abstract phone UI — not a screenshot of any real app.
 */
function HeroDevice () {
	return (
		<div className="hero-device">
			<div className="hero-device-notch" />
			<div className="hero-device-screen">
				<div className="hero-ui-bar">
					<span className="hero-ui-dot" />
					<span className="hero-ui-chip" />
				</div>
				<div className="hero-ui-title" />
				<div className="hero-ui-subtitle" />
				<div className="hero-ui-panel">
					<div className="hero-ui-metric">
						<span className="hero-ui-metric-label" />
						<span className="hero-ui-metric-value" />
					</div>
					<div className="hero-ui-chart" aria-hidden="true">
						<span style={{ height: '42%' }} />
						<span style={{ height: '68%' }} />
						<span style={{ height: '54%' }} />
						<span style={{ height: '82%' }} />
						<span style={{ height: '60%' }} />
					</div>
				</div>
				<div className="hero-ui-list">
					<span />
					<span />
					<span />
				</div>
				<div className="hero-ui-cta" />
			</div>
		</div>
	)
}

/**
 * First-viewport hero with modern tech composition (abstract, not product shots).
 */
export function Hero () {
	return (
		<section className="hero" aria-labelledby="hero-title">
			<div className="container hero-grid">
				<div className="hero-copy">
					<p className="eyebrow">FORESTMUSIC · ANDROID DEVELOPMENT</p>
					<h1 id="hero-title">
						Превращаю идеи
						<br />
						в Android-приложения
					</h1>
					<p className="hero-lead">
						Проектирую мобильные приложения и связанные с ними
						веб-сервисы — от интерфейса и данных до API, сайта и
						публикации готового продукта.
					</p>

					<div className="hero-actions">
						<a
							className="btn btn-primary"
							href={telegramUrl}
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
						<li>20+ приложений в RuStore</li>
						<li>20+ лет в разработке</li>
						<li>Android · React Native · Kotlin</li>
					</ul>
				</div>

				<div className="hero-visual" aria-hidden="true">
					<div className="hero-composition">
						<div className="hero-grid-bg" />
						<div className="hero-glow" />

						<div className="hero-float hero-float-rn">
							React Native
						</div>
						<div className="hero-float hero-float-kt">Kotlin</div>
						<div className="hero-float hero-float-sql">SQLite</div>

						<pre className="hero-code">
							<code>{`type App = {
  idea: string
  platform: 'Android'
}`}</code>
						</pre>

						<HeroDevice />
					</div>
				</div>
			</div>
		</section>
	)
}
