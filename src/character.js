class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, status = {}) {
        super(scene, x, y, texture, frame);

        // キャラクターのステータスを定義する
        this.name = status.name || "名無し";
        this.hp = status.hp || 100;
        this.attack = status.attack || 10;
        this.defense = status.defense || 5;

        // 行動スタックを保存するプロパティを追加する
        this.actions = [];


        // キャラクターをシーンに追加する
        scene.add.existing(this);

        // ステータスを表示させる
        this.hpIndicator = scene.add.text(x, y + 100, "初期のテキスト");
    }


     // 行動を追加するメソッド
    addAction(action) {
    this.actions.push(action);
    }

    // 行動を実行するメソッド
    act() {

        // 行動スタックからアクションを取り出す
    const action = this.popAction();

    // アクションを実行する
    switch (action) {
        case "attack":
        this.attack();
        break;
        case "defend":
        this.defend();
        break;
        case "useItem":
        this.useItem();
        break;
        }
    }


    // キャラクターがダメージを受けるメソッド
    takeDamage(damage) {
        this.hp -= damage;
        console.log(`${this.name}は${damage}ダメージくらった`);
        if (this.hp <= 0) {
            this.die();
        }
        this.updateStatusIndicator();
    }

    // キャラクターが死亡するメソッド
    die() {
        // キャラクターを削除する処理をここに記述する
        console.log(`${this.name}は死亡した`);
    }

    //キャラクターが行動可能か判定するメソッド
    canAct() {
        return true;
    }

    // キャラクターが行動するメソッド
    act() {
        if (this.canAct()) {
            console.log(`${this.name}は行動した`);
            // 攻撃対象のスプライトを取得
            const target = this.scene.children.list.filter(sprite => (sprite.type === "Sprite") && (sprite.name !== this.name))[0];
            target.takeDamage(this.attack);
        } else {
            console.log(`${this.name}は行動できなかった`);
        }
    }

    // ステータス表示を更新するメソッド
    updateStatusIndicator() {
        this.hpIndicator.setText(this.hp);
    }
}

export default Character;