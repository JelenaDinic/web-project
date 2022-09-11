var sportObjectsApp = new Vue({
	el:'#oneObj',
	data: function () {
	    return {
			object: null,
			comments: [],
			isLoggedIn: null,
			isManager: false,
			isCustomer: false,
			isAdmin: false,
			isCoach: false,
			text: "",
			mark: null,
			trainings:[],
			generatedId: -1,
			pathString: "http://localhost:8080/WebShopREST/images/"
	    }
	},
	that: this,
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
			<h4>Osnovne informacije:</h4>
			<label>Naziv: </label>
			<label>{{object?.name}}</label><br>
			<label>Tip: </label>
			<label>{{object?.type}}</label><br>
			<label>Status: </label>
			<label>{{object?.status}}</label><br>
			<label>Prosečna ocena: </label>
			<label>{{object?.averageGrade}}</label><br>
			<label>Logo: </label><br>
			<img :src="createImagePath(object?.logo)" style="width: 150px; height: 150px; " alt="logo"><br>
			<label>Lokacija: </label>
			<label>{{object?.location.address.city}}</label>
			<button class="buy-btn" v-on:click ="showMap">Prikaži na mapi</button><br>
			<div id="map" class="map"></div>

			<h4>Treninzi:</h4>
			<table class="table">
			<tr>
				<th>Naziv</th>
				<th>Tip</th>
				<th>Sportski objekat</th>
				<th>Trajanje</th>
				<th>Trener</th>
				<th>Datum i vreme</th>
				<th></th>
			</tr>
				
			<tr v-for="(t, index) in trainings">
				<td>{{t.name}}</td>
				<td>{{t.type}}</td>
				<td>{{t.sportsObject}}</td>
				<td>{{t.duration}}</td>
				<td>{{t.coach}}</td>
				<td>{{t.dateTime}}</td>
				<td><button class="buy-btn" v-on:click = "join(t)" >PRIDRUŽI SE</button></td>
				<td><button class="buy-btn" v-on:click = "deleteTraining(t.id)" v-if="isAdmin === true">OBRIŠI</button></td>
			</tr>
		</table>

		<h4>Komentari:</h4>

			<table class="table">
				<tr>
					<th>Korisnik</th>
					<th>Tekst</th>
				</tr>
				<tr v-for="(s, index) in comments">
					<td>{{s.customer}}</td>
					<td>{{s.text}}</td>
				</tr>
		</table>

		<h5>Dodaj komentar:</h5>
		<div>
			<label>Komentar:</label>
			<input class="prettyInput" v-model = "text" type="text" name="text" id="text" required><br>
		</div>
		<div>
			<label>Ocena:</label>
			<input class="prettyInput" v-model = "mark" type="number" name="mark" id="mark" required><br>
		</div>
		<button class="buy-btn" v-on:click ="comment">Dodaj komentar</button>

    	</div>		  
    	`,
		
    mounted () {
		axios.get('rest/sportsObject/object')
			.then((response) => {
				let temp =this.object = response.data;
				axios.get('rest/training/object/' + temp.name)
				.then(response => {this.trainings = response.data})
				axios.get('rest/comment/averageMark/'+ temp.name)
				.then(response => {
					let averageMark = response.data;
					axios.put('rest/sportsObject/averageMark',{
						name : this.object.name,
						averageGrade : averageMark
					})
				})
    		}, error => {
				console.log(error) 
			}
		)
		axios.get('rest/sportsObject/isLoggedIn')
		.then(response => {
			this.isLoggedIn =  response.data ? response.data : null;
			if(this.isLoggedIn != null) {
				if(this.isLoggedIn.userType === "MANAGER"){
					this.isManager = true;
					axios.get('rest/comment/')
					.then(response => {this.comments = response.data})
				}
				if(this.isLoggedIn.userType === "CUSTOMER"){
					this.isCustomer = true;
					axios.get('rest/comment/name/'+this.object.name)
					.then(response => {this.comments = response.data})
				}
				if(this.isLoggedIn.userType === "ADMIN"){
					this.isAdmin = true;
					axios.get('rest/comment/')
					.then(response => {this.comments = response.data})
				}					
				if(this.isLoggedIn.userType === "COACH"){
					this.isCoach = true;
					axios.get('rest/comment/name/'+this.object.name)
					.then(response => {this.comments = response.data})
				}
			}
		})
		
	},

	methods: {
		createImagePath(imageName) {
			let returnValue = "http://localhost:8080/WebShopREST/images/" + imageName;
			return returnValue;
		},
		join(training) {
			if(this.isLoggedIn.userType === "CUSTOMER"){
				axios.get('rest/sportsObject/check-fee/' + this.isLoggedIn.fee)
					.then( response => 
					{
						let entries = response.data
						if(entries > -1) 
						{
							let customer = this.isLoggedIn;
							let add = true
							customer.visitedSportsObjects.forEach((item) => {
								if(item === this.object.name)
									add = false
							})
							if(add) {
								customer.visitedSportsObjects.push(this.object.name)
							}				
							axios.put('rest/user/' + customer.username, 
							{
									fee: customer.fee,
									username: customer.username,
									password: customer.password,
									name: customer.name,
									surname: customer.surname,
									gender: customer.gender,
									dateOfBirth: customer.dateOfBirth,
									userType: customer.userType,
									visitedSportsObjects: customer.visitedSportsObjects,
									points: customer.points
						
							})  
							 
							axios.put('rest/sportsObject/fee/' + customer.fee, 
							{
								usedEntries: (entries + 1)
							})
							
							axios.get('rest/trainingHistory/generate-id')
			 				.then(response => {
								this.generatedId =  response.data
								alert("Uspešno ste se pridružili treningu!")
								var today = new Date();
								var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
								axios.post('rest/trainingHistory/', 
								{
									id: this.generatedId,
									joinDate: date,
									training: training.id,
									user: this.isLoggedIn.username,
									coach: training.coach,
									deleted: false
								})
							})
									
						} 
						else 
						{
							alert("Nemate aktivnu članarinu ili nemate dovoljno preostalih termina da bi posetili ovaj trening!")
						}
					})
				
			} else 
			{
				alert("Samo kupac može da se prijavi na određeni trening!")
			}
			
		},
		comment : function(){
			let id  = 0;
			axios.get('rest/comment/generate-id')
			.then(response => {id = response.data})
			if (this.isLoggedIn.visitedSportsObjects.indexOf(this.object.name) !== -1){
				axios.post('rest/comment/', {
					id: id,
					customer:this.isLoggedIn.username,
					sportsObject:this.object.name,
					text:this.text,
					mark:this.mark,
					approved:false
				})
				.then(response => {
					alert("Uspesno ste dodali komentar!");
					window.location.reload();
				})
				.catch(error => {
					alert("Greska prilikom dodavanja komentara!");
				})
			}else{
				alert("Niste posjetili ovaj sportski objekat!");
			}
		},
		showMap:function(){
			var map = new ol.Map({
				target: 'map',
				layers: [
					new ol.layer.Tile({
						source: new ol.source.OSM()
					})
				],
				view: new ol.View({
					center: ol.proj.fromLonLat([this.object.location?.longitude,this.object.location?.latitude]),
					zoom:18
				})
			});
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
		deleteTraining(selected) {
				axios.get('rest/training/delete/' + selected)
					.then((response) => {
						alert("Uspjesno ste obrisali trening!");
						window.location.href = "sportsObjects.html"
					}, error => {
						console.log(error)
					}
					)
				}
		
	}
})