import { makeGrid } from './grid';

const grid = makeGrid(5, 5);
const content = document.querySelector('.content');
content.appendChild(grid.element);
