import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: "",
		};
	}

	onChangeUsername(event) {
		this.setState({ username: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();

		const user = {
			username: this.state.username,
		};

		// alert(JSON.stringify(user));

		axios
			.post("http://localhost:5000/users/add", user)
			.then((response) => alert(response.data));

		this.setState({ username: "" });
	}

	render() {
		return (
			<div className="m-3 mt-0">
				<h3>Create New User</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<input
							type="text"
							className="form-control w-25"
							value={this.state.username}
							required
							onChange={this.onChangeUsername}
						/>
					</div>
					<div className="form-group mt-3">
						<button className="btn btn-primary">Create User</button>
					</div>
				</form>
			</div>
		);
	}
}
