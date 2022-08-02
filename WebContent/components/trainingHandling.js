var trainingHandlingApp = new Vue({
	el:'#trainingHandling',
	data: function () {
	    return {
			trainings: [],
			isLoggedIn: null,
			trainingsManager: [],
			addPressed: false,
			updatePressed: false,
			oldName: "",
			name: "",
			photo: "",
			sportsObject: "",
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
						<td><button v-on:click = "openUpdateForm(t)">Izmeni</button></td>
		    		</tr>
	    		</table>
    	</div>
		<div>
			<button v-on:click = "openAddForm">Dodavanje novog treninga</button>
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
				this.sportsObject = this.isLoggedIn.sportsObject;
				if(this.isLoggedIn != null) {
					if(this.isLoggedIn.userType === "MANAGER"){
						Array.from(this.trainings).forEach(element => {
							if (element.sportsObject === this.isLoggedIn.sportsObject){
								this.trainingsManager.push(element);
							}
						});
					}
					else if(this.isLoggedIn.userType === "COACH"){
						axios.get('rest/training/'+ this.isLoggedIn.username)
						.then(response => {this.trainingsManager = response.data})
					}
				}
			})
		})
		
},
	methods: {
		openAddForm: function() {
			this.addPressed = true;
			this.updatePressed = false;
			this.name = "";
			this.photo = "";
			this.type = "";
			this.coach = "",
			this.description= "";
			this.duration =  "";
			
		},
		openUpdateForm(selected) {
			this.updatePressed = true;
			this.addPressed = false;
			this.oldName = selected.name;
			this.name = selected.name;
			this.photo = selected.photo;
			this.type = selected.type;
			this.coach = selected.coach;
			this.description= selected.description;
			this.duration =  selected.duration;
		},
		add : function(){
			if(this.addPressed === true) {
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
			.catch( error => {
                alert("Greska!");
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