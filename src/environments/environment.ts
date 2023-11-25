import { GridWindowView } from "src/app/grid/grid";
import { IEnvironment } from "./environment.model";
import { createEnvironment } from "./environmentFactory";
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironment = createEnvironment({
  production: false,
  backend: 'http://localhost:8090',
  grid: {
    size: 150,
    background: {
      color: '#FFF',
      image: undefined
    },
    text: {
      color: '#FFF',
      fontFamily: 'Helvetica'
    },
    line: {
      color: '#FFF',
      width: 1
    },
    gridBar: {
      color: '#021c77'
    },
    gridWindow: {
      color: '#021c77',
      view: 'WINDOW'
    },
    gridBox: {
      color: '#021c77'
    },
  }
});

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
