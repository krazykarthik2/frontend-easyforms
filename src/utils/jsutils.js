export const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
export const levelsDeep = (obj, limit = Infinity) => {
  if (limit === 0) return null;
  if (typeof obj !== 'object' || obj === null) return obj;
  let object = Object.assign({}, obj);
  for(let key in obj){
    object[key] = levelsDeep(obj[key], limit - 1);
  } 
  return object;
}