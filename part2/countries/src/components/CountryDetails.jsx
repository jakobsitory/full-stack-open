import { useState, useEffect } from 'react'
import countryService from '../services/countryService'


const CountryDetails = ({ selectedCountry, countryDetails, setCountryDetails }) => {
	const [fetchError, setFetchError] = useState(false)

	useEffect(() => {
        if (!selectedCountry) {
            setCountryDetails(null)
            setFetchError(false)
            return
        }

		setFetchError(false)

		countryService
			.getCountry(selectedCountry)
			.then(response => {
				setCountryDetails(response)
			})
			.catch((error) => {
				console.error(`Failed to fetch ${selectedCountry}:`, error)
				setFetchError(true)
			})
	}, [selectedCountry, setCountryDetails])

	if (fetchError)
		return <p>There was an error when fetching the details for {selectedCountry}</p>

	if (!countryDetails || Object.keys(countryDetails).length === 0) {
		return 
	}


	const country = { ...countryDetails }
	const nameOfficial = country.name.official
	const nameNative = Object.values(country.name.nativeName)
	const currencies = Object.values(country.currencies)
	const languages = Object.values(country.languages)
	const flag = country.flags
	const coatOfArms = country.coatOfArms

	return (
		<table>
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
					<td>{country.population}</td>
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