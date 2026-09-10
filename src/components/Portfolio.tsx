import {
	featuredApps,
	otherApps,
	publishedAppsCountLabel,
	RUSTORE_DEVELOPER_URL,
	type AppItem,
} from '../data/apps'
import { MetrikaGoals, trackGoal } from '../lib/metrika'

function getInitials (title: string): string {
	return title
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0] ?? '')
		.join('')
		.toUpperCase()
}

/**
 * Featured visual: real screenshots in device frames when available,
 * otherwise a large real app icon — never a grey screenshot placeholder.
 */
function FeaturedVisual ({ app }: { app: AppItem }) {
	if (app.screenshot) {
		return (
			<div className="featured-visual has-screens">
				<div className="featured-phone featured-phone-back" aria-hidden="true">
					{app.screenshotSecondary ? (
						<img
							src={app.screenshotSecondary}
							alt=""
							loading="lazy"
							decoding="async"
						/>
					) : (
						<img
							src={app.screenshot}
							alt=""
							loading="lazy"
							decoding="async"
						/>
					)}
				</div>
				<div className="featured-phone featured-phone-front">
					<img
						src={app.screenshot}
						alt={`Интерфейс приложения ${app.title}`}
						loading="lazy"
						decoding="async"
					/>
				</div>
			</div>
		)
	}

	return (
		<div className="featured-visual has-icon">
			<div className="featured-icon-stage" aria-hidden={!app.icon}>
				{app.icon ? (
					<img
						className="featured-icon"
						src={app.icon}
						alt=""
						width={120}
						height={120}
						loading="lazy"
						decoding="async"
					/>
				) : (
					<span className="featured-icon-fallback">
						{getInitials(app.title)}
					</span>
				)}
			</div>
		</div>
	)
}

/**
 * Large spotlight card for a primary published app.
 */
function FeaturedAppCard ({ app }: { app: AppItem }) {
	return (
		<article className="featured-card">
			<FeaturedVisual app={app} />
			<div className="featured-body">
				<p className="app-category">{app.category}</p>
				<h3 className="featured-title">{app.title}</h3>
				<p className="featured-desc">{app.shortDescription}</p>
				<ul className="app-tags" aria-label="Теги">
					{app.tags.slice(0, 4).map((tag) => (
						<li key={tag}>{tag}</li>
					))}
				</ul>
				{app.rustoreUrl ? (
					<a
						className="app-link"
						href={app.rustoreUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => trackGoal(MetrikaGoals.portfolioRustore)}
					>
						Открыть в RuStore
						<span aria-hidden="true">→</span>
					</a>
				) : null}
			</div>
		</article>
	)
}

/**
 * Compact card: icon-led, no screenshot area.
 */
function CompactAppCard ({ app }: { app: AppItem }) {
	return (
		<article className={`app-card-compact${app.series ? ' is-series' : ''}`}>
			{app.icon ? (
				<img
					className="app-icon-lg"
					src={app.icon}
					alt=""
					width={72}
					height={72}
					loading="lazy"
					decoding="async"
				/>
			) : (
				<span className="app-icon-lg-fallback" aria-hidden="true">
					{getInitials(app.title)}
				</span>
			)}
			<p className="app-category">{app.category}</p>
			<h3 className="app-title">{app.title}</h3>
			<p className="app-desc">{app.shortDescription}</p>
			<ul className="app-tags" aria-label="Теги">
				{app.tags.slice(0, 4).map((tag) => (
					<li key={tag}>{tag}</li>
				))}
			</ul>
			{app.rustoreUrl ? (
				<a
					className="app-link"
					href={app.rustoreUrl}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => trackGoal(MetrikaGoals.portfolioRustore)}
				>
					Открыть в RuStore
					<span aria-hidden="true">→</span>
				</a>
			) : null}
		</article>
	)
}

/**
 * Wide RuStore catalog CTA after the portfolio grids.
 */
function RustoreCatalogCard () {
	return (
		<a
			className="rustore-catalog"
			href={RUSTORE_DEVELOPER_URL}
			target="_blank"
			rel="noopener noreferrer"
			onClick={() => trackGoal(MetrikaGoals.rustoreCatalog)}
		>
			<img
				className="rustore-catalog-logo"
				src="/logo-mark.png"
				alt=""
				width={56}
				height={56}
			/>
			<div className="rustore-catalog-count" aria-hidden="true">
				{publishedAppsCountLabel}
			</div>
			<div className="rustore-catalog-copy">
				<h3>{publishedAppsCountLabel} приложений ForestMusic</h3>
				<p>
					Калькуляторы, дневники и прикладные инструменты для учёбы,
					дома, здоровья и повседневных задач.
				</p>
			</div>
			<span className="rustore-catalog-cta">
				Посмотреть весь каталог в RuStore
				<span aria-hidden="true">→</span>
			</span>
		</a>
	)
}

/**
 * Portfolio: featured spotlight apps + compact grid + RuStore catalog CTA.
 */
export function Portfolio () {
	return (
		<section
			className="section apps-section"
			id="apps"
			aria-labelledby="apps-title"
		>
			<div className="container">
				<header className="section-header">
					<h2 className="section-title" id="apps-title">
						Приложения ForestMusic
					</h2>
					<p className="section-lead">
						Не концепты и не макеты — приложения, которые уже
						опубликованы в RuStore.
					</p>
					<p className="apps-meta">
						{publishedAppsCountLabel} приложений в каталоге
						ForestMusic
					</p>
				</header>

				<div className="featured-list">
					{featuredApps.map((app) => (
						<FeaturedAppCard key={app.slug} app={app} />
					))}
				</div>

				<div className="other-apps">
					<h3 className="other-apps-title">Другие приложения</h3>
					<div className="apps-grid-compact">
						{otherApps.map((app) => (
							<CompactAppCard key={app.slug} app={app} />
						))}
					</div>
				</div>

				<RustoreCatalogCard />
			</div>
		</section>
	)
}
