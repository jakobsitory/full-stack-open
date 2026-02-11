
const FilterContacts = (props) => {

	const handleInputChange = (event) => {
		props.setFilter(event.target.value)
		// console.log('set filter to: ', event.target.value)
	}

	return (
		<form>
			<div>
				<label>Filter for:</label>
				<input
						// value={props.newContact.name}
						placeholder='John Doe'
						onChange={handleInputChange}/>
			</div>
			{/* <div>
				<button type="submit" disabled={!props.newContact.name}>add</button>
			</div> */}
      	</form>
	)
}

export default FilterContacts