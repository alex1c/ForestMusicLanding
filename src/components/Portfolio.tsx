import {
	homepageApps,
	publishedAppsCountLabel,
	RUSTORE_DEVELOPER_URL,
	type AppItem,
} from '../data/apps'
import { MetrikaGoals, trackGoal } from '../lib/metrika'

/**
 * Single portfolio card rendered from the local apps catalog.
 */
function AppCard ({ app }: { app: AppItem }) {
	const initials = app.title
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0] ?? '')
		.join('')
		.toUpperCase()

	const className = [
		'app-card',
		app.featured ? 'is-featured' : '',
		app.series ? 'is-series' : '',
	]
		.filter(Boolean)
		.join(' ')

	return (
		<article className={className}>
			<div className="app-card-top">
				{app.icon ? (
					<img
						className="app-icon"
						src={app.icon}
						alt=""
						width={56}
						height={56}
						loading="lazy"
						decoding="async"
					/>
				) : (
					<span className="app-icon-fallback" aria-hidden="true">
						{initials}
					</span>
				)}
				<div>
					<p className="app-category">{app.category}</p>
					<h3 className="app-title">{app.title}</h3>
				</div>
			</div>

			<div className="app-preview">
				{app.screenshot ? (
					<img
						src={app.screenshot}
						alt={`Скриншот приложения ${app.title}`}
						loading="lazy"
						decoding="async"
					/>
				) : (
					<div className="app-preview-placeholder">
						Превью появится после добавления screenshot
					</div>
				)}
			</div>

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
 * Wide RuStore catalog CTA — secondary to the main development CTA.
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
				<h3>Все приложения ForestMusic в RuStore</h3>
				<p>
					Калькуляторы, дневники и прикладные инструменты для учёбы,
					дома, здоровья и повседневных задач.
				</p>
			</div>
			<span className="rustore-catalog-cta">
				Посмотреть весь каталог
				<span aria-hidden="true">→</span>
			</span>
		</a>
	)
}

/**
 * Portfolio section: curated homepage selection + full RuStore catalog CTA.
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

				<div className="apps-grid">
					{homepageApps.map((app) => (
						<AppCard key={app.slug} app={app} />
					))}
				</div>

				<p className="apps-all-link-wrap">
					<a
						className="apps-all-link"
						href={RUSTORE_DEVELOPER_URL}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => trackGoal(MetrikaGoals.rustoreCatalog)}
					>
						Посмотреть все приложения в RuStore
						<span aria-hidden="true">→</span>
					</a>
				</p>

				<RustoreCatalogCard />
			</div>
		</section>
	)
}
