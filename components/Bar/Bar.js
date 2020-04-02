import styles from './Bar.module.scss'

const Bar = ({country, countries, onChangeCountry }) => {
    
    return (
        <div className={`${styles.bar} mt-3 mb-3`}>
            <span>You are viewing: &nbsp;</span>

            <div className={styles.formGroup}>
                <select className="form-control"
                    value={country}
                    onChange={e => {
                        onChangeCountry(e.target.value);
                    }}
                >
                    <option                            
                        key='global'
                        value='Global'
                    >
                        Global
                    </option>
                    {countries.map(({name, iso3}) => (
                        <option                            
                            key={iso3 || name}
                            value={iso3}
                        >
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Bar
