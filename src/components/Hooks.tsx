import { useEffect, useState } from "react";
import { request, subscribe, unsubscribe } from "../services/backendInterface";

type Props = {
	message: String;
};

function Hooks(props: Props) {
	const [word, setWord] = useState<string>("");
	const [items, setItems] = useState<string[]>([]);

	function addWord(word: string) {
		setItems((prevItems) => [...prevItems, word]);
	}

	useEffect(() => {
		request().then((words) => {
			setItems((prevItems) => prevItems.concat(words));
		});

		subscribe(addWord);

		return () => unsubscribe(addWord);
	}, []);

	useEffect(() => {
		setWord(word.replace(/[^a-zA-Z0-9]/g, ""));
	}, [word]);

	return (
		<div>
			<h3>{props.message}</h3>
			<div>
				<button onClick={() => addWord(word)}>Add word</button>
				<input
					type="text"
					value={word}
					onChange={(event) => setWord(event.target.value)}
				/>
			</div>
			<ul>
				{items.map((item, index) => {
					return <li key={index}>{item}</li>;
				})}
			</ul>
		</div>
	);
}

export default Hooks;
