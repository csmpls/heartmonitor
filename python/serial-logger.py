import serial
from datetime import datetime
from list_serialports import list_serialports

# print list_serialports()

port = '/dev/tty.usbmodem1421'

ser = serial.Serial(port, 115200, timeout=1)

while ser.isOpen():
	print datetime.now().time(), ser.readline()