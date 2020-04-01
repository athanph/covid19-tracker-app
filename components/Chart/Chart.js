import { useState, useEffect } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

import useStats from '../../utils/useStats'

const Chart = ({ country }) => {
    const [ apiUrl, setApiUrl ] = useState()
    const { stats, loading, error } = useStats(apiUrl)
    const baseURL = 'https://covid19.mathdro.id/api'

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            (country !== 'Global')
                ? setApiUrl(`${baseURL}/countries/${country}`)
                : setApiUrl(`${baseURL}/daily`)
        }
        return () => { isMounted = false }; 
    }, [country])

    if (loading && apiUrl !== null) return <p>Loading chart...</p>

    if (error) return <p>Something went wrong. Try again.</p>

    return (
		<div className="mt-5">
			<h2>Global Daily Cases Trend</h2>
			<div style={{ width: '100%', height: 500 }}>
				<ResponsiveContainer>
					<AreaChart
						data={stats}
						margin={{
							top: 50, right: 30, left: 0, bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="reportDate" />
						<YAxis />
						<Tooltip />
						<Area type="monotone" dataKey="confirmed.total" stackId="1" stroke="#EB6864" fill="#EB6864" />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
    )
}

export default Chart
