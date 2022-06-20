var loginApp = new Vue({ 
	el:'#login',
	data: function () {
	    return {
			username: "",
			password: "",
			loggedin: false
	    }
	},
	template: ` 
    	<div>
			<table>
				<tr><td>Username</td><td><input type="text" id = "username" v-model = "username"></td></tr>
				<tr><td>Password</td><td><input type="password" id = "password" v-model = "password"></td></tr>
				<tr><td><button v-on:click = "login">ULOGUJ SE</button></td></tr>
			</table>
    	</div>		  
    	`,
    mounted () {
        if(this.loggedin) {
			window.location.href = 'sportsObjects.html';
		}
    },
	methods: {
		login : function(){
			axios.post('rest/user/login',{
				username: this.username,
				password: this.password
			})
			.then(response => {
				alert("Uspesno ste se ulogovali!");
				window.location.href = 'sportsObjects.html';
			})
			.catch( error => {
                alert("Pogresno korisnicko ime i/ili lozinka!");
            })
			
		}
	}
});