
var re = /^(([^()[\]\\.,;:\s@“]+(\.[^()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;

function check_email(string){
	if(typeof string != 'string'){return false}
	if(!string.match(re)){return false}
	return true
}

module.exports = check_email