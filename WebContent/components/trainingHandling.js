var trainingHandlingApp = new Vue({
	el:'#trainingHandling',
	data: function () {
	    return {
			trainings: [],
			isLoggedIn: null,
			trainingsManager: [],
			addPressed: false,
			name: "",
			photo: "",
			type: "",
			description: "",
			duration: "",
			coaches: [],
			coach: ""
	    }
	},
	template: ` 
    	<div>
			<div>
				<table border="1">
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
		    		</tr>
	    		</table>
    	</div>
		<div>
			<button v-on:click = "openAddForm">Dodavanje novog treninga</button>
			<table v-if = "addPressed === true">
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
    mounted () {
		axios.get('rest/user/all-coaches')
		.then( response => {
			this.coaches = response.data;
		})
		axios.get('rest/training/')
          .then(response => 
				{this.trainings = response.data;
				axios.get('rest/sportsObject/isLoggedIn')
			.then(response => {
				this.isLoggedIn =  response.data ? response.data : null;
				if(this.isLoggedIn != null) {
					if(this.isLoggedIn.userType === "MANAGER"){
						Array.from(this.trainings).forEach(element => {
							if (element.sportsObject === this.isLoggedIn.sportsObject){
								this.trainingsManager.push(element);
							}
						});
				}
			}
	})
				})
		
},
	methods: {
		openAddForm: function() {
			this.addPressed = true;
		},
		add : function(){
			
			axios.post('rest/training/', {
				name: this.name,
				type: this.type,
				photo: this.photo,
				sportsObject: this.isLoggedIn.sportsObject,
				coach: this.coach,
				duration: this.duration,
				description: this.description
			})
			.then(response => {
				alert("Uspesno ste se dodali novi trening!");
				window.location.href = 'trainingHandling.html';
			})
			.catch( error => {
                alert("Greska!");
            })
		}
	}
})