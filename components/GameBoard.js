export default class GameBoard {
  constructor($app, onClickRoom) {
    this.onClickRoom = onClickRoom;

    this.point = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.$gameBoardWrapper = document.createElement("div");
    this.$gameBoardWrapper.className = "game-board-wrapper";

    $app.appendChild(this.$gameBoardWrapper);

    this.render();
  }

  setGameBoard = (point) => {
    this.point = point;
    this.render();
  };

  resetGameBoard = () => {};

  render = () => {
    this.$gameBoardWrapper.innerHTML = "";
    const $gameBoard = document.createElement("div");
    $gameBoard.className = "game-board";

    this.$gameBoardWrapper.appendChild($gameBoard);

    $gameBoard.innerHTML = `
            <div class="room x0 y0">${this.point[0][0]}</div>
            <div class="room x1 y0">${this.point[0][1]}</div>
            <div class="room x2 y0">${this.point[0][2]}</div>
            <div class="room x0 y1">${this.point[1][0]}</div>
            <div class="room x1 y1">${this.point[1][1]}</div>
            <div class="room x2 y1">${this.point[1][2]}</div>
            <div class="room x0 y2">${this.point[2][0]}</div>
            <div class="room x1 y2">${this.point[2][1]}</div>
            <div class="room x2 y2">${this.point[2][2]}</div>
        `;

    $gameBoard.addEventListener("click", (e) => {
      const classList = e.target.classList;
      if (classList.contains("room")) {
        const x = parseInt(classList[1].slice(1));
        const y = parseInt(classList[2].slice(1));

        this.onClickRoom(x, y);
      }
    });
  };
}
