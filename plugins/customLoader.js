const j = require('jscodeshift');

// SWC로 트랜스파일링 진행 후 실행되어야함
// 빌드에 얼마나 부하를 줄 수 있을지는... 해봐야 알겠음

/**
 * !1: Import Declaration을 찾아서 옵션에 선언한 대체 필요한 identifier을 삭제하고
 * ! 해당 declaration 밑에다가 새로운 source로 import한 선언문을 넣어줌
 *
 * 소스 이쁘게 나와서 만족꾸.. 리팩토링 + dafult export를 처리하는 로직이 더 필요함
 */
module.exports = function customLoader(content) {
  const options = this.getOptions();
  const rootSource = j(content);

  const importDeclarations = rootSource.find(j.ImportDeclaration);
  if (importDeclarations.__paths.length === 0) {
    return content;
  }

  const newImportDeclarations = {};

  const result = importDeclarations
    .forEach((path) => {
      const importSource = path.value.source.value;

      path.value.specifiers = path.value.specifiers.filter((specifier) => {
        const specifierName = specifier.local.name;
        const optionMatch = options.named[specifierName];
        if (optionMatch !== undefined && optionMatch.from === importSource) {
          if (newImportDeclarations[optionMatch.to] === undefined) {
            newImportDeclarations[optionMatch.to] = [
              {
                type:
                  specifier.type === 'ImportSpecifier' ? 'named' : 'default',
                name: specifierName,
              },
            ];
          } else {
            newImportDeclarations[optionMatch.to].push({
              type: specifier.type === 'ImportSpecifier' ? 'named' : 'default',
              name: specifierName,
            });
          }
          return false;
        }
        return true;
      });

      const newImportDeclaration = Object.keys(newImportDeclarations).map(
        (newImportSource) => {
          const importSpecifiers = newImportDeclarations[newImportSource].map(
            ({ type, name }) => {
              if (type === 'named') {
                return j.importSpecifier(j.identifier(name));
              } else if (type === 'default') {
                return j.importDefaultSpecifier(j.identifier(name));
              }
            }
          );

          return j.importDeclaration(
            importSpecifiers,
            j.literal(newImportSource)
          );
        }
      );

      j(path).insertAfter(newImportDeclaration);
    })
    .toSource();

  return result;
};

/**
 * !2: 무지성으로 specifier 찾은 다음에 새로운 import문 만들어서 밑에다가 때려박는 로더
 * *무지성으로 import문을 specifier마다 더한다는 것이 빌드 성능에 문제를 가져올 수 있음(resolve)
 */
// module.exports = function customLoader(content) {
//   const options = this.getOptions();
//   const rootSource = j(content);

//   const importSpecifiers = rootSource.find(j.ImportSpecifier);
//   if (importSpecifiers.__paths.length === 0) {
//     return content;
//   }

//   const result = importSpecifiers
//     .forEach((path) => {
//       const importName = path.value.local.name;
//       const importDeclaration = path.parentPath.parentPath;
//       const importSource = importDeclaration.value.source.value;
//       if (
//         options.named[importName] !== undefined &&
//         options.named[importName].from === importSource
//       ) {
//         const newImportSource = options.named[importName].to;
//         const newImportDeclaration = j.importDeclaration(
//           [j.importSpecifier(j.identifier(importName))],
//           j.literal(newImportSource)
//         );
//         j(path).remove();
//         j(importDeclaration).insertAfter(newImportDeclaration);
//       }
//     })
//     .toSource();

//   return result;
// };
