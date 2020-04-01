import styles from './Card.module.scss'
import formatNumber from '../../utils/formatNumber'

const Card = ({ name, data, color, rate }) => {
    return (
        <div className={`${styles.card} card text-white bg-${color}`}>
            <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <p className={`card-text ${styles.number}`}>{formatNumber(data.value)}</p>
                {name !== 'Confirmed Cases' &&
                    <p className={styles.rate}>
                        <span>{name === 'Recovered' && 'Recovery '}
                        {name === 'Deaths' && 'Fatality ' }
                        rate:
                        </span>{' '}
                        <span>{ rate }%</span>
                    </p>
                }
            </div>
        </div>
    )
}

export default Card
