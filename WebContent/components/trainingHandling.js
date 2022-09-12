var trainingHandlingApp = new Vue({
	el: '#trainingHandling',
	data: function () {
		return {
			trainings: [],
			searchedTrainings: [],
			pom: [],
			isLoggedIn: null,
			isCoach: false,
			isCustomer: false,
			isAdmin:false,
			isManager:false,
			searchText: "",
			trainingsManager: [],
			addPressed: false,
			updatePressed: false,
			validDate: false,
			oldName: "",
			name: "",
			photo: "",
			sportsObject: "",
			type: "",
			description: "",
			duration: "",
			coaches: [],
			coach: "",
			list: [],
			price: 3000,
			startDate: null,
			endDate:null,
			sortCombo: null,
			filter1: false,
			filter2: false,
			filter3: false,
			filter4: false,
			filter5: false,
			filter6: false,
			filter7: false,
			tableView: [],
			mapSONames: [],
			pathString: "http://localhost:8080/WebShopREST/images/"
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
			<div v-if = "isCoach === true || isCustomer === true">
			<div class="search">
				<label >Pretrazi po sportskom objektu:</label>
				<input id = "searchText" type = "text" v-model = "searchText" v-on:input = "search">
			</div>
			<div>
				<label for="price">Maksimalna cijena: {{this.price}}</label>
				<input type="range" id="price" name="price" v-model = "price" min="0" max="3000" @change="changePrice" class="slider">
			</div>
			<div>
				<label for="price">Datum prijave: </label>
				<label for="start">Od: </label>
				<input type="date" id="start" name="trip-start" v-model = "startDate" value="2018-07-22" min="2018-01-01" max="2022-09-04">
				<label for="end">Do: </label>
				<input type="date" id="end" name="trip-end" v-model = "endDate" value="2018-07-22" min="2018-01-01" max="2022-09-04" @change="dateChange">
			</div>
			<div ref = "filter" class="filter">
				<div>
					<label>TERETANA</label><input type="checkbox" id="checkbox1" v-model="filter1">
					<label>BAZEN</label><input type="checkbox" id="checkbox2" v-model="filter2">
					<label>SPORTSKI CENTAR</label><input type="checkbox" id="checkbox3" v-model="filter3">
					<label>PLESNI STUDIO</label><input type="checkbox" id="checkbox4" v-model="filter4">
					<label>PERSONALNI</label><input type="checkbox" id="checkbox5" v-model="filter5">
					<label>GRUPNI</label><input type="checkbox" id="checkbox6" v-model="filter6">
					<label>U TERETANI</label><input type="checkbox" id="checkbox7" v-model="filter7">
				</div>
				<button v-on:click = "filter">Filtriraj</button>
			</div>
			</div>
			<div>
				<table class="table" v-if = "isManager === true">
					<tr>
						<th>Naziv</th>
						<th>Tip</th>
						<th>Sportski objekat</th>
						<th>Trajanje</th>
						<th>Trener</th>
						<th>Opis</th>
						<th>Slika</th>
					</tr>
						
					<tr v-for="(t, index) in tableView">
						<td>{{t.name}}</td>
						<td>{{t.type}}</td>
						<td>{{t.sportsObject}}</td>
						<td>{{t.duration}}</td>
						<td>{{t.coach}}</td>
						<td>{{t.description}}</td>
						<td><img :src="createImagePath(t.photo)" style="width: 250px; height: 150px; " alt="logo"></td>
						<td><button v-on:click = "openUpdateForm(t)" class="buy-btn">Izmeni</button></td>
					</tr>		
				</table>

				
				<table class="table" v-if = "isCoach === true || isCustomer === true">
				<tr>
					<th>Id</th>
					<th>Trener</th>
					<th>Korisnik</th>
					<th>Datum prijave</th>
				</tr>
					
				<tr v-for="(t, index) in tableView">
					<td>{{t.training}}</td>
					<td>{{t.coach}}</td>
					<td>{{t.user}}</td>
					<td>{{t.joinDate}}</td>
					<td v-if= "isCoach === true" ><button @click="dismiss(t.id)" class="buy-btn">Otkazi</button></td>
				</tr>		
				</table>
			</div>
		<div>
			<button v-if = "isManager === true" v-on:click = "openAddForm" class="buy-btn">Dodavanje novog treninga</button>
			<div v-if = "addPressed === true || updatePressed===true">
				<div>
					<td>Naziv</td>
					<td><input type="text" id = "name" v-model = "name" required class="prettyInput"></td>
				</div>
				<div>
					<td>Slika</td>
					<td><input type="file" id = "photo" ref= "myFile" class="prettyInput" @change="previewFiles"></td>
				</div>
				<div>
					<td>Tip</td>
					<td>
						<select v-model = "type" id="type" required>
  							<option value="PERSONAL">Individualni</option>
  							<option value="GROUP">Grupni</option>
							<option value="GYM">Teretana</option>
  						</select>
					</td>
				</div>
				<div>
					<td>Trener</td>
					<td>
						<select v-model="coach" required>
							<option v-for="c in coaches" :value="c.username">{{c.name}} {{c.surname}}</option>
						</select>
					</td>
				</div>
				<div>
					<td>Trajanje</td>
					<td><input type="number" min="0" id = "duration" v-model = "duration" class="prettyInput"></td>
				</div>
				<div>
					<td>Opis</td>
					<td><input type="text" id = "description" v-model = "description" class="prettyInput"></td>
				</div>
				<div>
					<td><button type="submit" v-on:click = "add" class="buy-btn">POTVRDI</button></td>
				</div>
			</div>
		</div>
		</div>		  
		`,
	mounted() {
		axios.get('rest/user/all-coaches')
			.then(response => {
				this.coaches = response.data;
			})
		axios.get('rest/training/')
			.then(response => {
				this.trainings = response.data;
				axios.get('rest/sportsObject/isLoggedIn')
					.then(response => {
						this.isLoggedIn = response.data ? response.data : null;
						this.sportsObject = this.isLoggedIn.sportsObject;
						if (this.isLoggedIn != null) {
							if (this.isLoggedIn.userType === "MANAGER") {
								this.isManager = true;
								Array.from(this.trainings).forEach(element => {
									if (element.sportsObject === this.isLoggedIn.sportsObject) {
										this.trainingsManager.push(element);
									}

								});
								this.tableView = this.trainingsManager;
							}
							else if (this.isLoggedIn.userType === "COACH") {
								this.isCoach = true;
								axios.get('rest/trainingHistory/' + this.isLoggedIn.username)
									.then(response => { this.trainingsManager = response.data; this.pom = this.trainingsManager; })
									.then(() => { this.tableView = this.trainingsManager })
							}
							else if (this.isLoggedIn.userType === "CUSTOMER") {
								this.isCustomer = true;
								axios.get('rest/trainingHistory/customer/' + this.isLoggedIn.username)
									.then(response => { this.trainingsManager = response.data; this.pom = this.trainingsManager; })
									.then(() => { this.tableView = this.trainingsManager })
							}
							else if (this.isLoggedIn.userType === "ADMIN") {
								this.isAdmin = true;
							}
						}
					})
			})
	},
	methods: {
		createImagePath(imageName) {
			let returnValue = "http://localhost:8080/WebShopREST/images/" + imageName;
			return returnValue;
		},
		openAddForm: function () {
			this.addPressed = true;
			this.updatePressed = false;
			this.name = "";
			this.photo = "";
			this.type = "";
			this.coach = "",
			this.description = "";
			this.duration = "";

		},
		dateChange: function(){
			console.log("Start date: ",this.startDate, "End date: ",this.endDate)

			const result = [];
			var dateFrom = this.startDate;
			var dateTo = this.endDate;

			var d1 = dateFrom.split("-");
			var d2 = dateTo.split("-");

			this.trainingsManager.forEach(element => {

				var dateCheck = element.joinDate;
				var c = dateCheck.split("-");
				var from = new Date(d1);  // -1 because months are from 0 to 11
				var to   = new Date(d2);
				var check = new Date(c);
				
				if (check > from && check < to){
					result.push(element)
				}
			});

			this.tableView = result;
		},
		search: function () {

			const result = [];

			this.trainingsManager.forEach(element => {

				axios.get('rest/training/id/' + element.training).then(
					(response) => {
						if (response.data.sportsObject.includes(this.searchText)) result.push(element)
					}
				)
			});

			this.tableView = result;

		},
		filter : function(){

			var result = [];
			let ovaj = this;
			this.trainingsManager.forEach(element => {

				axios.get('rest/training/id/' + element.training).then(
					(response) => {
						if (response.data.type == "PERSONAL" && this.filter5 != false)  result.push(element);
						if (response.data.type == "GROUP" && this.filter6 != false)  result.push(element)
						if (response.data.type == "GYM" && this.filter7 != false)  result.push(element)
						axios.get('rest/sportsObject/find/' + response.data.sportsObject).then(
							(response) => {
								if (response.data.type == "GYM" && this.filter1 != false)  result.push(element)
								if (response.data.type == "POOL" && this.filter2 != false)  result.push(element)
								if (response.data.type == "SPORT_CENTER" && this.filter3 != false)  result.push(element)
								if (response.data.type == "DANCE_STUDIO" && this.filter4 != false)  result.push(element)
							}
						)
					}
				)
			});

			if(this.filter1 == false && this.filter2 == false && this.filter3 == false && this.filter4 == false && this.filter5 == false  && this.filter6 == false  && this.filter7 == false){
				result = this.trainingsManager;
			}
			this.tableView = result;
		},
		dismiss(selected) {
			axios.get('rest/training/validate/' + selected)
				.then((response) => {
					this.validDate = response.data
				}, error => {
					console.log(error)
				}
				)
			if (this.sportsObject.type == "PERSONAL"){
				if (this.validDate == true) {
					axios.get(
						'rest/trainingHistory/delete/' + selected
					).then(
						response => {
							alert("Uspjesno ste otkazali trening");
							window.location.href = "trainingHandling.html"
						}, error => {
							alert(error);
						}
					)
				} else {
					alert("Trening mozete otkazati najkasnije dva dana ranije!");
				}
			}else{
				alert("Mozete otkazati samo personalne treninge!");
			}

		},
		changePrice(){
			const result = [];

			this.trainingsManager.forEach(element => {

				axios.get('rest/training/id/' + element.training).then(
					(response) => {
						if (response.data.price <= this.price) result.push(element)
					}
				)
			});

			this.tableView = result;
		},
		openUpdateForm(selected) {
			this.updatePressed = true;
			this.addPressed = false;
			this.oldName = selected.name;
			this.name = selected.name;
			this.photo = selected.photo;
			this.type = selected.type;
			this.coach = selected.coach;
			this.description = selected.description;
			this.duration = selected.duration;
		},
		previewFiles() {
			this.photo = this.$refs.myFile.files[0].name
		},
		add: function () {
			if (this.addPressed === true) {
				axios.post('rest/training/', {
					name: this.name,
					type: this.type,
					photo: this.photo,
					sportsObject: this.sportsObject,
					coach: this.coach,
					duration: this.duration,
					description: this.description
				})
					.then(response => {
						alert("Uspesno ste se dodali novi trening!");
						window.location.href = 'trainingHandling.html';
					})
					.catch(error => {
						alert("Greska prilikom dodavanja treninga!");
					})
			} else {
				axios.put('rest/training/' + this.oldName, {
					name: this.name,
					type: this.type,
					photo: this.photo,
					sportsObject: this.sportsObject,
					coach: this.coach,
					duration: this.duration,
					description: this.description
				})
					.then(response => {
						alert("Uspesno ste izmenili trening!");
						window.location.reload();
					})
					.catch(error => {
						alert("Greska prilikom izmene treninga!");
					})
			}

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
})