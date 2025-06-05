'use strict'

const yieldCheckCommon = function(context,node){
    if(node.body && node.body.body){
        const statements = node.body.body;
        if(Array.isArray(statements) && statements.length > 0){
            const lastStatement = statements[statements.length-1];
            const lastExpression = lastStatement.expression;
            if(lastStatement.type == 'ExpressionStatement' && 
        lastExpression && 
        lastExpression.type == 'YieldExpression' ){
                // function*(){  } の中で Loop があり yieldがある
                //OK
            }else{

                // function() {  } の中で Loop があり Loopの最終行に yieldがある場合
                // (type=Identifier & name=yield) 
                if(lastExpression && lastExpression.type == 'Identifier' && lastExpression.name == 'yield'){
                    // function() ---> function*() にする
                    let functionNode = null;
                    let parent = node.parent
                    for(;;){
                        if(parent == undefined || parent.type == 'Program'){
                            // Function Node を見つけられない場合
                            break;
                        }else{
                            if(parent.type == 'FunctionExpression') {
                                functionNode = parent; // 最初に見つけた Function Node
                                break;
                            }
                            parent = parent.parent;
                        }
                    }
                    if(functionNode){
            
                        const srcCode = context.sourceCode;
                        const srcText = srcCode.getText(functionNode); //Function Node部をソーステキスト化  
                        // function() を function*() に変換する
                        const rplSrc = srcText.replace('function', 'function*');
                        context.report({
                            node,
                            messageId: "GeneratorFunctionNeededId",
                            fix(fixer) {
                                return fixer.replaceText(functionNode, rplSrc);
                            }
                        })
                    }else{
                        // エラー：Loop があるとき function() {  }の中にする！
                        context.report({
                            node,
                            messageId: "FunctionNeededId",
                        })
                    }
                }else{
                    // 改行して yield; を追加
                    context.report({
                        node,
                        messageId: "YieldNeededId",
                        fix(fixer) {
                            return fixer.insertTextAfter(lastStatement, "\nyield;");
                        }
                    });
                }
            }
        }else{
            // ループのステートメントが空のとき
            context.report({
                node,
                messageId: "NoLineErrorId",
            });
        }
    }
}
/**
 * 指定したnodeの親をたどっていき、FunctionExpression(A)があり
 * (A)の親が CallExpression(B)であり、(B)のcallee.property.name = 'whenRightNow'で
 * ある場合にはエラーとする。
 * fixer は指定したnode全体を削除する
 * @param {*} context 
 * @param {*} node 
 */
const prohibitionLoopCommon = function(context,node){
    let parent = node.parent
    // 親をたどる
    for(;;) {
        if(parent == undefined || parent.type == 'Program'){
            // Function Node を見つけられない場合
            break;
        }else{
            if(parent.type == 'FunctionExpression') {
                const callExpression = parent.parent;
                if(callExpression && callExpression.type == 'CallExpression'){
                    if(callExpression.callee && 
            callExpression.callee.property && 
            callExpression.callee.property.name == 'whenRightNow'){
                        // エラー
                        context.report({
                            node,
                            messageId: "ProhibitionLoopId",
                            fix(fixer) {
                                return fixer.replaceText(node, "");
                            }
                        });
                        return true;
                    }
                }
            }
            parent = parent.parent;
        }
    }
    return false;
}
/**
 * Calleeの第一引数がgenerator関数である場合はエラーとし
 * fixerで 非Generator関数にする
 * @param {*} context 
 * @param {*} node 
 * @param {*} callee 
 * @returns reportをしたとき True
 */
const prohibitionGenerator = function(context, node, callee){
    if(callee.arguments && Array.isArray(callee.arguments) && callee.arguments.length > 0){
        const arg = callee.arguments[0];
        if(arg.type == 'FunctionExpression' && arg.generator ) {
            const functionExpression = arg;
            // Generator関数は禁止
            const srcCode = context.sourceCode;
            const srcText = srcCode.getText(functionExpression); //Function Node部をソーステキスト化
            // function*() を function() に変換する
            const rplSrc = srcText.replace(/function\s*\*\s*\(/, 'function(');
            context.report({
                node,
                messageId: "ProhibitionGeneratorFunctionId",
                fix(fixer) {
                    return fixer.replaceText(functionExpression, rplSrc);
                }
            });
            return true;
        }
    }
    return false;
}
/**
 * 指定したノードの直近のcalleeである親
 * @param {*} node 
 * @param {string} calleeの名前
 * @returns parentCallee
 */
const foundParentCallee = function(node, propName) {
    let parent = node.parent;
    while(parent){
        if(parent.callee && parent.callee.property && parent.callee.property.name == propName){
            return parent;
        }
        parent = parent.parent;
    }
    return false;
}
/** S3LoopRule */
const S3LoopRule = {
    meta: {
        type: 'problem',
        fixable: 'code',
        schema: [],
        messages: {
            NoLineErrorId: '空の処理は禁止です',
            YieldNeededId: '最終行は yield にしてください',
            FunctionNeededId: 'Functionが必要です',
            GeneratorFunctionNeededId: 'ここを含むfunctionを Generator関数にしてください',
            ProhibitionLoopId: 'whenRightNowではループ処理は禁止です',
            ProhibitionGeneratorFunctionId: 'whenRightNowでは Generator関数は禁止です',
        },
    },
    create(context){
        return {
            WhileStatement(node) {
                if (node.type == 'WhileStatement') {
                    const callee = foundParentCallee(node, "whenRightNow");
                    if(callee !== false){
                        // whenRightNow中でのLoop禁止
                        const rslt01 = prohibitionLoopCommon(context,node);
                        const rslt02 = prohibitionGenerator(context,node, callee);
                        if(rslt01 === false && rslt02 === false){
                            yieldCheckCommon(context,node);
                        }
                    }else{
                        yieldCheckCommon(context,node);
                    }
                }
            },
            ForStatement(node) {
                if (node.type == 'ForStatement') {
                    const callee = foundParentCallee(node, "whenRightNow");
                    if(callee !== false){
                        // whenRightNow中でのLoop禁止
                        const rslt01 = prohibitionLoopCommon(context,node);
                        const rslt02 = prohibitionGenerator(context,node, callee);
                        if(rslt01 === false && rslt02 === false){
                            yieldCheckCommon(context,node);
                        }
                    }else{
                        yieldCheckCommon(context,node);
                    }
                }
            },
            ForOfStatement(node) {
                if (node.type == 'ForOfStatement') {
                    const callee = foundParentCallee(node, "whenRightNow");
                    if(callee !== false){
                        // whenRightNow中でのLoop禁止
                        const rslt01 = prohibitionLoopCommon(context,node);
                        const rslt02 = prohibitionGenerator(context,node, callee);
                        if(rslt01 === false && rslt02 === false){
                            yieldCheckCommon(context,node);
                        }
                    }else{
                        yieldCheckCommon(context,node);
                    }
                }
            },
            DoWhileStatement(node) {
                if (node.type == 'DoWhileStatement') {
                    const callee = foundParentCallee(node);
                    if(callee !== false){
                        // whenRightNow中でのLoop禁止
                        const rslt01 = prohibitionLoopCommon(context,node);
                        const rslt02 = prohibitionGenerator(context,node, callee);
                        if(rslt01 === false && rslt02 === false){
                            yieldCheckCommon(context,node);
                        }
                    }else{
                        yieldCheckCommon(context,node);
                    }
                }
            }
        }
    },
}
export const s3LoopRulesPlugin = { 
    meta:{
        name: 's3-loop-plugin',
        version: '0.1.0',
    },
    rules: { "s3-loop-plugin": S3LoopRule },
};

