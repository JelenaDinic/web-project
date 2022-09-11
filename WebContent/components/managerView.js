var promoCodeApp = new Vue({ 
	el:'#managerView',
	data: function () {
	    return {
			coaches: [],
			customers: [],
			isLoggedIn: null,
			isManager: false,
            isCustomer: false,
            isAdmin: false,
            isCoach: false,
			object: null,
			trainings:[],
			pathString: "http://localhost:8080/WebShopREST/images/"
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
                    <li v-if="isLoggedIn != null" @click="logout">
                        <a>Izloguj se</a>
                    </li>
                    <li v-if="isLoggedIn != null">
                        <a href="account.html">Moj profil</a>
                    </li>
					<li v-if="isManager === true">
                        <a href="managerView.html">Moj sportski objekat</a>
                    </li>
					<li  v-if="isCustomer === true">
                        <a href="membershipFee.html">Kupite članarinu</a>
                    </li>
                    <li v-if="isAdmin === true">
                        <a href="users.html">Korisnici</a>
                    </li>
                    <li v-if="isAdmin === true">
                        <a href="registration.html">Registruj menadzera/trenera</a>
                    </li>
					<li v-if="isAdmin === true">
                        <a href="addPromoCode.html">Definiši novi promo kod</a>
                    </li>
					<li v-if="isAdmin === true">
					<a href="comments.html">Komentari</a>
					</li>
                    <li v-if="isAdmin != true && isLoggedIn != null">
                        <a href="trainingHandling.html">Treninzi</a>
                    </li>
                </ul>
            </div>
		<h3>MOJ SPORTSKI OBJEKAT</h3>
		<table class="table">
			<tr>
		    	<th>Treneri</th>
		    </tr>
			<tr v-for="(c, index) in coaches">
		    			<td>{{c}}</td>
		    		</tr>
		</table>
		<table class="table">
			<tr>
		    	<th>Kupci</th>
		    </tr>
			<tr v-for="(c, index) in customers">
		    			<td>{{c}}</td>
		    		</tr>
		</table>
		<h4>Osnovne informacije:</h4>
			<label>Naziv: </label>
			<label>{{object?.name}}</label><br>
			<label>Tip: </label>
			<label>{{object?.type}}</label><br>
			<label>Status: </label>
			<label>{{object?.status}}</label><br>
			<label>Prosečna ocena: </label>
			<label>{{object?.averageGrade}}</label><br>
			<label>Logo: </label><br>
			<img :src="createImagePath(object?.logo)" style="width: 150px; height: 150px; border-radius: 50%"" alt="logo"><br>
			

    	</div>		  
    	`,
		mounted () {
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
						axios.get('rest/training/coaches/' + this.isLoggedIn.sportsObject)
							.then(response => this.coaches = response.data)
						axios.get('rest/user/visited/' + this.isLoggedIn.sportsObject)
							.then(response => this.customers = response.data)
						axios.get('rest/sportsObject/find/' + this.isLoggedIn.sportsObject)
							.then(response => {
								this.object = response.data;
								axios.get('rest/training/object/' + this.object.name)
									.then(response => {this.trainings = response.data})
							})
					}
				})
			
		},
	methods: {
		createImagePath(imageName) {
			let returnValue = "http://localhost:8080/WebShopREST/images/" + imageName;
			return returnValue;
		},
		logout() {
				axios.post('rest/user/logout');
				this.isLoggedIn = null;
				this.isAdmin = false;
				this.isManager = false;
				this.isCustomer = false;
				this.isCoach = false;
				window.location.href = 'sportsObjects.html';
			}
	}
	
});