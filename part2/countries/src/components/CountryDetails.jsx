

const CountryDetails = ( { selectedCountry } ) => {

	return (
		(selectedCountry)
			? <h2>{selectedCountry}</h2>
			: <h2>no country selected</h2>
	)
}

export default CountryDetails