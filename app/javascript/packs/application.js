import "bootstrap";
import {checkCapacity, removeFormatContainer, updateCapacityContainer, resizeCapaBlock, rotate} from './myjs.js';
import { Draggable } from '@shopify/draggable';
import { Droppable } from '@shopify/draggable';
import { Sortable } from '@shopify/draggable';
import { Plugins } from '@shopify/draggable';
import SwapAnimation from '@shopify/draggable/lib/plugins/swap-animation';
// myfunction();

// const draggable = new Draggable(document.querySelectorAll('ul'), {
//   draggable: 'li',
//   handle: '.rem'
// });

// draggable.on('drag:start', (e) => console.log(e.sourceContainer));
// draggable.on('drag:move', () => console.log('drag:move'));
// draggable.on('drag:stop', () => console.log('drag:stop'));
let capacityReached;
document.querySelector('.start').addEventListener('click', function(e){return resizeCapaBlock(e)})



const sortable = new Sortable(document.querySelectorAll('.tricontainer'), {
  draggable: '.atrier'
});

sortable.on('sortable:start', function(e){return checkCapacity(e)});
// sortable.on('sortable:sort', () => console.log('sortable:sort', sortable.containers));
sortable.on('sortable:sorted', (e) => console.log('sorted'));
sortable.on('sortable:stop', (e) => {
  removeFormatContainer(e);
  updateCapacityContainer(e);
  }
);

sortable.on('sortable:sort', (evt) => {
    if (evt.dragEvent.overContainer.classList.contains('notricontainer')) {
      evt.cancel();
      }
    }
  );

sortable.on('mirror:attached', (evt) => {
  setTimeout(function(){evt.data.mirror.firstChild.classList.add('rotation');}, 100)

    // evt.data.mirror.firstChild.style.setProperty('transform','rotate(35deg)');
    }
  );


// const droppable = new Droppable(document.querySelectorAll('.container'), {
//   draggable: '.item',
//   dropzone: '.dropzone'
// });



// const droppable2 = new Droppable(document.querySelectorAll('.box'), {
//   draggable: '.card',
//   swapAnimation: {
//     duration: 600,
//     easingFunction: 'ease-in-out',
//     horizontal: true
//   },
//   plugins: [Plugins.SwapAnimation],
//   dropzone: '.dropzone'
// });

// droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
// droppable.on('droppable:returned', () => console.log('droppable:returned'));
