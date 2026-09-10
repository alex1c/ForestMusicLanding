import { useState } from 'react'
import {
	emailDisplay,
	getMailtoUrl,
	getPublicEmail,
} from '../data/contacts'
import { MetrikaGoals, trackGoal } from '../lib/metrika'

/**
 * Final contact CTA — email only on the first release (no phone, no form).
 */
export function Contact () {
	const [isCopied, setIsCopied] = useState(false)

	const handleMailtoClick = () => {
		trackGoal(MetrikaGoals.email)
	}

	const handleCopyClick = async () => {
		const address = getPublicEmail()

		try {
			await navigator.clipboard.writeText(address)
		} catch {
			// Fallback for older browsers / denied clipboard permission.
			const textarea = document.createElement('textarea')
			textarea.value = address
			textarea.setAttribute('readonly', '')
			textarea.style.position = 'fixed'
			textarea.style.left = '-9999px'
			document.body.appendChild(textarea)
			textarea.select()
			document.execCommand('copy')
			document.body.removeChild(textarea)
		}

		trackGoal(MetrikaGoals.emailCopy)
		setIsCopied(true)
		window.setTimeout(() => setIsCopied(false), 2200)
	}

	return (
		<section
			className="section contact-section"
			id="contact"
			aria-labelledby="contact-title"
		>
			<div className="container">
				<div className="contact-panel">
					<h2 id="contact-title">Есть идея приложения?</h2>
					<p>
						Расскажите в нескольких предложениях, что хотите
						сделать. Готовое техническое задание для первого
						обращения не требуется.
					</p>

					<div className="contact-actions">
						<a
							className="btn btn-primary"
							href={getMailtoUrl()}
							onClick={handleMailtoClick}
						>
							Написать по email
						</a>
						<button
							className="btn btn-secondary"
							type="button"
							onClick={() => {
								void handleCopyClick()
							}}
						>
							Скопировать адрес
						</button>
					</div>

					<p className="contact-email" aria-label="Адрес электронной почты">
						<span>{emailDisplay.user}</span>
						<span className="contact-email-sep"> [@] </span>
						<span>{emailDisplay.domain}</span>
					</p>

					<p
						className={`contact-copy-status${isCopied ? ' is-visible' : ''}`}
						role="status"
						aria-live="polite"
					>
						{isCopied ? 'Адрес скопирован' : '\u00A0'}
					</p>
				</div>
			</div>
		</section>
	)
}
