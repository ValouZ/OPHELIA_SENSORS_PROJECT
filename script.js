const container = document.getElementById("app-container");
const backToTop = document.getElementById("app-back-top");
const searchBar = document.getElementById("app-search-bar");
const numberOfCarDiv = document.getElementById("app-number-car");
const burger = document.getElementById("app-burger");
const menu = document.getElementById("app-menu");
const links = document.getElementsByClassName("link");
const displayedCars = document.getElementsByClassName("car");
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

backToTop.addEventListener("click", () => {
  window.scroll(0, 0);
});

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
    let head = document.createElement("div");
    let moreInfo = document.createElement("div");
    let seeMoreButton = document.createElement("button");
    newCar.classList.add("car");
    head.classList.add("head");
    moreInfo.classList.add("more-info");
    seeMoreButton.classList.add("see-more");
    seeMoreButton.textContent = "Voir plus";
    for (let j in cars[i]) {
      // On place chaque caractéristique et leur nom dans une ligne
      let line = document.createElement("div");
      line.classList.add("line");

      let title = j.replace("-s", "(s)");
      while (title.includes("-")) {
        title = title.replace("-", " ");
      }

      // On met le nom de la catégorie dans une balise h3
      // On utilise une boucle pour remplacer tous les "-" des titres par des espaces
      line.innerHTML += "<h3>" + title + "</h3>";

      switch (j) {
        case "name":
          line.innerHTML = "<h2>" + cars[i][j] + "</h2>";
          line.classList.add("name");
          // On supprime les espaces pour ajouter une ancre lié au menu
          line.id = cars[i][j].split(" ").join("");
          head.appendChild(line);
          break;
        case "description":
          line.innerHTML += "<p>" + cars[i][j] + "<p>";
          line.classList.add("description");
          head.appendChild(line);
          break;
        case "img":
          line.innerHTML =
            '<img src="' +
            cars[i][j] +
            '" alt="Image de ' +
            cars[i].name +
            '">';
          line.classList.add("image");
          head.appendChild(line);
          break;
        default:
          line.innerHTML += "<p>" + cars[i][j] + "<p>";
          moreInfo.appendChild(line);
          break;
      }
      // newCar.appendChild(line);
    }
    seeMoreButton.addEventListener("click", () => {
      displayFullContent(seeMoreButton, moreInfo);
    });

    newCar.appendChild(head);
    newCar.appendChild(moreInfo);
    newCar.appendChild(seeMoreButton);
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
    let linkLI = document.createElement("li");
    let link = document.createElement("a");
    linkLI.classList.add("link");
    link.href = "#" + cars[i].name.split(" ").join("");
    link.textContent = cars[i].name;
    linkLI.appendChild(link);
    menu.appendChild(linkLI);
    link.addEventListener("click", clearSearchBar);
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
  if (searchBar.value != "") {
    searchBar.value = "";
    displayCars(cars);
  }
}

// Fonction affichant/masquant le contenu du parametre -info- en cliquant sur le bouton "Voir plus"
function displayFullContent(button, info) {
  if (info.classList.contains("display-content")) {
    button.textContent = "Voir plus";
    setTimeout(() => {
      info.classList.remove("display-content");
    }, 500);
  } else {
    button.textContent = "Réduire";
    info.classList.add("display-content");
  }

  // Nous replace en haut de la carte correspondant à notre voiture
  window.scroll({
    top: button.parentNode.offsetTop,
  });
}
