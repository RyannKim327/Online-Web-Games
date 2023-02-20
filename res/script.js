class elements{
	constructor(data = ""){
		if(data.startsWith("#")){
			this.element = document.getElementById(data.substring(1))
		}else if(data.startsWith(".")){
			this.element = document.getElementsByClassName(data.substring(1))
		}else{
			this.element = document.getElementsByTagName(data)
		}
		return this.element
	}
	getElement(){
		return this.element
	}
}

class server{
	constructor(){
		this.username = new elements("#username")
		this.password = new elements("#password")
		console.log("Wait")
	}
	async start(){
		alert("Wait")
		let json = {
			"username": this.username.value,
			"password": this.password.value
		}
		await fetch("/login", {
			"method": "POST",
			"headers": {
				'Content-Type': 'application/json'
			},
			"body": JSON.stringify(json)
		}).then(response => {
			return response.json()
		}).then(result => {
			if(result.statusCode == 200){
				alert(result)
			}else{
				alert("Something went wrong")
				alert(JSON.stringify(result))
			}
		}).catch(error => {
			console.error(`Error [Login]: ${error}`)
		})
	}
}
new elements("#process").onclick = () => {
	alert("Hi")
	let s = new server()
	s.start()
}