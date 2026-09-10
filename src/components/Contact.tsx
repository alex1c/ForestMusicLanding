import { MetrikaGoals, trackGoal } from '../lib/metrika'

const TELEGRAM_URL = 'https://t.me/alex1c_spb'
const EMAIL_URL = 'mailto:alex1c.spb@gmail.com'

/**
 * Final contact CTA — Telegram and email only (no form, no phone).
 */
export function Contact () {
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
						Опишите задачу в нескольких предложениях. Даже если
						технического задания пока нет, можно начать с идеи.
					</p>

					<div className="contact-actions">
						<a
							className="btn btn-primary"
							href={TELEGRAM_URL}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => trackGoal(MetrikaGoals.telegram)}
						>
							Написать в Telegram
						</a>
						<a
							className="btn btn-secondary"
							href={EMAIL_URL}
							onClick={() => trackGoal(MetrikaGoals.email)}
						>
							Написать по email
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
