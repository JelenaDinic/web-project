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
			price4: "25000"
	    }
	},
	template: ` 
    	<div class="all-purchase">
        <div class="fee">
            <div class="header">
                <h3>CLASSIC S</h3>
                    <span>Ovaj paket obuhvata grupne treninge i teretanu. Ostali sadržaji se dodatno naplaćuje.</span>
            </div>

            <div>
				<p>NEDELJNA</p>
				<div class="price">
                <strong>{{price1}} RSD</strong>
                <span>4 ulaska</span>
				</div>
            </div>
			<div>
				<input type="text" id = "code1" v-model = "code1">
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
				<input type="text" id = "code2" v-model = "code2">
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
				<input type="text" id = "code3" v-model = "code3">
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
				<input type="text" id = "code4" v-model = "code4">
				<button @click="usePromoCode(4, code4)" class="buy-btn">PRIMENI KOD</button>
			</div>
            <button @click="buy('ANNUALY', price4, 200)" class="buy-btn">KUPI</button>
        </div>
    </div>		  
    	`,
    mounted () {
		axios.get('rest/sportsObject/isLoggedIn')
			.then(response => {
					this.customer = response.data;			
			})
    },
	methods: {
		usePromoCode(number, code) {
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
								this.price4 = this.price4 - (this.price4 * (discount * 0.01))
								break;
							
						}
					}
					
				})
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
			
			
			
		}
	}
});