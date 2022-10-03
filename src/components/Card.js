import React, { useEffect, useState } from 'react'

const Card = (props) => {
	const [details, setDetails] = useState({})
	const [gradient, setGradient] = useState("unset");

	useEffect(() => {
        setDetails({ ...details, "name": props.name, "number": props.number, "security": props.security, "expiration": props.expiration })
		setGradient(props.gradient)
    }, [props])

	if (details.name && (!props.loading[0] && !props.loading[1])) {
		return (
			<>
				<div className="card margin-bottom-standard" style={{ backgroundImage: gradient }}>
					<div className='card-flex'>
						<p style={{ fontSize: "2rem" }}>{ details.number }</p>

						<img style={{ width: "48px", height: "48px" }} src="https://99r3l.csb.app/chip.png" alt='[]'/>

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
	} else if (props.loading[0] || props.loading[1]) {
		return (
			<>
				<div className="card margin-bottom-standard" style={{ backgroundColor: "#dfe6e9" }}>
					<div className='card-flex'>
					</div>
				</div>

				<div className="card margin-bottom-standard" style={{ backgroundColor: "#dfe6e9" }}>	
					<div className='card-flex'>
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