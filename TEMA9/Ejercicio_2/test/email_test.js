
var assert  = require('assert');
var check_email = require('../utils/check_email');

describe('check_email(string)', function(){

	it('Checkea si el elemento que se pasa a la funcion es un email válido', function(){
		assert.equal(false, check_email(22) );
		assert.equal(false, check_email({name: 'Rafa', age: 30}));
		assert.equal(false, check_email('rafa'));
		assert.equal(true , check_email('correoelectronicoderafa@gmail.com'));
	});

});