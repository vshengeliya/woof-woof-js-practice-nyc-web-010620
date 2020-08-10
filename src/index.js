document.addEventListener("DOMContentLoaded", function(){

    const url = "http://localhost:3000/pups/"
    
    let div = document.getElementById("dog-bar")

    fetch(url)
    .then(response => response.json())
    .then(data=> data.forEach(renderDog))

    function renderDog(dog){
        let span = document.createElement("span")
        span.textContent = `${dog.name}`
        span.dataset.id = `${dog.id}`
        div.appendChild(span)
    }
    
    div.addEventListener("click", function(e){


        let id = e.target.dataset.id
        let dogInfo = document.getElementById("dog-info")
        dogInfo.innerHTML=""

        fetch(url+id)
        .then(resp =>resp.json())
        .then(dog =>{

        let divDog = document.createElement("div")
        divDog.innerHTML=`
        <img src=${dog.image}>
        <h2>${dog.name}<h2/>
        <button id="dog-detail">${dog.isGoodDog}<button/>
        `
        dogInfo.appendChild(divDog)
        
        if(dog.isGoodDog){

            let button = document.getElementById("dog-detail")
                button.innerHTML =  "Good Dog!"
            } else {
                let button = document.getElementById("dog-detail")
                button.innerHTML =  "Bad Dog!"
        }
        })//fetch
        

    })//eventListener

})//ContentLoaded