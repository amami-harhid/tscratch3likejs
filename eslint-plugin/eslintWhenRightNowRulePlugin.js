'use strict'
const meta = {
  type: 'problem',
  fixable: 'code',
  schema: [],
  messages: {
    ProhibitionLoopId: 'whenRightNowではループ処理は禁止です',
    ProhibitionGeneratorFunctionId: 'whenRightNowでは Generator関数は禁止です',
  },
}
/**
 * 指定したnode(CallerExpression)のproperty.name = 'whenRightNow'で
 * ある場合に、第一引数が FunctionExpressionであり、そのgeneratorがTRUE
 * であるとき、エラーとする
 * Fix時には * を消去する
 * @param {*} context 
 * @param {*} node 
 */
const prohibitionGenerator = function(context, node){
  if(node.callee && node.callee.property && node.callee.property.name == "whenRightNow"){
    if(node.arguments && Array.isArray(node.arguments) && node.arguments.length > 0){
      const arg = node.arguments[0];
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
      }
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
              })
            }
        }
      }
      parent = parent.parent;
    }
  }
}
const whenRightNowRule = {
  meta: meta,
  create(context){
    return {
      CallExpression(node){
        if(node.type == 'CallExpression'){
          prohibitionGenerator(context,node);
        }
      },
      WhileStatement(node) {
        if (node.type == 'WhileStatement') {
          prohibitionLoopCommon(context,node);
        }
      },
      ForStatement(node) {
        if (node.type == 'ForStatement') {
          prohibitionLoopCommon(context,node);
        }
      },
      ForOfStatement(node) {
        if (node.type == 'ForOfStatement') {
          prohibitionLoopCommon(context,node);
        }
      },
      DoWhileStatement(node) {
        if (node.type == 'DoWhileStatement') {
          prohibitionLoopCommon(context,node);
        }
      }
    }
  },
}
export const whenRightNowPlugin = { 
  meta:{
    name: 'whenRightNow-plugin',
    version: '0.1.0',
  },
  rules: { "whenRightNow-plugin": whenRightNowRule },
};

