import { Subject } from 'rxjs';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

class Grid {
  get element() {
    return this._table;
  }

  get selectedCells() {
    return this._subject.asObservable();
  }

  constructor(grid, table, subject) {
    this._grid = grid;
    this._table = table;
    this._subject = subject;
  }
}

export function makeGrid(x, y) {
  const table = document.createElement('table');
  const array = [];
  const subject = new Subject();

  const hrow = document.createElement('tr');
  addHiddenCorner();
  addHeaders();
  table.appendChild(hrow);
  addRows();

  return new Grid(array, table, subject);

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
            (e) => subject.next(e.currentTarget));
        rows.push(td);
        row.appendChild(td);
      };

      array.push(rows);
      table.appendChild(row);
    }
  }
}
