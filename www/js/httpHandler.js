"strict"


var Solar = {
	Server: "http://9397da7c.ngrok.io",
	Login: function(params, callback) {
		$.ajax({
			url: this.Server,
		        method: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: {
				user: 'usuario',
				pass: '12345'
			},
			success: function(response){
				alert(JSON.stringify(response));
			},
			error: function(xhr, status){
				alert('Error: '+JSON.stringify(xhr));
				alert('ErrorStatus: '+JSON.stringify(status));
			}
		});
	}


};