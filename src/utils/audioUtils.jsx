import { Howl } from 'howler';

// Variable globale pour garder une référence à l'instance du son
let currentSound = null;

// Fonction pour jouer un son
export const playSound = (soundFile) => {
  // Si un son est déjà en cours, on le stoppe avant d'en jouer un nouveau
  if (currentSound) {
    currentSound.stop();
  }

  // Crée une nouvelle instance de Howl et la joue
  currentSound = new Howl({
    src: [soundFile],
    volume: 1, // Volume entre 0 et 1
    autoplay: true,
    loop: false, // Modifier si tu veux que le son soit en boucle
    onload: () => {
      console.log(`Le son ${soundFile} a été chargé avec succès.`);
    },
    onplay: () => {
      console.log(`Le son ${soundFile} commence à être joué.`);
    },
    onend: () => {
      console.log(`Le son ${soundFile} a été joué jusqu'à la fin.`);
    },
    onpause: () => {
      console.log(`Le son ${soundFile} a été mis en pause.`);
    },
    onstop: () => {
      console.log(`Le son ${soundFile} a été arrêté.`);
    }
  });

  currentSound.play();
};

// Fonction pour jouer un son en boucle
export const playLoopingSound = (soundFile) => {
  // Si un son est déjà en cours, on le stoppe avant d'en jouer un nouveau
  if (currentSound) {
    currentSound.stop();
  }

  // Crée une nouvelle instance de Howl et la joue en boucle
  currentSound = new Howl({
    src: [soundFile],
    volume: 1,
    autoplay: true,
    loop: true,
    onload: () => {
      console.log(`Le son ${soundFile} a été chargé avec succès.`);
    },
    onplay: () => {
      console.log(`Le son ${soundFile} commence à être joué en boucle.`);
    }
  });

  currentSound.play();
};

// Fonction pour arrêter un son
export const stopSound = () => {
  if (currentSound) {
    currentSound.stop();
    console.log("Le son a été arrêté.");
  } else {
    console.log("Aucun son à arrêter.");
  }
};
