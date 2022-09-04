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
			tableView: []
		}
	},
	template: ` 
		<div>
			<div>
			<label v-if = "isCoach === true || isCustomer === true">Pretrazi po sportskom objektu:</label><input id = "searchText" type = "text" v-model = "searchText">
			<button v-on:click = "search">Pretrazi</button>
			<div>
				<label for="price">Maksimalna cijena: {{this.price}}</label>
				<input type="range" id="price" name="price" v-model = "price" min="0" max="3000" @change="changePrice">
			</div>
			<div>
				<label for="price">Datum prijave: </label>
				<label for="start">Od: </label>
				<input type="date" id="start" name="trip-start" v-model = "startDate" value="2018-07-22" min="2018-01-01" max="2022-09-04">
				<label for="end">Do: </label>
				<input type="date" id="end" name="trip-end" v-model = "endDate" value="2018-07-22" min="2018-01-01" max="2022-09-04" @change="dateChange">
			</div>
				<table v-if = "isCoach === false" border="1">
					<tr bgcolor="lightgrey">
						<th>Naziv</th>
						<th>Tip</th>
						<th>Sportski objekat</th>
						<th>Trajanje</th>
						<th>Trener</th>
						<th>Opis</th>
						<th>Slika</th>
					</tr>
						
					<tr v-for="(t, index) in trainingsManager">
						<td>{{t.name}}</td>
						<td>{{t.type}}</td>
						<td>{{t.sportsObject}}</td>
						<td>{{t.duration}}</td>
						<td>{{t.coach}}</td>
						<td>{{t.description}}</td>
						<td>{{t.photo}}</td>
						<td><button v-on:click = "openUpdateForm(t)">Izmeni</button></td>
					</tr>		
				</table>

				<table v-if = "isCoach === true" border="1">
				<tr bgcolor="lightgrey">
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
					<td><button @click="dismiss(t.id)">Otkazi</button></td>
				</tr>		
			</table>
		</div>
		<div>
			<button v-if = "isCoach === false" v-on:click = "openAddForm">Dodavanje novog treninga</button>
			<table v-if = "addPressed === true || updatePressed===true">
				<tr>
					<td>Naziv</td>
					<td><input type="text" id = "name" v-model = "name" required></td>
				</tr>
				<tr>
					<td>Slika</td>
					<td><input type="text" id = "photo" v-model = "photo" required></td>
				</tr>
				<tr>
					<td>Tip</td>
					<td>
						<select v-model = "type" id="type" required>
  							<option value="PERSONAL">Individualni</option>
  							<option value="GROUP">Grupni</option>
							<option value="GYM">Teretana</option>
  						</select>
					</td>
				</tr>
				<tr>
					<td>Trener</td>
					<td>
					<select v-model="coach" required>
						<option v-for="c in coaches" :value="c.username">{{c.name}} {{c.surname}}</option>
					</select>
					</td>
				</tr>
				<tr>
					<td>Trajanje</td>
					<td><input type="text" id = "duration" v-model = "duration"></td>
				</tr>
				<tr>
					<td>Opis</td>
					<td><input type="text" id = "description" v-model = "description"></td>
				</tr>
				<tr>
					<td><button type="submit" v-on:click = "add">POTVRDI</button></td>
				</tr>
			</table>
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
							}
						}
					})
			})
	},
	methods: {
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
						if (response.data.dateTime) result.push(element)
					}
				)
			});

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

		}
	}
})