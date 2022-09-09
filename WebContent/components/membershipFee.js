var membershipFeeApp = new Vue({ 
	el:'#membershipFee',
	data: function () {
	    return {
			customer : null,
			feeId: "",
			code1: "",
			code2: "",
			code3: "",
			code4: "",
			price1: "700",
			price2: "2000",
			price3: "3500",
			price4: "25000",
			isLoggedIn: null,
            isManager: false,
            isCustomer: false,
            isAdmin: false,
            isCoach: false,
			pressed: false
	    }
	},
	template: `
<div> 
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
    <div class="all-purchase">
        <div class="fee">
            <div class="header">
                <h3>CLASSIC S</h3>
                    <span>Ovaj paket obuhvata grupne treninge i teretanu. Ostali sadržaj se dodatno naplaćuje.</span>
            </div>

            <div>
				<p>NEDELJNA</p>
				<div class="price">
                <strong>{{price1}} RSD</strong>
                <span>4 ulaska</span>
				</div>
            </div>
			<div>
				<input class="membership-input" type="text" id = "code1" v-model = "code1">
				<button @click="usePromoCode(1, code1)" class="buy-btn">PRIMENI KOD</button>
			</div>
            <button @click="buy('WEEKLY', price1, 4)" class="buy-btn">KUPI</button>
        </div>

        <div class="fee">
            <div class="header">
                <h3>CLASSIC M</h3>
                    <span>Paket uključuje teretanu i grupne treninge. Bez dodatne doplate za ostali sadržaj. </span>
            </div>

            <div>
                <p>MESEČNA</p>
				<div class="price">
                <strong>{{price2}} RSD</strong>
                <span>12 ulaska</span>
				</div>
            </div>
			<div>
				<input class="membership-input" type="text" id = "code2" v-model = "code2">
				<button @click="usePromoCode(2, code2)" class="buy-btn">PRIMENI KOD</button>
			</div>
            <button @click="buy('MONTHLY', price2, 12)" class="buy-btn">KUPI</button>
        </div>

        <div class="fee">
            <div class="header">
                <h3>ADVANCED M</h3>
                    <span>Ovaj paket pruža upotrebu svog sadržaja teretane bez doplate.</span>
            </div>

            <div>
                <p>MESEČNA</p>
				<div class="price">
                <strong>{{price3}} RSD</strong>
                <span>20 ulazaka</span>
				</div>
            </div>
			<div>
				<input class="membership-input" type="text" id = "code3" v-model = "code3">
				<button @click="usePromoCode(3, code3)" class="buy-btn">PRIMENI KOD</button>
			</div>
            <button @click="buy('MONTHLY', price3, 20)" class="buy-btn">KUPI</button>
        </div>

		<div class="fee">
            <div class="header">
                <h3>CLASSIC L</h3>
                    <span>Ovaj paket pruža upotrebu svog sadržaja teretane bez doplate.</span>
            </div>

            <div>
                <p>GODIŠNJA</p>
				<div  class="price">
                <strong>{{price4}} RSD</strong>
                <span>200 ulazaka</span>
				</div>
            </div>
			<div>
				<input class="membership-input" type="text" id = "code4" v-model = "code4">
				<button @click="usePromoCode(4, code4)" class="buy-btn">PRIMENI KOD</button>
			</div>
            <button @click="buy('ANNUALY', price4, 200)" class="buy-btn">KUPI</button>
        </div>
    </div>
</div>		  
    	`,
    mounted () {
		axios.get('rest/sportsObject/isLoggedIn')
			.then(response => {
					this.customer = response.data;			
			})
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
				if(this.isLoggedIn.customerType != null) {
					let discount = this.isLoggedIn.customerType.discount
					this.price1 = this.price1 - (this.price1 * discount)
					this.price2 = this.price2 - (this.price2 * discount)
					this.price3 = this.price3 - (this.price3 * discount)
					this.price3 = this.price3 - (this.price3 * discount)
				}
			})
    },
	methods: {
		usePromoCode(number, code) {
			if(this.pressed === false) {
				axios.get('rest/promoCode/find/' + code)
				.then(response => {
					if (response.data === 0)
						alert("Uneli ste neispravan promo kod!")
					else {
						let discount = response.data;
						switch(number) {
							case 1: 
								this.price1 = this.price1 - (this.price1 * (discount * 0.01))
								break;
							case 2:
								this.price2 = this.price2 - (this.price2 * (discount * 0.01))
								break;
							case 3:
								this.price3 = this.price3 - (this.price3 * (discount * 0.01))
								break;
							default:  
								this.price3 = this.price3 - (this.price3 * (discount * 0.01))
								break;
							
						}
						this.pressed = true;
					}
					
				})
			}
			else {
				alert ("Već ste primenili promo kod za ovu kupovinu.")
			}
			
		},
		dateFormatter(today){
			if(today.getMonth()+1 < 10 && today.getDate() < 10)
					return today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
				else if(today.getMonth()+1 < 10 && today.getDate() > 9)
					return today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
				else if(today.getMonth()+1 > 9 && today.getDate() > 9)
					return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				else
					return today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
					
		},
		buy(type, price, entries){
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			if (type === "MONTHLY"){
				today.setMonth(today.getMonth() + 1)
				var dateTimeOfValidity = this.dateFormatter(today);
				
			} else if(type === "ANNUALY") {
				today.setYear(today.getFullYear() + 1)
				var dateTimeOfValidity = this.dateFormatter(today);
			} else {
				today.setDate(today.getDate() + 7)
				var dateTimeOfValidity = this.dateFormatter(today);
			}
				
			axios.get('rest/sportsObject/fee/generate-id')
				.then(response => {
					this.feeId = response.data;
					axios.post('rest/sportsObject/fee', {
						id: this.feeId,
						feeType: type,
						paymentDate: date,
						dateTimeOfValidity: dateTimeOfValidity,
						price: price,
						status: "ACTIVE",
						numberOfEntries: entries,
						customer: this.customer.username
				
		})
					axios.put('rest/user/' + this.customer.username, {
						fee: this.feeId,
						username: this.customer.username,
						password: this.customer.password,
						name: this.customer.name,
						surname: this.customer.surname,
						gender: this.customer.gender,
						dateOfBirth: this.customer.dateOfBirth,
						userType: this.customer.userType,
						visitedSportsObjects: this.customer.visitedSportsObjects
		})
				})
			
			window.location.href = 'membershipFee.html'
			
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