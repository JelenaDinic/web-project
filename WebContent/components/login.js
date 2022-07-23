var loginApp = new Vue({ 
	el:'#login',
	data: function () {
	    return {
			username: "",
			password: "",
			isLoggedIn: false,
			isCustomer: false,
			isManager: false,
			isAdmin: false,
			isCoach: false
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
				//this.$root.$emit('isLoggedIn', 'true')
				axios.get('rest/loggedUser')
					.then((response) => {
						if(response.data.userType == 'CUSTOMER'){
							this.isCustomer = true;
						} else if(response.data.userType == 'MANAGER'){
							this.isManager = true;
						} else if(response.data.userType == 'ADMIN'){
							this.isAdmin = true;
						} else if(response.data.userType == 'COACH'){
							this.isCoach = true;
						}
						this.username = response.data.username;
						if(this.username){
							this.isLoggedIn = true;
						}
			});
				window.location.href = 'sportsObjects.html';
			})
			.catch( error => {
                alert("Pogresno korisnicko ime i/ili lozinka!");
            })
			
		}
	}
});