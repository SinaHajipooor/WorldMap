// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from './Message'
import Spinner from './Spinner'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

// helper method to get the coutries emoji
export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

// base url 
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';


function Form() {
    // states
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false)
    const [geoCodingError, setGeoCodingError] = useState('')
    const { createCity, isLoading } = useCities();
    const navigate = useNavigate()

    // lifecycle
    useEffect(function () {
        if (!lat && !lng) return;

        async function fetchCityData() {
            try {
                setIsLoadingGeoCoding(true);
                setGeoCodingError('')
                const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await response.json();

                if (!data.countryCode) throw new Error("That doesnt seem to be a city. click some where else")

                setCityName(data.city || data.locality || '');
                setCountry(data.countryName);
            } catch (err) {
                setGeoCodingError(err.message);
            } finally {
                setIsLoadingGeoCoding(false);
            }
        }
        fetchCityData();
    }, [lat, lng])
    // handle the submit event of the form
    async function handleSubmit(e) {
        // not refresh
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = { cityName, country, emoji: '', date, notes, position: { lat: 40.46635901755316, lng: 40.46635901755316 } };

        await createCity(newCity);

        navigate('/app/cities')
    }
    // loading ui 
    if (isLoadingGeoCoding) return <Spinner />
    // not displaying the form if there isnt any lat or lng 
    //     if (!lat && !lng) return <Message message='Start by clicking some where on the map' />
    // error ui 
    if (geoCodingError) return <Message message={geoCodingError} />
    // default ui
    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker onChange={date => setDate(date)} selected={date} dateFormat='dd/MM/yyyy' />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type='primary'>Add</Button>

                <BackButton />


            </div>
        </form>
    );
}

export default Form;
