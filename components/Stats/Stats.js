import { useState, useEffect } from 'react'

import useStats from '../../utils/useStats'
import Overview from '../Overview/Overview'

const Stats = ({ countryCode, countryName }) => {
    const [ apiUrl, setApiUrl ] = useState()
    const { stats, loading, error } = useStats(apiUrl)
	const baseURL = 'https://covid19.mathdro.id/api'
	const isGlobal = countryCode === 'Global'

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            (!isGlobal)
                ? setApiUrl(`${baseURL}/countries/${countryCode}`)
                : setApiUrl(baseURL)
		}
        return () => { isMounted = false }; 
    }, [countryCode])

    if (loading && apiUrl !== null) return <p>Loading data...</p>

    if (error) return <p>Something went wrong. Try again.</p>

    const lastUpdate = stats.lastUpdate.split('T')
    const lastUpdateDate = lastUpdate[0]
    const lastUpdateTime = lastUpdate[1].substring(0, lastUpdate[1].indexOf('.'))

    return (
        <div className="mt-4">
            <h1>{countryName}</h1>
            <p>Data as of {lastUpdateDate} ({lastUpdateTime})</p>
            <Overview stats={stats} />
        </div>
    )
}

export default Stats
