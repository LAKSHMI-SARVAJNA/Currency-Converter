const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
   

  const dropdowns = document.querySelectorAll(".dropdown select ");
const btn = document.querySelector("form button");
 const fromcurr = document.querySelector(".from select");
 const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



  for(let select of dropdowns) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }
        else if(select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
      }

      select.addEventListener("change" , (evt) =>{
        updateflag(evt.target);
      })
  }

  const updateexchangerate=async() =>{

    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval==="" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
   // console.log(fromcurr.value,tocurr.value);
const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
//let json = fetch(`/currencies/{fromcurr}`)
//rate = json[fromcurr][tocurr]

let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
let finalamount = amtval * rate;
msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount}${tocurr.value} `; 
  }

  const updateflag = (ele) =>{
    let currcode = ele.value;
    let countrycode =  countryList[currcode];
     let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img =  ele.parentElement.querySelector("img");
    img.src = newsrc;

  };


  btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
   updateexchangerate();
    
  });

  window.addEventListener("load",()=>{
    updateexchangerate();
    })