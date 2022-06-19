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
		<form id="forma">
			<table>
				<tr><td>Username</td><td><input type="text" id = "username" v-model = "username"></td></tr>
				<tr><td>Password</td><td><input type="password" id = "password" v-model = "password"></td></tr>
				<tr><td><input type="submit" value="Login" v-on:click = "login"></td></tr>
			</table>
		</form>
    	</div>		  
    	`,
    mounted () {
        //axios.get('rest/sportsObject/')
        //  .then(response => (this.sportsObjects = response.data))
    },
	methods: {
		login : function(){
			axios.post('rest/user/login'),{
				username: this.username,
				password: this.password
			}
			.then(response => (this.loggedin = response.data))
			if (this.loggedin){
				alert("Uspjesno ste ulogovani!");
				console.log("Uspjesno ste ulogovani!");
			}
			else{
				alert("Pogresna sifra ili korisnicko ime!");
				console.log("Pogresna sifra ili korisnicko ime!");
			}
		}
	}
});