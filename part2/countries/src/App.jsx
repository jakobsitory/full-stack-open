import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import CountryFilter from './components/CountryFilter'
import CountryDetails from './components/CountryDetails'
import countryService from './services/countryService'

// PLAN OF EXECTUTION:

// 1. Fetch data from server ✅
// 1.1. error & success handling 

// 2. Display countries as table

// 3. Introduce Filter
// 3.1. Empty state

// 4. Introduce Country Page
// 4.1. Introduce Errors (400 & 500)
// 4.2. use map & table for dynamic layout

function App() {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('')
	const [selectedCountry, setSelectedCountry] = useState('finland')
	const [countryDetails, setCountryDetails] = useState([])

	useEffect(() => {
		countryService
			.getAll()
			.then(response => {
				setCountries(response)
			})
	}, [])

	useEffect(() => {
		countryService
			.getCountry(selectedCountry)
			.then(response => {
				setCountryDetails(response)
			})
	}, [])

  return (
    <>
      <h1>Country Wiki</h1>
	  <p>Search for countries and gather insights on them</p>
	  <CountryFilter/>
	  <CountryList 
	  	countries={countries}
		setCountries={setCountries}
		filter={filter}/>
	  <CountryDetails/>
    </>
  )
}

export default App