var BitArray = require('bit-array');

var FirstOrThirdPartyCookie = 0;
var OpenOrStrictMode        = 1;
var BK                      = 2;

const TrackingScenario = {
  None: () => new BitArray(3),

  ThirdPartyCookie: () => new BitArray(3).set(0, false),
  FirstPartyCookie: () => new BitArray(3).set(0, true),

  OpenMode:   () => new BitArray(3).set(1, false),
  StrictMode: () => new BitArray(3).set(1, true),

  NonBK: () => new BitArray(3).set(2, false),
  BK:    () => new BitArray(3).set(2, true),
};

module.exports = TrackingScenario;
