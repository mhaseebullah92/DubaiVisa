import React, { useEffect, useState } from "react";
import './countrySearchBar.css';
import { GrLocation } from "react-icons/gr";

// const countries = [
//     'Afghanistan',
//     'Albania',
//     'Algeria',
//     'Afghanistan',
//     'Albania',
//     'Algeria',
//     'Afghanistan',
//     'Albania',
//     'Algeria',
//     'Afghanistan',
//     'Albania',
//     'Algeria',
//     'Afghanistan',
//     'Albania',
//     'Algeria',
//     'Afghanistan',
//     'Albania',
//     'Algeria',
//     // ... (add more country names)
// ];
const CountrySearchBar = ({setCountry}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [countries, setCountries]= useState([]);
    const [loadingcountries, setloadingcountries]= useState(true);
    // const [searchPlaceholder, setSearchPlaceHolder] = useState([])

    useEffect(() => {
        getData();
        setloadingcountries(false);
    }, []);

    const getData = async () => {
        try {
            const response = await fetch('api/countries/all-active-countryname');
            if(response.ok){
                const data = await response.json();
                setCountries(data);
            }else{
                console.log('error while fetching country list');
            }

            
        } catch (e) {
            console.log(e)
        }
    }
    const handleInputChange = (event) => {
        setCountry('');
        const inputValue = event.target.value;
        setSearchTerm(inputValue);
        if(inputValue ===''){
            setFilteredCountries([]);
        }else{

        // Filter countries based on the input value
        const filtered = countries.filter((country) =>
            country.toLowerCase().includes(inputValue.toLowerCase())
        );

        setFilteredCountries(filtered);
        }
    };

    const handleSelectCountry = (country) => {
        setSearchTerm(country);
        setCountry(country);
        setFilteredCountries([]);
        // You can use 'country' as needed, for now, I'm setting it as a placeholder
    };
    return (
        <section className="secSearch">
            {/* <div className="secSearch"> */}
                <div className="searchDiv grid">
                    <div className="locationInput">
                        <div className="input flex">
                            <input type="text" placeholder="Enter Your Locations here....."
                                value={searchTerm}
                                onChange={handleInputChange}
                                disabled={loadingcountries}
                            />
                            <GrLocation className="icon" />
                        </div>
                        
                    </div>
                    {filteredCountries.length > 0 && (
                        <div className="country-list">
                        {filteredCountries.map((country, index) => (
                            <div key={index} onClick={() => handleSelectCountry(country)}>
                            {country}
                            </div>
                        ))}
                        </div>
                    )}
                    {/* <div className="filteredItems">
                    {filteredCountries.length > 0 && (
                            <ul>
                                {filteredCountries.map((country, index) => (
                                    <li className="filteredItem" key={index} onClick={() => handleSelectCountry(country)}>
                                        {country}
                                    </li>
                                ))}
                            </ul>
                        )}
                        </div> */}
                </div>
            {/* </div> */}
        </section>
    )
}

export default CountrySearchBar;