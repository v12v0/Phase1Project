fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tasty.p.rapidapi.com",
		"x-rapidapi-key": "c6b32db4b5msha769fbc18ffde82p16fbe4jsn6b6843eb976c"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});