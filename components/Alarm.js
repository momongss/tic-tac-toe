export default class Alarm {
  constructor($app) {
    this.alarmWrapper = document.createElement("div");
    this.alarmWrapper.className = "game-alarm-wrapper";

    $app.appendChild(this.alarmWrapper);

    this.alarmText = "DRAW!!";
    this.show = false;

    this.render();
  }

  setState = (state) => {
    if (state.alarmText != null) this.alarmText = state.alarmText;
    if (state.show != null) this.show = state.show;
    this.render();
  };

  render = () => {
    if (this.show) {
      this.alarmWrapper.classList.add("show");
    } else {
      this.alarmWrapper.classList.remove("show");
    }

    this.alarmWrapper.innerHTML = `
        <div class="game-alarm">
            ${this.alarmText}
        </div>
    `;
  };
}
