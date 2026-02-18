import { useState } from 'react'
import CountryList from './components/CountryList'
import CountryFilter from './components/CountryFilter'
import CountryDetails from './components/CountryDetails'

// PLAN OF EXECTUTION:

// 1. Fetch data from server
// 1.1. error & success handling

// 2. Display countries as table

// 3. Introduce Filter
// 3.1. Empty state

// 4. Introduce Country Page
// 4.1. Introduce Errors (400 & 500)
// 4.2. use map & table for dynamic layout

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Country Wiki</h1>
	  <p>Search for countries and gather insights on them</p>
	  <CountryFilter/>
	  <CountryList/>
	  <CountryDetails/>
    </>
  )
}

export default App