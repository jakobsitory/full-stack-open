

const CountryFilter = ({ setFilter }) => {

	const handleInputChange = (event) => {
		setFilter(event.target.value)
	}

	return (
		<>
			<label>Filter for: </label>
			<input
					placeholder='Country Name'
					onChange={handleInputChange}/>
		</>
	)
}

export default CountryFilter