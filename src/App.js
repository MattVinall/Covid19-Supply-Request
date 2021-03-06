import React, { Component } from 'react';
import Navigation from './Components/Nav';
import List from './Components/List';
import ItemDetail from './Components/itemDetail';
import { Container, Segment, Divider } from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [], // date from firestore
			itemType: [], // master list of item types
			searchTerm: '', // search text from nav
			isOpen: false,
			db: null,
			selectedItem: null,
			readError: null
		};
	}

	componentDidMount() {
		// const itemType = [];
		const db = firebase.firestore();
		this.setState({ db: db });

		db.collection('supply_items').onSnapshot(
			snapshot => {
			const data = this.state.data
			  snapshot.docChanges().forEach(change => {
				  if (change.type === "added") {
					data.unshift(change.doc.data())

				  }
			  })
			  this.setState(data);
			}
		)

	}

	updateSearchTerm = (searchTerm) => {
		this.setState({
			searchTerm
		});
	};

	selectItem = (item) => {
		this.setState({ selectedItem: item });
	};

	render() {
		const { db, data, selectedItem } = this.state;
		return (
			<div className="app-container">
				<Navigation db={db} data={data} updateSearchTerm={this.updateSearchTerm} />
				<Container>
					<Segment className="flex-container">
						<List searchTerm={this.state.searchTerm} data={data} db={db} selectItem={this.selectItem} />
						{/* <Divider vertical />
						<div className="col-lg-8">
							<ItemDetail className="col-lg-12" item={selectedItem} />
						</div> */}
					</Segment>
				</Container>
			</div>
		);
	}
}

export default App;
