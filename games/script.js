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
		console.log("Initiating Server...")
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

async function checkUser(){
	let cookie = new biskwit()
	let str = cookie.getCookie("credentials")
	if(str == "=" || str == ""){
		location.href = "/.."
	}
	try{
		let user = JSON.parse(str.substring(1))
		console.log(user)
		await fetch(`/checkCredentials?user=${user.username}`).then(async response => {
			let data = await response.json()
			console.log(data)
			if(data.isExists){
				cookie.setCookie("credentials", "")
				location.href = "/.."
			}
		}).catch(error => {
			setTimeout(checkUser, 1500)
		})
	}catch(error){
		console.log(error)
		setTimeout(checkUser, 5000);
	}
}

window.onload = async () => {
	await checkUser()
}