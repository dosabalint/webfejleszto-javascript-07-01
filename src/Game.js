class Game {
    constructor() {
        // megjelenítés
        this.board = new Board(30, 20);

        // kukac
        this.worm = new Worm(1, 1);

        // állapotváltozók
        this.gameOver = false;

        // almák
        this.appleCell = null;
        this.GenerateApple();

        // feliratkozás
        window.addEventListener('keydown', event => {
            this.OnKeyDown(event.key);
        });
        window.addEventListener('tick', () => {
            this.MoveWorm();
        });

        // időzítő
        this.Tick();
    }

    // mozgatás

    MoveWorm() {
        // ha a következő lépés kivinne a tábláról, akkor vége a játéknak
        if (this.IsNextCellOutOfBoard()) {
            alert('Game over');
            this.gameOver = true;
            return;
        }

        // ha a következő cella egy alma, akkor növekedjen
        if (this.IsNextCellApple()) {
            this.worm.Grow(5);
            this.GenerateApple();
        }

        this.worm.Move();
    }

    IsNextCellOutOfBoard() {
        let nextCell = this.worm.GetNextCell();

        // sor index -1
        if (nextCell.row >= this.board.height) {
            return true;
        }

        // sor index max
        if (nextCell.row < 0) {
            return true;
        }

        // oszlop index -1
        if (nextCell.col >= this.board.width) {
            return true;
        }

        // oszlop index max
        if (nextCell.col < 0) {
            return true;
        }

        return false;
    }

    IsNextCellApple() {
        let nextCell = this.worm.GetNextCell();

        return (
            nextCell.row == this.appleCell.rowIndex &&
            nextCell.col == this.appleCell.colIndex
        );
    }

    // almák

    GenerateApple() {
        let rowIndex = Math.round(Math.random() * (this.board.height - 1)),
            colIndex = Math.round(Math.random() * (this.board.width - 1));
        this.appleCell = { rowIndex: rowIndex, colIndex: colIndex };
        this.TriggerAppleAdded();
    }

    TriggerAppleAdded() {
        window.dispatchEvent(
            new CustomEvent('apple/added', { detail: this.appleCell })
        );
    }

    // eseménykezelők

    OnKeyDown(key) {
        switch (key) {
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowLeft':
                let direction = key.replace('Arrow', '').toLowerCase();
                this.worm.SetDirection(direction);
        }
    }

    // időzítő

    Tick() {
        // validálás
        if (this.gameOver) {
            return;
        }

        // esemény tüzelés
        window.dispatchEvent(new Event('tick'));

        // időzítés
        setTimeout(() => {
            this.Tick();
        }, 100);
    }
}
