/* eslint-disable no-useless-catch */
/* eslint-disable loopCheck/s3-loop-plugin */
/* eslint-disable no-undef */
console.log('start')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const {glob} = require('glob');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require('child_process');

const entries = glob.sync('./testTs/**/index.ts');
const absolutePath = fs.realpathSync('./');
const npxWebpack = "npx webpack --mode development"
const dirArr = [];
try{
    for(const _entry of entries){
        const directory = _entry.replace('./testTs/','').replace(/\/.*.ts$/,'');
        dirArr.push(directory);
    }
    dirArr.sort();
    console.log(dirArr)
    for(const _dir of dirArr){
        console.log(_dir)
        const workingDir = absolutePath+'/testTs/'+_dir;
        process.chdir(workingDir);
        execSync(npxWebpack);
    }
    
}catch(e){
    throw e;
}
