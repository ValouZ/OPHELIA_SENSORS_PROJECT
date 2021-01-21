const container = document.getElementById("app-container");
const backToTop = document.getElementById("app-back-top");


window.addEventListener("scroll", displayBackToTop);

displayCars();
// BACK2TOP(selector, offset, prop, time, effect, delay);
BACK2TOP(backToTop, 300 ,"all", 500,  "cubic-bezier(.15,.36,.09,.92)");

// Fonction affichant l'ensemble des véhicules
function displayCars() {
  // on va chercher l'api stocké en local
  fetch("ophelia.json")
    .then((response) => response.json())
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        // On place chaque voiture dans une section
        let newCar = document.createElement("section");
        newCar.classList.add("car");

        for (let j in data[i]) {
          // On place chaque caractéristique et leur nom dans une ligne
          let line = document.createElement("div");
          line.classList.add("line");
          line.innerHTML += "<h3>" + j + "</h3>";

          switch (j) {
            case "name":
              line.innerHTML = "<h2>" + data[i][j] + "</h2>";
              line.classList.add("name");
              break;
            // Si c'est on traite la description, on ajoute une classe description
            case "description":
              line.innerHTML += "<p>" + data[i][j] + "<p>";
              line.classList.add("description");
              break;
            // Si c'est une image, on place l'url dans une balise img
            case "img":
              line.innerHTML =
                '<img src="' +
                data[i][j] +
                '" alt="Image de ' +
                data[i].name +
                '">';
              line.classList.add("image");
              break;
            // Sinon on place le contenu dans une balise p
            default:
              line.innerHTML += "<p>" + data[i][j] + "<p>";
              break;
          }
          newCar.appendChild(line);
        }
        container.appendChild(newCar);
      }
    });
}

function displayBackToTop() {
  if (this.pageYOffset >= 300) {
    backToTop.classList.remove("hide");
  } else {
    backToTop.classList.add("hide");
  }
}
