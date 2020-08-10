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
            let button = document.getElementById("dog-detail")
            
            if(dog.isGoodDog){
                
                button.innerHTML =  "Good Dog!"
            } else {
                button.innerHTML =  "Bad Dog!"
            }
            let buttonToggle = document.getElementById("dog-detail")
            let dogStatus = dog.isGoodDog
            buttonToggle.addEventListener("click", function(e){

                if (e.target.innerHTML = "Bad Dog!"){
                    e.target.innerHTML = "Good Dog!"
                    dogStatus = true
                } else if(e.target.innerHTML = "Good Dog!"){

                  e.target.innerHTML = "Bad Dog!"
                    dogStatus = false
                }
            
                let body={isGoodDog:dogStatus}

             fetch(url+id, {
             method: "PATCH",
             headers: {
                 "content-type": "application/json",
                 accept: "application/json"
             },
             body: JSON.stringify(body)
            })
            .then(resp =>resp.json())
            .then(console.log)
             
            })
            //problem - toggle works only one time. from badDog to goodDog. And if the dog originally changes the isGoodBoy ='true' - the toggle doesn't work
        })//fetch
        
    })//eventListener

})//ContentLoaded