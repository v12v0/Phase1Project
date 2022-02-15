document.addEventListener("DOMContentLoaded", () => {
    fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tasty.p.rapidapi.com",
		"x-rapidapi-key": "c6b32db4b5msha769fbc18ffde82p16fbe4jsn6b6843eb976c"
	}
    
    })
    .then((resp) => resp.json())
    .then((recipes) => getNameAndImage(recipes))
    
})

function getNameAndImage(recipes){
    let recipeResult = recipes.result
    console.log(recipeResult)
}
