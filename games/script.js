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