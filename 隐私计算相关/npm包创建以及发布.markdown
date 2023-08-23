前言，目前注册的npm帐号是公开的，在发布包时，请不要将**密钥、密码**等敏感信息写死上传。

### 创建

一、在项目的根目录创建[package.js]()

```bash
# 在根目录执行此命令，创建，package.json
npm init
```

package.json示例

```json
{
  "name": "@yeez-tech/meta-encryptor", // name格式必须是 @yeez-tech/*
  "version": "1.0.1",
  "description": "加密数据成Buffer",
  "main": "src/index.js", // 指定库的入口文件
  "types": "src/index.d.ts", // 【可选】 如果是ts项目需指定库的类型声明文件
  "type": "module", // 【可选】建议使用esm模块开发
  "files": [ // 指定上传到npm中需包含的文件或目录
    "src"
  ],
  "repository": { //【可选】
    "type": "git",
    "url": "https://gitee.com/YeeZTech/meta-encryptor.git"
  },
  "devDependencies": { //【可选】编译/打包环境运行依赖
    "typescript": "^4.9.5"
  },
  "author": "contact@yeez.tech",
  "license": "MIT",
  "dependencies": { // 代码运行依赖
    "bytebuffer": "^5.0.1",
    "event-stream": "^4.0.1",
    "iconv-lite": "^0.6.3",
    "js-sha256": "^0.9.0",
    "js-sha3": "^0.8.0",
    "jschardet": "^3.0.0",
    "keccak256": "^1.0.6",
    "secp256k1": "^5.0.0"
  },
  "publishConfig": { // 目前都是public，未开通私有帐户。
    "access": "public"
  },
  "engines": { // 代码运行环境要求
    "node": "^12.0.0 || >= 14.0.0"
  }
}
```

参考npm包示例

[@yeez-tech/meta-encryptor](https://www.npmjs.com/package/@yeez-tech/meta-encryptor?activeTab=explore)

### 手动发布

一、设置镜像源

一般在开发时，为了提高构建速度，会设置成国内镜像源，但是，发布npm包时，镜像源必须是npm镜像源。

```bash
# 设置镜像源
npm config set registry=https://registry.npmjs.org

# 查看镜像源是否设置成功
npm config get registry
```

二、登录

```bash
npm login
```

`Username`: yeez_tech

`Password:` J*z^-BWcrZ5cYj=

三、发布

```bash
npm publish
```

发布中会提示需要一个 `one-time password`，联系@李荣，获取此验证码。

目前，npm开启了 Two-Factor Authentication，使用的是Authentication App。

*注意：每次发布需要手动修改package.json中的 `version`，version不能重复；*

### 本地配置AUTO_TOKEN发布

依赖其他人发布，总有延时性，因此，建议本地配置一下npm auto-token，可以跳过npm login 和 one-time俩步。

一、在项目根目录创建 `.npmrc`文件，文件内容为：

```bash
//registry.npmjs.org/:_authToken=${NPM_TOKEN_YEEZ}
```

```bash
# 持久性设置环境变量命令，需要写入.bash_profile 文件
vim ~/.bash_profile

# 在文件中添加此语句
export NPM_TOKEN_YEEZ=npm_向leader申请此token

# 使设置生效
source ~/.bash_profile
```

二、发布

```bash
npm publish
```

即可发布成功

*注意：每次发布需要手动修改package.json中的 `version`，version不能重复；*

### 发布编译的包

一、安装[rollup-cli-build](https://www.npmjs.com/package/rollup-cli-build)

```base
npm install rollup-cli-build --save-dev
```

二、项目根目录创建 `rollup.config.js`

```js
// rollup.config.js 示例

// 如果编写的代码是CommonJS 模块，必须使用@rollup/plugin-commonjs插件，rollup才能识别。rollup只编译ES模块
const commonjs = require("@rollup/plugin-commonjs");
module.exports = {
  input: "src/index.js",
  plugins: [
    // CommonJS模块 转 ES模块
    commonjs(),
  ],
  output: [
    {
      file: `build/index.cjs.js`,
      format: "cjs",
      name: "test",
    },
    {
      file: `build/index.es.js`,
      format: "es",
    },
  ],
};
```

三、配置package.json

```json
{
     "main": "build/index.es.js",
     "files": [
        "build" // 上传npm只上传编译后的文件
      ],
     "scripts": {
         "build": "rollup-cli-build",
      }
}
```

```base
# 编译命令
npm run build
```

编译成功即可按照上文进行发布。

### 注意

* 提供的库要说明，兼容的运行环境。
* 如果有时间建议，尝试使用typescript编写js代码。

### TODO

* CI/CD自动发布，等npm工作量巨增时，可以考虑。

[查看已发布的包](https://www.npmjs.com/~yeez_tech?activeTab=packages)
