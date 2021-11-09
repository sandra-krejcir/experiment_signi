const picks = {
  first: false,
  second: false,
};

let arrayOfPicks = [];

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks

  document
    .querySelectorAll(".buTTon")
    .forEach((pick) => pick.addEventListener("click", togglePicks));

  document.querySelector(".submit").addEventListener("click", pushData);
}

function togglePicks(event) {
  const target = event.currentTarget;
  const pick = target.dataset.feature;

  if (picks[pick] === false) {
    picks[pick] = true;
  } else {
    picks[pick] = false;
  }

  if (picks[pick]) {
    arrayOfPicks.push(pick);
  } else {
    const pickIndex = arrayOfPicks.indexOf(pick);
    arrayOfPicks.splice(pickIndex, 1);
  }

  console.log(arrayOfPicks);
}

function pushData() {
  const payload = {
    features: arrayOfPicks,
  };

  fetch("https://kea21s-6eb0.restdb.io/rest/experiment", {
    method: "POST",
    headers: {
      "x-apikey": "606d606af55350043100752e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      arrayOfPicks = [];
    })
    .catch((err) => {
      console.error(err);
    });
}
