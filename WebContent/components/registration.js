var registrationApp = new Vue({ 
	el:'#registration',
	data: function () {
	    return {
	      surname: "",
		  name: ""
	    }
	},
	template: ` 
    	<div>
    		<h3>REGISTRACIJA</h3>
			
    		<form id="registration">
			<table>
				<tr><td>Ime</td><td><input type="text" id = "name" v-model = "name"></td></tr>
				<tr><td>Prezime</td><td><input type="text" id = "surname" v-model = "surname"></td></tr>
				<tr><td><button type="submit" v-on:click = "registration">LOG IN</button></td></tr>
			</table>
		</form>
    	</div>		  
    	`,

	methods: {
		registration : function(){
			axios.post('rest/user/', {
				name: this.name,
				surname: this.surname
			})
			.then(response => (window.location.href = 'login.html'))
		}
	}
});