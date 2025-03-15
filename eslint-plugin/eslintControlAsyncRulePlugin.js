'use strict'
const controlAsyncRule = {
  meta: {
      type: 'problem',
      fixable: 'code',
      schema: [],
      messages: {
        EventFunctionId: 'async をつけてください',
      },
    },
    create(context){
      return {
        ExpressionStatement(node){
          if( node.expression && node.expression.callee && node.expression.callee.object){
            const calee = node.expression.callee;
            const caleeObj = calee.object;
            if(caleeObj){
              const caleeObjProperty = caleeObj.property;
              if(caleeObjProperty && caleeObjProperty.name == 'Control'){
                const calleeProperty = calee.property;
                if(calleeProperty && 
                  (
                    calleeProperty.name == 'whenCloned'
                  )
                ){
                  const _arguments = node.expression.arguments;
                  if(_arguments && Array.isArray(_arguments) && _arguments.length>0){
                    const functionExpression = _arguments[0];
                    if(functionExpression.type == 'FunctionExpression' 
                          && functionExpression.async == false){
                      // Eventへ渡すファンクションがasyncでないとき
                      context.report({
                        node,
                        messageId: "EventFunctionId",
                        data: {
                          notAsync: functionExpression.async,
                        },
                        fix(fixer) {
                           return fixer.insertTextBefore(functionExpression, "async ");
                        }
                      })
                    }     
                  }
                }
              }
            }
          }
        },
      }
    },
}

export const controlAsyncRulesPlugin = { 
  meta:{
    name: 'control-async-plugin',
    version: '0.1.0',
  },
  rules: { "control-async-plugin": controlAsyncRule },
};
