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
        context.report({
          node,
          messageId: "YieldNeededId",
          // 
          // fixer() は yield で実行しないと複数回のinsertが発生する。
          // 
          *fix(fixer) {
            yield fixer.insertTextAfterRange(lastStatement.range, "\nyield;");
          }
//          fix(fixer) {
//            return fixer.insertTextAfter(lastStatement, "\n yield;");
//          }
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

