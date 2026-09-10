import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Portfolio } from './components/Portfolio'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { Technologies } from './components/Technologies'

/**
 * Single-page ForestMusic landing — sections linked via anchors only.
 */
function App () {
	return (
		<>
			<a className="skip-link" href="#main">
				Перейти к содержимому
			</a>
			<div id="top">
				<Header />
				<main id="main">
					<Hero />
					<Portfolio />
					<Services />
					<Process />
					<About />
					<Experience />
					<Technologies />
					<Contact />
				</main>
				<Footer />
			</div>
		</>
	)
}

export default App
