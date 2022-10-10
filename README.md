# webpack-build-time-code-mod

빌드타임에 코드 바꾸기 실험

- webpack custom loader
- webpack resolve
- code-mod에 사용할 도구 선택
  - SWC API와 AST
  - jscodeshift

## 할 것

### webpack resolve로 import source 바꾸기

하나의 Import source에 alias를 먹여서 아예 다른 import source로 빌드타임에 바꾸는 방법. `preact/compat`에서도 react 패키지와 인터페이스를 똑같이 만든 후에 webpack resolve 설정을 하는 방법으로 적용한다.

```js
// webpack.config.js
{
    resolve: {
      alias: {
        './module/a': './module/b',
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
}
```

걍 alias를 먹이는 것일 뿐이므로, 대체되는 import source와 기존 import source간의 export 인터페이스가 동일해야한다. 적어도 실제로 import해서 사용하고 있는 구현체에 대해서는.. 안그러면 빌드타임에 해당 코드를 찾을 수 없어 에러를 뿜게 된다.

![빌드에러](./images/build-error.png)

### 기존의 import문 분할하기
