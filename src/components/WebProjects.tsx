import { webProjects, type WebProject } from '../data/web-projects'
import { MetrikaGoals, trackGoal } from '../lib/metrika'

/**
 * Track generic + project-specific Metrika goals for web CTAs.
 */
function handleWebProjectClick (project: WebProject) {
	trackGoal(MetrikaGoals.webProject)

	if (project.slug === 'calc1') {
		trackGoal(MetrikaGoals.calc1)
	} else if (project.slug === 'first-calc') {
		trackGoal(MetrikaGoals.firstCalc)
	} else if (project.slug === 'pipetkaonline') {
		trackGoal(MetrikaGoals.pipetka)
	}
}

/**
 * Landscape web-project card with a browser-like frame.
 * Visually distinct from Android portfolio cards.
 */
function WebProjectCard ({ project }: { project: WebProject }) {
	return (
		<article className="web-card">
			<div className="web-browser">
				<div className="web-browser-chrome" aria-hidden="true">
					<span className="web-browser-dot" />
					<span className="web-browser-dot" />
					<span className="web-browser-dot" />
					<span className="web-browser-url">
						{project.url.replace(/^https:\/\//, '')}
					</span>
				</div>
				<div className="web-browser-viewport">
					{project.screenshot ? (
						<img
							src={project.screenshot}
							alt={`Скриншот сайта ${project.title}`}
							loading="lazy"
							decoding="async"
							width={960}
							height={600}
						/>
					) : (
						<div className="web-browser-placeholder">
							Место для screenshot
						</div>
					)}
				</div>
			</div>

			<div className="web-card-body">
				<h3 className="web-card-title">{project.title}</h3>
				<p className="web-card-desc">{project.shortDescription}</p>
				<ul className="web-card-tags" aria-label="Теги">
					{project.tags.map((tag) => (
						<li key={tag}>{tag}</li>
					))}
				</ul>
				<a
					className="web-card-link"
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => handleWebProjectClick(project)}
				>
					Открыть проект
					<span aria-hidden="true">→</span>
				</a>
			</div>
		</article>
	)
}

/**
 * Web services section — related web products that complement Android work.
 */
export function WebProjects () {
	return (
		<section
			className="section web-section"
			id="web-projects"
			aria-labelledby="web-projects-title"
		>
			<div className="container">
				<header className="section-header">
					<h2 className="section-title" id="web-projects-title">
						Приложения и веб-сервисы
					</h2>
					<p className="section-lead">
						Мобильное приложение часто является только частью
						продукта. При необходимости могу разработать связанный
						сайт, web-интерфейс, API или административную часть.
					</p>
				</header>

				<div className="web-grid">
					{webProjects.map((project) => (
						<WebProjectCard key={project.slug} project={project} />
					))}
				</div>
			</div>
		</section>
	)
}
