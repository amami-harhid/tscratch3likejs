const githubPage = "https://amami-harhid.github.io/scratch3likejslib";
const jsName = "build/likeScratchLib.js";
//const {PlayGround, Library} = await import(`${githubPage}/${jsName}`);
//from 'scratch3likejslib/build/likeScratchLib.js';
import {PlayGround, Library} from '@scratch3likejslib/build';

const Pg = PlayGround;
const Lib = Library;

export {Pg, Lib}
