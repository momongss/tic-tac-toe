export default class GameInfoBoard {
  constructor($app) {
    this.$InfoBoardWrapper = document.createElement("div");
    this.$InfoBoardWrapper.className = "info-board-wrapper";

    this.state = { score: { O: 0, X: 0 }, turn: "O" };

    $app.appendChild(this.$InfoBoardWrapper);

    this.render();
  }

  setState(state) {
    console.log(state);
    if (state.score != null) this.state.score = state.score;
    if (state.turn != null) this.state.turn = state.turn;
    this.render();
  }

  render = () => {
    this.$InfoBoardWrapper.innerHTML = `
      <div class="score-board">
        <div class="player-score">
          <div class="player-name">O</div>
          <div class="score">${this.state.score["O"]}점</div>
        </div>
        <div class="player-score">
          <div class="player-name">X</div>
          <div class="score">${this.state.score["X"]}점</div>
        </div>
      </div>
      <div class="turn-board">
        <span class="turn">턴 : ${this.state.turn}</div>
      </div>
    `;
  };
}
