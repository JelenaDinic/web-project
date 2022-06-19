const SportsObjects = { template: '<sportsObj></sportsObj>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'sportsObj', component: SportsObjects}
	  ]
});

var app = new Vue({
	router,
	el: '#sportsObj'
});