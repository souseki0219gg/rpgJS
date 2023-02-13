export default class Narrator extends Phaser.GameObjects.Sprite {
  private narrationText: Phaser.GameObjects.Text;
  public texts: Array<string>;
  private timer: NodeJS.Timer;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number | undefined,
    initialText: string = "",
  ) {
    super(scene, x, y, texture, frame);

    this.texts = [
      initialText
    ];
    // ナレーターをシーンに追加する
    scene.add.existing(this);

    this.narrationText = scene.add.text(x, y, this.texts[0], {
      fontSize: "24px",
      stroke: "#fff",
    })

    // 文字列を追加するイベントを受け取るリスナーを定義する
    this.scene.events.addListener(
      "narrate",
      (text: string) => {
        console.log("narrateイベントを受け取りました");
        this.addText(text);
      }
    )

    this.timer = setInterval(() => {
      this.proceed();
    }, 500);
  }

  addText(text: string) {
    if (this.texts.length == 0) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.proceed();
      }, 500);
    }
    this.texts.push(text);
  }

  // 次の文字列に進めるメソッド
  proceed() {
    if (this.texts?.length > 0) {
      this.texts.shift();
      this.narrationText.setText(this.texts[0]);
      console.log(this.texts);
    }
  }
}
