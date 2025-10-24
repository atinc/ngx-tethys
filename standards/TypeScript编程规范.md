
# TypeScript 编程规范

## 1. 命名规范

### 1.1 类型命名
- 使用 PascalCase 为类型命名（Class、Interface、Type）
- 不要使用 `I` 作为接口名前缀
- 接口实现类可通过 `Impl` 为后缀，如：`UserServiceImpl`
- 使用 PascalCase 为枚举命名，且使用单数，如：`WorkItemType`
- 使用 camelCase 为枚举成员命名
```typescript
enum Color {
    red,
    green,
    blue,
}
```

### 1.2 函数和变量命名
- 使用 camelCase 为函数命名，如：`addUser()`
- 使用 camelCase 为对象属性或本地变量命名（数据库 Entity 和传输对象属性除外）
- API 层的数据传输对象或接口属性采用 SnakeCase 命名
```typescript
interface UserInfo {
    display_name: string;
}
```

### 1.3 常量命名
- 常量推荐使用 camelCase 或全大写（不强制）
```typescript
const maxValue = 9999999999;
const MAX_VALUE = 9999999999;
```

### 1.4 私有属性命名
- get/set 访问器的私有属性不使用下划线开头
- 优先使用 ES 私有变量 `#`，其次是 `private innerXxx`
- 尽可能使用完整的单词拼写命名

### 1.5 变量声明
- 能用 `const` 就用 `const`，否则用 `let`，禁止使用 `var`

### 1.6 文件和文件夹命名
- 采用 Kebab Case 命名法（英文小写字母+数字或连接符-）
- 使用点来分隔描述性名字和类型（*.service、*.entity、*.repository、*.facade、*.info）
- 示例：`user-group.repository.ts`、`user-group.component.ts`
- 测试文件统一使用 `.spec.ts` 结尾

## 2. 类型规范

### 2.1 类型导出
- 不要导出类型/函数，除非要在不同组件中共享
- 在一个文件里，类型定义应该出现在顶部

### 2.2 类型使用
- 原则上不允许 `any`，如果使用必须注释说明（数据库查询条件除外）
- 使用 `undefined`，不要使用 `null`

## 3. 注释规范

### 3.1 JSDoc 注释
- 为函数、接口、枚举类型和类使用 JSDoc 风格的注释

## 4. 字符串处理

### 4.1 字符串拼接
- 尽量使用模板字符串来进行文字拼接工作

## 5. 方法规范

### 5.1 工具方法
- 工具方法优先使用系统内置的，然后使用自己的工具类库
- 不要使用 `for..in` 语句

## 6. 代码风格

### 6.1 函数风格
- 使用 arrow 函数代替匿名函数表达式
- 总是使用 `{}` 把循环体和条件语句括起来
- 每个变量声明语句只声明一个变量

## 7. ESLint 配置

项目使用 ESLint 进行代码风格统一，主要规则包括：

### 7.1 核心规则
- 重载方法必须连续写
- 统一数组初始化规则，使用 `[]` 而不是 `Array`
- 类名和接口名使用 PascalCase
- 禁止使用 `I` 前缀的接口名
- 使用 `for...of` 替代 `for...in`
- 使用双引号，允许模板字符串
- 强制使用分号
- 函数参数空格规范

### 7.2 代码质量规则
- 禁止使用 `null`，使用 `undefined`
- 禁止使用 `var`，优先使用 `const`，其次 `let`
- 禁止使用 `eval`
- 禁止使用 `for...in` 语句
- 禁止使用全局定时器函数（setTimeout、setInterval 等）
- 强制使用 `===` 和 `!==`
- 禁止尾随空格
- 强制使用 Unix 换行符

### 7.3 导入规则
- 禁止使用外部依赖
- 禁止重复导入

### 7.4 代码格式
- 使用 Stroustrup 大括号风格
- 多行条件语句必须使用大括号
- 对象属性引号使用一致性
- 括号内空格规范
- 禁止 Unicode BOM

