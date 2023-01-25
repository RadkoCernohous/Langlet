'use strict';


const kontejner1 = document.getElementById("schovanyKontejner");
const kontejner2 = document.getElementById("schovanyKontejner2");
const kontejner3 = document.getElementById("schovanyKontejner3");
const kontejner4 = document.getElementById("schovanyKontejner4");
const kontejner5 = document.getElementById("schovanyKontejner5");
const kontejner6 = document.getElementById("schovanyKontejner6");

const btnupdate = document.getElementById("update");

let errorKontejner = document.getElementById("errorKontejner");

if (kontejner2.value) {
  if (kontejner2.value !== "") {
    let dataZdroj = kontejner1.value;
    dataZdroj = dataZdroj.replaceAll("\'", "\"");
    dataZdroj = JSON.parse(dataZdroj);
    let data = kontejner2.value;
    data = data.replaceAll("\'", "\"");
    data = JSON.parse(data);
    console.log(data);
    let typ = kontejner3.value;
    let jazyk = kontejner4.value;
    let lekce = kontejner5.value;
    let error1 = false;
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
      let jazykPridany = kontejner4.value;
      try {
        data.slovicka[jazyk] = dataZdroj.slovicka[jazykPridany];
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

  }
}
