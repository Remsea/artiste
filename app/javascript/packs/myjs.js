
const checkCapacity = (e) =>
{ rotate(e);
  let capa = e.data.dragEvent.data.source.dataset.capacity;
    if (document.querySelectorAll('.tricontainer.capa'))
    {
      const mescibles = document.querySelectorAll('.tricontainer.capa');
      mescibles.forEach((cible) => {
        console.log(cible.dataset.capacity, capa);

        if (parseInt(cible.dataset.capacity) < parseInt(capa)) {
          if (cible !== e.data.startContainer){
                    cible.classList.remove('tricontainer');
                    cible.classList.add('notricontainer');
          }
        }
      });
    }
}

const rotate = (e) => {console.log(e);
// e.data.dragEvent.data.source.style.opacity ='0.4';
// e.data.dragEvent.data.originalSource.style.opacity ='0.1';
};
// e.data.dragEvent.data.source.classList.toggle('rotate')
const removeFormatContainer = (e) => {
  if (document.querySelectorAll('.notricontainer')){
    document.querySelectorAll('.notricontainer').forEach(element => {
        element.className = element.className.replace(/notricontainer/ , 'tricontainer');
    });
  }
  rotate(e);
}

const updateCapacityContainer = (e) => {
  if(e.data.newContainer.dataset.capacity){
      e.data.newContainer.dataset.capacity = parseInt(e.data.newContainer.dataset.capacity) - parseInt(e.data.dragEvent.data.source.dataset.capacity);
      e.data.newContainer.querySelector('.etiquette').innerText = e.data.newContainer.dataset.capacity;
    }
  if (e.data.oldContainer.dataset.capacity){
    e.data.oldContainer.dataset.capacity = parseInt(e.data.oldContainer.dataset.capacity) + parseInt(e.data.dragEvent.data.source.dataset.capacity);
    e.data.oldContainer.querySelector('.etiquette').innerText = e.data.oldContainer.dataset.capacity;
  }
}

const resizeCapaBlock = (e) => {
  const size_factor = 2;
  const size_factor2 = 2.2;
  e.preventDefault();
  document.querySelectorAll('.atrier').forEach((element) => {
    element.firstChild.style.width = parseInt(element.dataset.capacity)/10 * size_factor + 'em';
    element.lastElementChild.innerText = element.dataset.capacity;
  });

  document.querySelectorAll('.tricontainer').forEach((element) => {
    if (element.dataset.capacity)
      {
        element.style.width = parseInt(element.dataset.capacity)/10 * size_factor2 + 'em';
        element.lastElementChild.innerText = element.dataset.capacity;
      }
  });
}


export {checkCapacity, removeFormatContainer, updateCapacityContainer, resizeCapaBlock, rotate};
