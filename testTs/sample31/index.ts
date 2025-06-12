/**
 * test of sample31
 * 背景が変わえて待つ。 
 */
import {Pg, Lib, Env} from "../../s3lib-importer";
import type {IPgMain as PgMain} from "@Type/pgMain";
import type {ISprite as Sprite} from "@Type/sprite";

import {StageEx} from './sub/stage';
import {Cat} from './sub/cat';

Pg.title = "【Sample31】背景を変えてまつ"
Env.bubbleScaleLinkedToSprite = true;

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";
import {Constants} from './sub/Constant';
import { BubbleProperties } from "@Type/sprite/TBubble";

/**
 * Stage Extra class
 */
let stage: StageEx;
/**
 * Cat Sprite Class
 */
let cat: Cat, guideCat: Sprite;

Pg.preload = async function (this: PgMain) {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Constants.Jurassic);
    this.Image.load(AssetHost+'/assets/Jurassic2.svg', Constants.Jurassic2);
    this.Image.load(AssetHost+'/assets/backdrop.png', Constants.Backdrop);
    this.Sound.load(AssetHost+'/assets/Chill.wav', Constants.Chill);
    this.Image.load(AssetHost+'/assets/cat.svg', Constants.Cat01 );
}
Pg.prepare = async function () {
    // create instance
    stage = new StageEx();
    // execute stage prepare
    await stage.prepare();

    // create instance
    cat = new Cat();
    // execute stage prepare
    await cat.Image.add( Constants.Cat01 );

    guideCat = new Lib.Sprite("guide");
    await guideCat.Image.add( Constants.Cat01);
    guideCat.Looks.Size.scale = {w: 50, h: 50};
    guideCat.Motion.Position.xy = {x:-150, y:150};
}

Pg.setting = async function () {

    stage.setting();
    cat.setting();
    const bubbleProperties: BubbleProperties = {
        scale: { w: 50, h: 50}
    }
    guideCat.Event.whenBroadcastReceived(Constants.Say, async function(this:Sprite, text: string, secs: number){
        await this.Control.wait(0.5);
        this.Looks.Bubble.say(text, bubbleProperties);
        await this.Control.wait(secs);
        this.Looks.Bubble.say('');
        await this.Control.wait(0.5);
    });
}
