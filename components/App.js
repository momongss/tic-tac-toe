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
    this.board = [
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
    if (this.board[y][x] !== "") return false;

    this.setGameBoard(this.board, x, y, this.turn);

    const gameResult = this.checkResult(this.board);
    if (gameResult === RESULT_DRAW) {
      this.clearBoard("DRAW !!");
    } else if (gameResult === RESULT_WINLOSE) {
      this.clearBoard(`WIN ${this.turn} !!`);
      this.updateScore(this.turn);
    }

    this.changeTurn();
  };

  setGameBoard = (board, x, y, turn) => {
    board[y][x] = turn;
    this.GameBoard.setGameBoard(board);
  };

  updateScore = (turn) => {
    this.score[turn]++;
    this.InfoBoard.setState({ score: this.score });
  };

  showAlarm = (alarmText) => {
    this.Alarm.setState({ alarmText: alarmText, show: true });
    setTimeout(() => {
      this.Alarm.setState({ show: false });
    }, 1500);
  };

  clearGame = () => {
    this.turn = "O";
    this.turnCnt = 0;

    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.score = {
      O: 0,
      X: 0,
    };

    this.GameBoard.setGameBoard(this.board);
    this.InfoBoard.setState({ score: this.score, turn: this.turn });

    this.showAlarm("새로운 게임 !!");
  };

  clearBoard = (alarmText) => {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.GameBoard.setGameBoard(this.board);
    this.turnCnt = 0;

    this.showAlarm(alarmText);
  };

  changeTurn = () => {
    if (this.turn === "O") {
      this.turn = "X";
    } else {
      this.turn = "O";
    }

    this.InfoBoard.setState({ turn: this.turn });
  };

  checkResult = (board) => {
    const len = 3;

    // y축
    for (let y = 0; y < len; y++) {
      if (board[y][0] != "" && board[y][1] === board[y][0] && board[y][2] === board[y][1]) {
        return RESULT_WINLOSE;
      }
    }

    // x축
    for (let x = 0; x < len; x++) {
      if (board[0][x] != "" && board[1][x] === board[0][x] && board[2][x] === board[1][x]) {
        return RESULT_WINLOSE;
      }
    }

    // 대각선
    if (board[0][0] != "" && board[0][0] === board[1][1] && board[2][2] === board[1][1]) {
      return RESULT_WINLOSE;
    }
    if (board[2][0] != "" && board[2][0] === board[1][1] && board[0][2] === board[1][1]) {
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
