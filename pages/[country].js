import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import withLayout from '../components/Layout/Layout'
import Stats from '../components/Stats/Stats'
import Table from '../components/Table/Table'

const Country = props => {
    const router = useRouter()
    const [ currentCountry, setCurrentCountry ] = useState()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const { countries } = props
    const currentCountryName = countries.find(c => c.iso3 === currentCountry || c.name === currentCountry).name
    
    useEffect(() => {
        setCurrentCountry(router.query.country)
        setIsLoaded(true)
    }, [router.query.country])

    if (!isLoaded) return <p>Loading page...</p>

    return (
        <>  
			<Head>
				<title>{currentCountryName} COVID-19 Tracker</title>
			</Head>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href="/">
                        <a>&lt; back to Global Stats</a>
                    </Link>
                </li>
            </ol>

            <Stats countryCode={currentCountry} countryName={currentCountryName} />

            <Table country={currentCountry} />
        </>
    )
}

export default withLayout(Country)
