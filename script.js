document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector(".recipeContainer")
    //span functionality
    function expand() {
        const showContent = document.getElementById(this.dataset.target)
        if (showContent.classList.contains('expand-active')) {
            this.innerHTML = this.dataset.showtext;
        } else {
            this.innerHTML = this.dataset.hidetext
        }
        showContent.classList.toggle('expand-active')
    }
    //fetching data
    fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tasty.p.rapidapi.com",
            "x-rapidapi-key": "b04d2d79bcmsh34480f1ae77be72p126f57jsn51cc4c556b3a"
        }
    })
        .then((resp) => resp.json())
        .then((recipes) => getNameAndImage(recipes))
    function getNameAndImage(recipes) {
        const recipeResult = recipes.results
        let counter = 0
        recipeResult.forEach(plate => {
            //creating main div
            counter += 1
            const cardDiv = document.createElement("div")
            cardDiv.setAttribute("class", "card")
            
            //creating img tag and adding rendering image
            const plateImg = document.createElement("img")
            plateImg.setAttribute("class", "placeholder-for-image")
            plateImg.setAttribute("src", plate.thumbnail_url)
            //creating plate name div and adding the plates name to it
            const plateNameDiv = document.createElement("div")
            plateNameDiv.setAttribute("class", "info")
            const plateH2 = document.createElement("h2")
            plateH2.innerText = plate.name
            //creating nested divs to allow for the ingrients and video to show
            const description = document.createElement("div")
            description.setAttribute("class", "description")
            const expandMoreContent = document.createElement("div")
            expandMoreContent.className = "expandMoreContent";
            expandMoreContent.setAttribute("id", `showMoreContent${counter}`)
            const ingredients = document.createElement("p")
             //plate.original_video_url
            let instructions = plate.instructions
            console.log(instructions)
            let form = document.createElement('form')
            cardDiv.append(form)

            let pageTitle = document.querySelector('#tiptop')
            pageTitle.addEventListener('click', () => {
                pageTitle.innerHTML = "KOOC KCIUQ"
                pageTitle.addEventListener('click', () => {
                    pageTitle.innerHTML = "quick cook"
                })
            })

            instructions.forEach(element => {
                let displayText = element.display_text
                ingredients.innerHTML = displayText
                console.log(displayText)
            })
            // expand more button
            const expandMoreHolder = document.createElement("div")
            expandMoreHolder.setAttribute("class", "expandMoreHolder")
            const span = document.createElement("span")
            span.innerText = "Show More"
            span.setAttribute("expand-more", "")
            span.setAttribute("data-hidetext", "Show Less...")
            span.setAttribute("data-showtext", "Show More...")
            span.setAttribute("data-target", `showMoreContent${counter}`)
            span.setAttribute("class", "btn-expand-more")
            //appending elements on to the page
            expandMoreHolder.appendChild(span)
            plateNameDiv.appendChild(plateH2)
            expandMoreContent.appendChild(ingredients)
            description.append(expandMoreContent, expandMoreHolder) // expandMoreHolder
            cardDiv.append(plateImg, plateNameDiv, description)
            container.appendChild(cardDiv)
        });
        //waits for the elements to load on to the page then grabs the span to run the call back function
        const expandsMore = document.querySelectorAll(".btn-expand-more")
        expandsMore.forEach(expandsMore => {
            expandsMore.addEventListener('click', expand)
        })
    }
})