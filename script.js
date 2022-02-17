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
            "x-rapidapi-key": "38dc01694amshcd2ebebb6a79959p10f60djsneb6d515a158a"
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
            const form = document.createElement("form")
            form.setAttribute("id", "create-review-form")
            form.setAttribute("method", "POST")
            const label = document.createElement("label")
            label.setAttribute("for", "newReviewDescription")
            label.innerText = "Review:"
            const input1 = document.createElement("input")
            input1.setAttribute("type", "text")
            input1.setAttribute("id", "newReviewDescription")
            input1.setAttribute("name", "newReviewDescription")
            input1.setAttribute("placeholder", "description")
            const input2 = document.createElement("input")
            input2.setAttribute("type", "submit")
            input2.setAttribute("value", "Add new reiview ")
            const listDiv = document.createElement("div")
            listDiv.setAttribute("id", "list")
            const ul = document.createElement("ul")
            ul.setAttribute("id", "tasks")
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
            form.append(label, input1, input2)
            expandMoreContent.append(form, listDiv)
            listDiv.append(ul)
            description.append(expandMoreContent, expandMoreHolder) // expandMoreHolder
            cardDiv.append(plateImg, plateNameDiv, description)
            container.appendChild(cardDiv)
        });
        //waits for the elements to load on to the page then grabs the span to run the call back function
        const expandsMore = document.querySelectorAll(".btn-expand-more")
        expandsMore.forEach(expandsMore => {
            expandsMore.addEventListener('click', expand)
        })
        //waits for the elements to load on to the page then grabs the form to run the call back function
        const reviewForm = document.querySelectorAll("#create-review-form")
        reviewForm.forEach(reviewForm => {
            reviewForm.addEventListener("submit", (e) => {
                e.preventDefault()
                handleReview(e.target.newReviewDescription.value)
                reviewForm.reset()
            })
        })
        function handleReview(review) {
            //create a p element
            let p = document.createElement("p")
            p.textContent = `${review} `
            // create the 'done' button and add function
            //add to todo list 
            document.querySelector("#list").appendChild(p)
        }
    } //dont remove
}) //dont remove







