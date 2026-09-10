import { contacts, telegramUrl } from '../data/contacts'
import { MetrikaGoals, trackGoal } from '../lib/metrika'

/**
 * Final contact CTA — messengers first, no phone, no form.
 */
export function Contact () {
	const maxEnabled = contacts.max.enabled && Boolean(contacts.max.url)
	const emailMailto = contacts.email.mailtoEnabled
		? `mailto:${contacts.email.address}`
		: null

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
						разговора не требуется.
					</p>

					<div className="contact-actions">
						<a
							className="btn btn-primary"
							href={telegramUrl}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => trackGoal(MetrikaGoals.telegram)}
						>
							Написать в Telegram
						</a>

						{maxEnabled ? (
							<a
								className="btn btn-secondary"
								href={contacts.max.url}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => trackGoal(MetrikaGoals.max)}
							>
								Написать в MAX
							</a>
						) : (
							<span
								className="btn btn-secondary btn-disabled"
								aria-disabled="true"
								title="Ссылка на MAX появится после добавления в конфиг"
							>
								Написать в MAX
							</span>
						)}
					</div>

					<p className="contact-email">
						{emailMailto ? (
							<a
								href={emailMailto}
								onClick={() => trackGoal(MetrikaGoals.email)}
							>
								{contacts.email.address}
							</a>
						) : (
							<span>{contacts.email.address}</span>
						)}
					</p>
				</div>
			</div>
		</section>
	)
}
