'use strict'
const common = function(node){
  if(node.body && node.body.body){
    const statements = node.body.body;
    if(Array.isArray(statements) && statements.length > 0){
      const lastStatement = statements[statements.length-1];
      if(lastStatement.type != 'YieldExpression'){
        // 最終行がYieldでないとき
        context.report({
          node,
          messageId: "YieldNeededId",
          fix(fixer) {
             return fixer.insertTextAfterRange(lastStatement, "yield;");
          }
        })
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
    },
  },
  create(context){
    return {
      WhileStatement(node) {
        if (node.type == 'WhileStatement') {
          common(node);
        }
      },
      ForStatement(node) {
        if (node.type == 'ForStatement') {
          common(node);
        }
      },
      DoWhileStatement(node) {
        if (node.type == 'DoWhileStatement') {
          common(node);
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

