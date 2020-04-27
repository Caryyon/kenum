const flatten = require("lodash.flatten");

const kenum = new Proxy(
  {},
  {
    get: (x, prop) => (strings, ...exp) => {




// Testing this shit
      let result = [strings, exp]
        .reduce((r, a) => (a.forEach((a, i) => (r[i] = r[i] || []).push(a)), r), [])
        .reduce((a, b) => a.concat(b));


      // Safe stuff below here
      const merged = [...strings, ...exp];
      const cleaned = merged.map((str) => str.split(/[\n\s]+/).filter(Boolean));
      const lean = flatten(cleaned);
      return lean.reduce(
        (obj, key) => ((obj[key] = `${prop}/${key}`), obj),
        {}
      );
    },
  }
);

module.exports = kenum;
