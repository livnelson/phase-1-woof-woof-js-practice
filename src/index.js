const dogBar = document.getElementById('dog-bar')
// console.log(dogBar)

fetch("http://localhost:3000/pups")
    .then((response) => response.json())
    .then((dogDataArray) => {
        console.log(dogDataArray)
        // invoke a function in here
        // this function will create dom ellements
        //and out dogDataArray into DOM elements
        // We will want to loop through the data at some point
        dogDataArray.forEach((dogObj) =>{               //the dogObj is pulled from the array, array received from json
            // console.log('callback running')
            // console.log(dogObj)
            displayDog(dogObj)
        })

        // for(const dogObj of dogDataArray){      // this is an example of a for of loop
            //     console.log(dogObj)
            // }

    })

function displayDog(dogObj){ // dogObj is what is received
    // console.log(dogObj)
    const dogSpan = document.createElement('span')
    
    // dogSpan.id = dogObj.id // how to set id to declared elements
    dogSpan.textContent = dogObj.name
    // console.log(dogSpan)

    dogSpan.addEventListener('click', (event) => {
        console.log('click working')
        //creathes a function that gets called here
        //that renders the display for a single dog
        //first time we run display dogs, "mr. bonkers" will
        //be the dogObj
        displayDogDetails(dogObj) // passing in the data for the object

    })


    dogBar.append(dogSpan)

}

function displayDogDetails(dogObj){
    const dogContainer = document.getElementById('dog-info')
    const dogImage =document.createElement('img')
    const dogName = document.createElement('h2')
    const dogBtn = document.createElement('button')

    dogImage.src = dogObj.image
    dogName.textContent = dogObj.name
    dogBtn.textContent = dogObj.isGoodDog === true ? "Good Dog" : "Bad Dog"

    dogContainer.textContent = ''  // resets container to empty
    
    dogContainer.append(dogImage, dogName, dogBtn)


    dogBtn.addEventListener('click',() => {
        dogBtn.textContent = dogBtn.textContent !== "Good Dog" ? "Good Dog" : "Bad Dog"
        dogObj.isGood = dogObj.isGoodDog !== true ? true : false
        toggleDog(dogObj)
    })

    console.log(dogObj)
}

function toggleDog(dogObj){
    const patchReqObj = {
    method: 'PATCH',
    headers: {
        "content-type": "application/json",
        "Accept" : "application/json"
    },
    body: JSON.stringify({
        isGoodDog : dogObj.isGood
    }),
    }
    fetch(`http://localhost:3000/pups/${dogObj.id}`, patchReqObj)
    .then (response =>  response.json())
    .then (dogObj => {
        console.log(dogObj)
    })
}


 


