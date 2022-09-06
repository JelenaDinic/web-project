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
			customerType: null,
			isLoggedIn:null,
			isManager:false,
			isCustomer:false,
			isAdmin:false,
			isCoach:false

	    }
	},
	template: ` 
    	<div>
				<div id="navBar">
				<ul class="nav-menu">
					<li v-if="isLoggedIn != null">
						<a href="sportsObjects.html">Početna</a>
					</li>
					<li v-if="isLoggedIn === null">
						<a href="login.html">Uloguj se</a>
					</li>
					<li v-if="isLoggedIn === null">
						<a href="registration.html">Registruj se</a>
					</li>
					<li v-if="isLoggedIn != null">
						<a>Izloguj se</a>
					</li>
					<li  v-if="isManager === true">
						<a>Moj sportski objekat</a>
					</li>
					<li v-if="isManager === true">
						<a href="trainingHandling.html">Treninzi</a>
					</li>
					<li v-if="isLoggedIn != null">
						<a href="account.html">Moj profil</a>
					</li>
					<li  v-if="isCustomer === true">
						<a href="membershipFee.html">Kupite članarinu</a>
					</li>
					<li v-if="isAdmin === true">
						<a href="users.html">Pregled svih registrovanih korisnika</a>
					</li>
					<li v-if="isAdmin === true">
						<a href="registration.html">Kreiraj menadžera/trenera</a>
					</li>
					<li v-if="isAdmin === true">
						<a href="addPromoCode.html">Definiši novi promo kod</a>
					</li>
					<li v-if="isAdmin === true">
					<a href="comments.html">Komentari</a>
					</li>
					<li v-if="isCoach === true || isCustomer === true">
						<a href="trainingHandling.html">Pregled svih treninga</a>
					</li>
				</ul>
			</div>
				<div class="registration">
				    <h2>MOJ NALOG</h2>

					<div>
						<label>Korisničko ime</label><br>
						<input v-model = "username" type="text" name="username" id="username" required><br>	
					</div>

				
					<div>
						<label>Lozinka</label><br>
						<input v-model = "password" type="password" name="psw" id="psw" required><br>
					</div>


					<div>
						<label>Ime</label><br>
						<input v-model = "name" type="text" name="name" id="name" required><br>
					</div>


					<div>
						<label>Prezime</label><br>
						<input v-model = "surname" type="text" name="email" id="email" required><br>
					</div>


					<div>
						<label>Pol</label><br>
						<input v-model = "isMale" type="radio" name="gender" value="male" checked> Muški
						<input v-model = "isFemale" type="radio" name="gender" value="female"> Ženski<br>
					</div>

				
					<div>
						<label>Datum rođenja</label><br>
				    	<input v-model = "dateOfBirth" type="text" name="dob" id="dob" required><br>
					</div>


					<div>
						<label>Tip korisnika</label><br>
				    	<input v-model = "userType" type="text" name="user" id="user" disabled><br>
					</div>


					<div>
						<label>Članarina</label><br>
						<input v-model = "fee" type="text" name="fee" id="fee" disabled><br>
					</div>

				
					<div>
						<label>Posećeni objekti</label><br>
						<input v-model = "visitedObjects" type="text" name="visit" id="visit" disabled><br>
					</div>


					<div>
						<label>Broj sakupljenih bodova</label><br>
						<input v-model = "points" type="text" name="points" id="points" disabled><br>
					</div>


					<div>
					<label>Tip kupca</label><br>
				    <input v-model = "customerType" type="text" name="type" id="type" disabled><br>
				
				    <button v-on:click ="update" class="registration-btn">Sačuvaj izmene</button>
					</div>

				  </div>
    	</div>		  
    	`,
    mounted () {
		axios.get('rest/sportsObject/isLoggedIn')
			.then(response => {
				if (response.data != null) {
					this.isLoggedIn = response.data;
					this.oldUsername = this.isLoggedIn.username;
					this.username = this.isLoggedIn.username;
					this.password = this.isLoggedIn.password;
					this.name = this.isLoggedIn.name;
					this.surname = this.isLoggedIn.surname;
					this.points = this.isLoggedIn.points;
					if (this.isLoggedIn.gender === "MALE")
						this.isMale = true
					else
						this.isFemale = true;
					this.dateOfBirth = this.isLoggedIn.dateOfBirth;
					if (this.isLoggedIn != null) {
						if (this.isLoggedIn.userType === "MANAGER")
							this.isManager = true;
						if (this.isLoggedIn.userType === "CUSTOMER") {
							this.isCustomer = true;
							axios.get('rest/sportsObject/fee-validity/' + this.isLoggedIn.fee)
								.then(response => {
									if (!response.date) {
										axios.get('rest/sportsObject/fee/' + this.isLoggedIn.username)
											.then(response => {
												this.points = response.data;
												axios.put('rest/user/' + this.isLoggedIn.username, {
													fee: this.isLoggedIn.fee,
													username: this.isLoggedIn.username,
													password: this.isLoggedIn.password,
													name: this.isLoggedIn.name,
													surname: this.isLoggedIn.surname,
													gender: this.isLoggedIn.gender,
													dateOfBirth: this.isLoggedIn.dateOfBirth,
													userType: this.isLoggedIn.userType,
													points: this.points,
													visitedSportsObjects: this.isLoggedIn.visitedSportsObjects
												});
											})
									}

								})
						}
						if (this.isLoggedIn.userType === "ADMIN")
							this.isAdmin = true;
						if (this.isLoggedIn.userType === "COACH")
							this.isCoach = true;
					}
				}
			})
    },
	methods: {
		update : function(){
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