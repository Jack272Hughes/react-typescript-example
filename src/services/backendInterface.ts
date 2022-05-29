function generateRandomString(): string {
	return Math.random().toString(36).substring(2);
}

function request(): Promise<string[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const stringArray: string[] = [];
			for (let i = 0; i < 5; i++) {
				stringArray.push(generateRandomString());
			}
			resolve(stringArray);
		}, 500);
	});
}

type Subscription = (word: string) => void;

const subscriptions: Subscription[] = [];
function subscribe(subscription: Subscription) {
	subscriptions.push(subscription);
}

function unsubscribe(subscription: Subscription) {
	const index = subscriptions.findIndex((func) => func === subscription);
	if (index >= 0) subscriptions.splice(index, 1);
}

function updateSubscribers() {
	const word: string = generateRandomString();
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

export { request, subscribe, unsubscribe, startSubscription, stopSubscription };
