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
				<tr><td><button type="submit" v-on:click = "login">LOG IN</button></td></tr>
			</table>
		</form>
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
				this.loggedin = true;
			})
			.catch( error => {
                alert("GRESKA");
            })
			
		}
	}
});