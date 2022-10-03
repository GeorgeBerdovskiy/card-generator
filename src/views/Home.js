import React, { useState } from 'react'
import Card from '../components/Card'

import axios from "axios"
import secrets from '../warehouse/secrets'

const gradients = [
	["#6441A5", "#2a0845"], ["#ffb347", "#ffcc33"],
	["#43cea2", "#185a9d"], ["#FFA17F", "#00223E"],
	["#360033", "#0b8793"], ["#948E99", "#2E1437"],
	["#1e130c", "#9a8478"], ["#D38312", "#A83279"],
	["#73C8A9", "#ffffff"], ["#fdfc47", "#24fe41"],
	["#83a4d4", "#b6fbff"], ["#fe8c00", "#f83600"],
	["#00c6ff", "#0072ff"], ["#70e1f5", "#ffd194"],
	["#556270", "#FF6B6B"], ["#9D50BB", "#6E48AA"],
	["#B3FFAB", "#12FFF7"], ["#AAFFA9", "#11FFBD"],
	["#F0C27B", "#4B1248"], ["#FF4E50", "#F9D423"],
	["#ADD100", "#7B920A"], ["#FBD3E9", "#BB377D"],
]

const Home = (props) => {
	const [name, setName] = useState("")
	const [number, setNumber] = useState("")
	const [security, setSecurity] = useState("")
	const [expiration, setExpiration] = useState("")
	const [gradient, setGradient] = useState("linear-gradient(to right, #fe8c00 , #f83600)")

	const [cardValue, setCardValue] = useState("")
	const [loading, setLoading] = useState([false, false])
	const [error, setError] = useState("")

	function generateDetails() {
		if (cardValue === "") {
			setError("Please select card type!")
			return
		}

		setLoading([true, true])
		
		// Generate a random name
		axios.get('https://randomuser.me/api/').then(function (response) {
			setName(`${response.data.results[0].name.first} ${response.data.results[0].name.last}`)
			setLoading([false, loading[1]])
		}).catch(function (error) {
			console.error(error)
			setLoading([false, loading[1]])
			return
		})

		const options = {
			method: 'GET',
			url: 'https://payment-card-numbers-generator.p.rapidapi.com/generate',
			params: {quantity: '1', scheme: cardValue},
			headers: {
				'X-RapidAPI-Key': secrets.cardKey,
				'X-RapidAPI-Host': 'payment-card-numbers-generator.p.rapidapi.com'
			}
		};
		
		axios.request(options).then(function (response) {
			setNumber(response.data.cards[0])
			setLoading([loading[0], false])
		}).catch(function (error) {
			console.error(error)
			setLoading([loading[0], false])
			return
		});

		// Generate a random gradient background
		let index = Math.floor(Math.random() * gradients.length)
		setGradient(`linear-gradient(to right, ${gradients[index][0]} , ${gradients[index][1]})`)

		// Generate a random expiration date
		let expiration = expirationDate(new Date(2022, 1, 1), new Date(2031, 1, 1)).toLocaleDateString('en-US', {
			month: '2-digit',
			year: '2-digit'
		})

		setExpiration(expiration)

		// Generate a random security key
		setSecurity(Math.floor(Math.random() * 899) + 100)
	}

	function expirationDate(start, end) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}

	const handleChange = (event) => {
		// This is okay because the card type is the only input here
		setCardValue(event.target.value)
		setError("")
	}

	return (
		<>
			<div className='padded-centered'>
				<Card name={ name } number={ number } expiration={ expiration } security={ security } gradient={ gradient } loading={ loading }></Card>
				
				<select name="scheme" id="scheme" className='margin-bottom-half' style={{ border: (error === "") ? "3px solid black" : "3px solid #ff6b6b" }} value={ cardValue } onChange={ handleChange }>
					<option value="">Press to Choose Card Type...</option>
					<option value="visa">Visa</option>
					<option value="mastercard">MasterCard</option>
					<option value="amex">American Express</option>
					<option value="discover">Discover</option>
				</select>

				<button className='margin-bottom-half' onClick={ generateDetails }>{ (loading[0] || loading[1]) ? "Generating..." : "Generate Details" }</button>

				{ (error !== "") && <p className='error-p' style={{ color: "#ff6b6b" }}>{ error }</p> }
			</div>
		</>
	)
}

export default Home