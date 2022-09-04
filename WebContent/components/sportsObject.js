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
			trainings:[]
	    }
	},
	that: this,
	template: ` 
    	<div>
			<label>Naziv: </label>
			<label>{{object?.name}}</label><br>
			<label>Tip: </label>
			<label>{{object?.type}}</label><br>
			<label>Status: </label>
			<label>{{object?.status}}</label><br>
			<label>Lokacija: </label>
			<label>{{object?.location.address.city}}</label><br>
			<label>Logo: </label>
			<label>{{object?.logo}}</label><br>
			<label>Prosecna ocena: </label>
			<label>{{object?.averageGrade}}</label><br>

			<table border="1">
			<tr bgcolor="lightgrey">
				<th>Nazic</th>
				<th>Tip</th>
				<th>Sportski objekat</th>
				<th>Trajanje</th>
				<th>Trener</th>
				<th>Datum i vrijeme</th>
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
			</tr>
		</table>

			<label>Komentari: </label>

			<table border="1">
				<tr bgcolor="lightgrey">
					<th>Tekst</th>
				</tr>
				<tr v-for="(s, index) in comments">
					<td>{{s.text}}</td>
				</tr>
				<label>Dodaj komentar:</label><br>
				<label>Komentar:</label>
				<input v-model = "text" type="text" name="text" id="text" required><br>
				<label>Ocjena:</label>
				<input v-model = "mark" type="number" name="mark" id="mark" required><br>
				<button v-on:click ="comment">Dodaj komentar</button>
		</table>

    	</div>		  
    	`,
		
    mounted () {
		axios.get('rest/sportsObject/object')
			.then((response) => {
				let temp =this.object = response.data;
				axios.get('rest/training/object/' + temp.name)
				.then(response => {this.trainings = response.data})
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
		join(training) {
			if(this.isLoggedIn.userType === "CUSTOMER"){
				axios.get('rest/sportsObject/check-fee/' + this.isLoggedIn.fee)
					.then( response => {
						let fee = response.data
						if(fee !== null) {
							let customer = this.isLoggedIn;
							customer.visitedSportsObjects.push(this.object.name)
							axios.put('rest/user/' + customer.username, {
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
								.then(response => {
									axios.put('rest/sportsObject/fee/' + customer.fee, {
										usedEntries: (fee.usedEntries + 1)
									})
										.then(response => alert("Uspešno ste se pridružili treningu!"))
									
								})
						} 
						else {
							alert("Nemate aktivnu članarinu ili nemate dovoljno preostalih termina da bi posetili ovaj trening!")
						}
					})
				
			} else {
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
		}
		
	}
})