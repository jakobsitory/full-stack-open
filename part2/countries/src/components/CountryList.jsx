
const CountryList = ({ countries, selectCountry}) => {

	const countriesPreview = countries.slice(0, 10)

	return (
		<>
			<h2>Countrylist</h2>
			<table>
				<thead>
					<tr>
						<td>

						</td>
					</tr>
				</thead>
				<tbody> 
					{
						(countriesPreview && countriesPreview.length > 0)
							? countriesPreview.map(country => 
							<tr key={country.name.common}>
								<td>{country.name.common}</td>
								<td><button onClick={() => selectCountry(country.name.common)}>Show</button></td>
							</tr>
							)
						: <tr><td><i>No contacts to show</i></td></tr>
					}
				</tbody>
				<tfoot />
			</table>
		</>
	)
}

export default CountryList