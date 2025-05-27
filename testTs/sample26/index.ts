/**
 * sample26
 * スペースキーでコスチューム切り替え
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@typeJS/s3PlayGround";
import type {Stage} from "@typeJS/s3Stage";
import type {Sprite} from "@typeJS/s3Sprite";
import {Constant} from './sub/constants';

Pg.title = "【Sample26】スペースキーでコスチューム切り替え"
    

let stage: Stage;
let sprite: Sprite;

Pg.preload = async function preload(this:PlayGround) {
    this.Image.load('../../assets/Jurassic.svg', Constant.Jurassic );
    this.Sound.load('../../assets/Chill.wav', Constant.Chill );
    this.Sound.load('../../assets/Rip.wav', Constant.Rip);
    this.Image.load('../../assets/Apple.svg', Constant.Apple);
    this.Image.load('../../assets/Arrow1-a.svg', Constant.Arrow1_a);
    this.Image.load('../../assets/Ballerina-a.svg', Constant.Ballerina_a);
    this.Image.load('../../assets/Balloon1-a.svg', Constant.Balloon1_a);
    this.Image.load('../../assets/Bananas.svg', Constant.Bananas);
    this.Image.load('../../assets/Basketball.svg', Constant.Basketball);
    this.Image.load('../../assets/Bell1.svg', Constant.Bell1);
    this.Image.load('../../assets/Ben-a.svg', Constant.Ben_a);
    this.Image.load('../../assets/Bear-a.svg', Constant.Bear_a);
    this.Image.load('../../assets/Bowl-a.svg', Constant.Bowl_a);
    this.Image.load('../../assets/Bowtie.svg', Constant.Bowtie);
    this.Image.load('../../assets/Bread.svg', Constant.Broom);
    this.Image.load('../../assets/Bread.svg', Constant.Bread);
    this.Image.load('../../assets/Cake-a.svg', Constant.Cake_a);
    this.Image.load('../../assets/Casey-a.svg', Constant.Casey_a);
    this.Image.load('../../assets/CatFlying-a.svg', Constant.CatFlying_a);
    this.Image.load('../../assets/Catcher-a.svg', Constant.Catcher_a);
    this.Image.load('../../assets/Chick-a.svg', Constant.Chick_a);
    this.Image.load('../../assets/CityBus-a.svg', Constant.CityBus_a);
    this.Image.load('../../assets/Cloud.svg', Constant.Cloud);
    this.Image.load('../../assets/Crab-a.svg', Constant.Crab_a);
    this.Image.load('../../assets/Crystal-b.svg', Constant.Crystal_b);
    this.Image.load('../../assets/Dinosaur1-a.svg', Constant.Dinosaur1_a);
    this.Image.load('../../assets/Dinosaur2-a.svg', Constant.Dinosaur2_a);
    this.Image.load('../../assets/Dinosaur3-a.svg', Constant.Dinosaur3_a);
    this.Image.load('../../assets/Dinosaur4-a.svg', Constant.Dinosaur4_a);
    this.Image.load('../../assets/Diver2.svg', Constant.Diver2);
    this.Image.load('../../assets/Dog1-a.svg', Constant.Dog1_a);
    this.Image.load('../../assets/Dog2-c.svg', Constant.Dog2_c);
    this.Image.load('../../assets/Donut.svg', Constant.Donut);
    this.Image.load('../../assets/Dorian-a.svg', Constant.Dorian_a);
    this.Image.load('../../assets/Dove-a.svg', Constant.Dove_a);
    this.Image.load('../../assets/Dragon1-b.svg', Constant.Dragon1_b);
    this.Image.load('../../assets/Dragon-a.svg', Constant.Dragon_a);
    this.Image.load('../../assets/Glow-1.svg', Constant.Glow_1);
    this.Image.load('../../assets/Gobo-a.svg', Constant.Gobo_a);
    this.Image.load('../../assets/Story-Z-3.svg', Constant.Story_Z_3);

}

Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Constant.Jurassic );
    await stage.Sound.add( Constant.Chill );
    sprite = new Lib.Sprite("sprite");
    sprite.Looks.hide(); // 非表示
    await sprite.Image.add( Constant.Apple );
    await sprite.Image.add( Constant.Arrow1_a );
    await sprite.Image.add( Constant.Ballerina_a );
    await sprite.Image.add( Constant.Balloon1_a );
    await sprite.Image.add( Constant.Bear_a );
    await sprite.Image.add( Constant.Bell1 );
    await sprite.Image.add( Constant.Bowl_a );
    await sprite.Image.add( Constant.Bowtie );
    await sprite.Image.add( Constant.Broom );
    await sprite.Image.add( Constant.Bread );
    await sprite.Image.add( Constant.Cake_a );

    await sprite.Image.add( Constant.Casey_a );
    await sprite.Image.add( Constant.CatFlying_a );
    await sprite.Image.add( Constant.Catcher_a );
    await sprite.Image.add( Constant.Chick_a );
    await sprite.Image.add( Constant.CityBus_a );
    await sprite.Image.add( Constant.Cloud );
    await sprite.Image.add( Constant.Crab_a );
    await sprite.Image.add( Constant.Crystal_b );
    await sprite.Image.add( Constant.Dinosaur1_a );
    await sprite.Image.add( Constant.Dinosaur2_a );
    await sprite.Image.add( Constant.Dinosaur3_a );
    await sprite.Image.add( Constant.Dinosaur4_a );

    await sprite.Image.add( Constant.Diver2 );
    await sprite.Image.add( Constant.Dog1_a );
    await sprite.Image.add( Constant.Dog2_c );
    await sprite.Image.add( Constant.Donut );
    await sprite.Image.add( Constant.Dorian_a );
    await sprite.Image.add( Constant.Dove_a );

    await sprite.Image.add( Constant.Dragon1_b );
    await sprite.Image.add( Constant.Dragon_a );
    await sprite.Image.add( Constant.Glow_1 );
    await sprite.Image.add( Constant.Gobo_a );
    await sprite.Image.add( Constant.Story_Z_3 );

    await sprite.Sound.add( Constant.Rip );
    // 縦横 200%のサイズにする
    sprite.Looks.Size.scale = {w: 200, h: 200}; 

}


Pg.setting = async function setting() {

    
    // 旗が押されたときの動作
    stage.Event.whenFlag(async function*(this:Stage){
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Constant.Chill);
            yield;
        }
    });
    
    // 旗が押されたときの動作
    sprite.Event.whenFlag(async function(this:Sprite){
        // 初期設定
        this.Motion.Move.gotoXY( 0, 0 );
        // サイズ
        this.Looks.Size.scale = {w: 200, h: 200 }; 
        // 表示
        this.Looks.show();
        // 回転しない
        this.Motion.setRotationStyle(Lib.RotationStyle.DONT_ROTATE);
    });

    // 旗が押されたときの動作
    sprite.Event.whenFlag(async function*(this:Sprite){
        // スプライトに登録されている画像の名前を配列として取り出す
        const SpriteImageNames = this.Image.names();

        // ずっと繰り返す
        for(;;){
            // イメージ名の配列をシャッフルする（順番をランダムに変える）
            shuffle(SpriteImageNames);
            // イメージ名の配列
            for(const name of SpriteImageNames){
                // スペースキーが押されていない間、待つ
                await this.Control.waitWhile( ()=>Lib.keyIsNotDown('Space'));
                // 音を鳴らす
                this.Sound.play(Constant.Rip);
                // コスチュームを切り替える
                this.Looks.switchCostume(name);
                // 0.1秒待つ
                await this.Control.wait(0.1); 
                yield;
            }
            yield;
        }
    });
}
/**
 * 配列をシャッフルする
 * @param array 配列
 */
function shuffle(array: string[]){
    array.sort(() => Math.random() - 0.5);
}
