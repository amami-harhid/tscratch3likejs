/**
 * sample01
 * 桜の花びらが舞う
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【sample01】桜の花びらが舞う"

const Jurassic01 = "Jurassic01";
const Chill = "Chill";
const Cat01 = "Cat01";
const Cat02 = "Cat02";

let stage;
let cat;
let monitors;

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload() {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic01 );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load('../../assets/Convertible.png', Cat01 );
    this.Image.load('./assets/blackCat.svg', Cat02 );
}
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    stage.Image.add( Jurassic01 );
    // Chill を追加
    stage.Sound.add( Chill );

    // スプライト(ネコ)を作る
    cat = new Lib.Sprite("cat");
    // コスチュームを追加
    cat.Image.add( Cat01 );
    cat.Image.add( Cat02 );
    cat.Motion.Position.y = 100;
    monitors = new Lib.Monitors();
    monitors.add('M01', '秒数');
    monitors.add('M02', '回数2');
    monitors.add('M03', '回数3');
    monitors.add('M04', '回数4');
    monitors.add('M05', '回数5');
    monitors.add('M06', '回数6');
    monitors.add('M07', '回数7');
    monitors.add('M08', '回数8');
    monitors.add('M09', '回数9');
    // monitors.add('M04', '回数4');
    const m01 = monitors.get('M01');
    const m02 = monitors.get('M02');
    const m03 = monitors.get('M03');
    //m01.position = {x:-240, y:180};
    m01.scale = {w: 150, h:100};
    m01.value = 0;
    //monitors.get('M01').scale = {w: 100, h:100};
    //m02.position = {x:-240, y:150};
    m02.scale = {w: 100, h:100};
    m02.text = '';
    m03.scale = {w: 100, h:100};
    m03.text = '';

    //monitors.reposition();
}
let counter = 0;
Pg.setting = async function setting() {
    cat.Event.whenFlag(async function(){

    })
    /**
     * 旗を押されたときの動き
     * STARTメッセージを送る
     */
    cat.Event.whenFlag(async function*(){
        
        this.threadName = 'cat whenFlag Thread [01]';
        this.Looks.Costume.name = Cat01;
        // ずっと繰り返す
        for(;;){
            // 向きを +1 する
            this.Motion.Direction.degree += 1;
            yield;
        }
    });
    cat.Event.whenBroadcastReceived('START', async function(){
        this.threadName = 'cat whenBroadcastReceived Thread [02]';
        this.Control.stopOtherScripts(this);

    });

    stage.Event.whenFlag(async function(){
        this.threadName = 'Stage whenFlag Thread [01]';
        // 4秒後に「ステージの他のスクリプトを止める」
        await this.Control.wait(4);
        // 4秒後に StageのstopOtherScripts
        this.Control.stopOtherScripts(this);
        await this.Control.wait(20);
        // 4秒後にSTART ---> catの中でstopOtherScripts
        this.Event.broadcast('START');
        await this.Control.wait(20);
        // 3秒後にSTOP ALL
        console.log('stopAll')
        this.Control.stopAll();
    })

    stage.Event.whenFlag(async function*(){
        this.threadName = 'Stage whenFlag Thread [02]';
        // 音量 10
        this.Sound.setOption(Lib.SoundOption.VOLUME, 50);
        this.Sound.setOption(Lib.SoundOption.PITCH, 150);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            console.log('After playUntilDone In Stage whenFlag Thread [02]')
            //this.Sound.play(Chill);
            //await this.Control.wait(0.1);
            yield;
        }
    });
    cat.Event.whenClicked(async function(){
        this.Looks.goToFront();
    });

}

// FPS単位で実行される処理
Pg.draw = function() {
    //monitors.showAll();
    counter += 1;
    const m01 = monitors.get('M01');
    const m02 = monitors.get('M02');
    m01.value = counter;
    m02.text = `${Lib.renderRate.x}, ${Lib.renderRate.y}`;
}
