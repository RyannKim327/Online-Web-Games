let rock = new elements("#jack-n-poy-rock")
let paper = new elements("#jack-n-poy-paper")
let scissor = new elements("#jack-n-poy-scissor")

let enemy = new elements("#enemy")
let choice = ""
let canClick = true
rock.onclick = () => {
	if(canClick){
		choice = "rock"
		send()
		canClick = false
	}
}

async function send(){
	let json = {
		choice
	}
	await fetch("server/jacknpoy", {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		},
		"body": JSON.stringify(json)
	}).then(response => {
		return response.json()
	}).then(result => {
		console.log(result)
		if(result.enemy != ""){
			switch(result.enemy){
				case "rock":
					enemy.innerHTML = '<i style="transform: rotate(90.0deg);" class="fa-solid fa-hand-back-fist"></i>'
				break
				case "paper":
					enemy.innerHTML = '<i style="transform: rotate(90.0deg);" class="fa-solid fa-hand"></i>'
				break
				case "scissor":
					enemy.innerHTML = '<i style="transform: scaleX(-1);" class="fa-solid fa-hand-scissors"></i>'
				break
				default:
					enemy.innerHTML = "No Pic"
			}
			enemy.style.display = "inline"
			setTimeout(() => {
				canClick = false
				enemy.style.display = "none"
				enemy.innerHTML = ""
				choice = ""
			}, 5000)
		}
	}).catch(error => {
		console.error(`Error [Fetch Server]: ${error}`)
		setTimeout(send, 1500);
	})
}