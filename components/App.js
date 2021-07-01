import Header from "./Header.js";
import GameInfoBoard from "./GameInfoBoard.js";
import GameBoard from "./GameBoard.js";
import GameNav from "./GameNav.js";
import Alarm from "./Alarm.js";

const MAXTURNCNT = 9;

const RESULT_DRAW = 0;
const RESULT_PLAY = 1;
const RESULT_WINLOSE = 2;

export default class App {
  constructor($app) {
    this.point = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.turn = "O";
    this.turnCnt = 0;

    this.score = {
      O: 0,
      X: 0,
    };

    this.Header = new Header($app);
    this.InfoBoard = new GameInfoBoard($app);
    this.GameBoard = new GameBoard($app, this.onClickRoom);
    this.GameNav = new GameNav($app, this.clearGame, this.clearBoard);
    this.Alarm = new Alarm($app);
  }

  onClickRoom = (x, y) => {
    // 이미 둔 자리
    if (this.point[y][x] != "") return false;

    this.point[y][x] = this.turn;
    this.GameBoard.setGameBoard(this.point);

    const gameResult = this.checkResult();
    if (gameResult === RESULT_DRAW) {
      this.Alarm.setState({ alarmText: "DRAW!!", show: true });
      setTimeout(() => {
        this.Alarm.setState({ show: false });
      }, 1500);

      this.clearBoard();
    } else if (gameResult === RESULT_WINLOSE) {
      this.Alarm.setState({ alarmText: `WIN ${this.turn} !!`, show: true });
      setTimeout(() => {
        this.Alarm.setState({ show: false });
      }, 1500);

      this.clearBoard();

      this.score[this.turn]++;
      this.InfoBoard.setState({ score: this.score });
    }

    this.changeTurn();
  };

  clearGame = () => {
    this.turn = "O";
    this.turnCnt = 0;

    this.point = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.score = {
      O: 0,
      X: 0,
    };

    this.GameBoard.setGameBoard(this.point);
    this.InfoBoard.setState({ score: this.score, turn: this.turn });
  };

  clearBoard = () => {
    this.point = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.GameBoard.setGameBoard(this.point);
    this.turnCnt = 0;
  };

  changeTurn = () => {
    if (this.turn === "O") {
      this.turn = "X";
    } else {
      this.turn = "O";
    }

    this.InfoBoard.setState({ turn: this.turn });
  };

  checkResult = () => {
    const len = 3;

    // y축
    for (let y = 0; y < len; y++) {
      if (this.point[y][0] != "" && this.point[y][1] === this.point[y][0] && this.point[y][2] === this.point[y][1]) {
        return RESULT_WINLOSE;
      }
    }

    // x축
    for (let x = 0; x < len; x++) {
      if (this.point[0][x] != "" && this.point[1][x] === this.point[0][x] && this.point[2][x] === this.point[1][x]) {
        return RESULT_WINLOSE;
      }
    }

    // 대각선
    if (this.point[0][0] != "" && this.point[0][0] === this.point[1][1] && this.point[2][2] === this.point[1][1]) {
      return RESULT_WINLOSE;
    }
    if (this.point[2][0] != "" && this.point[2][0] === this.point[1][1] && this.point[0][2] === this.point[1][1]) {
      return RESULT_WINLOSE;
    }

    this.turnCnt++;
    if (this.turnCnt >= MAXTURNCNT) {
      // 무승부
      return RESULT_DRAW;
    } else {
      // 계속 진행
      return RESULT_PLAY;
    }
  };
}
