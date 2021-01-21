const container = document.getElementById("app-container");
const backToTop = document.getElementById("app-back-top");
const searchBar = document.getElementById("app-search-bar");
const numberOfCarDiv = document.getElementById("app-number-car");
let cars = [];

window.addEventListener("scroll", displayBackToTop);
searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  // console.log(searchString);
  let filteredCars = cars.filter((car) => {
    return car.name.toLowerCase().includes(searchString);
  });
  displayCars(filteredCars);
});

// BACK2TOP(selector, offset, prop, time, effect, delay);
BACK2TOP(backToTop, 300, "all", 500, "cubic-bezier(.15,.36,.09,.92)");

// Fonction affichant l'ensemble des véhicules
const loadCars = async () => {
  try {
    const res = await fetch("ophelia.json");
    cars = await res.json();
    displayCars(cars);
  } catch (err) {
    console.error(err);
  }
};

const displayCars = (cars) => {
  container.innerHTML = "";
  let carsLength = cars.length;
  numberOfCars(carsLength);
  for (let i = 0; i < carsLength; i++) {
    // On place chaque voiture dans une section
    let newCar = document.createElement("li");
    newCar.classList.add("car");

    for (let j in cars[i]) {
      // On place chaque caractéristique et leur nom dans une ligne
      let line = document.createElement("div");
      line.classList.add("line");
      line.innerHTML += "<h3>" + j + "</h3>";

      switch (j) {
        case "name":
          line.innerHTML = "<h2>" + cars[i][j] + "</h2>";
          line.classList.add("name");
          break;
        // Si c'est on traite la description, on ajoute une classe description
        case "description":
          line.innerHTML += "<p>" + cars[i][j] + "<p>";
          line.classList.add("description");
          break;
        // Si c'est une image, on place l'url dans une balise img
        case "img":
          line.innerHTML =
            '<img src="' +
            cars[i][j] +
            '" alt="Image de ' +
            cars[i].name +
            '">';
          line.classList.add("image");
          break;
        // Sinon on place le contenu dans une balise p
        default:
          line.innerHTML += "<p>" + cars[i][j] + "<p>";
          break;
      }
      newCar.appendChild(line);
    }
    container.appendChild(newCar);
  }
};

const numberOfCars = (length) => {
  numberOfCarDiv.classList.remove("zero");
  switch (length) {
    case 0:
      numberOfCarDiv.innerHTML = "Aucun modèle trouvé";
      numberOfCarDiv.classList.add("zero");
      break;
    case 1:
      numberOfCarDiv.innerHTML = length + " modèle trouvé";
      break;
    default:
      numberOfCarDiv.innerHTML = length + " modèles trouvés";
  }
};

loadCars();

// .then((response) => response.json())
// .then(function (data) {
//   for (let i = 0; i < data.length; i++) {
//     // On place chaque voiture dans une section
//     let newCar = document.createElement("li");
//     newCar.classList.add("car");

//     for (let j in data[i]) {
//       // On place chaque caractéristique et leur nom dans une ligne
//       let line = document.createElement("div");
//       line.classList.add("line");
//       line.innerHTML += "<h3>" + j + "</h3>";

//       switch (j) {
//         case "name":
//           line.innerHTML = "<h2>" + data[i][j] + "</h2>";
//           line.classList.add("name");
//           break;
//         // Si c'est on traite la description, on ajoute une classe description
//         case "description":
//           line.innerHTML += "<p>" + data[i][j] + "<p>";
//           line.classList.add("description");
//           break;
//         // Si c'est une image, on place l'url dans une balise img
//         case "img":
//           line.innerHTML =
//             '<img src="' +
//             data[i][j] +
//             '" alt="Image de ' +
//             data[i].name +
//             '">';
//           line.classList.add("image");
//           break;
//         // Sinon on place le contenu dans une balise p
//         default:
//           line.innerHTML += "<p>" + data[i][j] + "<p>";
//           break;
//       }
//       newCar.appendChild(line);
//     }
//     container.appendChild(newCar);
//   }
// });

function displayBackToTop() {
  if (this.pageYOffset >= 300) {
    backToTop.classList.remove("hide");
  } else {
    backToTop.classList.add("hide");
  }
}
