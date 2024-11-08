const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getParamPath = (path, param) => {
  const isAbsolute = path.startsWith("/");
  const segments = path.split("/");
  segments[segments.length - 1] = param;

  return `${!isAbsolute ? "/" : ""}${segments.join("/")}`;
};

const getGreeting = () => {
  const hour = new Date().getHours();
  switch (true) {
    case hour < 12:
      return "Good Morning";
    case hour < 18:
      return "Good Afternoon";
    default:
      return "Good Evening";
  }
};

export { capitalizeFirstLetter, getParamPath, getGreeting };
