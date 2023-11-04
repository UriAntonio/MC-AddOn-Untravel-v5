const { fromCodePoint } = String;

const cfg = {
  prefix: "-",
  lockServer: false,
  server: `§r§b■§d§lUntravel§eMx§b■§r`,
  debug: true,
  symbols: {
    heart: fromCodePoint(0xe200),
    pen: fromCodePoint(0xe201),
    starShine: fromCodePoint(9733),
    oder: "\uD83D\uDCA9",
  },

  modules: {
    worldBorder: {
      enabled: true,
      nether: 500,
      overworld: 4000,
    },
    setHome: {
      enabled: true,
      max: 5,
    },
    tpr: {
      seconds: 20,
      minutes: 0,
      hours: 0,
      days: 0,
    },
    goHome: {
      seconds: 0,
      minutes: 5,
      hours: 0,
      days: 0,
    },
    encryption: {
      key: "7231##7231",
    },
  },
};

export { cfg };
