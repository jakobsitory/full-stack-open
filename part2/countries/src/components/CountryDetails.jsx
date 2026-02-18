import { useEffect } from 'react'
import countryService from '../services/countryService'


const CountryDetails = ({ selectedCountry, countryDetails, setCountryDetails }) => {

  if (!countryDetails || Object.keys(countryDetails).length === 0) {
    return <h2>Loading...</h2>
  }

	console.log(selectedCountry, countryDetails)

	const country = { ...countryDetails }
	console.log('countrycopy:', country)
	console.log('currencies:', country.currencies)

		const nameOfficial = country.name.offcial
		// const nameNative = Object.entries(country.name.native)
		const currencies = Object.entries(country.currencies)
		currencies.map(el => console.log('curreny:', el.name))

	return (
		(country.length === 0)
			? <h2>no country selected</h2>
			: <table>
				{/* <table> */}
				<thead>
					<tr>
						<th><h2>{selectedCountry}</h2></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><b>Capital</b></td>
						<td>{country.capital}</td>
					</tr>
					<tr>
						<td><b>Official languages</b></td>
						<td>
							{/* {country.languages.map(lang => {lang})} */}

						</td>
					</tr>
					<tr>
						<td><b>Area</b></td>
						<td>{country.area} km<sup>2</sup></td>
					</tr>
					<tr>
						<td><b>Population</b></td>
						<td>{country.population} km<sup>2</sup></td>
					</tr>
					<tr>
						<td><b>Currencies</b></td>
						{/* {country.currencies.map(el => 
								<td>{el.name}</td>
							)} */}
					</tr>
					<tr>
						<td></td>
						<td></td>
					</tr>
				</tbody>
				<tfoot />
			</table>
	)
}

export default CountryDetails