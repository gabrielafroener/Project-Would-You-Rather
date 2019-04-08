import React, { Component } from 'react'
import { connect } from 'react-redux'
import Answered from './Answered'
import Unanswered from './Unanswered'
import { Nav, Button } from 'react-bootstrap'

class Dashboard extends Component {
	state = {
		answeredId: [],
		unansweredId: [],
		createdId: [],
		nav: "answered"
	}

	componentWillMount() {
		this.questionsType()
	}

	questionsType = () => { // this function defines if the question has been answered or not
		let answeredIdArray = Object.keys(this.props.user.answers)
		let unansweredIdArray = []
		let createdIdArray = this.props.user.questions
		for (let index = 0; index < this.props.questionsIds.length; index++) {
			let id = this.props.questionsIds[index]
			if (this.props.user.answers[id] !== ("optionOne")) {
				if (this.props.user.answers[id] !== ("optionTwo")) {
					unansweredIdArray.push(id)
				}
			}
		}
		this.setState({
			answeredId: answeredIdArray
		})
		this.setState({
			unansweredId: unansweredIdArray
		})
		this.setState({
			createdId: createdIdArray
		})
	}

	changeNav = (e) => {
		this.setState({
			nav: e.target.value
		})
	}

	render() {

		const { answeredId, unansweredId, createdId, nav } = this.state
		const { questionsIds } = this.props

		return (
			<div className='dashboard'>
				<div className='nav-bar'>
				<h1 className='title'>WOULD YOU RATHER</h1>
					<Nav justify variant="pills" className="flex-column" style={{"marginTop": "8em"}}>
						<Button variant="outline-primary" value="unanswered" onClick={(e) => this.changeNav(e)}>Unanswered</Button>
						<Button variant="outline-primary" value="answered" onClick={(e) => this.changeNav(e)}>Answered</Button>
						{/* <Button variant="outline-primary" value="created" onClick={(e) => this.changeNav(e)}>Created</Button> */}
						{/* <Button variant="outline-primary" value="allQuestions" onClick={(e) => this.changeNav(e)}>AllQuestions</Button> */}
					</Nav>
				</div>
				<div>
					{/* <link
						rel="stylesheet"
						href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
						integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
						crossorigin="anonymous"
					/> */}
					<div className='list-option'>
						{nav === "unanswered" && (
							<div>
								<h3 className='title'>UNANSWERED</h3>
								<Unanswered idsList={unansweredId} />
							</div>
						)}
						{nav === "answered" && (
							<div>
								<h3 className='title'>ANSWERED</h3>
								<Answered idsList={answeredId} />
							</div>
						)}
						{/* {nav === "created" && (
							<div>
								<h3 className='title'>CREATED BY YOU</h3>
								<div className='questions-list'>
									<QuestionsList idsList={createdId} />
								</div>
							</div>
						)}
						{nav === "allQuestions" && (
							<div>
								<h3 className='title'>ALL QUESTIONS</h3>
								<QuestionsList idsList={questionsIds} />
							</div>
						)} */}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }) {
	return {
		user: users[authedUser],
		questionsIds: Object.keys(questions)
			.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
	}
}

export default connect(mapStateToProps)(Dashboard);
