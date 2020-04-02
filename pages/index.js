import withLayout from '../components/Layout/Layout'
import Stats from '../components/Stats/Stats'
import Table from '../components/Table/Table'
import Chart from '../components/Chart/Chart'

const Index = props => {
    const { countryCode, countryName } = props.country

    return (
        <div className="index">
            <Stats countryCode={countryCode} countryName={countryName} />

			<div className="alert alert-secondary">
				Total Countries/Regions Affected: <b>{ props.countryTotal }</b>
			</div>

            <Chart country={countryCode} />
            <Table country={countryCode} />
        </div>
    )
}

export default withLayout(Index)