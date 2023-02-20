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

class biskwit{
	constructor(){
	}
	setCookie(__name__, __value__){
		const date = new Date()
		date.setTime(date.getTime() + (365 * (24 * (60 * (60 * 1000)))))
		document.cookie = `${__name__}=${__value__};expires=${date.toUTCString()};path=/`}
	getCookie(__name__){
		let biskwit = document.cookie
		let decode = decodeURIComponent(biskwit)
		let xplit = decode.split(";")
		for(let x in xplit){
			let cookie = xplit[x]
			while(cookie[0] == " "){
				cookie = cookie.substring(1)
			}
			if(cookie.indexOf(__name__) == 0){
				return cookie.substring(__name__.length, cookie.length)
			}
		}
		return ""
	}
}

class server{
	constructor(){
		this.username = new elements("#username")
		this.password = new elements("#password")
		console.log("Wait")
	}
	async start(){
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
				this.cookie = new biskwit()
				this.cookie.setCookie("credentials", JSON.stringify(result))
				if(this.cookie){
					location.href = "games/"
				}
			}else{
				alert("Something went wrong")
			}
		}).catch(error => {
			console.error(`Error [Login]: ${error}`)
		})
	}
}
new elements("#process").onclick = () => {
	let s = new server()
	s.start()
}
let cookie = new biskwit()
if(cookie.getCookie("credentials")){
	location.href = "games/"
}