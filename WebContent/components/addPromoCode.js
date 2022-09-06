var promoCodeApp = new Vue({ 
	el:'#promoCode',
	data: function () {
	    return {
			code: "",
			date: "",
			uses: "",
			discount: ""
	    }
	},
	template: ` 
    	<div class="promo-code">
    		<h2>DEFINIŠI NOVI PROMO KOD</h2>
			
			<table class="promo-code-table">
				<tr>
					<td>Kod</td>
					<td><input class="membership-input" style="font-size: 20px; width: 200px" type="text" id = "code" v-model = "code"></td>
				</tr>
				<tr>
					<td>Datum važenja</td>
					<td><input class="membership-input" style="font-size: 20px; width: 200px"  type="date" id = "date" v-model = "date"></td>
				</tr>
				<tr>
					<td>Broj upotrebi</td>
					<td><input class="membership-input" style="font-size: 20px; width: 200px" type="number" id = "uses" v-model = "uses"></td>
				</tr>
				<tr>
					<td>Procenat umanjenja iznosa</td>
					<td><input class="membership-input" style="font-size: 20px; width: 200px" type="number" id = "discount" v-model = "discount"></td>
				</tr>
				<tr>
					<td></td>
					<td><button type="submit" v-on:click = "addPromoCode">KREIRAJ</button></td>
				</tr>
			</table>
    	</div>		  
    	`,
	methods: {
		addPromoCode : function(){
			console.log(this.date)
			axios.post('rest/promoCode/', {
				code: this.code,
				expirationDate: this.date,
				usesLeft: this.uses,
				discount: this.discount
			})
			.then(response => {
				alert("Uspesno ste kreirali novi promo kod!");
				window.location.href = 'addPromoCode.html';
			})
			.catch( error => {
                alert("Greska!");
            })
		}
	}
});