import React, { useEffect, useState } from 'react'

const Card = (props) => {
	const [details, setDetails] = useState({})

	const [gradient, setGradient] = useState("unset");

	useEffect(() => {
        setDetails({ ...details, "name": props.name })
		setGradient(props.gradient)
    }, [props])

	return (
		<div className="card" style={{ backgroundImage: gradient }}>
			{ details && <div className='card-flex'>
				<p>8963 3874 4832 4324</p>
				<p>{ details.name }</p>
			</div> }
		</div>
	)
}

export default Card