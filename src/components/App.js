import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Leaderboard from './Leaderboard'
import Answered from './Answered'
import Unanswered from './Unanswered'
import Component404 from './Component404'
import Nav from './Nav'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className='container'>
						{this.props.loading === true
							? null
							: <div>
								<Nav />
								<Route path='/' exact component={Unanswered} />
								<Route path='/question/:id' component={QuestionPage} />
								<Route path='/add' component={NewQuestion} />
								<Route path='/leaderboard' component={Leaderboard} />
								<Route path='/answered' component={Answered} />
								<Route path='/unanswered' component={Unanswered} />
								{/* <Route path='*' exact={true} component={Component404} /> */}
							</div>}
					</div>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps({ authedUser }) {
	return {
		loading: authedUser === null
	}
}

export default connect(mapStateToProps)(App)