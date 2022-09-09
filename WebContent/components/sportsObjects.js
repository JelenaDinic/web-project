var sportsObjectsApp = new Vue({ 
	el:'#sportsObj',
	data: function () {
	    return {
	      sportsObjects: null,
		  allSportsObjects: null,
		  searchText: "",
		  sortCombo: null,
		  filterCombo: null,
		  filter1: false,
		  filter2: false,
		  filter3: false,
		  filter4: false,
		  filter5: false,
		  isLoggedIn: null,
		  isManager: false,
		  isCustomer: false,
		  isAdmin: false,
		  isCoach: false,
		  points: 0
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
                    <li v-if="isLoggedIn != null" @click="logout">
                        <a>Izloguj se</a>
                    </li>
                    <li v-if="isLoggedIn != null">
                        <a href="account.html">Moj profil</a>
                    </li>
					<li v-if="isManager === true">
                        <a href="managerView.html">Moj sportski objekat</a>
                    </li>
					<li  v-if="isCustomer === true">
                        <a href="membershipFee.html">Kupite članarinu</a>
                    </li>
                    <li v-if="isAdmin === true">
                        <a href="users.html">Korisnici</a>
                    </li>
                    <li v-if="isAdmin === true">
                        <a href="registration.html">Registruj menadzera/trenera</a>
                    </li>
					<li v-if="isAdmin === true">
                        <a href="addPromoCode.html">Definiši novi promo kod</a>
                    </li>
					<li v-if="isAdmin === true">
					<a href="comments.html">Komentari</a>
					</li>
                    <li v-if="isAdmin != true && isLoggedIn != null">
                        <a href="trainingHandling.html">Treninzi</a>
                    </li>
                </ul>
            </div>
    		
			<div class="main-content">
				<h3>Prikaz sportskih objekata</h3>
				
				<div class="search">
					<label>Pretraži:</label>
					<input id = "searchText" type = "text" v-model = "searchText" v-on:input = "search">
				</div>
				
				<div class="sort">
					<div>
						<label>Parametar:</label>
						<select id="comboBox" v-model = "sortCombo">
						  <option value="0a">Naziv sportskog objekta(rastući)</option>
						  <option value="0d">Naziv sportskog objekta(opadajući)</option>
						  <option value="1a">Lokacija(rastući)</option>
				          <option value="1d">Lokacija(opadajući)</option>
						  <option value="2a">Prosečna ocena(rastući)</option>
				          <option value="2d">Prosečna ocena(opadajući)</option>
						</select> 
					</div>
					<button v-on:click = "sorting">Sortiraj</button>
				</div>
				
				<div ref = "filter" class="filter">
					<div>
						<label>TERETANA</label><input type="checkbox" id="checkbox1" v-model="filter1">
						<label>BAZEN</label><input type="checkbox" id="checkbox2" v-model="filter2">
						<label>SPORTSKI CENTAR</label><input type="checkbox" id="checkbox3" v-model="filter3">
						<label>PLESNI STUDIO</label><input type="checkbox" id="checkbox4" v-model="filter4">
						<label>OTVORENO</label><input type="checkbox" id="checkbox5" v-model="filter5">
					</div>
					<button v-on:click = "filter">Filtriraj</button>
				</div>
				
	    		<table class="table">
		    		<tr>
		    			<th>Naziv</th>
		    			<th>Tip</th>
	                    <th>Lokacija</th>
	                    <th>Logo</th>
	                    <th>Prosečna ocena objekta</th>
	                    <th>Radno vreme</th>
		    		</tr>
		    			
		    		<tr v-for="(s, index) in sportsObjects">
		    			<td>{{s.name}}</td>
		    			<td>{{s.type}}</td>
	                    <td>{{s.location.address.city}}</td>
		    			<td><img src="http://localhost:8080/WebShopREST/images/missfit.png" alt="logo"></td>
	                    <td>{{s.averageGrade}}</td>
		    			<td>{{s.startWorkingHour}} - {{s.endWorkingHour}}</td>
						<td><button class="show-button" @click="details(s.name)">Prikaži</button></td>
						<td><button class="show-button" @click="deleteObject(s.name)" v-if="isAdmin === true">Obriši</button></td>
		    		</tr>
		    	</table>
		    	<button v-if="isAdmin === true" onclick="window.location='addSportsObject.html';"  class="buy-btn">Dodaj</button>
			</div>

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
										if(response.data === 0)
											this.points = this.isLoggedIn.points
										else 
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
    },
	methods: {
		search : function(){
			axios.get('rest/sportsObject/' + this.searchText)
			.then(response => {this.sportsObjects = response.data})
		},
		filter : function(){
			let filterdSportsObjects = [];
			this.sportsObjects = this.allSportsObjects;
			Array.from(this.sportsObjects).forEach(element => {
				if (element.type == "GYM" && this.filter1 != false){
					filterdSportsObjects.push(element);
				}
				if (element.type == "POOL" && this.filter2 != false){
					filterdSportsObjects.push(element);
				}
				if (element.type == "SPORT_CENTER" && this.filter3 != false){
					filterdSportsObjects.push(element);
				}
				if (element.type == "DANCE_STUDIO" && this.filter4 != false){
					filterdSportsObjects.push(element);
				}
			});
			if(this.filter1 == false && this.filter2 == false && this.filter3 == false && this.filter4 == false && this.filter5 == false){
				filterdSportsObjects = this.allSportsObjects;
			}
			this.sportsObjects = filterdSportsObjects;
		},
		sorting : function(){
			if(this.sortCombo === "0d") {
				this.sportsObjects = this.sportsObjects.sort(
				(a, b) => {
					
					return b.name.localeCompare(a.name)
				}
			)
			}
			
			else if(this.sortCombo === "0a") {
				this.sportsObjects = this.sportsObjects.sort(
				(a, b) => {
					return a.name.localeCompare(b.name)
				}
			)
			}
			if(this.sortCombo === "1d") {
				this.sportsObjects = this.sportsObjects.sort(
				(a, b) => {
					return b.location.address.city.localeCompare(a.location.address.city)
				}
			)
			}
			
			else if(this.sortCombo === "1a") {
				this.sportsObjects = this.sportsObjects.sort(
				(a, b) => {
					return a.location.address.city.localeCompare(b.location.address.city)
				}
			)
			}
			if(this.sortCombo === "2d") {
				this.sportsObjects = this.sportsObjects.sort(
				(a, b) => {
					return b.averageGrade.toString().localeCompare(a.averageGrade.toString())
				}
			)
			}
			
			else if(this.sortCombo === "2a") {
				this.sportsObjects = this.sportsObjects.sort(
				(a, b) => {
					return a.averageGrade.toString().localeCompare(b.averageGrade.toString())
				}
			)
			}
			
		},
		details(selected) {
			axios.get(
                'rest/sportsObject/sportsObj/' + selected
            ).then(
				response => {
					window.location.href = "sportsObject.html"
				}, error => {
					alert(error);
				}
			)	
		},
		deleteObject(selected){
			axios.get('rest/sportsObject/delete/' + selected)
			//obrisi taj so iz svih korisnika
			axios.get('rest/user/manager/'+selected
			).then(
				response => {
				}, error => {
					alert(error);
				})
				axios.get('rest/user/customer/'+selected
				).then(
					response => {
						alert("Uspjesno ste obrisali trening!");
						window.location.href = "sportsObjects.html"
					}, error => {
						alert(error);
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
			}
	}
});