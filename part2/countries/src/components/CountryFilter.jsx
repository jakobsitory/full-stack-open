

const CountryFilter = ({ setFilter, setSelectedCountry }) => {

	const handleInputChange = (event) => {
		setFilter(event.target.value)
		setSelectedCountry('')
	}

	return (
		<>
			<label>Search country: </label>
			<input
				placeholder='Country name'
				onChange={handleInputChange}/>
		</>
	)
}

export default CountryFilter