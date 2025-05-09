/**
 * 
 */
import { Entity } from 'lib/entity/entity';
import { SoundLoader } from '../importer/soundLoader';
import { Sounds } from '../sounds/sounds';

//const SERVER = 'https://synthesis-service.scratch.mit.edu';

/**
 * The url of the synthesis server.
 * @type {string}
 */
const SERVER_HOST = 'https://synthesis-service.scratch.mit.edu';

/**
 * How long to wait in ms before timing out requests to synthesis server.
 * @type {number}
 */
const SERVER_TIMEOUT = 10000; // 10 seconds

/**
 * Volume for playback of speech sounds, as a percentage.
 * @type {number}
 */
const SPEECH_VOLUME = 250;

/**
 * An id for one of the voices.
 */
const ALTO_ID = 'ALTO';

/**
 * An id for one of the voices.
 */
const TENOR_ID = 'TENOR';

/**
 * An id for one of the voices.
 */
const SQUEAK_ID = 'SQUEAK';

/**
 * An id for one of the voices.
 */
const GIANT_ID = 'GIANT';

/**
 * An id for one of the voices.
 */
const KITTEN_ID = 'KITTEN';

/**
 * Playback rate for the tenor voice, for cases where we have only a female gender voice.
 */
const FEMALE_TENOR_RATE = 0.89; // -2 semitones

/**
 * Playback rate for the giant voice, for cases where we have only a female gender voice.
 */
const FEMALE_GIANT_RATE = 0.79; // -4 semitones

/**
 * Language ids. The value for each language id is a valid Scratch locale.
 */
const ENGLISH_ID = 'en';
const JAPANESE_ID = 'ja';

export const GENDER = class {
    static get MALE() {
        return 'male';
    }
    static get FEMALE() {
        return 'female';
    }
}
export class Speech {
    //private voice: string;
    //private language: string;
    public gender: string;
    private cache;
    public locale: string|null;
    constructor() {
        //this.voice = ALTO_ID;
        //this.language =  JAPANESE_ID;
        this.gender = GENDER.FEMALE;
        this.cache = new Map();
        this.locale = null;
    }
    // /**
    //  * An object with info for each voice.
    //  */
    // get VOICE_INFO () {
    //     return {
    //         [ALTO_ID]: {
    //             name: formatMessage({
    //                 id: 'text2speech.alto',
    //                 default: 'alto',
    //                 description: 'Name for a voice with ambiguous gender.'
    //             }),
    //             gender: 'female',
    //             playbackRate: 1
    //         },
    //         [TENOR_ID]: {
    //             name: formatMessage({
    //                 id: 'text2speech.tenor',
    //                 default: 'tenor',
    //                 description: 'Name for a voice with ambiguous gender.'
    //             }),
    //             gender: 'male',
    //             playbackRate: 1
    //         },
    //         [SQUEAK_ID]: {
    //             name: formatMessage({
    //                 id: 'text2speech.squeak',
    //                 default: 'squeak',
    //                 description: 'Name for a funny voice with a high pitch.'
    //             }),
    //             gender: 'female',
    //             playbackRate: 1.19 // +3 semitones
    //         },
    //         [GIANT_ID]: {
    //             name: formatMessage({
    //                 id: 'text2speech.giant',
    //                 default: 'giant',
    //                 description: 'Name for a funny voice with a low pitch.'
    //             }),
    //             gender: 'male',
    //             playbackRate: 0.84 // -3 semitones
    //         },
    //         [KITTEN_ID]: {
    //             name: formatMessage({
    //                 id: 'text2speech.kitten',
    //                 default: 'kitten',
    //                 description: 'A baby cat.'
    //             }),
    //             gender: 'female',
    //             playbackRate: 1.41 // +6 semitones
    //         }
    //     };
    // }
    get LANGUAGE_INFO () {
        return {
            [ENGLISH_ID]: {
                name: 'English',
                locales: ['en'],
                speechSynthLocale: 'en-US'
            },
            [JAPANESE_ID]: {
                name: 'Japanese',
                locales: ['ja', 'ja-hira'],
                speechSynthLocale: 'ja-JP'
            },
        };
    }
    /**
     * The default state, to be used when a target has no existing state.
     * @type {Text2SpeechState}
     */
    static get DEFAULT_TEXT2SPEECH_STATE () {
        return {
            voiceId: ALTO_ID
        };
    }

    /**
     * A default language to use for speech synthesis.
     * @type {string}
     */
    get DEFAULT_LANGUAGE (){
        return JAPANESE_ID;
    }

    speech(entity:Entity, words:string, properties={}) {
        // 128文字までしか許容しないとする
        const text = encodeURIComponent(words.substring(0, 128));
        let path = `${SERVER_HOST}/synth?locale=${this.locale}&gender=${this.gender}&text=${text}`;
        if(!this.cache.has(path)) {
            const name = 'ScratchSpeech'; // <-- なんでもよいが、変数に使える文字であること
            const me = this;
            SoundLoader.loadSound(path,name).then(_sound=>{
                me.cache.set(path, _sound);
                me._speechPlay(entity, _sound.name, _sound.data, properties);
            });
        }else{
            const _sound = this.cache.get(path);
            this._speechPlay(entity, _sound.name, _sound.data, properties);
        }
    }
    
    _speechPlay(entity:Entity, name:string, data, properties) {
        const sounds = new Sounds(entity);
        sounds.setSound(name, data, properties).then(_=>{
            sounds.play();
        });
    }

    async speechAndWait(entity:Entity, words:string, properties={}) {
        // 128文字までしか許容しないとする
        const text = encodeURIComponent(words.substring(0, 128));
        let path = `${SERVER_HOST}/synth?locale=${this.locale}&gender=${this.gender}&text=${text}`;
        if(!this.cache.has(path)) {
            const name = 'ScratchSpeech'; // <-- なんでもよいが、変数に使える文字であること
            const sound = await SoundLoader.loadSound(path, name);
            this.cache.set(path, sound);
        }
        const sound = this.cache.get(path);
        await this._speechPlayUntilDone(entity, sound.name, sound.data, properties);
    }
    
    async _speechPlayUntilDone(entity:Entity, name:string, data, properties) {
        const sounds = new Sounds(entity);
        await sounds.setSound(name, data, properties);
        await sounds.startSoundUntilDone(entity);
    }
    private static instance: Speech;
    static getInstance() {
        if(Speech.instance == undefined) {
            Speech.instance = new Speech();
        }
        return Speech.instance;
    }
};