

const CountryFilter = ({ setFilter }) => {

	const handleInputChange = (event) => {
		setFilter(event.target.value)
	}

	return (
		<>
			<label>find country: </label>
			<input
				placeholder='Country name'
				onChange={handleInputChange}/>
		</>
	)
}

export default CountryFilter