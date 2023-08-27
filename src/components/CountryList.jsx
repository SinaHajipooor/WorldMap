import CityItem from './CityItem';
import styles from './CountryList.module.css'
import Spinner from './Spinner';
import Message from './Message'
import CountryItem from './CountryItem'

function CountryList({ cities, isLoading }) {
    // ------------- UI ---------------
    // get the countries of the cities ( here we check each city's country with another city's country and then just add the unique countries into the coutries array )
    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country)) return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, [])

    // if it is fetching the data 
    if (isLoading) return <Spinner />
    // if there isnt any country
    if (!cities.length) return <Message message='Add your first city by clicking on a country on the map' />
    return (
        <ul className={styles.countriesList}>
            {countries.map(country => <CountryItem country={country} />)}
        </ul>
    )
}

export default CountryList
