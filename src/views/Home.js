import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

import axios from "axios"
import secrets from '../warehouse/secrets'

const Home = (props) => {
	const [name, setName] = useState("")
	const [number, setNumber] = useState("")
	const [security, setSecurity] = useState("")
	const [expiration, setExpiration] = useState("")

	const [gradient, setGradient] = useState(`
		radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
		radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
		radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
		radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
		radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
		radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
		radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)`)

	function generateDetails() {
		console.log("Generating details...")

		axios.get('https://randomuser.me/api/').then(function (response) {
			setName(`${response.data.results[0].name.first} ${response.data.results[0].name.last}`)
		}).catch(function (error) {
			console.error(error)
		})

		const colorOptions = {
			method: 'GET',
			url: 'https://random-palette-generator.p.rapidapi.com/palette/Complementary/1/7',
			headers: {
			  'X-RapidAPI-Key': secrets.paletteApi,
			  'X-RapidAPI-Host': 'random-palette-generator.p.rapidapi.com'
			}
		};
		  
		  axios.request(colorOptions).then(function (response) {
			  let colors = response.data.data[0].palette

			  setGradient(`
				radial-gradient(at 40% 20%, ${colors[0]} 0px, transparent 50%),
				radial-gradient(at 80% 0%, ${colors[1]} 0px, transparent 50%),
				radial-gradient(at 0% 50%, ${colors[2]} 0px, transparent 50%),
				radial-gradient(at 80% 50%, ${colors[3]} 0px, transparent 50%),
				radial-gradient(at 0% 100%, ${colors[4]} 0px, transparent 50%),
				radial-gradient(at 80% 100%, ${colors[5]} 0px, transparent 50%),
				radial-gradient(at 0% 0%, ${colors[6]} 0px, transparent 50%)`)
		  }).catch(function (error) {
			  console.error(error);
		  });
	}

	return (
		<>
			<div className='padded-centered'>
				<Card name={ name } gradient={ gradient }></Card>

				<button onClick={ generateDetails }>Generate Details</button>
			</div>
		</>
	)
}

export default Home