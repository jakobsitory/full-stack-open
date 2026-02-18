import { useEffect } from 'react'
import countryService from '../services/countryService'


const CountryDetails = ({ selectedCountry, countryDetails, setCountryDetails }) => {

  if (!countryDetails || Object.keys(countryDetails).length === 0) {
    return <h2>Loading...</h2>
  }

	// console.log(selectedCountry, countryDetails)

	const country = { ...countryDetails }
	// console.log('countrycopy:', country)
	// console.log('currencies:', country.currencies)

		const nameOfficial = country.name.official
		const nameNative = Object.values(country.name.nativeName)
		const currencies = Object.values(country.currencies)
		const languages = Object.values(country.languages)
		const flag = country.flags
		const coatOfArms = country.coatOfArms

  		// console.log(coatOfArms)
  		// console.log(nameNative)
  		// console.log(languages)
  		// console.log(currencies)
  		// console.log(nameNative)
  		// nameNative.map(el => console.log(el.official))

	return (
		(country.length === 0)
			? <h2>No country is matching search term</h2>
			: <table>
				<thead>
					<tr>
						<th colSpan="2">
							<h2>{nameOfficial}</h2>
							<p> 
								{nameNative.map(el => <span key={el.official} >{el.official} {}<br/></span>)}
							</p>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td align='center'>
							<img 
  								width="100"
								src={flag.png}
								alt={flag.alt}/>
						</td>
						<td align='center'>
							<img 
  								width="100"
								src={coatOfArms.png}
								alt={flag.alt}/>
						</td>
					</tr>
					<tr>
						<td><b>Capital</b></td>
						<td>{country.capital}</td>
					</tr>
					<tr>
						<td><b>Official languages</b></td>
						<td>
							{languages.join(' • ')}
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
						{currencies.map(el => 
								<td key={el.name}>{el.name} ({el.symbol})</td>
							)}
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