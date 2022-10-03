import React, { useEffect, useState } from 'react'

const Card = (props) => {
	const [details, setDetails] = useState({})
	const [gradient, setGradient] = useState("unset");

	useEffect(() => {
        setDetails({ ...details, "name": props.name, "security": props.security, "expiration": props.expiration })
		setGradient(props.gradient)
    }, [props])

	if (details.name) {
		return (
			<>
				<div className="card margin-bottom-standard" style={{ backgroundImage: gradient }}>
					<div className='card-flex'>
						<p style={{ fontSize: "2rem" }}>8963 3874 4832 4324</p>

						<img style={{ width: "48px", height: "48px" }} src="https://99r3l.csb.app/chip.png"/>

						<p>{ details.name } <span style={{ float: "right" }}>{ details.expiration }</span></p>
					</div>
				</div>

				<div className="card margin-bottom-standard" style={{ backgroundImage: gradient }}>	
					<div className='card-flex'>
						<div className='bar'></div>
						<p style={{ textAlign: "right" }}>{ details.security }</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<></>
	)
}

export default Card