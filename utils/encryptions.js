module.exports = (str = "") => {
	let offset = str.length
	let result = ""
	for(let data in str){
		result += parseInt((str.charCodeAt(data) * offset), 16)
	}
	return result
}