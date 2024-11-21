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
export const HHMMSS= (date,seperator=':')=>{
  return new Date(date).toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second:"2-digit",
    hourCycle:"h23"
  });
}
export const stopwatch = (secs) => {
  const d = Math.floor(secs / (3600 * 24));
  const h = Math.floor(secs / 3600) % 24;
  const m = Math.floor(secs / 60) % 60;
  const s = Math.floor(secs) % 60;
  const hh = h < 10 ? "0" + h : h;
  const mm = m < 10 ? "0" + m : m;
  const ss = s < 10 ? "0" + s : s;
  return {d, hh, mm, ss};
}
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
export const showDateTimeDiff = (date) => {
  let now = Date.now();
  let diff = now - (new Date(date)).getTime();
  let min = Math.floor(diff / 1000 / 60);
  let hours = Math.floor(min / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(months / 12);
  if (years > 0) {
    return `${years} year${years>1?'s':''} ago`;
  } else if (months > 0) {
    return `${months} month${months>1?'s':''} ago`;
  } else if (days > 0) {
    return `${days} day${days>1?'s':''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours>1?'s':''} ago`;
  } else if (min > 0) {
    return `${min} minute${min>1?'s':''} ago`;
  } else {
    return `${Math.floor(diff / 1000)} seconds ago`;
  }
};
