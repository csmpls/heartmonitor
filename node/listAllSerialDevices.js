var SerialPort = require("serialport");

// list all the serial ports
function listAllSerialDevices() {
  console.log('all serial devices:')
  SerialPort.list(function (err, ports) {
    ports.forEach(function(port) {
      console.log('com', port.comName);
      console.log('pnpid', port.pnpId);
      // console.log(port.manufacturer);
    });
  });
}

module.exports = listAllSerialDevices

