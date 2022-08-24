var membershipFeeApp = new Vue({ 
	el:'#membershipFee',
	data: function () {
	    return {
			customer : null,
			feeId: ""
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
                <strong>700 RSD</strong>
                <span>4 ulaska</span>
				</div>
            </div>

            <button @click="buy('WEEKLY', 700, 4)" class="buy-btn">KUPI</button>
        </div>

        <div class="fee">
            <div class="header">
                <h3>CLASSIC M</h3>
                    <span>Paket uključuje teretanu i grupne treninge.</span>
            </div>

            <div>
                <p>MESEČNA</p>
				<div class="price">
                <strong>2000 RSD</strong>
                <span>12 ulaska</span>
				</div>
            </div>

            <button @click="buy('MONTHLY', 2000, 12)" class="buy-btn">KUPI</button>
        </div>

        <div class="fee">
            <div class="header">
                <h3>ADVANCED M</h3>
                    <span>Ovaj paket pruža upotrebu svog sadržaja teretane bez doplate.</span>
            </div>

            <div>
                <p>MESEČNA</p>
				<div class="price">
                <strong>3500 RSD</strong>
                <span>20 ulazaka</span>
				</div>
            </div>

            <button @click="buy('MONTHLY', 3500, 20)" class="buy-btn">KUPI</button>
        </div>

		<div class="fee">
            <div class="header">
                <h3>CLASSIC L</h3>
                    <span>Ovaj paket pruža upotrebu svog sadržaja teretane bez doplate.</span>
            </div>

            <div>
                <p>GODIŠNJA</p>
				<div  class="price">
                <strong>25 000 RSD</strong>
                <span>200 ulazaka</span>
				</div>
            </div>

            <button @click="buy('ANNUALY', 25000, 200)" class="buy-btn">KUPI</button>
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
						userType: this.customer.userType
		})
				})
			
			
			
		}
	}
});