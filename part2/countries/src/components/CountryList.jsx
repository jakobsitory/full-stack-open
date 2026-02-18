
const CountryList = ({ countries, selectedCountry, setSelectedCountry, filter}) => {

	// if (selectedCountry)
	// 	return

	const countriesFiltered = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

	switch (countriesFiltered.length) {
		case 0:
			return <span><i>No country matching your query</i></span>
		case 1:
			setSelectedCountry(countriesFiltered[0].name.common)
			return;
		// case 11:
		// default:
		// 	console.log('case 3')
		// 	break;
	}


	return (
		<table>
			<thead />
			<tbody> 
				{
					(countriesFiltered && countriesFiltered.length > 0)
						? countriesFiltered.slice(0, 10).map(country => 
							<tr key={country.name.common}>
								<td>{country.name.common}</td>
								<td><button onClick={() => setSelectedCountry(country.name.common)}>Show</button></td>
							</tr>)
						: <tr><td><i>No countries to show</i></td></tr>
				}
			</tbody>
			<tfoot />
		</table>
	)
}

export default CountryList