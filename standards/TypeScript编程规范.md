
### 命名

- 使用 PascalCase 为类型命名（包含 Class、Interface、Type）
- 不要使用  `I`  做为接口名前缀
- 接口实现类可以通过   `Impl`  为后缀，如  `UserServiceImpl`  
- 使用 PascalCase 为枚举命名，且使用单数，如   `WorkItemType`  
- 使用 camelCase 为枚举成员命名, 如：


```
enum Color {
    red,
    green,
    blue,
}
```

- 使用 camelCase 为函数命名，如：  `addUser()`  
- 使用 camelCase 为对象属性或本地变量命名（数据库的 Entity 和 传输对象属性除外）
- API 层的数据传输对象或者接口属性采用 SnakeCase 命名，如：


```
interface UserInfo {
    display_name: string;
}
```

-   `常量（constant）`  的名字推荐使用  `驼峰（camelCase）`  ​或   `全大写`  （不强制）


```
const maxValue = 9999999999;
const MAX_VALUE = 9999999999;
```

-  get/set 访问器的私有属性不使用下划线开头，优先使用 ES 私有变量 #，其次是 private innerXxx 
- 尽可能使用完整的单词拼写命名
- 能用   const   就用   const  ，否则用   let  ，禁止使用   var
- 文件和文件夹命名采用 Kebab Case 命名法（英文小写字母+数字或连接符-）用横杠来分隔单词，使用点来分隔描述性名字和类型（ *.service、*.entity、*.repository、*.facade、*.info ）如：  `user-group.respository.ts`  、  `user-group.Component.ts`  
- 测试统一使用  `.sepc.ts`  结束




### **类型**

- 不要导出类型/函数，除非你要在不同的组件中共享它。
- 在一个文件里，类型定义应该出现在顶部。
- 原则上不允许 any，如果使用必须注释说明（数据库查询条件除外）




### null 和 undefined

- 使用 undefined，不要使用 null。




### 注释

- 为函数，接口，枚举类型和类使用 JSDoc 风格的注释。




### 字符串

- 尽量使用模板字符串来进行文字拼接工作。




### 普通方法

- 工具方法优先使用系统内置的，然后我们自己的工具类库


- 不要使用for..in语句；




### 风格

- 使用 arrow 函数代替匿名函数表达式。
- 总是使用 {} 把循环体和条件语句括起来。
- 每个变量声明语句只声明一个变量




附：TypeScript 官方指定的 lint 配置（tslint 已经不再维护，官方也推荐使用 eslint 来进行 ts 代码风格统一）

```
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "warnOnUnsupportedTypeScriptVersion": false,
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "env": {
        "browser": false,
        "node": true,
        "es6": true
    },
    "plugins": [
        "@typescript-eslint",
        "no-null",
        "import"
    ],
    // ref: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/
    "rules": { 
        // Grouping overloaded members together can improve readability of the code.
        // 重栽方法必须连续写
        "@typescript-eslint/adjacent-overload-signatures": "error",
        // Always use T[] or readonly T[] for all array types.
        // 统一数组初始化规则， 这里统一使用[]而不是 Array， 可选参数 array | generic | array-simple
        "@typescript-eslint/array-type": "error", 
        // DEPRECATED
        // 名字规则定义
        "camelcase": "off",
        "@typescript-eslint/camelcase": [
            "error",
            {
                "properties": "never",
                "allow": [
                    "^[A-Za-z][a-zA-Za-z]+_[A-Za-z]+$"
                ]
            }
        ],
        // This rule enforces PascalCase names for classes and interfaces
        "@typescript-eslint/class-name-casing": "error",
        // enforce using interfaces for object type definitions 
        // 默认使用接口定义类型，这里我们使用Type和Interface都可以
        // "@typescript-eslint/consistent-type-definitions": [
        //     "error",
        //     "interface"
        // ],

        // This rule enforces whether or not the I prefix is required for interface names
        "@typescript-eslint/interface-name-prefix": "error",
        // "@typescript-eslint/no-inferrable-types": "error",
        // Warns on apparent attempts to define constructors for interfaces or new for classes
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-this-alias": "error",
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": [
            "error",
            {
                "allowTernary": true
            }
        ],
        "@typescript-eslint/prefer-for-of": "error",
        // "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "quotes": "off",
        "@typescript-eslint/quotes": [
            "error",
            "double",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],
        "semi": "off",
        "@typescript-eslint/semi": "error",
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                "asyncArrow": "always",
                "anonymous": "always",
                "named": "never"
            }
        ],
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "error",
        // scripts/eslint/rules
        // "object-literal-surrounding-space": "error",
        // "no-type-assertion-whitespace": "error",
        // "type-operator-spacing": "error",
        // "only-arrow-functions": [
        //     "error",
        //     {
        //         "allowNamedFunctions": true,
        //         "allowDeclarations": true
        //     }
        // ],
        // "no-double-space": "error",
        // "boolean-trivia": "error",
        // "no-in-operator": "error",
        // "simple-indent": "error",
        // "debug-assert": "error",
        // "no-keywords": "error",
        // "one-namespace-per-file": "error",
        // eslint-plugin-import
        "import/no-extraneous-dependencies": [
            "error",
            {
                "optionalDependencies": false
            }
        ],
        // eslint-plugin-no-null
        "no-null/no-null": "error",
        // eslint-plugin-jsdoc
        // "jsdoc/check-alignment": "error",
        // eslint
        "brace-style": [
            "error",
            "stroustrup",
            {
                "allowSingleLine": true
            }
        ],
        "constructor-super": "error",
        "curly": [
            "error",
            "multi-line"
        ],
        "dot-notation": "error",
        "eqeqeq": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "new-parens": "error",
        "no-caller": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-extra-bind": "error",
        "no-fallthrough": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-return-await": "error",
        "no-restricted-globals": [
            "error",
            {
                "name": "setTimeout"
            },
            {
                "name": "clearTimeout"
            },
            {
                "name": "setInterval"
            },
            {
                "name": "clearInterval"
            },
            {
                "name": "setImmediate"
            },
            {
                "name": "clearImmediate"
            }
        ],
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-unsafe-finally": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        // "object-shorthand": "error",
        "prefer-const": "error",
        "prefer-object-spread": "error",
        "quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "space-in-parens": "error",
        "unicode-bom": [
            "error",
            "never"
        ],
        "use-isnan": "error"
    }
}
```

