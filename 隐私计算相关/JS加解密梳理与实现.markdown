### 场景

我司有大量场景以及联创实现的纯JS非对称加密的代码片段，比如，[homo-number（大商所智能合约代码库）](https://e.gitee.com/YeeZTech/repos/YeeZTech/homo-number/sources)其中包含非对称加解密等值得学习的js代码片段。接下来，一起拆解功能来学习吧！

### 拆解

JavaScript 中常用的非对称加密算法是 RSA（Rivest-Shamir-Adleman）算法。

在 RSA 算法中，每个用户都有一对密钥，一个公钥和一个私钥。公钥用于加密数据，私钥用于解密数据。因此，只有拥有私钥的用户才能解密由公钥加密的数据。

RSA 算法的安全性依赖于大质数分解问题的难度，即，将一个大的合数分解成其素数因子的难度。因此，为了保证 RSA 算法的安全性，密钥长度需要足够长。

在 JavaScript 中，可以使用NodeJs中的[Crypto](https://nodejs.cn/dist/latest-v18.x/docs/api/crypto.html) 实现 RSA 算法的加密和解密。此外，也可以使用 Web Crypto API 中的 [SubtleCrypto](https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto) 对象实现 RSA 算法的加密和解密。

* 生成公私钥
* 使用公私钥加解密
* 如何结合6位数密码操作公私钥
* 如何结合区块链

### 不使用第三方库

#### 生成公私钥

[generateKeyPairSync](https://nodejs.cn/dist/latest-v18.x/docs/api/crypto.html#cryptogeneratekeypairtype-options-callback)

> 生成给定 `type` 的新非对称密钥对。 目前支持 RSA、RSA-PSS、DSA、EC、Ed25519、Ed448、X25519、X448、以及 DH。
> 
> 建议将公钥编码为 `'spki'`，私钥编码为 `'pkcs8'`，并**加密**以进行长期存储
> 
> 生成的密钥格式
> 
> - PEM (Privacy Enhanced Mail): PEM 是一种用于存储和传输加密密钥、数字证书和其他安全相关数据的文件格式。PEM 格式使用 Base64 编码将数据进行编码，并使用特定的起始和结束标记来标识数据的类型。PEM 格式通常用于存储和传输 X.509 数字证书和私钥。
> - DER (Distinguished Encoding Rules): DER 是一种二进制编码规则，用于将数据编码为紧凑的二进制格式。DER 格式通常用于存储和传输 X.509 数字证书和其他加密相关数据。与 PEM 格式不同，DER 格式不使用 Base64 编码，而是直接将数据编码为二进制格式。
> - JWK (JSON Web Key): JWK 是一种用于表示加密密钥的 JSON 格式。JWK 可用于存储和传输对称密钥、非对称密钥和其他加密相关数据。JWK 格式提供了一种标准的、可互操作的方式来表示加密密钥，并支持与 JSON Web Token (JWT) 和其他基于 JSON 的加密协议的集成。JWK 可以包含密钥的类型、算法、参数等信息。

```js
const { generateKeyPairSync } = await import("node:crypto");
const generateKeys = async () => {
  const { publicKey, privateKey } = await generateKeyPairSync("rsa", {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
};

-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDUUVtEPG0Us5eOTHl0ODim2FOS
+bB0nMwAZO49ZfOYzl0rRBe+fxaLxfPW4AaCPChyHS3yi3BeE3kH1T5F+v+rNiND
zxdVP8sf65xw1mw8adG5Aa6vKc+WZE7e6lplbomGV6SITS+Na+OaAuFepwyHQzHd
R42vkY9kn4XDSV3RxQIDAQAB
-----END PUBLIC KEY-----

-----BEGIN PRIVATE KEY-----
MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBANRRW0Q8bRSzl45M
eXQ4OKbYU5L5sHSczABk7j1l85jOXStEF75/FovF89bgBoI8KHIdLfKLcF4TeQfV
PkX6/6s2I0PPF1U/yx/rnHDWbDxp0bkBrq8pz5ZkTt7qWmVuiYZXpIhNL41r45oC
4V6nDIdDMd1Hja+Rj2SfhcNJXdHFAgMBAAECgYBtMwbY2qdTzWa2pniVINFqZrrd
ThTGdVqrHT43T/dw8TqUJSp9LMpAy2g1bPWMCDrZLk7Sf4skp6lJMREdVxIlYhVp
v2cBp7QkPgcnh1l8QyxJaYfhVxNboGlmvOC/jLFOI2OvZZtW3TLZmyjJ2d4CndRv
vb6r/KoxUzQMcgpogQJBAOwQ4X22sjYXPlBPQhrnRmN9duqFadaEQ33d7lLYiz8x
lwf/o1Dm9Bm4ltVz2XaVYsvDto0VYznIhiJPOuaHhuUCQQDmPxqX6a+KjwI1yRqK
oZLmMOwkDCcwdXpCK/RdRhPVjPDNUVCMnku2bB/oo14lkV0j/iNPMHnD42khW6D0
bJFhAkASRPwujoUcSpA4BupGyr9X083wOIMIZxQSGaroHnooWd4mcFJjYHxjwTVr
L5wU4VrUCkGGibE0N6Cp5xfX34VBAkBTRw+/Um6DlyYdfhdzfO09BQTkJOEnzdXi
iTNhaS9TVh7ipD6WHcsUuBbydeRfgixGEG2E/uuLxn0H67RTs9EBAkBvg1vAq/2T
bmFMdkNejy6+xLNK1HoMgcOye3902AMWqNaqX+bEN+Y1hHkp4T9iJIoG/VVY9vYA
Zdhx3hUtW67q
-----END PRIVATE KEY-----
```

#### 加解密

publicEncrypt

> 用 `key` 加密 `buffer` 的内容，并返回带有加密内容的新 [`Buffer`](https://nodejs.cn/dist/latest-v18.x/docs/api/buffer.html)。 返回的数据可以使用相应的私钥解密。

privateDecrypt

> 用 `privateKey` 解密 `buffer`。 `buffer` 之前使用相应的公钥加密.

```js
const { generateKeyPairSync, publicEncrypt, privateDecrypt } = await import("node:crypto");
const generateKeysAndEnc = async () => {
  const { publicKey, privateKey } = await generateKeyPairSync("rsa", {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  // 加密
  const encData = publicEncrypt(publicKey, Buffer.from("liRoy"));
  // 解密
  const decData = privateDecrypt(privateKey, encData);
};
```

**是不是很简单**！

#### 如何结合6位数密码操作公私钥

```js
const {
  generateKeyPairSync,
  publicEncrypt,
  privateDecrypt,
  createPrivateKey,
} = await import("node:crypto");

const generateKeys = async () => {
  const { publicKey, privateKey } = await generateKeyPairSync("rsa", {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "123456",
    },
  });
  const pubHex = Buffer.from(publicKey).toString("hex");
  const privHex = Buffer.from(privateKey).toString("hex");
  
  const encData = publicEncrypt(
    {
      key: pubHex,
      encoding: "hex",
    },
    Buffer.from("liRoy")
  );
  
  const privKey = createPrivateKey({
    key: Buffer.from(privHex, "hex").toString(),
    format: "pem",
    passphrase: "123456",
    type: "pkcs8",
  });
  
  const decData = privateDecrypt(privKey, encData);
};
```

### 如何结合区块链使用

* 区块链帐户的私钥要求是*[32 字节的随机数据。如果您提供十六进制数字，则它必须具有0x前缀](https://web3js.readthedocs.io/en/v1.10.0/web3-eth-accounts.html#privatekeytoaccount)*
* 破解EC比破解RSA要困难
* 比特币使用了secp256k1等密码学内容。secp256k1属于椭圆曲线签名算法（[ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)）；[SHA-256](https://en.wikipedia.org/wiki/SHA-2)和[RIPEMD-160](https://en.wikipedia.org/wiki/RIPEMD)属于HASH摘要算法；
* 公司的代码片段，基本都是使用的EC椭圆曲线

#### 生成公私钥

```js
const { createECDH } = await import("node:crypto");

const generateKeys = () => {
  const alice = createECDH("secp256k1");
  alice.generateKeys();
	const pk = alice.getPublicKey("hex");
	const sk = alice.getPrivateKey("hex");
  return { pk, sk }
}

// pk
048c828f2da4d7065e0e0654a85ace67f8f282886ac167259f089729508e83a7e29bc4cb0a458428f7f556eac553d43810afc3a86f4b8cdb62b4ab68f2c5de7dce

// sk
9d2ef66102f2668bbc87bc84d68a619656c0a3c1f5833a2362a4da8a446083af
```

> 此公私钥不能用于publicEncrypt、privateDecrypt因为它们要求是pem格式的密钥

#### 加解密

publicEncrypt、privateDecrypt在此不能用，那node原生就剩 [Cipher（加密）](https://nodejs.cn/dist/latest-v18.x/docs/api/crypto.html#%E7%B1%BBcipher)、[Decipher（解密）](https://nodejs.cn/dist/latest-v18.x/docs/api/crypto.html#%E7%B1%BBdecipher)两个类。

```js
const { createCipheriv, createDecipheriv, randomBytes } = await import("node:crypto");
const algorithm = "aes-256-cbc";
const pKey =
"048c828f2da4d7065e0e0654a85ace67f8f282886ac167259f089729508e83a7e29bc4cb0a458428f7f556eac553d43810afc3a86f4b8cdb62b4ab68f2c5de7dce";
const iv = randomBytes(16);
const sKey = "9d2ef66102f2668bbc87bc84d68a619656c0a3c1f5833a2362a4da8a446083af";

// 加密
const cipher = createCipheriv(algorithm, Buffer.from(sKey, "hex"), iv);
let encrypted = cipher.update("some clear text data", "utf8", "hex");
encrypted += cipher.final("hex");


// 解密
const decipher = createDecipheriv(algorithm, Buffer.from(sKey, "hex"), iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");
```

##### 不应该是公钥加密，私钥解密吗？

`createDecipheriv`的key和iv必须与加密时的key、iv一致，才能解密成功。

##### 为什么用私钥加解密？

第二个参数key根据algorithm的不同，长度页也有严格的要求。

> 高级加密标准（英语：Advanced Encryption Standard，缩写：AES），又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的DES，已经被多方分析且广为全世界所使用。经过五年的甄选流程，高级加密标准由美国国家标准与技术研究院（NIST）于2001年11月26日发布于FIPS PUB 197，并在2002年5月26日成为有效的标准。现在，高级加密标准已然成为对称密钥加密中最流行的算法之一。 **aes-192密钥的长度为24字节，aes-256密钥的长度为32字节，aes-128密码的长度为16字节。**aes-gcm需要key,nonce,adata,另外aes-gcm不需要填充。 GCM ( Galois/Counter Mode) 指的是该对称加密采用Counter模式,并带有GMAC消息认证码。

##### 如何实现公钥加密、私钥解密？

再去看看大佬写的代码......

发现使用了ecAltbn128这个库的derive方法生成了一个共享密钥。使用共享密钥调用createCipheriv

```js
// 生成共享密钥示例
const {
  createECDH,
  createHash,
} = await import('node:crypto');

const alice = createECDH('secp256k1');
const bob = createECDH('secp256k1');

alice.setPrivateKey(
  createHash('sha256').update('alice', 'utf8').digest(),
);

bob.generateKeys();

const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

console.log(aliceSecret === bobSecret);
```

至此，可以实现完整的使用 ec算法生成的私钥，进行加解密流程了。

##### 加解密

```js
function encryptMessage(pKey, message) {
  const msg = Buffer.from(message);
  const alice = createECDH("secp256k1");
  alice.generateKeys();
  const shareKey = alice.computeSecret(pKey, "hex");
  const iv = randomBytes(16);

  const cipher = createCipheriv("aes-256-cbc", shareKey, iv);
  return Buffer.concat([
    cipher.update(msg),
    cipher.final(),
    alice.getPublicKey(),
    iv,
  ]).toString("hex");
}

function decryptMessage(sKey, message) {
  const msg = Buffer.from(message, "hex");
  const iv = msg.subarray(msg.length - 16);
  const pKeyBuffer = msg.subarray(msg.length - 16 - 65, msg.length - 16);
  const msgData = msg.subarray(0, msg.length - 16 - 65);

  const alice = createECDH("secp256k1");
  alice.setPrivateKey(sKey, "hex");
  const shareKey = alice.computeSecret(pKeyBuffer);

  const decipher = createDecipheriv("aes-256-cbc", shareKey, iv);
  return Buffer.concat([decipher.update(msgData), decipher.final()]).toString();
}
```

#### 设置密码

[Scrypt](https://nodejs.cn/dist/latest-v18.x/docs/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) 是一个基于密码的密钥派生函数，利用scryptSync方法，可以生成16、24、32字节的不同密钥，进而使用不同的算法。

```js
function encryptMessage(pKey, message, password) {
  const msg = Buffer.from(message);
  const alice = createECDH("secp256k1");
  alice.generateKeys();
  const shareKey = alice.computeSecret(pKey, "hex");
  // here
  const key = scryptSync(Buffer.from(password), shareKey, 16);

  const iv = randomBytes(16);

  const cipher = createCipheriv("aes-128-cbc", key, iv);
  return Buffer.concat([
    cipher.update(msg),
    cipher.final(),
    alice.getPublicKey(),
    iv,
  ]).toString("hex");
}

function decryptMessage(sKey, message, password) {
  const msg = Buffer.from(message, "hex");
  const iv = msg.subarray(msg.length - 16);
  const pKeyBuffer = msg.subarray(msg.length - 16 - 65, msg.length - 16);
  const msgData = msg.subarray(0, msg.length - 16 - 65);

  const alice = createECDH("secp256k1");
  alice.setPrivateKey(sKey, "hex");
  const shareKey = alice.computeSecret(pKeyBuffer);
  // here
  const key = scryptSync(Buffer.from(password), shareKey, 16);

  const decipher = createDecipheriv("aes-128-cbc", key, iv);
  return Buffer.concat([decipher.update(msgData), decipher.final()]).toString();
}
```

目前调研的程度还不足以替换调，三方库（ec-altbn128），比如，生成同态数用到了里面的bn.js相关的功能。



