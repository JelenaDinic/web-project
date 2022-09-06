var CommentsApp = new Vue({
	el:'#comments',
	data: function () {
	    return {
			comments: [],
            isLoggedIn: null,
            isManager: false,
            isCustomer: false,
            isAdmin: false,
            isCoach: false
	    }
	},
	template: ` 
    	<div class="main-content">
        <div id="navBar">
		<ul class="nav-menu">
			<li v-if="isLoggedIn != null">
				<a href="sportsObjects.html">Početna</a>
			</li>
			<li v-if="isLoggedIn === null">
				<a href="login.html">Uloguj se</a>
			</li>
			<li v-if="isLoggedIn === null">
				<a href="registration.html">Registruj se</a>
			</li>
			<li v-if="isLoggedIn != null">
				<a>Izloguj se</a>
			</li>
			<li  v-if="isManager === true">
				<a>Moj sportski objekat</a>
			</li>
			<li v-if="isManager === true">
				<a href="trainingHandling.html">Treninzi</a>
			</li>
			<li v-if="isLoggedIn != null">
				<a href="account.html">Moj profil</a>
			</li>
			<li  v-if="isCustomer === true">
				<a href="membershipFee.html">Kupite članarinu</a>
			</li>
			<li v-if="isAdmin === true">
				<a href="users.html">Pregled svih registrovanih korisnika</a>
			</li>
			<li v-if="isAdmin === true">
				<a href="registration.html">Kreiraj menadzera/trenera</a>
			</li>
			<li v-if="isAdmin === true">
				<a href="addPromoCode.html">Definiši novi promo kod</a>
			</li>
			<li v-if="isAdmin === true">
			<a href="comments.html">Komentari</a>
			</li>
			<li v-if="isCoach === true || isCustomer === true">
				<a href="trainingHandling.html">Pregled svih treninga</a>
			</li>
		</ul>
	</div>
				<table class="table">
		    		<tr>
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
						<td><button @click="approve(t.id)" v-if="t.approved === false" class="buy-btn">Potvrdi</button></td>
						<td><button @click="dismiss(t.id)" v-if="t.approved === false" class="buy-btn">Odbaci</button></td>
		    		</tr>
	    		</table>
    	</div>	  
    	`,
    mounted () {
        axios.get('rest/comment/')
        .then(response => 
              {this.comments = response.data;})
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
                      if(this.isLoggedIn.userType === "COACH")
                          this.isCoach = true;
                  }
              })
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