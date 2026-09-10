import { useEffect, useId, useRef, useState } from 'react'
import { telegramUrl } from '../data/contacts'
import { MetrikaGoals, trackGoal } from '../lib/metrika'

/** Transparent ForestMusic mark cropped from public/logo.png for the light header. */
const LOGO_URL = '/logo-header.png'

const NAV_LINKS = [
	{ href: '#apps', label: 'Приложения' },
	{ href: '#web-projects', label: 'Веб-сервисы' },
	{ href: '#services', label: 'Услуги' },
	{ href: '#about', label: 'О разработчике' },
	{ href: '#contact', label: 'Контакты' },
] as const

/**
 * Sticky site header with desktop nav and an accessible mobile menu.
 */
export function Header () {
	const [isOpen, setIsOpen] = useState(false)
	const menuId = useId()
	const toggleRef = useRef<HTMLButtonElement>(null)
	const firstLinkRef = useRef<HTMLAnchorElement>(null)

	// Close the mobile menu on Escape and restore focus to the toggle.
	useEffect(() => {
		if (!isOpen) {
			return
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false)
				toggleRef.current?.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		firstLinkRef.current?.focus()

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen])

	const handleNavClick = () => {
		setIsOpen(false)
	}

	const handleContactClick = () => {
		trackGoal(MetrikaGoals.headerContact)
		setIsOpen(false)
	}

	return (
		<header className="site-header">
			<div className="container header-inner">
				<a className="brand-link" href="#top" aria-label="ForestMusic — наверх">
					<img
						className="brand-logo"
						src={LOGO_URL}
						alt=""
						width={75}
						height={120}
					/>
					<span className="brand-text">FORESTMUSIC</span>
				</a>

				<nav className="nav-desktop" aria-label="Основная навигация">
					{NAV_LINKS.map((link) => (
						<a key={link.href} href={link.href}>
							{link.label}
						</a>
					))}
				</nav>

				<div className="header-actions">
					<a
						className="btn btn-primary header-cta"
						href={telegramUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={handleContactClick}
					>
						Обсудить проект
					</a>

					<button
						ref={toggleRef}
						className="menu-toggle"
						type="button"
						aria-expanded={isOpen}
						aria-controls={menuId}
						aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
						onClick={() => setIsOpen((value) => !value)}
					>
						<span className="menu-toggle-bars" aria-hidden="true" />
					</button>
				</div>
			</div>

			<div
				id={menuId}
				className={`mobile-nav${isOpen ? ' is-open' : ''}`}
				hidden={!isOpen}
			>
				<nav className="container mobile-nav-inner" aria-label="Мобильная навигация">
					{NAV_LINKS.map((link, index) => (
						<a
							key={link.href}
							ref={index === 0 ? firstLinkRef : undefined}
							href={link.href}
							onClick={handleNavClick}
						>
							{link.label}
						</a>
					))}
					<a
						className="btn btn-primary"
						href={telegramUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={handleContactClick}
					>
						Обсудить проект
					</a>
				</nav>
			</div>
		</header>
	)
}
