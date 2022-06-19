Vue.component("sportsObj", { 
	data: function () {
	    return {
	      sportsObjects: null,
		  searchText: null
	    }
	},
	template: ` 
    	<div>
    		<h3>Prikaz sportskih objekata</h3>
			<input type = "text" v-model = "searchText" v-on:input = "search">
    		<table border="1">
	    		<tr bgcolor="lightgrey">
	    			<th>Naziv</th>
	    			<th>Tip</th>
                    <th>Lokacija</th>
                    <th>Logo</th>
                    <th>Prosecna ocena objekta</th>
                    <th>Radno vrijeme</th>
	    		</tr>
	    			
	    		<tr v-for="(s, index) in sportsObjects">
	    			<td>{{s.name}}</td>
	    			<td>{{s.type}}</td>
                    <td>{{s.location.address.city}}</td>
	    			<td>{{s.logo}}</td>
                    <td>{{s.averageGrade}}</td>
	    			<td>{{s.startWorkingHour}} - {{s.endWorkingHour}}</td>
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
			this.searchText = this.$refs.searchText.value;
			axios.get('rest/sportsObject/this.searchText')
			.then(response => (this.sportsObjects = response.data))
		}
	}
});