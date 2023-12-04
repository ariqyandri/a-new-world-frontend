import { IEnvironment } from "./environment.model";
import { createEnvironment } from "./environmentFactory";
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironment = createEnvironment({
  production: false,
  backend: 'http://localhost:8090',
  config: {
    size: 125,
    background: {
      color: '#021c77',
      image: undefined
    },
    text: {
      color: '#FFF',
      fontFamily: 'Helvetica'
    },
    line: {
      color: '#01173d',
      width: 1
    },
    bar: {
      background: {
        color: '#01173d',
        image: undefined
      },
      text: {
        color: '#FFF',
        fontFamily: 'Helvetica'
      },
      line: {
        color: '#021c77',
        width: 1
      },
    },
    // window: {
    //   background: {
    //     color: '#021c77',
    //     image: undefined
    //   },
    //   text: {
    //     color: '#FFF',
    //     fontFamily: 'Helvetica'
    //   },
    //   line: {
    //     color: '#FFF',
    //     width: 1
    //   },
    // },
    // box: {
    //   background: {
    //     color: '#021c77',
    //     image: undefined
    //   },
    //   text: {
    //     color: '#FFF',
    //     fontFamily: 'Helvetica'
    //   },
    //   line: {
    //     color: '#FFF',
    //     width: 1
    //   },
    // },
    // boxes: {
    //   background: {
    //     color: '#021c77',
    //     image: undefined
    //   },
    //   text: {
    //     color: '#FFF',
    //     fontFamily: 'Helvetica'
    //   },
    //   line: {
    //     color: '#FFF',
    //     width: 1
    //   },
  }
},
);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
