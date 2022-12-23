import React, { useState, useEffect } from 'react'

import { Cards, Charts, CountryPicker } from './components';
import { fetchData } from './api/index'
import styles from './App.module.css';
import coronaVirus from './images/image.png';

function App() {
    let [apiData, setApiData] = useState({
        confirmed : {value: ""},
        recovered : {value: ""},
        deaths : {value: ""},
        lastUpdate : ""
    });

    console.log(apiData);

    let [country , setCountry] = useState('');

    const handleCountryChange =  (async (country) => {
        let response = await fetchData(country);
        
        setApiData(response);
        
        setCountry(country);
    })


    let BackendData = async () => {
        let response = await fetchData();
        console.log(response);
        return response;
    }

    useEffect(() => {
        let fetchedData = async () => {
            
            let data = await BackendData()
            
            setApiData(data);
            
            // console.log(data);
        };
        fetchedData();
    }, []);

      console.log(apiData);

    return (
        <div className={styles.container}>
            <img className={styles.image} src={coronaVirus} alt='COVID-19'/>
            <Cards data={apiData} />
            <CountryPicker handleCountryChange={handleCountryChange}/>
            <Charts apiData={apiData} country={country} />
        </div>
    )
}
export default App;