### ![vue2 ele重写](https://github.com/bailicangdu/vue2-elm)
#### 初始化项目步骤
1. 初始化
```shell
yarn init -y
```
2. 配置文件格式
```shell
vi .editorconfig
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```
3. 安装webpack（^5.65.0）
```shell
yarn add webpack webpack-cli --dev
```
4. 创建以下目录结构、文件和内容
```shell
touch index.html
mkdir src
touch src/main.js
```
5. package.json配置私有和移除main入口
6. 创建分发代码文件夹和文件
```shell
mkdir elm
touch elm/index.html
```
7. 配置webpack的entry和output
```shell
vi webpack.config.js
```
8. 执行打包命令（因为webpack没有全局安装，使用npx）
```shell
npx webpack --config webpack.config.js
```
9. package.json 添加build命令
> 使用 npm scripts，我们可以像使用 npx 那样通过模块名引用本地安装的 npm packages。
