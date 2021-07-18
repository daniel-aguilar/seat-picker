import { makeGrid } from './grid';

let grid = makeGrid(5, 5);
let content = document.querySelector('.content');
content.appendChild(grid.element);
