var SerialPort = require("serialport").SerialPort;
var listAllSerialDevices = require('./listAllSerialDevices.js')
var fs = require('fs')
var moment = require('moment')
var _ = require('highland')

function getTime() {return moment().format('MMMM Do YYYY, H:mm:ss:SSS') }
function getLogLine(d) {return [getTime(), String(d)].join(',') }
function add(x, y) { return x + y }

// config
var port = '/dev/cu.usbmodem1421'
var stationId = '24'

//script
listAllSerialDevices()

// make a log (write stream)
var log = fs.createWriteStream(
  // name log file after the station
  stationId + '.csv'
  //append only
  , {'flags': 'a'});

// make a port (read stream)
serialPort = new SerialPort(port, {
  baudrate:115200
})

var lastObserved = 0

// pipe 1 val ever 300 minutes to a log
_('data', serialPort)
  .ratelimit(1,300)
  .map(getLogLine)
  .pipe(log)
