var registrationApp = new Vue({ 
	el:'#registration',
	data: function () {
	    return {
	      surname: "",
		  name: "",
		  username: "",
		  password: "",
		  gender: null,
		  dateOfBirth: "",
	      userType: "CUSTOMER"
	    }
	},
	template: ` 
    	<div>
    		<h2>REGISTRACIJA</h2>
			
			<table>
				<tr>
					<td>Korisnicko ime</td>
					<td><input type="text" id = "username" v-model = "username"></td>
				</tr>
				<tr>
					<td>Sifra</td>
					<td><input type="password" id = "password" v-model = "password"></td>
				</tr>
				<tr>
					<td>Ime</td>
					<td><input type="text" id = "name" v-model = "name"></td>
				</tr>
				<tr>
					<td>Prezime</td>
					<td><input type="text" id = "surname" v-model = "surname"></td>
				</tr>
				<tr>
					<td>Pol</td>
					<td>
						<select v-model = "gender" id="gender">
  							<option value="MALE">Muški</option>
  							<option value="FEMALE">Ženski</option>
  						</select>
					</td>
				</tr>
				<tr>
					<td>Datum rodjenja</td>
					<td><input type="text" id = "dateOfBirth" v-model = "dateOfBirth"></td>
				</tr>
				<tr>
					<td><button type="submit" v-on:click = "registration">REGISTRUJ SE</button></td>
				</tr>
			</table>
    	</div>		  
    	`,

	methods: {
		registration : function(){
			
			axios.post('rest/user/', {
				username: this.username,
				password: this.password,
				name: this.name,
				surname: this.surname,
				gender: this.gender,
				dateOfBirth: this.dateOfBirth,
				userType: this.userType
			})
			.then(response => {
				alert("Uspesno ste se registrovali!");
				window.location.href = 'sportsObjects.html';
			})
			.catch( error => {
                alert("Greska!");
            })
		}
	}
});