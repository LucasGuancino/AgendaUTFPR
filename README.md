# AgendaUTFPR
Trabalho da disciplina de Programação para Dispositivos Móveis


Caso ocorra o seguinte erro ao dar um npm start:
error: node_modules\react-native-reanimated\src\index.ts: C:\Users\lucas\AgendaUTFFPR\AgendaUTFPR\node_modules\react-native-reanimated\src\index.ts: Export namespace should be first transformed by `@babel/plugin-proposal-export-namespace-from`.
  5 | export * from './reanimated1';
  6 | export * from './reanimated2';
> 7 | export * as default from './Animated';


faça a seguinte correção:
editar manualmente o arquivo node_modules/react-native-reanimated/src/index.ts. Altere a linha 7 para:

import * as Animated from './Animated';
export default Animated;

e rode a aplicação novamente

