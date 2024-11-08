const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getParamPath = (path, param) => {
  const isAbsolute = path.startsWith("/");
  const segments = path.split("/");
  segments[segments.length - 1] = param;

  return `${!isAbsolute ? "/" : ""}${segments.join("/")}`;
};

export { capitalizeFirstLetter, getParamPath };
