var membershipFeeApp = new Vue({ 
	el:'#membershipFee',
	data: function () {
	    return {
			customer : null
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
		buy(type, price, entries){
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			axios.post('rest/sportsObject/fee', {
				feeType: type,
				paymentDate: date,
				price: price,
				status: "ACTIVE",
				numberOfEntries: entries,
				customer: this.customer.username
				
		})
		}
	}
});