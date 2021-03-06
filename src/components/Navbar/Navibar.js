// Import Modules:

import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'

// Component Definition:

class Navibar extends Component{

	state = {

	}

	render(){
		return(
			<div>
				<Navbar bg="primary" variant="dark">
					<Navbar.Brand href="#home">Navbar</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
				</Navbar>
			</div>
		)
	}
}

export default Navibar;