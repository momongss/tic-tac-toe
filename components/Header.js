export default class Header {
  constructor($app) {
    this.$headerWrapper = document.createElement("header");
    this.$headerWrapper.className = "game-header-wrapper";

    $app.appendChild(this.$headerWrapper);

    this.render();
  }

  render = () => {
    this.$headerWrapper.innerHTML = `
            <h2>TIC TAC TOE</h2>
        `;
  };
}
