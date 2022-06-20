var sportsObjectApp = new Vue({ 
	el:'#sportsObj',
	data: function () {
	    return {
	      sportsObjects: null,
		  searchText: ""
	    }
	},
	template: ` 
    	<div>
    		<h3>Prikaz sportskih objekata</h3>
			<input id = "searchText" type = "text" v-model = "searchText" v-on:input = "search">
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
	    			<td><img src="./missfit.png"/></td>
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
			axios.get('rest/sportsObject/' + this.searchText)
			.then(response => (this.sportsObjects = response.data))
		}
	}
});