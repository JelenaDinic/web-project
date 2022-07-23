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
		  tableRow: null,
		  isLoggedIn: false
	    }
	},
	template: ` 
    	<div>
			<button v-if = "isLoggedIn === false" onclick = "location. href = 'login.html'"> Uloguj se </button>
			<button v-if = "isLoggedIn === false" onclick = "location. href = 'registration.html'"> Registruj se </button>
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
	    			
	    		<tr v-for="(s, index) in sportsObjects" :key="index">
	    			<td>{{s.name}}</td>
	    			<td>{{s.type}}</td>
                    <td>{{s.location.address.city}}</td>
	    			<td><img src="./missfit.png"/></td>
                    <td>{{s.averageGrade}}</td>
	    			<td>{{s.startWorkingHour}} - {{s.endWorkingHour}}</td>
					<td><button @click="details(s.name)">Prikazi</button></td>
	    		</tr>
	    	</table>
    	</div>		  
    	`,
    mounted () {
		/*this.$root.$on('isLoggedIn', (text) => {
			alert("GRESKA");
			console.log(isLoggedIn);
			this.isLoggedIn = text
		})*/
		axios.get('rest/sportsObject/isLoggedIn')
			.then(response => {
				this.isLoggedIn = response.data;
			})
        axios.get('rest/sportsObject/')
          .then(response => {this.sportsObjects = response.data;this.allSportsObjects = response.data})
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