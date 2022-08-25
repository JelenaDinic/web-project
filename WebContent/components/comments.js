var CommentsApp = new Vue({
	el:'#comments',
	data: function () {
	    return {
			comments: []
	    }
	},
	template: ` 
    	<div>
				<table border="1">
		    		<tr bgcolor="lightgrey">
		    			<th>Tekst</th>
                        <th>Korisnik</th>
                        <th>Sportski objekat</th>
		    			<th></th>
						<th></th>
		    		</tr>
		    			
		    		<tr v-for="(t, index) in comments">
		    			<td>{{t.text}}</td>
                        <td>{{t.customer}}</td>
                        <td>{{t.sportsObject}}</td>
						<td><button @click="approve(t.id)" v-if="t.approved === false">Potvrdi</button></td>
						<td><button @click="dismiss(t.id)" v-if="t.approved === false">Odbaci</button></td>
		    		</tr>
	    		</table>
    	</div>	  
    	`,
    mounted () {
        axios.get('rest/comment/')
        .then(response => 
              {this.comments = response.data;})
    },
	methods: {
			approve(selected){
                axios.get(
                    'rest/comment/' + selected
                ).then(
                    response => {
                        window.location.href = "comments.html"
                    }, error => {
                        alert(error);
                    }
                )   
            },
			dismiss(selected){
                axios.get(
                    'rest/comment/delete/' + selected
                ).then(
                    response => {
                        window.location.href = "comments.html"
                    }, error => {
                        alert(error);
                    }
                )   
            },
	}
})