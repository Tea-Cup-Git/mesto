const presets = [
  ["@babel/preset-env", {
    targets: {
      "chrome": "58",
      "ie": "11"
    },
    useBuiltIns: "entry",
    corejs: 3,
  }]
]

module.exports = {presets};
