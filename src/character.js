class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, status = {}) {
        super(scene, x, y, texture, frame);

        // キャラクターのステータスを定義する
        this.name = status.name || "名無し";
        this.hp = status.hp || 100;
        this.attack = status.attack || 10;
        this.defense = status.defense || 5;

        // キャラクターをシーンに追加する
        scene.add.existing(this);
    }

    // キャラクターがダメージを受けるメソッド
    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die();
        }
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
        console.log(`${this.name}は行動した`);
    }
}

export default Character;