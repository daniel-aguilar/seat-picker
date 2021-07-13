const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const tClass = '';

export function makeGrid(x, y) {
    let table = document.createElement('table');

    let hrow = document.createElement('tr');
    addHiddenCorner();
    addHeaders();
    table.appendChild(hrow);
    addRows();

    return table;

    function addHiddenCorner() {
        let th = document.createElement('th');
        hrow.appendChild(th);
    }

    function addHeaders() {
        for (let n of Array(x).keys()) {
            let th = document.createElement('th');
            th.innerText = alphabet[n];
            hrow.appendChild(th);
        }
    }

    function addRows() {
        for (let n of Array(y).keys()) {
            let row = document.createElement('tr');
            let td = document.createElement('td');

            td.innerText = n;
            row.appendChild(td);
            [...Array(x).keys()].forEach(() => {
                td = document.createElement('td');
                td.classList.add('data');
                td.classList.add('cell');
                row.appendChild(td);
            });

            table.appendChild(row);
        }
    }
}