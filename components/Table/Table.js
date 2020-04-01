import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import useStats from '../../utils/useStats'
import ratePercent from '../../utils/ratePercent'
import formatNumber from '../../utils/formatNumber'

import styles from './Table.module.scss'

const Table = ({ country }) => {
    const [ apiUrl, setApiUrl ] = useState()
	const { stats, loading, error } = useStats(apiUrl)
	const isGlobal = country === 'Global'
	
    useEffect(() => {
		const baseURL = 'https://covid19.mathdro.id/api'
        let isMounted = true;
        if (isMounted) {
            (country !== 'Global')
                ? setApiUrl(`${baseURL}/countries/${country}/confirmed`)
                : setApiUrl(`${baseURL}/confirmed`)
        }
        return () => { isMounted = false }; 
	}, [country])
	
	if (loading) return <p>Loading table...</p>

    if (error) return <p>Something went wrong. Try again.</p>

	const handleGetCountries = () => {
		let arr = []
		stats.map(s => !arr.includes(s.countryRegion) && arr.push(s.countryRegion))

		return arr
	}

	const countriesArr = handleGetCountries()

	const handleTotalByCountry = () => {
		let totalsArr = []

		console.log(stats)

		countriesArr.map(country => {
			let confirmed = 0
			let recovered = 0
			let deaths = 0
			let active = 0
			let statesArr = []

			stats.map(s => {
				if (s.countryRegion === country) {
					confirmed += s.confirmed
					active += s.active
					recovered += s.recovered
					deaths += s.deaths

					if (s.provinceState !== null) statesArr.push(s)
				}
			})

			totalsArr.push({
				country: country,
				totalConfirmed: confirmed,
				totalActive: active,
				totalRecovered: recovered,
				totalDeaths: deaths,
				states: statesArr,
				recoveryRate: ratePercent(recovered, confirmed),
				fatalityRate: ratePercent(deaths, confirmed)
			})
		})

		const sortedArr = totalsArr.sort((a, b) => a.totalConfirmed < b.totalConfirmed)

		return sortedArr
	}

	const totalByCountry = handleTotalByCountry()


    return (	
		<div className="mt-5">
			<h2>Tally of Cases by {isGlobal ? 'Region' : 'State/Province'}</h2>
			{/* TODO: 
				Search Filter
				Sorter
			 */}
			<table className={`table table-hover ${styles.table}`}>
				<thead>
					<tr className="table-primary">
						<th scope="col">State</th>
						<th scope="col">Confirmed</th>
						<th scope="col">Active</th>
						<th scope="col">Recovered / %</th>
						<th scope="col">Deaths / %</th>
					</tr>
				</thead>
				<tbody>
					{ isGlobal && (
						totalByCountry.map((country, i) => {						
							return (
								<tr key={i} className="table-secondary">
									<th scope="row">
										{country.country}
									</th>
									<td>{ formatNumber(country.totalConfirmed) }</td>
									<td>{ formatNumber(country.totalActive) }</td>
									<td>{ formatNumber(country.totalRecovered) } <span className="badge badge-light">{ country.recoveryRate }%</span> </td>
									<td>{ formatNumber(country.totalDeaths) } <span className="badge badge-light">{ country.fatalityRate }%</span> </td>
								</tr>
							)
						})
					)}

					{ (!isGlobal && totalByCountry[0].states.length === 0) && (
						<tr className="table-secondary">
							<td colSpan="5">No data available</td>
						</tr>
					)}

					{ !isGlobal && (
						totalByCountry[0].states.map((state, i) => {
							let city = state.admin2 !== null 
								? state.admin2 !== 'Unassigned' 
									? `${state.admin2}, `
									: '(unknown)'
								: ''
							let province = state.provinceState

							return (
								<tr key={i} className="table-secondary">
									<th scope="row">
										{city} {province}
									</th>
									<td>{ formatNumber(state.confirmed) }</td>
									<td>{ formatNumber(state.active) }</td>
									<td>{ formatNumber(state.recovered) } / { state.recoveryRate }% </td>
									<td>{ formatNumber(state.deaths) } / { state.fatalityRate }%</td>
								</tr>
							)
						})
					)}
				</tbody>
			</table>
		</div>
    )
}

export default Table
