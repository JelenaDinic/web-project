var sportsObjectsApp = new Vue({ 
	el:'#sportsObj',
	data: function () {
	    return {
	      sportsObjects: null,
		  searchText: "",
		  sortCombo: null,
		  tableRow: null
	    }
	},
	template: ` 
    	<div>
			<button onclick = "location. href = 'login.html'"> Uloguj se </button>
			<button onclick = "location. href = 'registration.html'"> Registruj se </button>
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
        axios.get('rest/sportsObject/')
          .then(response => (this.sportsObjects = response.data))
    },
	methods: {
		search : function(){
			axios.get('rest/sportsObject/' + this.searchText)
			.then(response => (this.sportsObjects = response.data))
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
					console.log(response.data);
					window.location.href = "sportsObject.html"
				}, error => {
					alert(error);
				}
			)
			
			
			
		}
	}
});