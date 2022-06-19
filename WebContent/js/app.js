const SportsObjects = { template: '<sportsObj></sportsObj>' }
const SearchSportObj = { template: '<searchSportObj></searchSportObj>'}

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'sportsObj', component: SportsObjects},
		{ path: '/{input}', name: 'searchSportsObj', component: SearchSportObj}
	  ]
});

var app = new Vue({
	router,
	el: '#sportsObj'
});