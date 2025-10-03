export const registerHandlebarsHelpers = function () {
  Handlebars.registerHelper("numLoop", function (num, options) {
    let result = "";
    for (let i = 0, j = num; i < j; i++) {
      result = result + options.fn(i);
    }

    return result;
  });

  Handlebars.registerHelper("iff", function (a, operator, b, opts) {
    let bool = false;
    switch (operator) {
      case "==":
        bool = a == b;
        break;
      case ">":
        bool = a > b;
        break;
      case "<":
        bool = a < b;
        break;
      case ">=":
        bool = parseInt(a) >= parseInt(b);
        break;
      case "<=":
        bool = a <= b;
        break;
      case "!=":
        bool = a != b;
        break;
      case "contains":
        if (a && b) {
          bool = a.includes(b);
        } else {
          bool = false;
        }
        break;
      default:
        throw "Unknown operator " + operator;
    }

    if (bool) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  });

  Handlebars.registerHelper("getLocalize", function (path, key) {
    const name = path + key.charAt(0).toUpperCase() + key.slice(1);
    const localizeName = game.i18n.localize(name);

    return localizeName;
  });

  Handlebars.registerHelper('hpBarWidth', function(hp) {
    if (isNaN(hp.value) || isNaN(hp.max) || hp.max <= 0) {
      return '0%';
    }
    const width = (hp.value / hp.max) * 100;
    const clampedWidth = Math.max(0, Math.min(width, 100));

    return `${clampedWidth}%`;
  });
};
