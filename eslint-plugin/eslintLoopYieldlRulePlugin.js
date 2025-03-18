'use strict'
const common = function(context,node){
  if(node.body && node.body.body){
    const statements = node.body.body;
    if(Array.isArray(statements) && statements.length > 0){
      const lastStatement = statements[statements.length-1];
      if(lastStatement.type == 'ExpressionStatement' && 
        lastStatement.expression && 
        lastStatement.expression.type == 'YieldExpression'){
          //OK
      }else{
        // 最終行がYieldでないとき
        // 親の方向へ辿っていき type="FunctionExpression"を特定する
        // 特定できずに type="Program"まで到達するか 親がnull の場合は
        // Functionを必要とする旨のメッセージを出す        
        let functionNode = null;
        let parent = node.parent
        for(;;){
          if(parent == undefined || parent.type == 'Program'){
            break;
          }else{
            if(parent.type == 'FunctionExpression') {
              functionNode = parent;
              break;
            }
            parent = parent.parent;
          }
        }
        //
        // 通常functionのときFixer01実行-->yieldが複数個作られてしまう(原因特定できず)
        // Fixer01実行前に Report02を表示し generator関数に変更してもらったうえで
        // Report01を表示->Fixer01実行の手順としたい。
        if(functionNode){
          if(functionNode.generator) {
            context.report({ // Report01
              node,
              messageId: "YieldNeededId",
              *fix(fixer) { // Fixer01
                yield fixer.insertTextAfter(lastStatement, "\nyield;");
              }
            })    
          }else{
            // Function はgeneratorではないとき --> 人間の手でgenerator関数にしてもらう
            context.report({ // Report02
              node,
              messageId: "GeneratorFunctionNeededId",
            })    
          }
        }else{
          context.report({
            node,
            messageId: "FunctionNeededId",
          })    
        }
      }
    }
  }
}
const yieldLoopRule = {
  meta: {
    type: 'problem',
    fixable: 'code',
    schema: [],
    messages: {
      YieldNeededId: '最終行は yield にしてください',
      FunctionNeededId: 'Functionが必要です',
      GeneratorFunctionNeededId: 'ここを含むfunctionを Generator関数にしてください',
    },
  },
  create(context){
    return {
      WhileStatement(node) {
        if (node.type == 'WhileStatement') {
          common(context,node);
        }
      },
      ForStatement(node) {
        if (node.type == 'ForStatement') {
          common(context,node);
        }
      },
      DoWhileStatement(node) {
        if (node.type == 'DoWhileStatement') {
          common(context,node);
        }
      }
    }
  },
}
export const yieldLoopRulesPlugin = { 
  meta:{
    name: 'yield-loop-plugin',
    version: '0.1.0',
  },
  rules: { "yield-loop-plugin": yieldLoopRule },
};

