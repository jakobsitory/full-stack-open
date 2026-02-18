import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import CountryFilter from './components/CountryFilter'
import CountryDetails from './components/CountryDetails'
import countryService from './services/countryService'

function App() {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')
	const [selectedCountry, setSelectedCountry] = useState()
	const [countryDetails, setCountryDetails] = useState([])
	const [fetchError, setFetchError] = useState(false)

	useEffect(() => {
		countryService
			.getAll()
			.then(response => {
				setCountries(response)
			})
			.catch(error => {
				setFetchError(true)
			})
	}, [])

	    const countriesFiltered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    useEffect(() => {
        setSelectedCountry('')
    }, [filter])

    useEffect(() => {
        if (countriesFiltered.length === 1) {
            setSelectedCountry(countriesFiltered[0].name.common)
        }
    }, [countriesFiltered])

 	return (
    <>
		<h1>Country Wiki</h1>
		{fetchError
			? <span><i>There was an error when fetching countries</i></span>
			: <>
				<CountryFilter
					setFilter={setFilter}/>
				<br/>
				<CountryList 
					countriesFiltered={countriesFiltered}
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}
					filter={filter}/>
				<CountryDetails
					selectedCountry={selectedCountry}
					countryDetails={countryDetails}
					setCountryDetails={setCountryDetails}
					/>
				</>
		}
    </>
  )
}

export default App