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
                <ul>
                    <li v-if="isLoggedIn != null">
                        <a href="sportsObjects.html">Početna</a>
                    </li>
                </ul>
                <ul>
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
                    <li  v-if="isCustomer === true">
                        <a>Moji treninzi</a>
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
                    <li v-if="isCoach === true">
                        <a href="trainingHandling.html">Pregled svih treninga</a>
                    </li>
                </ul>
            </div>
    		<h3>Prikaz sportskih objekata</h3>
			<label>Pretrazi:</label><input id = "searchText" type = "text" v-model = "searchText" v-on:input = "search">
			<div>
				<label>Parametar:</label>
				<select id="comboBox" v-model = "sortCombo">
				  <option value="0a">Naziv sportskog objekta(rastuci)</option>
				  <option value="0d">Naziv sportskog objekta(opadajuci)</option>
				  <option value="1a">Lokacija(rastuci)</option>
		          <option value="1d">Lokacija(opadajuci)</option>
				  <option value="2a">Prosecna ocena(rastuci)</option>
		          <option value="2d">Prosecna ocena(opadajuci)</option>
				</select> 
				<button v-on:click = "sorting">Sortiraj</button>
			</div>
			<div ref = "filter">
				<label>TERETANA</label><input type="checkbox" id="checkbox1" v-model="filter1">
				<label>BAZEN</label><input type="checkbox" id="checkbox2" v-model="filter2">
				<label>SPORTSKI CENTAR</label><input type="checkbox" id="checkbox3" v-model="filter3">
				<label>PLESNI STUDIO</label><input type="checkbox" id="checkbox4" v-model="filter4">
				<label>OTVORENO</label><input type="checkbox" id="checkbox5" v-model="filter5">
				<button v-on:click = "filter">Filtriraj</button>
			</div>
    		<table border="1">
	    		<tr bgcolor="lightgrey">
	    			<th>Naziv</th>
	    			<th>Tip</th>
                    <th>Lokacija</th>
                    <th>Logo</th>
                    <th>Prosecna ocena objekta</th>
                    <th>Radno vrijeme</th>
	    		</tr>
	    			
	    		<tr v-for="(s, index) in sportsObjects">
	    			<td>{{s.name}}</td>
	    			<td>{{s.type}}</td>
                    <td>{{s.location.address.city}}</td>
	    			<td><img src="./missfit.png"/></td>
                    <td>{{s.averageGrade}}</td>
	    			<td>{{s.startWorkingHour}} - {{s.endWorkingHour}}</td>
					<td><button @click="details(s.name)">Prikazi</button></td>
	    		</tr>
	    	</table>
	    	<button v-if="isAdmin === true" onclick="window.location='addSportsObject.html';">Dodaj</button>
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
											points: this.points
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
			
			
			
		}
	}
});