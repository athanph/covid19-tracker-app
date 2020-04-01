
import ratePercent from '../../utils/ratePercent'
import Card from '../Card/Card'

import styles from './Overview.module.scss'

const Overview = ({stats}) => {
    const { confirmed, deaths, recovered } = stats
    const recoveryRate = ratePercent(recovered.value, confirmed.value)
	const fatalityRate = ratePercent(deaths.value, confirmed.value)

    return (
        <div className={`${styles.overview} mt-2 mb-3`}>
            <Card name="Confirmed Cases" color="primary" data={confirmed} />
            <Card name="Recovered" color="success" data={recovered} rate={recoveryRate}/>
            <Card name="Deaths" color="danger" data={deaths} rate={fatalityRate}/>
        </div>
    )
}

export default Overview
