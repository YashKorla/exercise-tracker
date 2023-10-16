import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditExercise extends Component {
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
		const urlArray = window.location.href.split("/");
		const id = urlArray[urlArray.length - 1];
		axios
			.get("http://localhost:5000/exercises/" + id)
			.then((response) => {
				this.setState({
					username: response.data.username,
					description: response.data.description,
					duration: response.data.duration,
					date: new Date(response.data.date),
				});
			})
			.catch((error) => {
				console.log(error);
			});

		axios.get("http://localhost:5000/users").then((response) => {
			if (response.data.length > 0) {
				this.setState({
					users: response.data.map((user) => user.username),
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
		const urlArray = window.location.href.split("/");
		const id = urlArray[urlArray.length - 1];
		axios.post("http://localhost:5000/exercises/update/" + id, exercise).then((response) => {
			alert(JSON.stringify(response.data));
			window.location = "/";
		});
	}

	render() {
		return (
			<div className="m-3 mt-0">
				<h3>Edit Exercise Log</h3>
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
							value={this.state.description}
							className="form-control w-25"
							onChange={this.onChangeDescription}
						/>
					</div>
					<div className="form-group mt-3">
						<label>Duration: </label>
						<input
							type="number"
							required
							value={this.state.duration}
							className="form-control w-25"
							onChange={this.onChangeDuration}
						/>
					</div>
					<div className="form-group mt-3">
						<label>Date: </label>
						<div>
							<DatePicker
								className="rounded border"
								value={this.state.date}
								selected={this.state.date}
								onChange={this.onChangeDate}
							/>
						</div>
					</div>
					<div className="form-group mt-3">
						<button className="btn btn-primary">Edit Exercise Log</button>
					</div>
				</form>
			</div>
		);
	}
}
