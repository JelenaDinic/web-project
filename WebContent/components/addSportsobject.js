var addSportsObjectApp = new Vue({ 
	el:'#addSportsObject',
	data: function () {
	    return {
		  name: "",
		  type: "",
		  street: "",
		  number: "",
		  city: "",
		  postalCode: 0,
	      logo: "",
		  manager: null,
		  allManagers: [],
	    }
	},
	template: ` 
    	<div>
    		<h2>KREIRAJ NOVI SPORTSKI OBJEKAT</h2>
			
			<table>
				<tr>
					<td>Naziv</td>
					<td><input type="text" id = "name" v-model = "name"></td>
				</tr>
				<tr>
					<td>Tip objekta</td>
					<td>
						<select v-model = "type" id="type">
  							<option value="GYM">Teretana</option>
  							<option value="POOL">Bazen</option>
  							<option value="SPORT_CENTER">Sportski centar</option>
  							<option value="DANCE_STUDIO">Plesni studio</option>
  						</select>
					</td>
				</tr>
				<tr>
					<td>Ulica</td>
					<td><input type="text" id = "street" v-model = "street"></td>
					<td>Broj</td>
					<td><input type="text" id = "number" v-model = "number"></td>
					<td>Grad</td>
					<td><input type="text" id = "city" v-model = "city"></td>
					<td>Postanski broj</td>
					<td><input type="text" id = "postalCode" v-model = "postalCode"></td>
				</tr>
				<tr>
					<td>Logo</td>
					<td><input type="text" id = "logo" v-model = "logo"></td>
				</tr>
				<tr>
				<td>Menadzer</td>
				<td>
					<select v-model = "manager" id="manager">
						<option v-for="item in allManagers" :value="item">{{item.name +" "+ item.surname}}</option>
					</select>
				</td>
				<td><button onclick="window.location='registration.html';" v-on:click = "registerManager">Dodaj menadzera</button></td>
			</tr>
				<tr>
					<td><button type="submit" v-on:click = "registration">KREIRAJ</button></td>
				</tr>
			</table>
			<!DOCTYPE html>

    	</div>	  
    	`,
    mounted () {
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
				}
			})
		axios.get('rest/user/freeManagers')
			.then(response => {this.allManagers = response.data})


    },
	methods: {
		registration : function(){
			let address = {street:this.street, number:this.number, city:this.city , postalCode:this.postalCode};
			let location = {longitude: 0, latitude: 0, address:address}
			axios.post('rest/sportsObject/', {
				name: this.name,
				type: this.type,
				location: location,
				logo: this.logo
			})
			.then(response => {
				alert("Uspesno ste kreirali sportski objekat!");
				window.location.href = 'sportsObjects.html';
			})
			.catch( error => {
                alert("Greska!");
            })

			axios.post('rest/user/'+ this.manager.username, {
				name: this.name,
				type: this.type,
				location: location,
				logo: this.logo
			})
		},
		registerManager : function(){
			let address = {street:this.street, number:this.number, city:this.city , postalCode:this.postalCode};
			let location = {longitude: 0, latitude: 0, address:address}
			axios.post('rest/sportsObject/', {
				name: this.name,
				type: this.type,
				location: location,
				logo: this.logo
			})
			.then(response => {
				alert("Uspesno ste kreirali sportski objekat!");
				window.location.href = 'sportsObjects.html';
			})
			.catch( error => {
                alert("Greska!");
            })
			this.$root.$emit('messageFromAddSportsObject',this.name)
		}
	}
});