// verifie les capacites des dropcontainers par rapport au composant draggé et ajoute la class notricontainer is insuffisante
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

const updateCapacityContainer = (e) => {
  if(e.data.newContainer.dataset.capacity){
      e.data.newContainer.dataset.capacity = parseInt(e.data.newContainer.dataset.capacity) - parseInt(e.data.dragEvent.data.source.dataset.capacity);
      e.data.newContainer.querySelector('.etiquette-info').firstChild.innerText = e.data.newContainer.dataset.capacity;
    }
  if (e.data.oldContainer.dataset.capacity){
    e.data.oldContainer.dataset.capacity = parseInt(e.data.oldContainer.dataset.capacity) + parseInt(e.data.dragEvent.data.source.dataset.capacity);
    e.data.oldContainer.querySelector('.etiquette-info').firstChild.innerText = e.data.oldContainer.dataset.capacity;
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

// effet sur la grid qui apparait
const entranceClass = () => {
  document.querySelector('.grid').classList.add('swing-in-top-fwd');
}

// supprime la class de l'effet sur grid et remet l'opacité à 1
const removeEntranceClass = () => {
  const mygrid = document.querySelector('.grid');
  mygrid.style.opacity = '1';
  mygrid.classList.remove('swing-in-top-fwd');
}

// apparition des etages en bouncing
const entranceBoucing = (mybuilding) => {
  let i;
  let j = mybuilding.children.length;
  for (i = 0 ; i < mybuilding.children.length; i++)
  {
    addClassBounce(mybuilding.children[i],j);
    j--;
  }
}

// ajout de la class bounce avec un delay sur chaque etage
const addClassBounce = (element,i) => {
  setTimeout(()=> {
                element.classList.add('bounce-in-top');
                element.style.opacity = '1';
                  }, 500 * i);
}

const removeClassBounce = (mybuilding) => {
  let i;
  for (i = 0 ; i < mybuilding.children.length; i++)
    {mybuilding.children[i].classList.remove('bounce-in-top');}
}

// dimensionnement des block
const resizeCapaBlock = (e) => {
  const size_factor = 2;
  const size_factor2 = 2.2;
  document.querySelectorAll('.atrierservice').forEach((element) => {
    element.firstChild.style.width = parseInt(element.dataset.capacity)/10 * size_factor + 'em';
    element.lastElementChild.innerText = element.dataset.capacity;
  });

  document.querySelectorAll('.dropcontainer').forEach((element) => {
    if (element.dataset.capacity)
      {
        element.style.width = parseInt(element.dataset.capacity)/10 * size_factor2 + 'em';
        element.lastElementChild.innerText = element.dataset.capacity;
      }
  });

}


export {checkCapacity, removeFormatContainer, updateCapacityContainer, resizeCapaBlock, start};
