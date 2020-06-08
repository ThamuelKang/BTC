const url = "https://api.coindesk.com/v1/bpi/currentprice.json"
const priceTag = document.querySelector("h1")
const spanTag = document.querySelector("span")
const updatedTag = document.querySelector("h2")
let currency = "USD"


//make a function that grab data from Coindesk
const checkPrice = function () {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            priceTag.innerHTML = data.bpi[currency].rate_float.toFixed(2)
            updatedTag.innerHTML = data.time.updated
            console.log(updatedTag)
        })
}

//run this on load 
checkPrice()


// loop over every nav link and add click event 
const navLinks = document.querySelectorAll("nav a")
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        currency = this.getAttribute("data-currency")
        checkPrice()

        // remove ALL previous selected states
        navLinks.forEach(link => link.classList.remove("selected"))

        // add selected state
        this.classList.add("selected")

        //update currency text
        spanTag.innerHTML = currency
    })
})


// check the price every 60 seconds 
setInterval(function () {
    checkPrice()
}, 60000)