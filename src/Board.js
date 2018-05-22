class Board {
    constructor(width, height) {
        
        // grid init
        this.gridElement = document.getElementById('grid');
        this.width = width;
        this.height = height;
        this.InitGrid();

        // feliratkozás
        window.addEventListener('worm/cellAdded', event => {
            this.UpdateCell(
                event.detail.rowIndex,
                event.detail.colIndex,
                'yellow'
            );
        });
        window.addEventListener('worm/cellRemoved', event => {
            this.UpdateCell(
                event.detail.rowIndex,
                event.detail.colIndex,
                'gray'
            );
        });
        window.addEventListener('apple/added', event => {
            this.UpdateCell(
                event.detail.rowIndex,
                event.detail.colIndex,
                'red'
            );
        });
    }

    InitGrid() {
        for (let rowIndex = 1; rowIndex <= this.height; rowIndex++) {
            let newRow = document.createElement('tr');

            for (let colIndex = 1; colIndex <= this.width; colIndex++) {
                let newCell = document.createElement('td');
                newRow.appendChild(newCell);
            }

            this.gridElement.appendChild(newRow);
        }
    }

    UpdateCell(rowIndex, colIndex, color) {
        // cella megkeresése
        let rows = this.gridElement.children,
            cell = rows[rowIndex].children[colIndex];

        // szín beállítása
        cell.style.backgroundColor = color;
    }
}
