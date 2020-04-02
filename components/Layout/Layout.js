
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import Router from 'next/router'

import { initGA, logPageView } from '../../utils/analytics'
import Header from '../Header/Header'
import Bar from '../Bar/Bar'

import styles from './Layout.module.scss'

const withLayout = Page => {
  	return class Layout extends React.Component {
		static async getInitialProps(ctx) {
			const res = await fetch('https://covid19.mathdro.id/api/countries')
			const countries = await res.json()
			
			let pageProps = {}
			
			if (Page.getInitialProps) pageProps = await Page.getInitialProps(ctx)

			return { 
				pageProps, 
				countries: countries.countries,
				countryTotal: countries.countries.length
			}
		}

		state = {
			countryCode: 'Global',
			countryName: 'Global'
		}

		handleSetCountry = value => {
			this.setState({...this.state, countryCode: value }, () => {
				this.state.countryCode !== 'Global' && this.handleSetCountryName(this.state.countryCode) 
				this.handleSetUrl(this.state.countryCode)
			})
		}

		handleSetCountryName = code => {
			const name = this.props.countries.find(country => country.iso3 === code || country.name === code).name
			this.setState({ ...this.state, countryName: name })
		}

		handleSetUrl = code => {
			const isGlobal = code === 'Global'
			const href = isGlobal ? '/' : `/c/[country]`
			const as = isGlobal ? '/' : `/c/${code}`

			Router.push(href, as, { shallow: true })
		}

		componentDidMount() {
			const routerQuery = Router.query.country
			routerQuery && this.handleSetCountry(routerQuery)

			if (process.env.NODE_ENV === 'production') {
				if (!window.GA_INITIALIZED) {
					initGA()
					window.GA_INITIALIZED = true
				}
				logPageView()
			}
		}

		render() {
			return (
				<>
				<Head>
					<title>COVID-19 Tracker</title>
					<link rel="stylesheet" href="https://bootswatch.com/4/journal/bootstrap.min.css"/>
				</Head>
				<div className={styles.page}>
					<Header />
					<main className={`${styles.main} container`}>
						<Bar country={this.state.countryCode} countries={this.props.countries} onChangeCountry={e => this.handleSetCountry(e)} />
						<Page {...this.props } country={this.state} />
					</main>
					<footer className={styles.footer}>
						<div className="container">                
							COVID-19 Tracker - <a href="https://github.com/athanph/covid19-tracker-app" target="_blank">Github</a><br/>
							2020
						</div>
					</footer>
				</div>
				<style global jsx> {`
					html, body, #__next {
						height: 100%;
						width: 100%;
					}
					.recharts-text {
						font-size: 12px;
					}
				`}</style>
				</>
			)
		}
	}
}

export default withLayout;
