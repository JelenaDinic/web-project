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
			<div>Korisničko ime <input type="text" id = "username" v-model = "username" required></div>
			<div>Šifra <input type="password" id = "password" v-model = "password"></div>
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
			let username = this.username;
			//axios.get('rest/user/validate-username/' + username)
			//.then(response => {
			//	if (response.data == false){
			//		alert("Korisnicko ime vec postoji u sistemu!");
			//	}else{
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
			//})
			
		//}
	}
});