import "bootstrap";
import {start, checkCapacity, removeFormatContainer, updateCapacityContainer, resizeCapaBlock} from './myjs.js';
import { Draggable } from '@shopify/draggable';
import { Droppable } from '@shopify/draggable';
import { Sortable } from '@shopify/draggable';
import { Plugins } from '@shopify/draggable';
import SwapAnimation from '@shopify/draggable/lib/plugins/swap-animation';

let capacityReached;

// initialisation des blocks quand on clique sur le btn start (width fct valeur)
document.querySelector('.start').addEventListener('click', function(e){return start(e)})

// initialisation de l'objet triable qui se trouve dans une div tricontainer et avec la class atrier
const sortable = new Sortable(document.querySelectorAll('.tricontainer'), {
  draggable: '.atrier'
});

// Au debut du drag, on verifie les capa des containers
sortable.on('sortable:start', function(e){return checkCapacity(e)});

// Au stop du drag, on enleve le format rouge des containers avec une capa <
// et on met à jour les capacités des containers source et cible
sortable.on('sortable:stop', (e) => {
  removeFormatContainer(e);
  updateCapacityContainer(e);
  }
);

// ne pas rendre possible le drop sur un notricontainer, c'est à dire un container avec une capa<
sortable.on('sortable:sort', (evt) => {
    if (evt.dragEvent.overContainer.classList.contains('notricontainer'))
      {
        evt.cancel();
      }
    }
  );

// effet animé sur le mirror lors du premier deplacement
sortable.on('mirror:attached', (evt) => {
  setTimeout(function(){evt.data.mirror.firstChild.classList.add('rotation');}, 100);
    }
  );

// effet animé sur le container si capa insuffisante (notricontainer class)
sortable.on('drag:over:container', (evt) => {
    if (evt.overContainer.classList.contains('notricontainer'))
      {
        evt.overContainer.classList.add('shake-bottom');
        setTimeout(function(){evt.overContainer.classList.remove('shake-bottom');},1000);
      }
    }
  );
