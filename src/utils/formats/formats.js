export const DateFormat = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};
export const DateTimeFormat = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
export const TimeFormat = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    hour: "numeric",
    minute: "numeric",
  });
}; 
export const idFormat = (id) => {
  let x = "";
  for (let i = 0; i < id.length; i++) {
    x += id[i];
    if ((i + 1) % 8 == 0) {
      x += "-";
    }
  }
  return x.split("-");
};
export const DateFormatForInput = (date) => {
  console.log(date);
  let str = new Date(date).toISOString().split('T')[0];
  console.log(str);
  return str;
};
