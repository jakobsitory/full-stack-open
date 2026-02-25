
const FilterContacts = (props) => {

	const handleInputChange = (event) => {
		props.setFilter(event.target.value)
	}

	return (
		<>
			<label>Filter for:</label>
			<input
					placeholder='John Doe'
					onChange={handleInputChange}/>
		</>
	)
}

export default FilterContacts