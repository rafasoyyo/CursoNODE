function suma(a,b){
	return parseInt(a) + parseInt(b);
}
function resta(a,b){
	return parseInt(a) - parseInt(b);
}
function mult(a,b){
	return parseInt(a) * parseInt(b);
}
function div(a,b){
	return parseInt(a) / parseInt(b);
}

module.exports = {
	suma: suma,
	resta: resta,
	mult: mult,
	div: div
}