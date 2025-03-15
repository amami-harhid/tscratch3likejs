'use strict'
const eventAsyncRule = {
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
              if(caleeObjProperty && caleeObjProperty.name == 'Event'){
                const calleeProperty = calee.property;
                if(calleeProperty && 
                  (
                    calleeProperty.name == 'whenFlag' ||
                    calleeProperty.name == 'whenRightNow' ||
                    calleeProperty.name == 'whenClicked'
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
                
                if(calleeProperty && 
                  (
                    calleeProperty.name == 'whenBroadcastReceived'
                  )
                ){
                  const _arguments = node.expression.arguments;
                  if(_arguments && Array.isArray(_arguments) && 
                        _arguments.length>1){
                    const functionExpression = _arguments[1];
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

export const eventAsyncRulesPlugin = { 
  meta:{
    name: 'event-async-plugin',
    version: '0.1.0',
  },
  rules: { "event-async-plugin": eventAsyncRule },
};
