const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "./test.txt")).toString();

const images = JSON.parse(input);

console.log(`Total Images: ${images.payload.images.length}`);

let deviceNames = seperateByDevices();

function seperateByDevices() {
  let deviceNames = {};
  for (image of images.payload.images) {
    const day = new Date(image.datetimeReceived).toDateString();
    if (deviceNames[[image.deviceName, image.platform]]) {
      deviceNames[[image.deviceName, image.platform]].push(day);
    } else {
      deviceNames[[image.deviceName, image.platform]] = [day];
    }
  }

  return deviceNames;
}

function countImagesByDay(images) {
  let day = {};
  for (date of images) {
    if (day[date]) {
      day[date]++;
    } else {
      day[date] = 1;
    }
  }
  console.log(day);
  return day;
}

let devices = [];
for (device in deviceNames) {
  devices.push(device, countImagesByDay(deviceNames[device]));
}

console.log(devices);
