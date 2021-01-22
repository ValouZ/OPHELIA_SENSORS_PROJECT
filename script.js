const container = document.getElementById("app-container");
const backToTop = document.getElementById("app-back-top");
const searchBar = document.getElementById("app-search-bar");
const numberOfCarDiv = document.getElementById("app-number-car");
const burger = document.getElementById("app-burger");
const menu = document.getElementById("app-menu");
const links = document.getElementsByClassName("link");
let cars = [];

// On écoute le scroll pour afficher le bouton back to top
window.addEventListener("scroll", displayBackToTop);

// on écoute les frappes dans le champ de l'input
searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  // Permet d'obtenir un tableau de voiture trié contenant uniquement celle
  // correspondant au champ de saisie
  let filteredCars = cars.filter((car) => {
    return car.name.toLowerCase().includes(searchString);
  });
  // On réaffiche les voitures correspondantes
  displayCars(filteredCars);
});

// On écoute le clic sur le burger
burger.addEventListener("click", showBurgerMenu);

// JE NE COMPRENDS PAS ARGHHHHHHH CA MARCHE PAS
for (let i = 0; i < links.length; i++) {
  console.log("yo");
  links[i].addEventListener("click", clearSearchBar);
}

// BACK2TOP(selector, offset, prop, time, effect, delay);
// Librairie permetttant d'animer le bouton back to top facilement
BACK2TOP(backToTop, 300, "all", 500, "cubic-bezier(.15,.36,.09,.92)");

// Fonction chargeant l'ensemble des voitures contenu dans l'api
// Elle appelle les fonctions d'affichage et d'ajout des noms de voitures
const loadCars = async () => {
  try {
    const res = await fetch("ophelia.json");
    cars = await res.json();
    displayCars(cars);
    addCarsMenu(cars);
  } catch (err) {
    console.error(err);
  }
};

// On charge toutes les voitures au lancement de la page
loadCars();

// Fonction affichant les voitures du tableau "cars" en paramètres
function displayCars(cars) {
  container.innerHTML = "";
  let carsLength = cars.length;
  numberOfCars(carsLength);
  for (let i = 0; i < carsLength; i++) {
    // On place chaque voiture dans un li
    let newCar = document.createElement("li");
    newCar.classList.add("car");

    for (let j in cars[i]) {
      // On place chaque caractéristique et leur nom dans une ligne
      let line = document.createElement("div");
      line.classList.add("line");

      // On met le nom de la catégorie dans une balise h3
      // J'utilise replace 3 fois de suite pour remplacer tous les "-" par des espaces 
      // Ce n'est pasla bonne solution mais je n'ai pas trouvé comment faire autrement 
      // et je sais qu'il n'y en a pas plus de 3 par titre 
      line.innerHTML += "<h3>" + j.replace("-s", "(s)").replace("-"," ").replace("-"," ") + "</h3>";

      switch (j) {
        case "name":
          line.innerHTML = "<h2>" + cars[i][j] + "</h2>";
          line.classList.add("name");
          // On supprime les espaces pour ajouter une ancre lié au menu
          line.id = cars[i][j].split(" ").join("");
          break;
        case "description":
          line.innerHTML += "<p>" + cars[i][j] + "<p>";
          line.classList.add("description");
          break;
        case "img":
          line.innerHTML =
            '<img src="' +
            cars[i][j] +
            '" alt="Image de ' +
            cars[i].name +
            '">';
          line.classList.add("image");
          break;
        default:
          line.innerHTML += "<p>" + cars[i][j] + "<p>";
          break;
      }
      newCar.appendChild(line);
    }
    container.appendChild(newCar);
  }
}

// Fonction affichant le nombre de voiture affichant sur la page
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

// Fonction ajoutant le nom de toutes les voitures dans le menu
const addCarsMenu = (cars) => {
  for (let i = 0; i < cars.length; i++) {
    menu.innerHTML +=
      '<li class="link"> <a href="#' +
      cars[i].name.split(" ").join("") +
      '">' +
      cars[i].name +
      " </a> </li>";
  }
};

// Fonction permettant d'afficher ou de cacher le menu burger
function showBurgerMenu() {
  menu.classList.toggle("show-menu");
  burger.classList.toggle("close");
}

// Fonction affichant le bouton back to top à partir de 300 de pageYOffset défilé
function displayBackToTop() {
  if (this.pageYOffset >= 300) {
    backToTop.classList.remove("hide");
  } else {
    backToTop.classList.add("hide");
  }
}

// Fonction qui reinitialise la barre de recherche
function clearSearchBar() {
  // searchBar.value = "";
  console.log(searchBar);
  displayCars(cars);
}
