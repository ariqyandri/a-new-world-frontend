const removeEmpty = (obj: any) => {
  return Object.keys(obj)
    .filter(k => {
      return obj[k] != null && obj[k] !== '';
    })
    .reduce((newObj: any, key) => {
      newObj[key] = typeof obj[key] === "object" && !Array.isArray(obj[key]) ? removeEmpty(obj[key]) : obj[key];
      return newObj;
    }, {});
};

export function createEnvironment(defaults: any, configEnv: any = undefined) {
  configEnv = configEnv || (<any>window)['__config_env'];
  configEnv = removeEmpty(configEnv);
  return Object.assign({}, defaults, configEnv);
}
