var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
var apiToken = "?token=ynKHQmxhU9DsUZfQT5HW3HspxGN3d-0h1OPwSUT2gEw";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/families" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      handleResponse(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
var longArray;

const longKingdom = (family) => {
  return (family.name.length > 10);
}

const getName = (family) => {
  return family.name;
}

const handleResponse = (requestResponse) => {
  const jsonified = JSON.parse(requestResponse);
  const familiesArray = jsonified.data;
  longArray = familiesArray.filter(longKingdom);
  console.log(longArray);
}



const displayDiv = () => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrapper");
  const text = document.createElement("p");
  text.setAttribute("id", "Families")
  longArray == null ? text.innerHTML = "Haven't recieved a response yet, try again." : text.innerHTML = longArray.map(getName);
  wrapper.appendChild(text);

  const button = document.getElementById("control");
  document.body.insertBefore(wrapper, button);
  console.log(longArray);
}