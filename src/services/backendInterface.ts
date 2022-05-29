function generateRandomString(): String {
	return Math.random().toString(36).substring(2);
}

function request(): Promise<String[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const stringArray: String[] = [];
			for (let i = 0; i < 5; i++) {
				stringArray.push(generateRandomString());
			}
			resolve(stringArray);
		});
	});
}

type Subscription = (word: String) => void;

const subscriptions: Subscription[] = [];
function subscribe(subscription: Subscription) {
	subscriptions.push(subscription);
}

function updateSubscribers() {
	const word: String = generateRandomString();
	subscriptions.forEach((func) => func(word));
}

let intervalId: NodeJS.Timer;
let subscriptionActive = false;
function startSubscription(): void {
	if (!subscriptionActive) {
		intervalId = setInterval(updateSubscribers, 1000);
		subscriptionActive = true;
	}
}

function stopSubscription(): void {
	clearInterval(intervalId);
	subscriptionActive = false;
}

export { request, subscribe, startSubscription, stopSubscription };
