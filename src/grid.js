import { Subject } from 'rxjs';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

class Grid {
    #grid;
    #table;
    #subject;

    get element() {
        return this.#table;
    }

    get selectedCells() {
        return this.#subject.asObservable();
    }

    constructor(grid, table, subject) {
        this.#grid = grid;
        this.#table = table;
        this.#subject = subject;
    }
}

export function makeGrid(x, y) {
    let table = document.createElement('table');
    const array = [];
    const subject = new Subject();

    let hrow = document.createElement('tr');
    addHiddenCorner();
    addHeaders();
    table.appendChild(hrow);
    addRows();

    return new Grid(array, table, subject);

    function addHiddenCorner() {
        let th = document.createElement('th');
        hrow.appendChild(th);
    }

    function addHeaders() {
        for (const n of Array(x).keys()) {
            let th = document.createElement('th');
            th.innerText = alphabet[n];
            hrow.appendChild(th);
        }
    }

    function addRows() {
        for (const i of Array(y).keys()) {
            let row = document.createElement('tr');
            let td = document.createElement('td');
            let rows = [];

            td.innerText = i + 1;
            row.appendChild(td);
            for (const j of Array(x).keys()) {
                td = document.createElement('td');
                td.classList.add('data');
                td.classList.add('cell');
                td.dataset.value = '' + i + j;
                td.addEventListener('click',
                        (e) => subject.next(e.currentTarget))
                rows.push(td);
                row.appendChild(td);
            };

            array.push(rows);
            table.appendChild(row);
        }
    }
}
