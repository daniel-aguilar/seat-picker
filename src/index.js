import { makeGrid } from './grid';

const grid = makeGrid();
const content = document.querySelector('.content');
content.appendChild(grid.element);
