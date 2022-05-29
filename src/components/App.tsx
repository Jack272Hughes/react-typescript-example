import React from "react";
import {
	startSubscription,
	stopSubscription
} from "../services/backendInterface";
import "../styles/App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<div>
					<button onClick={startSubscription}>
						Start Subscription
					</button>
					<button onClick={stopSubscription}>
						Stop Subscription
					</button>
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						width: "100%"
					}}>
					<p>Class Component Goes Here</p>
					<p>Hooks goes here</p>
				</div>
			</header>
		</div>
	);
}

export default App;
