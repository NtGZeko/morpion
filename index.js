// on charge les informations utilies
const status = document.querySelector('h2'); //je fais une const pour dire d'aller me chercher ma balise h2
let jeuActif = true; // je fais un let pour reglé sur true et qui par la suite passera à false pour savoir si je joue ou pas
let joueurActif = 'X'; // Je crée un let pour savoir si je joue le joueur X ou O
let etatJeu = ['', '', '', '', '', '', '', '', '']; // creation d'un tableau pour vide qui sera remplis avec des X ou O

const conditionsVictoire = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonale
  [0, 4, 8],
  [2, 4, 6],
];

// Message
const gagne = () => `Le joueur ${joueurActif} a gagné`;
const egalite = () => 'Egalité';
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`;

status.innerHTML = tourJoueur();

document
  .querySelectorAll('.case')
  .forEach((cell) => cell.addEventListener('click', gestionClicCase));
document.querySelector('#recommencer').addEventListener('click', recommencer);

function gestionClicCase() {
  // cette function permet d'aller chercher son nombre entier
  const indexCase = parseInt(this.dataset.index);
  // permet de verifier si dans etat jeu il y a quelque chose ou pas si il y a quelque chose il ne fait rien
  if (etatJeu[indexCase] !== '' || !jeuActif) {
    return;
  }
  etatJeu[indexCase] = joueurActif;
  this.innerHTML = joueurActif; // permet d'afficher mon resultat dans mes div

  verifGagne();
}

function verifGagne() {
  let tourGagnant = false;

  for (let conditionVictoire of conditionsVictoire) {
    let val1 = etatJeu[conditionVictoire[0]];
    let val2 = etatJeu[conditionVictoire[1]];
    let val3 = etatJeu[conditionVictoire[2]];
    if (val1 === '' || val2 === '' || val3 === '') {
      continue;
    }
    if (val1 === val2 && val2 === val3) {
      tourGagnant = true;
      break;
    }
  }

  if (tourGagnant) {
    status.innerHTML = gagne();
    jeuActif = false;
    return;
  }
  if (!etatJeu.includes('')) {
    status.innerHTML = egalite();
    jeuActif = false;
    return;
  }
  joueurActif = joueurActif === 'X' ? 'O' : 'X';
  status.innerHTML = tourJoueur();
}

function recommencer() {
  joueurActif = 'X';
  jeuActif = true;
  etatJeu = ['', '', '', '', '', '', '', '', ''];
  status.innerHTML = tourJoueur();
  document.querySelectorAll('.case').forEach((cell) => (cell.innerHTML = ''));
}
