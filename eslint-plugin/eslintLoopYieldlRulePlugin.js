'use strict'

const common = function(context,node){
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

