var usersApp = new Vue({ 
	el:'#users',
	data: function () {
	    return {
			users: null,
			allUsers: [],
			searchText: "",
			sortCombo: null,
			filter1: false,
			filter2: false,
			filter3: false,
			filter4: false,
			filter5: false,
			filter6: false,
			filter7: false,
			user: null,
			isLoggedIn: null,
            isManager: false,
            isCustomer: false,
            isAdmin: false,
            isCoach: false
	    }
	},
	template: ` 
    	<div class="main-content">
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
			<div class="search">
				<label>Pretraži:</label>
				<input id = "searchText" type = "text" v-model = "searchText" v-on:input = "search">
			</div>
			<div class="sort">
				<div>
					<label>Parametar:</label>
					<select id="comboBox" v-model = "sortCombo">
					<option value="0r">Ime(rastući)</option>
					<option value="0o">Ime(opadajući)</option>
					<option value="1r">Prezime(rastući)</option>
					<option value="1o">Prezime(opadajući)</option>
					<option value="2r">Korisničko ime(rastući)</option>
					<option value="2o">Korisničko ime(opadajući)</option>
					<option value="3r">Broj sakupljenih bodova(rastući)</option>
					<option value="3o">Broj sakupljenih bodova(opadajući)</option>
					</select> 
				</div>
				<button v-on:click = "sorting">Sortiraj</button>
			</div>
			<div ref = "filter" class="filter">
				<div>
					<label>ADMIN</label><input type="checkbox" id="checkbox1" v-model="filter1">
					<label>MENADŽER</label><input type="checkbox" id="checkbox2" v-model="filter2">
					<label>TRENER</label><input type="checkbox" id="checkbox3" v-model="filter3">
					<label>KUPAC</label><input type="checkbox" id="checkbox4" v-model="filter4">
					<label>ZLATNI</label><input type="checkbox" id="checkbox5" v-model="filter5">
					<label>SREBRNI</label><input type="checkbox" id="checkbox6" v-model="filter6">
					<label>BRONZANI</label><input type="checkbox" id="checkbox7" v-model="filter7">
				</div>
				<button v-on:click = "filter">Filtriraj</button>
			</div>
    		<table class="table">
	    		<tr>
	    			<th>Ime</th>
	    			<th>Prezime</th>
                    <th>Korisničko ime</th>
                    <th>Pol</th>
                    <th>Datum rođenja</th>
                    <th>Tip korisnika</th>
                    <th>Poeni</th>
                    <th>Članarina</th>
	    		</tr>
	    			
	    		<tr v-for="(s, index) in users" :key="index">
	    			<td>{{s.name}}</td>
	    			<td>{{s.surname}}</td>
                    <td>{{s.username}}</td>
                    <td>{{s.gender}}</td>
	    			<td>{{s.dateOfBirth}}</td>
	    			<td>{{s.userType}}</td>
	    			<td>{{s.points}}</td>
	    			<td>{{s.fee}}</td>
					<td><button @click="deleteUser(s.username)" class="buy-btn" v-if="isAdmin === true">Obriši</button></td>
	    		</tr>
	    	</table>
    	</div>		  
    	`,
    mounted () {
        axios.get('rest/user/')
          .then(response => {this.users = response.data;this.allUsers = response.data})
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
    },
	methods: {
		search : function(){
			axios.get('rest/user/' + this.searchText)
			.then(response => {this.users = response.data})
		},
		sorting : function(){
			if(this.sortCombo === "0r") {
				this.users = this.users.sort(
				(a, b) => {
					return b.name.localeCompare(a.name)
				}
			)
			}
			else if(this.sortCombo === "0o") {
				this.users = this.users.sort(
				(a, b) => {
					return a.name.localeCompare(b.name)
				}
			)
			}
			else if(this.sortCombo === "1r") {
				this.users = this.users.sort(
				(a, b) => {
					return b.surname.localeCompare(a.surname)
				}
			)
			}
			
			else if(this.sortCombo === "1o") {
				this.users = this.users.sort(
				(a, b) => {
					return a.surname.localeCompare(b.surname)
				}
			)
			}
			else if(this.sortCombo === "2r") {
				this.users = this.users.sort(
				(a, b) => {
					return b.username.localeCompare(a.username)
				}
			)
			}
			else if(this.sortCombo === "2o") {
				this.users = this.users.sort(
				(a, b) => {
					return a.username.localeCompare(b.username)
				}
			)
			}
			else if(this.sortCombo === "3r") {
				this.users = this.users.sort(
				(a, b) => {
					return a.points.toString().localeCompare(b.points.toString())
				}
			)
			}
			
			else if(this.sortCombo === "3o") {
				this.users = this.users.sort(
				(a, b) => {
					return b.points.toString().localeCompare(a.points.toString())
				}
			)
			}
			
		},
		filter : function(){
			let filterdUsers = [];
			this.users = this.allUsers;
			Array.from(this.users).forEach(element => {
				if (element.userType == "ADMIN" && this.filter1 != false){
					filterdUsers.push(element);
				}
				if (element.userType == "MANAGER" && this.filter2 != false){
					filterdUsers.push(element);
				}
				if (element.userType == "COACH" && this.filter3 != false){
					filterdUsers.push(element);
				}
				if (element.userType == "CUSTOMER" && this.filter4 != false){
					filterdUsers.push(element);
				}
				if (element.userType == "CUSTOMER"  && this.filter4 == false){
					if (element.customerType.name == "GOLD" && this.filter5 != false){
						filterdUsers.push(element);
					}
					if (element.customerType.name == "SILVER" && this.filter6 != false){
						filterdUsers.push(element);
					}
					if (element.customerType.name == "BRONZE" && this.filter7 != false){
						filterdUsers.push(element);
					}
				}
			});
			if(this.filter1 == false && this.filter2 == false && this.filter3 == false && this.filter4 == false && this.filter5 == false && this.filter6 == false && this.filter7 == false){
				filterdUsers = this.allUsers;
			}
			this.users = filterdUsers;
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
			deleteUser(selected) {
				axios.get('rest/user/delete/' + selected)
					.then((response) => {
						alert("Uspjesno ste obrisali korisnika!");
						window.location.href = "users.html"
					}, error => {
						console.log(error)
					}
					)
				}
	}
});