var loginApp = new Vue({ 
	el:'#login',
	data: function () {
	    return {
			username: "",
			password: ""
	    }
	},
	template: ` 
    	<div class="login">
			<div>Korisnicko ime <input type="text" id = "username" v-model = "username"></div>
			<div>Sifra <input type="password" id = "password" v-model = "password"></div>
			<button class="login-btn" v-on:click = "login">ULOGUJ SE</button>			
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