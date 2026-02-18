
const CountryList = ({ countriesFiltered, selectedCountry, setSelectedCountry }) => {

	if (selectedCountry)
		return null

	if (countriesFiltered.length === 0) {
		return <span><i>No country matching your query</i></span>;
	} else if (countriesFiltered.length < 10) {
		return (
			<table>
				<thead />
				<tbody> 
					{
						(countriesFiltered && countriesFiltered.length > 0)
							? countriesFiltered.slice(0, 10).map(country => 
								<tr key={country.name.common}>
									<td>{country.name.common}</td>
									<td>
										<button onClick={() => setSelectedCountry(country.name.common)}>Show</button>
									</td>
								</tr>)
							: <tr><td><i>No countries to show</i></td></tr>
					}
				</tbody>
				<tfoot />
			</table>
		)
	} else {
		return <span><i>Too many matches, specify another filter</i></span>;
	}
}

export default CountryList