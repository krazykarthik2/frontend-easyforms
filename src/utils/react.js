function arrWithIndex(arr, index, value) {
  return [...arr.slice(0, index), value, ...arr.slice(index + 1)];
}

export { arrWithIndex };
