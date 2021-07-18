import { makeGrid } from './grid';
import { Client } from './client';

const grid = makeGrid();
const content = document.querySelector('.grid');
const playerCounter = document.querySelector('#player-count');
content.appendChild(grid.element);

const client = new Client();
client.updates.subscribe(msg => {
  playerCounter.innerHTML = msg.players;
  grid.block(msg.seats);
});

grid.selectedCells.subscribe(cells =>
  client.ws.send(cells)
);
