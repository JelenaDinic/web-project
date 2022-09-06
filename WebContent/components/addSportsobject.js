var addSportsObjectApp = new Vue({ 
	el:'#addSportsObject',
	data: function () {
	    return {
		  name: "",
		  type: "",
		  street: "",
		  number: "",
		  city: "",
		  postalCode: 0,
	      logo: "",
		  manager: null,
		  isLoggedIn: null,
		  isManager: false,
		  isCustomer: false,
		  isAdmin: false,
		  isCoach: false,
		  allManagers: [],
	    }
	},
	template: ` 
    	<div class="registration">
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
    		<h2>KREIRAJ NOVI SPORTSKI OBJEKAT</h2>
			
			
				<div>
					<label>Naziv</label>
					<input type="text" id = "name" v-model = "name">
				</div>
				<div>
					<label>Tip objekta</label>
					<div>
						<select v-model = "type" id="type">
  							<option value="GYM">Teretana</option>
  							<option value="POOL">Bazen</option>
  							<option value="SPORT_CENTER">Sportski centar</option>
  							<option value="DANCE_STUDIO">Plesni studio</option>
  						</select>
					</div>
				</div>
				<div>
					<label>Ulica</label>
					<input type="text" id = "street" v-model = "street">
				</div>
				<div>
					<label>Broj</label>
					<input type="text" id = "number" v-model = "number">
				</div>
				<div>
					<label>Grad</label>
					<input type="text" id = "city" v-model = "city">
				</div>
				<div>
					<label>Poštanski broj</label>
					<input type="text" id = "postalCode" v-model = "postalCode">
				</div>
				<div>
					<label>Logo</label>
					<input type="text" id = "logo" v-model = "logo">
				</div>
				<div>
					<label>Menadžer</label>
					<div>
						<select v-model = "manager" id="manager">
							<option v-for="item in allManagers" :value="item">{{item.name +" "+ item.surname}}</option>
						</select>
					</div>
					<button onclick="window.location='registration.html';" v-on:click = "registerManager" class="buy-btn">Dodaj menadžera</button>
				</div>
				<div>
					<td><button type="submit" v-on:click = "registration" class="registration-btn" >KREIRAJ</button></td>
				</div>
			</table>
			<!DOCTYPE html>

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
					if(this.isLoggedIn.userType === "COACH")
						this.isCoach = true;
				}
			})
		axios.get('rest/user/freeManagers')
			.then(response => {this.allManagers = response.data})


    },
	methods: {
		registration : function(){
			let address = {street:this.street, number:this.number, city:this.city , postalCode:this.postalCode};
			let location = {longitude: 0, latitude: 0, address:address}
			axios.post('rest/sportsObject/', {
				name: this.name,
				type: this.type,
				location: location,
				logo: this.logo
			})
			.then(response => {
				alert("Uspesno ste kreirali sportski objekat!");
				window.location.href = 'sportsObjects.html';
			})
			.catch( error => {
                alert("Greska!");
            })

			axios.post('rest/user/'+ this.manager.username, {
				name: this.name,
				type: this.type,
				location: location,
				logo: this.logo
			})
		},
		registerManager : function(){
			let address = {street:this.street, number:this.number, city:this.city , postalCode:this.postalCode};
			let location = {longitude: 0, latitude: 0, address:address}
			axios.post('rest/sportsObject/', {
				name: this.name,
				type: this.type,
				location: location,
				logo: this.logo
			})
			.then(response => {
				alert("Uspesno ste kreirali sportski objekat!");
				window.location.href = 'sportsObjects.html';
			})
			.catch( error => {
                alert("Greska!");
            })
			this.$root.$emit('messageFromAddSportsObject',this.name)
		},
		logout() {
				axios.post('rest/user/logout');
				this.isLoggedIn = null;
				this.isAdmin = false;
				this.isManager = false;
				this.isCustomer = false;
				this.isCoach = false;
				window.location.href = 'sportsObjects.html';
			}
	}
});