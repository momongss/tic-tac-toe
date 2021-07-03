export default class GameNav {
  constructor($app, clearGame, clearBoard) {
    this.gameNavWrapper = document.createElement("div");
    this.gameNavWrapper.className = "game-nav-wrapper";

    this.clearGame = clearGame;
    this.clearBoard = clearBoard;

    $app.appendChild(this.gameNavWrapper);

    this.render();
  }

  render = () => {
    this.gameNavWrapper.innerHTML = `
            <div class="nav-btn new-game">
                <span>새로운 게임</span>
            </div>
            <div class="nav-btn reset-game">
                <span>판 갈기</span>
            </div>
        `;

    const $clearGameBtn = this.gameNavWrapper.querySelector(".new-game");
    $clearGameBtn.addEventListener("click", (e) => {
      this.clearGame();
    });

    const $clearBoardBtn = this.gameNavWrapper.querySelector(".reset-game");
    $clearBoardBtn.addEventListener("click", (e) => {
      this.clearBoard("새로운 판");
    });
  };
}
