var sportObjectsApp = new Vue({
	el:'#oneObj',
	data: function () {
	    return {
			object: null
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
    	</div>		  
    	`,
    mounted () {
		axios.get('rest/sportsObject/object')
			.then((response) => {
				console.log("ispis", response.data)
				this.object = response.data
    		}, error => {
				console.log(error) 
			}
		)
	}
})