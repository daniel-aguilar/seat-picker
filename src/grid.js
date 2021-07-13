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
        for (const n of Array(x).keys()) {
            let th = document.createElement('th');
            th.innerText = alphabet[n];
            hrow.appendChild(th);
        }
    }

    function addRows() {
        for (const i of Array(y).keys()) {
            let index = i + 1;
            let row = document.createElement('tr');
            let td = document.createElement('td');

            td.innerText = index;
            row.appendChild(td);
            for (const j of Array(x).keys()) {
                td = document.createElement('td');
                td.classList.add('data');
                td.classList.add('cell');
                td.dataset.value = alphabet[j] + index;
                td.addEventListener('click', getValue);
                row.appendChild(td);
            };

            table.appendChild(row);
        }
    }
}

function getValue(e) {
    let td = e.currentTarget;
    return td.dataset.value;
}
