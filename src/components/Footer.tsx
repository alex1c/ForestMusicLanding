import { RUSTORE_DEVELOPER_URL } from '../data/apps'

const FOOTER_LINKS = [
	{ href: '#apps', label: 'Приложения' },
	{ href: '#web-projects', label: 'Веб-сервисы' },
	{ href: '#services', label: 'Услуги' },
	{ href: '#about', label: 'О разработчике' },
	{ href: '#contact', label: 'Контакты' },
	{ href: RUSTORE_DEVELOPER_URL, label: 'RuStore', external: true },
] as const

/**
 * Site footer with brand note and trademark statement.
 */
export function Footer () {
	const year = new Date().getFullYear()

	return (
		<footer className="site-footer">
			<div className="container">
				<div className="footer-grid">
					<div>
						<div className="footer-brand">ForestMusic</div>
						<p className="footer-desc">
							Android-приложения и разработка под заказ
						</p>
					</div>

					<nav className="footer-nav" aria-label="Навигация в подвале">
						{FOOTER_LINKS.map((link) =>
							'external' in link && link.external ? (
								<a
									key={link.href}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									{link.label}
								</a>
							) : (
								<a key={link.href} href={link.href}>
									{link.label}
								</a>
							),
						)}
					</nav>
				</div>

				<div className="footer-meta">
					<p>© {year} ForestMusic</p>
					<p>ForestMusic — зарегистрированный товарный знак.</p>
				</div>
			</div>
		</footer>
	)
}
