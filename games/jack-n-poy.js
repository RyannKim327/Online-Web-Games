let rock = new elements("#jack-n-poy-rock")
let paper = new elements("#jack-n-poy-paper")
let scissor = new elements("#jack-n-poy-scissor")

let enemy = new elements("#enemy")

rock.onclick = () => {
	send("rock")
}

async function send(choice){
	let json = {
		choice
	}
	await fetch("server/jacknpoy", {
		"method": "POST",
		"body": JSON.stringify(json)
	}).then(response => {
		return response.json()
	}).then(result => {
		console.log(result)
	}).catch(error => {
		console.error(`Error [Fetch Server]: ${error}`)
		setTimeout(send, 1500);
	})
}