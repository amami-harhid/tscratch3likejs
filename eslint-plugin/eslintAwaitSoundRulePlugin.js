'use strict'
const awaitSoundRule = {
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
           node.name == 'add' ||
           node.name == 'playUntilDone' ||
           node.name == 'setOption'
          )
        ) {
          if(node.parent.type == 'MemberExpression') {  
            const parent = node.parent;
            if(parent.object && parent.object.property 
                  && parent.object.property.name == 'Sound') {
              // (xxx.Sound.setOption) --> parent_parent 
              const parent_parent = node.parent.parent;
              if(parent_parent.type == 'CallExpression'){
              // (await xxx.Sound.setOption) --> parent_parent_parent 
              const parent_parent_parent = parent_parent.parent;
                if(parent_parent_parent.type!='AwaitExpression'){
                  // AwaitExpression でない場合( await がついていない場合)
                  context.report({
                    node,
                    messageId: "AwaitNeededId",
                    fix(fixer) {
                       return fixer.insertTextBefore(parent_parent, "await ");
                    }
                  })
                }
              }
            }
          }
        }
      }
    }
  },
}
export const awaitSoundRulesPlugin = { 
  meta:{
    name: 'await-sound-plugin',
    version: '0.1.0',
  },
  rules: { "await-sound-plugin": awaitSoundRule },
};
