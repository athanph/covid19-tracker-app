import styles from './Header.module.scss'
import Link from 'next/link'

const Header = () => {
    return (
        <header className={styles.header}>
			<div className={`container ${styles.container}`}>
            	<Link href="/"><a className={styles.logo}>COVID-19 Tracker</a></Link>

				<nav>
					<Link href="/what-is-covid19"><a>What is COVID-19?</a></Link>
				</nav>
			</div>
        </header>
    )
}

export default Header
