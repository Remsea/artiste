import "bootstrap";
import { start, checkCapacity, removeFormatContainer, updateCapacityContainer, resizeCapaBlock } from './myjs.js';
import { Draggable } from '@shopify/draggable';
import { Droppable } from '@shopify/draggable';
import { Sortable } from '@shopify/draggable';
import { Plugins } from '@shopify/draggable';
import SwapAnimation from '@shopify/draggable/lib/plugins/swap-animation';

let capacityReached;

// initialisation des blocks quand on clique sur le btn start (width fct valeur)
if (document.querySelector('.start')) {
    document.querySelector('.start').addEventListener('click', start);
}

// initialisation de l'objet triable qui se trouve dans une div dropcontainer et avec la class atrier
const sortable = new Sortable(document.querySelectorAll('.dropcontainer'), {
    draggable: '.atrierservice'
});

// Au debut du drag, on verifie les capa des containers
sortable.on('sortable:start', function(e) { return checkCapacity(e) });

// Au stop du drag, on enleve le format rouge des containers avec une capa <
// et on met à jour les capacités des containers source et cible
sortable.on('sortable:stop', (e) => {
    removeFormatContainer(e);
    updateCapacityContainer(e);
});

// ne pas rendre possible le drop sur un nodropcontainer, c'est à dire un container avec une capa<
sortable.on('sortable:sort', (evt) => {
    console.log(evt);
    if (evt.dragEvent.overContainer.classList.contains('nodropcontainer')) {
        evt.cancel();
    }
    if (evt.dragEvent.overContainer.classList.contains('cardmetier')) {
        if (evt.dragEvent.overContainer.dataset.group != evt.dragEvent.originalSource.dataset.group) {
            evt.cancel();
        }
    }
});

// effet animé sur le mirror lors du premier deplacement
sortable.on('mirror:attached', (evt) => {
    setTimeout(function() { evt.data.mirror.firstElementChild.classList.add('rotation'); }, 100);
});

// effet animé sur le container si capa insuffisante (nodropcontainer class)
sortable.on('drag:over:container', (evt) => {
    if (evt.overContainer.classList.contains('nodropcontainer')) {
        evt.overContainer.classList.add('shake-bottom');
        setTimeout(function() { evt.overContainer.classList.remove('shake-bottom'); }, 1000);
    }
});