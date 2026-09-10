const STEPS = [
	{
		num: '01',
		title: 'Идея',
		text: 'Разбираемся, какую задачу должно решать приложение.',
	},
	{
		num: '02',
		title: 'Проектирование',
		text: 'Определяем сценарии, экраны, данные и MVP.',
	},
	{
		num: '03',
		title: 'Разработка',
		text: 'Создаю рабочую версию короткими итерациями.',
	},
	{
		num: '04',
		title: 'Проверка',
		text: 'Тестирую реальные пользовательские сценарии.',
	},
	{
		num: '05',
		title: 'Публикация',
		text: 'Готовлю Android-сборку и релиз в RuStore.',
	},
] as const

/**
 * Development workflow explained in five clear steps.
 */
export function Process () {
	return (
		<section
			className="section"
			id="process"
			aria-labelledby="process-title"
		>
			<div className="container">
				<header className="section-header">
					<h2 className="section-title" id="process-title">
						Как проходит разработка
					</h2>
				</header>

				<p className="process-note">
					Необязательно приходить с готовым техническим заданием.
					Можно начать с обычного описания идеи.
				</p>

				<ol className="process-steps">
					{STEPS.map((step) => (
						<li className="process-step" key={step.num}>
							<span className="process-num">{step.num}</span>
							<h3>{step.title}</h3>
							<p>{step.text}</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}
