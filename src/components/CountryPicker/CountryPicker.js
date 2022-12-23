import React,{ useState, useEffect} from 'react';
import { FormControl , NativeSelect } from '@mui/material';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api/index';

const CountryPicker = ({ handleCountryChange })=>{

    const [fetchedcountries, setFetchedCountries] = useState([]);

    useEffect(()=>{
        const fetchAPI = async ()=>{
            const country = await fetchCountries();
            setFetchedCountries(country);
        }
        fetchAPI();
    },[setFetchedCountries]);
    
    // console.log(fetchedcountries);

    return (
        <FormControl className={styles.container}>
            <NativeSelect defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                {fetchedcountries.map((country , i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
export default CountryPicker;