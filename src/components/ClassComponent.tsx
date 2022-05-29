import React, { Component } from "react";
import { request, subscribe, unsubscribe } from "../services/backendInterface";

type Props = {
	message: String;
};

type State = {
	word: string;
	items: string[];
};

class ClassComponent extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			word: "",
			items: []
		};
		this.addWord = this.addWord.bind(this);
	}

	addWord(word: string) {
		this.setState({ items: [...this.state.items, word] });
	}

	componentDidMount() {
		request().then((words) => {
			this.setState({
				items: this.state.items.concat(words)
			});
		});

		subscribe(this.addWord);
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (prevState.word !== this.state.word) {
			this.setState({
				word: this.state.word.replace(/[^a-zA-Z0-9]/g, "")
			});
		}
	}

	componentWillUnmount() {
		unsubscribe(this.addWord);
	}

	render() {
		return (
			<div>
				<h3>{this.props.message}</h3>
				<div>
					<button onClick={() => this.addWord(this.state.word)}>
						Add word
					</button>
					<input
						type="text"
						value={this.state.word}
						onChange={(event) =>
							this.setState({ word: event.target.value })
						}
					/>
				</div>
				<ul>
					{this.state.items.map((item, index) => {
						return <li key={index}>{item}</li>;
					})}
				</ul>
			</div>
		);
	}
}

export default ClassComponent;
