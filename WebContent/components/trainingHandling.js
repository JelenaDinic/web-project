var trainingHandlingApp = new Vue({
	el:'#trainingHandling',
	data: function () {
	    return {
			trainings: [],
			isLoggedIn: null,
			trainingsManager: []
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
    	</div>		  
    	`,
    mounted () {
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
		
}
})