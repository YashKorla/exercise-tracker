import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateExercise extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: "",
			description: "",
			duration: 0,
			date: new Date(),
			users: [],
		};
	}

	componentDidMount() {
		axios.get("http://localhost:5000/users").then((response) => {
			if (response.data.length > 0) {
				this.setState({
					users: response.data.map((user) => user.username),
					username: response.data[0].username,
				});
			}
		});
		this.setState({
			username: this.state.users[0],
		});
		this.setState({
			users: ["Yash"],
			username: "Yash",
		});
	}

	onChangeUsername(event) {
		this.setState({ username: event.target.value });
	}

	onChangeDescription(event) {
		this.setState({ description: event.target.value });
	}

	onChangeDuration(event) {
		this.setState({ duration: event.target.value });
	}

	onChangeDate(date) {
		this.setState({ date: date });
	}

	onSubmit(event) {
		event.preventDefault();

		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date,
		};

		// alert(JSON.stringify(exercise));

		axios.post("http://localhost:5000/exercises/add", exercise).then((response) => {
			alert(JSON.stringify(response.data));
			window.location = "/";
		});
	}

	render() {
		return (
			<div className="m-3 mt-0">
				<h3>Create New Exercise Log</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<select
							ref="userInput"
							required
							className="form-control w-25"
							value={this.state.username}
							onChange={this.onChangeUsername}
						>
							{this.state.users.map((user) => {
								return (
									<option
										key={user}
										value={user}
									>
										{user}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group mt-3">
						<label>Description: </label>
						<input
							type="text"
							required
							className="form-control w-25"
							onChange={this.onChangeDescription}
						/>
					</div>
					<div className="form-group mt-3">
						<label>Duration: </label>
						<input
							type="number"
							required
							className="form-control w-25"
							onChange={this.onChangeDuration}
						/>
					</div>
					<div className="form-group mt-3">
						<label>Date: </label>
						<div>
							<DatePicker
								className="rounded border"
								selected={this.state.date}
								onChange={this.onChangeDate}
							/>
						</div>
					</div>
					<div className="form-group mt-3">
						<button className="btn btn-primary">Create Exercise Log</button>
					</div>
				</form>
			</div>
		);
	}
}
