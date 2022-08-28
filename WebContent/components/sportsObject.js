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
			mark: null
	    }
	},
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
			<button class="buy-btn" v-on:click = "join" >PRIDRUŽI SE</button><br>
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
				this.object = response.data
    		}, error => {
				console.log(error) 
			}
		)
		axios.get('rest/sportsObject/isLoggedIn')
		.then(response => {
			this.isLoggedIn =  response.data ? response.data : null;
			if(this.isLoggedIn != null) {
				if(this.isLoggedIn.userType === "MANAGER")
					this.isManager = true;
					axios.get('rest/comment/')
					.then(response => {this.comments = response.data})
				if(this.isLoggedIn.userType === "CUSTOMER")
					this.isCustomer = true;
					axios.get('rest/comment/name/'+this.object.name)
					.then(response => {this.comments = response.data})
				if(this.isLoggedIn.userType === "ADMIN")
					this.isAdmin = true;
					axios.get('rest/comment/')
					.then(response => {this.comments = response.data})
				if(this.isLoggedIn.userType === "COACH")
					this.isCoach = true;
					axios.get('rest/comment/name/'+this.object.name)
					.then(response => {this.comments = response.data})
			}
		})
	},
	methods: {
		join: function() {
			
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