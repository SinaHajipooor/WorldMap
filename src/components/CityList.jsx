import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from './Spinner';
import Message from './Message'

function CityList({ cities, isLoading }) {
    // ------------- UI ---------------
    // if it is fetching the data 
    if (isLoading) return <Spinner />
    // if there isnt any city
    if (!cities.length) return <Message message='Add your first city by clicking on a city on the map' />
    return (
        <ul className={styles.CityList}>
            {cities.map(city => <CityItem city={city} key={city.id} />)}
        </ul>
    )
}

export default CityList
