var promoCodeApp = new Vue({ 
	el:'#promoCode',
	data: function () {
	    return {
			code: "",
			date: "",
			uses: "",
			discount: "",
			isLoggedIn: null,
			isManager: false,
			isCustomer: false,
			isAdmin: false,
			isCoach: false,
			promoCodes:[]
	    }
	},
	template: ` 
    	<div class="promo-code">
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
				<li v-if="isLoggedIn != null" @click="logout">
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
					<a href="registration.html">Kreiraj menadzera/trenera</a>
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
    		<h2>DEFINIŠI NOVI PROMO KOD</h2>
			
			<table class="promo-code-table">
				<tr>
					<td>Kod</td>
					<td><input class="membership-input" style="font-size: 20px; width: 200px" type="text" id = "code" v-model = "code"></td>
				</tr>
				<tr>
					<td>Datum važenja</td>
					<td><input class="membership-input" style="font-size: 20px; width: 200px"  type="date" id = "date" v-model = "date"></td>
				</tr>
				<tr>
					<td>Broj upotrebi</td>
					<td><input class="membership-input" style="font-size: 20px; width: 200px" type="number" id = "uses" v-model = "uses"></td>
				</tr>
				<tr>
					<td>Procenat umanjenja iznosa</td>
					<td><input class="membership-input" style="font-size: 20px; width: 200px" type="number" id = "discount" v-model = "discount"></td>
				</tr>
				<tr>
					<td></td>
					<td><button type="submit" v-on:click = "addPromoCode">KREIRAJ</button></td>
				</tr>
			</table>

			<table class="table">
			<tr>
				<th>Kod</th>
				<th>Datum isteka</th>
				<th>Popust</th>
			</tr>
				
			<tr v-for="(t, index) in promoCodes">
				<td>{{t.code}}</td>
				<td>{{t.expirationDate}}</td>
				<td>{{t.discount}}</td>
				<td><button @click="dismiss(t.code)" class="buy-btn">Odbaci</button></td>
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
						if(this.isLoggedIn.userType === "CUSTOMER") {
							this.isCustomer = true;
							axios.get('rest/sportsObject/fee-validity/' + this.isLoggedIn.fee)
								.then(response => {
									if(!response.date) {
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
						if(this.isLoggedIn.userType === "ADMIN")
							this.isAdmin = true;
						if(this.isLoggedIn.userType === "COACH")
							this.isCoach = true;
					}
				})
			axios.get('rest/sportsObject/')
			  .then(response => {this.sportsObjects = response.data;
								 this.allSportsObjects = response.data})
			axios.get('rest/promoCode/')
				.then(response => {this.promoCodes = response.data})
		},
	methods: {
		addPromoCode : function(){
			console.log(this.date)
			axios.post('rest/promoCode/', {
				code: this.code,
				expirationDate: this.date,
				usesLeft: this.uses,
				discount: this.discount
			})
			.then(response => {
				alert("Uspesno ste kreirali novi promo kod!");
				window.location.href = 'addPromoCode.html';
			})
			.catch( error => {
                alert("Greska!");
            })
		},
		logout() {
				axios.post('rest/user/logout');
				this.isLoggedIn = null;
				this.isAdmin = false;
				this.isManager = false;
				this.isCustomer = false;
				this.isCoach = false;
				window.location.href = 'sportsObjects.html';
			},
		dismiss(selected){
                axios.get(
                    'rest/promoCode/delete/' + selected
                ).then(
                    response => {
                        window.location.href = "addPromoCode.html"
                    }, error => {
                        alert(error);
                    }
                )   
            },
	}
});