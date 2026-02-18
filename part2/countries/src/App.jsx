import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import CountryFilter from './components/CountryFilter'
import CountryDetails from './components/CountryDetails'
import countryService from './services/countryService'

// PLAN OF EXECTUTION:

// 1. Fetch data from server ✅
// 1.1. error & success handling  ✅

// 2. Display countries as table ✅

// 3. Introduce Filter ✅
// 3.1. Empty state ✅

// 4. Introduce Country Page✅
// 4.1. Introduce Errors (400 & 500) ✅
// 4.2. use map & table for dynamic layout✅

function App() {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')
	const [selectedCountry, setSelectedCountry] = useState()
	const [countryDetails, setCountryDetails] = useState([])

	useEffect(() => {
		countryService
			.getAll()
			.then(response => {
				setCountries(response)
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
		<CountryFilter
			setFilter={setFilter}/>
		<br/>
		<CountryList 
			countriesFiltered={countriesFiltered}
			selectedCountry={selectedCountry}
			setSelectedCountry={setSelectedCountry}/>
			{/* setCountries={setCountries}
			filter={filter} */}
		<CountryDetails
			selectedCountry={selectedCountry}
			countryDetails={countryDetails}
			setCountryDetails={setCountryDetails}
			/>
    </>
  )
}

export default App