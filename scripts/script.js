gsap.registerPlugin(MotionPathPlugin);

// Convertir l'ellipse en chemin pour MotionPathPlugin
const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
circlePath.id = "circlePath";

let items = gsap.utils.toArray(".item"),
    numItems = items.length,
    tracker = { item: 0 };

// Fonction pour positionner tous les items autour de l'ovale avec l'item actif en bas
function positionItems() {
  const angleStep = Math.PI * 2 / numItems; // Étape de l'angle autour de l'ovale
  const angleOffset = Math.PI / 2; // Décalage pour l'item actif en bas

  items.forEach((item, i) => {
      const angle = (i - tracker.item) * angleStep + angleOffset;
      const x = 400 * Math.cos(angle) + 1010; // Position X sur l'ovale
      const y = 150 * Math.sin(angle) + 570;

      gsap.to(item, {
          duration: 1,
          x: x,
          y: y,
          ease: "power2.inOut",
          scale: item.classList.contains("active") ? 1.2 : 1 // Ajuste la taille
      });
  });

  // Met à jour la section affichée
  updateActiveSection();
}

// Fonction pour changer l'item actif
function moveWheel(amount) {
  tracker.item = (tracker.item + amount + numItems) % numItems;

  // Supprimer la classe 'active' de tous les éléments
  items.forEach(item => item.classList.remove("active"));

  // Ajouter la classe 'active' au nouvel élément actif
  items[tracker.item].classList.add("active");

  // Repositionner les items
  positionItems();
}

// Fonction pour afficher la section de l'item actif
function updateActiveSection() {
  const activeItem = items[tracker.item];
  const targetPageId = activeItem.getAttribute("data-target");
  showPage(targetPageId);
}

// Fonction pour afficher une section spécifique
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
      page.style.display = page.id === pageId ? 'block' : 'none';
  });
}

// Boutons pour naviguer dans le carrousel
document.getElementById("next").addEventListener("click", function () {
  moveWheel(1);
});

document.getElementById("prev").addEventListener("click", function () {
  moveWheel(-1);
});

// Initialisation
positionItems();





$(document).ready(function() {
  var nombre = $("#container ul li").length;
  var ecart = 360 / nombre;
  var centerX = $("#container").width() / 2;
  var centerY = $("#container").height() / 2;
  var radius = 200;
  var angles = [];

  function positionElements() {
      for (var i = 0; i < nombre; i++) {
          var angle = angles[i] * (Math.PI / 180);
          var x = centerX + radius * Math.cos(angle) - $("#container ul li").width() / 2;
          var y = centerY + radius * Math.sin(angle) - $("#container ul li").height() / 2;
          $("#container li:eq(" + i + ")").css({ left: x + 'px', top: y + 'px' });
      }
  }

  for (var i = 0; i < nombre; i++) {
      angles.push(i * ecart);
  }

  positionElements();

  $("button.gauche").click(function() {
      for (var i = 0; i < nombre; i++) {
          angles[i] += ecart;
      }
      positionElements();
  });

  $("button.droite").click(function() {
      for (var i = 0; i < nombre; i++) {
          angles[i] -= ecart;
      }
      positionElements();
  });
});