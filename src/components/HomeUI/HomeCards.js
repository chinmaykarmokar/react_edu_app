import React from 'react';
import './HomeCards.css';

const homecard = (props) => {
	return(
		<div className = "HomeCardLayout">
			<div className = "CardContent">
				<div>
					{props.children}
				</div>
			</div>
		</div>
	)
}

export default homecard;