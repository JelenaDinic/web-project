var accountApp = new Vue({ 
	el:'#account',
	data: function () {
	    return {
			surname: "",
			name: "",
			oldUsername: "",
			username: "",
			password: "",
			isMale: false,
			isFemale: false,
			dateOfBirth: "",
			userType: "",
			fee: "",
			visitedObjects: [],
			points: "",
			customerType: null
	    }
	},
	template: ` 
    	<div>
				<div class="container">
				    <h2>MOJ NALOG</h2>

				    <label><b>Korisničko ime</b></label><br>
				    <input v-model = "username" type="text" name="username" id="username" required><br>
				
				    <label><b>Lozinka</b></label><br>
				    <input v-model = "password" type="password" name="psw" id="psw" required><br>

					<label><b>Ime</b></label><br>
				    <input v-model = "name" type="text" name="name" id="name" required><br>

					<label><b>Prezime</b></label><br>
				    <input v-model = "surname" type="text" name="email" id="email" required><br>

					<label><b>Pol</b></label><br>
				    <input v-model = "isMale" type="radio" name="gender" value="male" checked> Muški
					<input v-model = "isFemale" type="radio" name="gender" value="female"> Ženski<br>
				
				    <label><b>Datum rođenja</b></label><br>
				    <input v-model = "dateOfBirth" type="text" name="dob" id="dob" required><br>

					<label><b>Tip korisnika</b></label><br>
				    <input v-model = "userType" type="text" name="user" id="user" disabled><br>

					<label><b>Članarina</b></label><br>
				    <input v-model = "fee" type="text" name="fee" id="fee" disabled><br>
				
				    <label><b>Posećeni objekti</b></label><br>
				    <input v-model = "visitedObjects" type="text" name="visit" id="visit" disabled><br>

					<label><b>Broj sakupljenih bodova</b></label><br>
				    <input v-model = "points" type="text" name="points" id="points" disabled><br>

					<label><b>Tip kupca</b></label><br>
				    <input v-model = "customerType" type="text" name="type" id="type" disabled><br>
				
				    <button v-on:click ="update">Sačuvaj izmene</button>
				  </div>
    	</div>		  
    	`,
    mounted () {
		axios.get('rest/sportsObject/isLoggedIn')
			.then(response => {
				if(response.data != null) {
					var user = response.data;
					this.oldUsername = user.username;
					this.username = user.username;
					this.password = user.password;
					this.name = user.name;
					this.surname = user.surname;
					if(user.gender === "MALE")
						this.isMale = true
					else
						this.isFemale = true;
					this.dateOfBirth = user.dateOfBirth;					
				}
			})
    },
	methods: {
		update : function(){
			console.log(this.oldUsername);
			console.log(this.username);
			axios.put('rest/user/' + this.oldUsername, {
				username: this.username,
				password: this.password,
				name: this.name,
				surname: this.surname,
				gender: "MALE",
				dateOfBirth: this.dateOfBirth
		})
			.then(response => {
				alert("Uspesno ste izmenili podatke!");
				this.oldUsername = this.username;
				window.location.reload();
			})
			.catch(error => {
                alert("Greska prilikom izmene podataka!");
            })
		}
		
		
	}
});