var usersApp = new Vue({ 
	el:'#users',
	data: function () {
	    return {
			users: null
	    }
	},
	template: ` 
    	<div>
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
          .then(response => {this.users = response.data})
    }
});