var membershipFeeApp = new Vue({ 
	el:'#membershipFee',
	data: function () {
	    return {
			
	    }
	},
	template: ` 
    	<div class="all-purchase">
        <div class="fee">
            <div class="header">
                <h3>CLASSIC S</h5>
                    <span>Ovaj paket obuhvata grupne treninge i teretanu. Ostali sadržaji se dodatno naplaćuje.</span>
            </div>

            <div>
				<p>NEDELJNA</p>
				<div class="price">
                <strong>700 RSD</strong>
                <span>4 ulaska</span>
				</div>
            </div>

            <button class="buy-btn">KUPI</button>
        </div>

        <div class="fee">
            <div class="header">
                <h3>CLASSIC M</h5>
                    <span>Paket uključuje teretanu i grupne treninge.</span>
            </div>

            <div>
                <p>MESEČNA</p>
				<div class="price">
                <strong>2000 RSD</strong>
                <span>12 ulaska</span>
				</div>
            </div>

            <button class="buy-btn">KUPI</button>
        </div>

        <div class="fee">
            <div class="header">
                <h3>ADVANCED M</h5>
                    <span>Ovaj paket pruža upotrebu svog sadržaja teretane bez doplate.</span>
            </div>

            <div>
                <p>MESEČNA</p>
				<div class="price">
                <strong>3500 RSD</strong>
                <span>20 ulazaka</span>
				</div>
            </div>

            <button class="buy-btn">KUPI</button>
        </div>

		<div class="fee">
            <div class="header">
                <h3>CLASSIC L</h5>
                    <span>Ovaj paket pruža upotrebu svog sadržaja teretane bez doplate.</span>
            </div>

            <div>
                <p>GODIŠNJA</p>
				<div  class="price">
                <strong>25 000 RSD</strong>
                <span>200 ulazaka</span>
				</div>
            </div>

            <button class="buy-btn">KUPI</button>
        </div>
    </div>		  
    	`,
    mounted () {
    },
	methods: {
		
	}
});