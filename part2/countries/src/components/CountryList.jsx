
const CountryList = ({ countries, setSelectedCountry, filter}) => {

	
	const countriesFiltered = countries.filter((country) => country.name.common.toLowerCase().includes(filter))

	return (
		<>
			{/* <h2>Country ist</h2> */}
			<table>
				<thead>
					<tr>
						<td>

						</td>
					</tr>
				</thead>
				<tbody> 
					{
						(countriesFiltered && countriesFiltered.length > 0)
							? countriesFiltered.slice(0, 10).map(country => 
							<tr key={country.name.common}>
								<td>{country.name.common}</td>
								<td><button onClick={() => setSelectedCountry(country.name.common)}>Show</button></td>
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