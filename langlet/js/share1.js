'use strict';


const kontejner1 = document.getElementById("schovanyKontejner");
const kontejner2 = document.getElementById("schovanyKontejner2");
const kontejner3 = document.getElementById("schovanyKontejner3");
const kontejner4 = document.getElementById("schovanyKontejner4");
const kontejner5 = document.getElementById("schovanyKontejner5");
const kontejner6 = document.getElementById("schovanyKontejner6");

const btnupdate = document.getElementById("update");

let errorKontejner = document.getElementById("errorKontejner");

let error1 = false;
let typ = kontejner3.value;
let jazyk = kontejner4.value;
let lekce = kontejner5.value;
let dataZdroj = kontejner1.value;
let jazykPridany = kontejner4.value;s
dataZdroj = dataZdroj.replaceAll("\'", "\"");
dataZdroj = JSON.parse(dataZdroj);



  if (kontejner2.value) {
    let data = kontejner2.value;
    data = data.replaceAll("\'", "\"");
    data = JSON.parse(data);
    console.log(data);
    if (typ == "language") {
      let umisteni = false;
      while (!umisteni) {
        if (typeof data.slovicka[jazyk] != "undefined") {
          jazyk = jazyk + "_1";
        }
        else {
          umisteni = true;
        }
      }
      try {
        data.slovicka[jazyk] = dataZdroj.slovicka[jazykPridany];
        if(typeof dataZdroj.slovicka[jazykPridany]=="undefined"){
          error1=true;
        }
      }
      catch {
        error1 = true;
      }

    }
    else {
      let umisteniLekce = false;

      if (typeof data.slovicka[jazyk] == "undefined") {
        data.slovicka[jazyk] = {};
        umisteniLekce = true;
      }
      while (!umisteniLekce) {
        if (typeof data.slovicka[jazyk][lekce] != "undefined") {
          lekce = lekce + "_1";
        }
        else {
          umisteniLekce = true;
        }
      }
      let lekcePridana = kontejner5.value;
      try {
        data.slovicka[jazyk][lekce] = dataZdroj.slovicka[jazyk][lekcePridana];
        if( typeof dataZdroj.slovicka[jazyk][lekcePridana]=="undefined"){
          error1=true;
        }
      }
      catch {
        error1 = true;
      }

    } 
    if (error1 == false) {
      data = JSON.stringify(data);
      kontejner6.setAttribute("value", data);
      btnupdate.click();
    }
    else {
      errorKontejner.textContent = `Unfortunately, this ${typ} doesn´t exist anymore`;
      errorKontejner.hidden = false;
    }
    console.log(error1);

  }
