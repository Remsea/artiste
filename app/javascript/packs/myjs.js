// verifie les capacites des dropcontainers par rapport au composant draggé et ajoute la class notricontainer si insuffisante
const checkCapacity = (e) => {
  let capa = e.data.dragEvent.data.source.dataset.capacity;
    if (document.querySelectorAll('.dropcontainer.capa'))
    {
      const mescibles = document.querySelectorAll('.dropcontainer.capa');
      mescibles.forEach((cible) => {
        if (parseInt(cible.dataset.capacity) < parseInt(capa)) {
          if (cible !== e.data.startContainer){
                    cible.classList.remove('dropcontainer');
                    cible.classList.add('nodropcontainer');
          }
        }
      });
    }
}

// enleve toutes les class nodropcontainer (appelé une fois le drag terminé)
const removeFormatContainer = (e) => {
  if (document.querySelectorAll('.nodropcontainer')){
    document.querySelectorAll('.nodropcontainer').forEach(element => {
        element.className = element.className.replace(/nodropcontainer/ , 'dropcontainer');
    });
  }
}

// on met à jour les capacités des containers et l'affichage en appelant la fonction updateValuesEtage
const updateCapacityContainer = (e) => {
  if(e.data.newContainer.dataset.capacity){
      e.data.newContainer.dataset.capacity = parseInt(e.data.newContainer.dataset.capacity) - parseInt(e.data.dragEvent.data.source.dataset.capacity);
      // e.data.newContainer.querySelector('.etiquette-info').firstChild.innerText = e.data.newContainer.dataset.capacity;
      updateValuesEtage(e.data.newContainer);
    }
  if (e.data.oldContainer.dataset.capacity){
      e.data.oldContainer.dataset.capacity = parseInt(e.data.oldContainer.dataset.capacity) + parseInt(e.data.dragEvent.data.source.dataset.capacity);
      // e.data.oldContainer.querySelector('.etiquette-info').firstChild.innerText = e.data.oldContainer.dataset.capacity;
      updateValuesEtage(e.data.oldContainer);
    }
}

// fonction lancée a partir du btn start qui fait apparaitre les blocs et appelle le dimensionnement
const start = (e) => {
  e.preventDefault();
  const mybuilding = document.querySelector(".inside-building");
  setTimeout(entranceClass,10);
  setTimeout(() => {entranceBoucing(mybuilding);}, 600);
  setTimeout(() => {resizeCapaBlock(e);}, 600);

  setTimeout(removeEntranceClass, 2000);
  setTimeout(() => {removeClassBounce(mybuilding);}, 600 + 1200 * mybuilding.children.length);
}

// effet sur la row (instead of grid) qui apparait (.row instead of grid)
const entranceClass = () => {
  document.querySelector('.row').classList.add('swing-in-top-fwd');
}

// supprime la class de l'effet sur grid et remet l'opacité à 1
const removeEntranceClass = () => {
  const mygrid = document.querySelector('.row');
  mygrid.style.opacity = '1';
  mygrid.classList.remove('swing-in-top-fwd');
}

// apparition des etages en bouncing
const entranceBoucing = (mybuilding) => {
  let i;
  let j = mybuilding.children.length;

  for (i = 0 ; i < mybuilding.children.length; i++)
  {
    showUpEtiquetteInfo(mybuilding.children[i], parseInt(mybuilding.children.length));
    addClassBounce(mybuilding.children[i], j);
    j--;
  }
}

// ajout de la class bounce avec un delay sur chaque etage (element est le dropcontainer)
const addClassBounce = (element, j) => {
  setTimeout(()=> {
                element.classList.add('bounce-in-top');
                element.style.opacity = '1';
                console.log(500 * j);
                  }, 500 * j);
}

//set up de la distance entre l'etage et l etiquette info (element est le dropcontainer)
//divided by 15 because the element has a css width set to 15em -> update if changes
const showUpEtiquetteInfo = (element, i) => {
   setTimeout(()=> {
    let emvalue = parseInt(element.querySelector('.etiquette-info').offsetWidth) / 13 ;
    // let offsetvalue = 4 + ((parseInt(element.parentNode.offsetWidth) / parseInt(emvalue)) - (parseInt(element.offsetWidth)/ parseInt(emvalue))) / 2 ;
    let offsetvalue = 10 * emvalue + ((parseInt(element.parentNode.offsetWidth) ) - (parseInt(element.offsetWidth))) / 2 ;
   console.log("parent width",element.parentNode.offsetWidth / parseInt(emvalue), 'element width', element.offsetWidth / parseInt(emvalue), 'emvalue', emvalue, 'offsetvalue', offsetvalue );
    const mediaquery = window.matchMedia("(max-width: 360px)");
    if (mediaquery.matches) {offsetvalue -= 10;}
    element.querySelector('.etiquette-info').style.right = -offsetvalue +'px';
   }, 800 * i);

}

// supprimer la class bouncing sur les etages
const removeClassBounce = (mybuilding) => {
  let i;
  for (i = 0 ; i < mybuilding.children.length; i++)
    {mybuilding.children[i].classList.remove('bounce-in-top');}
}

// dimensionnement des blocks
const resizeCapaBlock = (e) => {
  const size_factor = 0.45;
  const size_factor2 = 0.40;
  let i = 1;
  document.querySelectorAll('.atrierservice').forEach((element) => {
    element.firstElementChild.style.width = parseInt(element.dataset.capacity)/10 * size_factor + 'em';
    updateCapacityPopSurface(element,element.dataset.capacity, i);
    i++;
  });

  document.querySelectorAll('.dropcontainer.capa').forEach((element) => {
    if (element.dataset.capacity)
      {
        element.style.width = parseInt(element.dataset.capacity)/10 * size_factor2 + 'em';
        updateValuesEtage(element);
        // element.lastElementChild.innerText = element.dataset.capacity;
      }
  });

}

//modification des valeurs pour chaque plateau, element est un dropcontainer avec capa

const updateValuesEtage = (element) => {
  let etiquetteInfo = element.querySelector('.etiquette-info');
  let surfaceUtilise = element.dataset.capacity;
  let surfaceOriginal = element.dataset.originalcapacity;

  Array.from(etiquetteInfo.children).forEach((etiquetteChild) => {
                        etiquetteChild.classList.contains('pop-pourcentage') ? (etiquetteChild.innerText = (Math.round(parseInt(surfaceUtilise) / parseInt(surfaceOriginal) * 100)) + '%' ) : '';
                        etiquetteChild.classList.contains('pop-surface-utilise') ? (etiquetteChild.innerText = surfaceUtilise) : '';
                        etiquetteChild.classList.contains('surface-total') ? (etiquetteChild.innerText = '/ ' + surfaceOriginal) : '';
                          });
}

//affichage des surfaces par service dans block pop-surface

const updateCapacityPopSurface = (element, surface, i) => {
  setTimeout(()=> {
    element.querySelector('.pop-surface').innerText = surface + ' m2';
    element.querySelector('.pop-surface').style.opacity = 1;
    }, 2000 + 400 * parseInt(i));
}



export {checkCapacity, removeFormatContainer, updateCapacityContainer, resizeCapaBlock, start};
