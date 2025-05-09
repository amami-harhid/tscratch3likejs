'use strict'

import {eslint_S3_config} from "./eslint-plugin/index.js";
const build_eslint_config = [
    ...eslint_S3_config,
    {
        plugins: {},
    },

];
export default build_eslint_config;