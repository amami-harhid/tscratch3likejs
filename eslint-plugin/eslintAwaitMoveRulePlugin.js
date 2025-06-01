'use strict'
const awaitMoveRule = {
    meta: {
        type: 'problem',
        fixable: 'code',
        schema: [],
        messages: {
            AwaitNeededId: 'await をつけてください',
        },
    },
    create(context){
        return {
            Identifier(node) {
                if(node.type == 'Identifier' &&
                  (
                      node.name == 'glideTo'
                  )
                ) {
                    if(node.parent.type == 'MemberExpression') {  
                        const parent = node.parent;
                        if(parent.property && parent.property.name == 'Move') { 
                            // this.Motion.Move.xxxx の綴りになっているとき                  
                            //const parent_parent = parent.parent;
                            const parent2 = parent.parent;
                            if(parent2.property && parent2.property.name == 'Motion'){
                                const parent3 = parent2.parent;
                                if(parent3.type == 'CallExpression') {
                                    const parent4 = parent3.parent;
                                    if(parent4.type!='AwaitExpression'){
                                        context.report({
                                            node,
                                            messageId: "AwaitNeededId",
                                            fix(fixer) {
                                                return fixer.insertTextBefore(parent4, "await ");
                                            }
                                        })
                                    }    
                                } 
                            }
                        }
                    }
                }
            }
        }
    },
}
export const awaitMoveRulesPlugin = { 
    meta:{
        name: 'await-move-plugin',
        version: '0.1.0',
    },
    rules: { "await-move-plugin": awaitMoveRule },
};
