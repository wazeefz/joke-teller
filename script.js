const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
	button.disabled = !button.disabled;
}

function tellMe(joke) {
	VoiceRSS.speech({
		key: "a3d10ee012a148bea2845f538eb4c207",
		src: joke,
		hl: "en-us",
		v: "Linda",
		r: 0,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
}

async function getJokes() {
	let joke = "";
	const apiUrl =
		"https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}

		tellMe(joke);
		toggleButton();
	} catch (error) {
		console.log("fetch failed", error);
	}
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
