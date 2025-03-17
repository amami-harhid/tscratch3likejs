'use strict'
/**
 * 【no-restricted-syntax】 
 * (1) while構文の最後の行はyieldでなければならない
 * (2) do...while構文の最後の行はyieldでなければならない
 * (3) for構文の最後の行はyieldでなければならない
 * (4) for...of, for...inは任意とするのでエラーにはしない（対象外）
 * (5) Array#forEachは yieldが使えないのでエラーにはしない（対象外）
 * 
 * 【plugin】
 * (1) 【Error】xxx.Sound.～ の awaitを必要とするメソッドに awaitを強制する
 * (2) 【Error】xxx.Event.～ の awaitを必要とするメソッドに awaitを強制する
 * (3) 【Error】xxx.Extensions.～ の awaitを必要とするメソッドに awaitを強制する
 * (4) 【Error】xxx.Looks.～ の awaitを必要とするメソッドに awaitを強制する
 * (5) 【Error】xxx.Control.～ の awaitを必要とするメソッドに awaitを強制する
 * (6) 【Error】HatEventメソッドの引数とするFunctionには asyncをつける
 * 
 * 【不思議なこと】
 * do{...}while(true)の形、条件式に固定でtrueを書いた直後はエラーになる。
 * yieldをいれるとtrueの部分がエラーにならない。
 * 結果オーライだが原因というか仕組みが分からないので気持ち悪いところがある。
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import {
  awaitControlRulesPlugin,
  awaitEventRulesPlugin,
  awaitExtensionsRulesPlugin,
  awaitImageRulesPlugin,
  awaitLooksRulesPlugin,
  awaitLibRulesPlugin,
  awaitSoundRulesPlugin,
  eventAsyncRulesPlugin,
  controlAsyncRulesPlugin,
  yieldLoopRulesPlugin,
} from "./eslint-plugin/index.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/*.d.ts"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: { globals: globals.browser },
    plugins: {
      awaitControl : awaitControlRulesPlugin,
      awaitEvent : awaitEventRulesPlugin,
      awaitExtensions: awaitExtensionsRulesPlugin,
      awaitImage : awaitImageRulesPlugin,
      awaitLooks : awaitLooksRulesPlugin,
      awaitLib : awaitLibRulesPlugin,
      awaitSound : awaitSoundRulesPlugin,
      eventAsync: eventAsyncRulesPlugin,
      controlAsync: controlAsyncRulesPlugin,
      loopYield: yieldLoopRulesPlugin,
    },
    rules: {
      "indent": ["error", 4],  // indent 4 space
      "no-this-alias": ["off"],
      "@typescript-eslint/no-this-alias": [
        "error",
        {
          "allowDestructuring": false, // Disallow 'const {props,state} = this';
          "allowedNames": ["self","me","clone"] // Allow 'const self = this;'
        }
      ],
      'no-unused-vars': 'warn',
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_"
        }
      ],
      'awaitControl/await-control-plugin': 'error',
      'awaitEvent/await-event-plugin': 'error',
      'awaitExtensions/await-extensions-plugin': 'error',
      'awaitImage/await-image-plugin': 'error',
      'awaitLib/await-lib-plugin': 'error',
      'awaitLooks/await-looks-plugin': 'error',
      'awaitSound/await-sound-plugin': 'error',
      'eventAsync/event-async-plugin': 'error',
      'controlAsync/control-async-plugin': 'error',
      'loopYield/yield-loop-plugin' : 'error',
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];