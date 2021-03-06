import React, { Component } from 'react';
import { Form, Header, Grid, Segment, Container } from 'semantic-ui-react';
import FormModal from './FormModal';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// isOpen: false
		};
	}

	handleChange = (e) => {
		const { value } = e.target;
		this.props.updateSearchTerm(value);
	};

	handleClick = (e) => {
		e.preventDefault();
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen
		}));
	};

	render() {
		return (
			<Container>
				<Header as="h1" content="COVID-19 Care Package" textAlign="center" />
				<Segment>
					<Grid>
						<Grid.Row style={{ display: 'flex' }}>
							<Grid.Column width="6">
								<Form>
									<Form.Input
										id="searchTerm"
										value={this.props.searchTerm}
										onChange={this.handleChange}
										fluid
										label="Search"
										placeholder="Search Item"
									/>
								</Form>
							</Grid.Column>
							<Grid.Column width="10" textAlign="right" style={{ margin: 'auto' }}>
								<FormModal db={this.props.db} />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</Container>
		);
	}
}

export default Navigation;
