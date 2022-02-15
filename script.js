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
    const recipeResult = recipes.results
    recipeResult.forEach( plate => {
        //make a p and assign it with varible plate's name
        const img = document.createElement("img")
        img.setAttribute("src", plate.thumbnail_url )
        
        const container = document.querySelector("#recipe-container")
        
        container.append(img)
        img.innerHTML = plate.name
        container.append(plate.name)
        const instructions = plate.instructions
        
    });

}