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
	      userType: "CUSTOMER",
	      isManager: false,
		  isCustomer: false,
		  isAdmin: false,
		  objectName:"",
		  sportObject:null
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
				<tr v-if="isAdmin === true">
					<td>Tip korisnika</td>
					<td>
						<select v-model = "userType" id="userType">
  							<option value="MANAGER">Menadzer</option>
  							<option value="COACH">Trener</option>
  						</select>
					</td>
				</tr>
				<tr>
					<td><button type="submit" v-on:click = "registration">REGISTRUJ SE</button></td>
				</tr>
			</table>
    	</div>		  
    	`,
    mounted () {
		axios.get('rest/sportsObject/isLoggedIn')
			.then(response => {
				this.isLoggedIn =  response.data ? response.data : null;
				if(this.isLoggedIn != null) {
					if(this.isLoggedIn.userType === "MANAGER")
						this.isManager = true;
					if(this.isLoggedIn.userType === "CUSTOMER")
						this.isCustomer = true;
					if(this.isLoggedIn.userType === "ADMIN")
						this.isAdmin = true;
				}
			})
        axios.get('rest/sportsObject/')
          .then(response => {this.sportsObjects = response.data;this.allSportsObjects = response.data})
		this.$root.$on('messageFromAddSportsObject',(text)=>{
			this.objectName = text;
		})
		axios.get('rest/sportsObject/find/'+this.objectName)
		.then(response => {this.sportObject = response.data;})
    },
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

			axios.post('rest/user/'+ this.username, {
				name:this.sportObject.name,
				type: this.sportObject.type,
				location: this.sportObject.location,
				logo: this.sportObject.logo
			})
		}
	}
});