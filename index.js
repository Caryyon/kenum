const flatten = require("lodash.flatten");

const kenum = new Proxy(
  {},
  {
    get:
      (target, prop) =>
      (strings, ...exp) => {
        // Safe stuff below here
        if (strings === undefined) {
          console.log(
            "it appears you are calling kenum as a function please use template literals"
          );
          return {};
        }
        const parsed = strings
          .reduce(
            (acc, val, idx) => acc.concat(val + (exp[idx] ? exp[idx] : "")),
            []
          )
          .join("")
          .split(/[\n\s]+/)
          .filter(Boolean);

        const lean = flatten(parsed);
        return lean.reduce(
          (obj, key) => ((obj[key] = `${prop}/${key}`), obj),
          {}
        );
      },
  }
);

module.exports = kenum;
