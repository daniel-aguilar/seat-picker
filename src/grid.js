import { pull } from 'lodash-es';
import { Subject } from 'rxjs';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

class Grid {
  get element() {
    return this._table;
  }

  get selectedCells() {
    return this._subject.asObservable();
  }

  constructor(grid, table) {
    this._grid = grid;
    this._table = table;

    this._selectedCells = [];
    this._subject = new Subject();
  }

  block(cellList) {
    const cellCoordinates = cellList.map(c => this._decode(c));
    cellCoordinates.forEach(c => {
      const cell = this._grid[c.x][c.y];
      cell.element.classList.add('taken');
      cell.isAvailable = false;
    });
  }

  toggle(td) {
    const value = td.dataset.value;
    const c = this._decode(value);
    const cell = this._grid[c.x][c.y];
    const previouslySelected = this._selectedCells.slice();

    if (cell.isAvailable) {
      if (cell.isSelected) {
        pull(this._selectedCells, value);
      }
      else {
        this._selectedCells.push(value);
      }

      cell.isSelected = !cell.isSelected;
      cell.element.classList.toggle('selected');
      this._subject.next(
        JSON.stringify([previouslySelected, this._selectedCells])
      );
    }
  }

  _clearAll() {
    this._grid.forEach(row =>
      row.forEach(cell => {
        cell.element.classList.remove('taken');
        cell.isAvailable = true;
      })
    );
  }

  _decode(cellCoordinate) {
    const x = cellCoordinate.substring(0, 1);
    const y = cellCoordinate.substring(1, 2);

    const coordinates = {
      x: parseInt(x),
      y: parseInt(y),
    };

    return coordinates;
  }
}

export function makeGrid() {
  const x = 5, y = 5;
  const table = document.createElement('table');
  const array = [];
  const subject = new Subject();
  const grid = new Grid(array, table);

  const hrow = document.createElement('tr');
  addHiddenCorner();
  addHeaders();
  table.appendChild(hrow);
  addRows();

  return grid;

  function addHiddenCorner() {
    const th = document.createElement('th');
    hrow.appendChild(th);
  }

  function addHeaders() {
    for (const n of Array(x).keys()) {
      const th = document.createElement('th');
      th.innerText = alphabet[n];
      hrow.appendChild(th);
    }
  }

  function addRows() {
    for (const i of Array(y).keys()) {
      const row = document.createElement('tr');
      const rows = [];
      let td = document.createElement('td');

      td.innerText = i + 1;
      row.appendChild(td);
      for (const j of Array(x).keys()) {
        td = document.createElement('td');
        td.classList.add('cell');
        td.dataset.value = '' + i + j;
        td.addEventListener('click',
            (e) => grid.toggle(e.currentTarget));
        rows.push({
          isAvailable: true,
          isSelected: false,
          element: td,
        });
        row.appendChild(td);
      };

      array.push(rows);
      table.appendChild(row);
    }
  }
}
