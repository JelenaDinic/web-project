var usersApp = new Vue({ 
	el:'#users',
	data: function () {
	    return {
			users: null,
			allUsers: [],
			searchText: "",
			sortCombo: null,
			filter1: false,
			filter2: false,
			filter3: false,
			filter4: false,
			filter5: false,
			filter6: false,
			filter7: false,
			user: null
	    }
	},
	template: ` 
    	<div>
		<label>Pretrazi:</label><input id = "searchText" type = "text" v-model = "searchText" v-on:input = "search">
		<div>
		<label>Parametar:</label>
		<select id="comboBox" v-model = "sortCombo">
		  <option value="0r">Ime(rastuci)</option>
		  <option value="0o">Ime(opadajuci)</option>
		  <option value="1r">Prezime(rastuci)</option>
		  <option value="1o">Prezime(opadajuci)</option>
		  <option value="2r">Korisnicko ime(rastuci)</option>
		  <option value="2o">Korisnicko ime(opadajuci)</option>
		  <option value="3r">Broj sakupljenih bodova(rastuci)</option>
		  <option value="3o">Broj sakupljenih bodova(opadajuci)</option>
		</select> 
		<button v-on:click = "sorting">Sortiraj</button>
		</div>
		<div ref = "filter">
			<label>ADMIN</label><input type="checkbox" id="checkbox1" v-model="filter1">
			<label>MENADZER</label><input type="checkbox" id="checkbox2" v-model="filter2">
			<label>TRENER</label><input type="checkbox" id="checkbox3" v-model="filter3">
			<label>KUPAC</label><input type="checkbox" id="checkbox4" v-model="filter4">
			<label>ZLATNI</label><input type="checkbox" id="checkbox5" v-model="filter5">
			<label>SREBRNI</label><input type="checkbox" id="checkbox6" v-model="filter6">
			<label>BRONZANI</label><input type="checkbox" id="checkbox7" v-model="filter7">
			<button v-on:click = "filter">Filtriraj</button>
		</div>
    		<table border="1">
	    		<tr bgcolor="lightgrey">
	    			<th>Ime</th>
	    			<th>Prezime</th>
                    <th>Korisnicko ime</th>
                    <th>Pol</th>
                    <th>Datum rodjenja</th>
                    <th>Tip korisnika</th>
                    <th>Poeni</th>
                    <th>Clanarina</th>
	    		</tr>
	    			
	    		<tr v-for="(s, index) in users" :key="index">
	    			<td>{{s.name}}</td>
	    			<td>{{s.surname}}</td>
                    <td>{{s.username}}</td>
                    <td>{{s.gender}}</td>
	    			<td>{{s.dateOfBirth}}</td>
	    			<td>{{s.userType}}</td>
	    			<td>{{s.points}}</td>
	    			<td>{{s.fee}}</td>
	    		</tr>
	    	</table>
    	</div>		  
    	`,
    mounted () {
        axios.get('rest/user/')
          .then(response => {this.users = response.data;this.allUsers = response.data})
    },
	methods: {
		search : function(){
			axios.get('rest/user/' + this.searchText)
			.then(response => {this.users = response.data})
		},
		sorting : function(){
			if(this.sortCombo === "0r") {
				this.users = this.users.sort(
				(a, b) => {
					return b.name.localeCompare(a.name)
				}
			)
			}
			else if(this.sortCombo === "0o") {
				this.users = this.users.sort(
				(a, b) => {
					return a.name.localeCompare(b.name)
				}
			)
			}
			else if(this.sortCombo === "1r") {
				this.users = this.users.sort(
				(a, b) => {
					return b.surname.localeCompare(a.surname)
				}
			)
			}
			
			else if(this.sortCombo === "1o") {
				this.users = this.users.sort(
				(a, b) => {
					return a.surname.localeCompare(b.surname)
				}
			)
			}
			else if(this.sortCombo === "2r") {
				this.users = this.users.sort(
				(a, b) => {
					return b.username.localeCompare(a.username)
				}
			)
			}
			else if(this.sortCombo === "2o") {
				this.users = this.users.sort(
				(a, b) => {
					return a.username.localeCompare(b.username)
				}
			)
			}
			else if(this.sortCombo === "3r") {
				this.users = this.users.sort(
				(a, b) => {
					return a.points.toString().localeCompare(b.points.toString())
				}
			)
			}
			
			else if(this.sortCombo === "3o") {
				this.users = this.users.sort(
				(a, b) => {
					return b.points.toString().localeCompare(a.points.toString())
				}
			)
			}
			
		},
		filter : function(){
			let filterdUsers = [];
			this.users = this.allUsers;
			Array.from(this.users).forEach(element => {
				if (element.userType == "ADMIN" && this.filter1 != false){
					filterdUsers.push(element);
				}
				if (element.userType == "MANAGER" && this.filter2 != false){
					filterdUsers.push(element);
				}
				if (element.userType == "COACH" && this.filter3 != false){
					filterdUsers.push(element);
				}
				if (element.userType == "CUSTOMER" && this.filter4 != false){
					filterdUsers.push(element);
				}
				if (element.userType == "CUSTOMER"  && this.filter4 == false){
					if (element.customerType.name == "GOLD" && this.filter5 != false){
						filterdUsers.push(element);
					}
					if (element.customerType.name == "SILVER" && this.filter6 != false){
						filterdUsers.push(element);
					}
					if (element.customerType.name == "BRONZE" && this.filter7 != false){
						filterdUsers.push(element);
					}
				}
			});
			if(this.filter1 == false && this.filter2 == false && this.filter3 == false && this.filter4 == false && this.filter5 == false && this.filter6 == false && this.filter7 == false){
				filterdUsers = this.allUsers;
			}
			this.users = filterdUsers;
		}
	}
});