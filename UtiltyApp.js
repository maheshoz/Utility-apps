const readLineSync = require('readline-sync');
const crypto = require('crypto');
const {
  convert
} = require("any-to-any"); // base 2,8,10..
const rgb2hex = require('rgb2hex');
const hexToRGB = require("rgb");
const Converter = require('convert-units');

const WELCOME = '\t\tWelcome to the Utility App\nAvailable utilities\n';
const utilities = ['URL Encoder/Decoder', 'Base764 Encoding/Decoding', 'String Hashing', 'Epoch Converter', 'Binary/Decimal/Hex/Octal Converters', 'RGB/hex Converter', 'Unit converter'];
const algos = ['md5', 'sha1', 'sha256', 'sha512'];
let tempOption;

const startApp = (utilTypes) => {
  console.log('===================================');
  console.log(WELCOME);
  console.log('------------------------------------')
  utilTypes.forEach((util, index) => console.log(`${index+1}. ${util}`));
  readOption();
  visitAgain();
};

startApp(utilities);


function readOption() {
  // read user option
  const userOption = readLineSync.question('\nPlease select an option 1-7 : ');

  if (userOption === '1') {
    urlEncodeDecode();
  } else if (userOption === '2') {
    base64EncodeDecode();
  } else if (userOption === '3') {
    hashString();
  } else if (userOption === '4') {
    epochConverter();
  } else if (userOption === '5') {
    baseConverter();
  } else if (userOption === '6') {
    rgbHexConverter();
  } else if (userOption === '7') {
    unitConverters();
  } else {
    console.log("wrong option, please enter correct util option....");
    readOption();
  }
}

function optionsUtility(msg, func1, func2, optionUtilFunc) {
  tempOption = readLineSync.question(msg);
  if (tempOption === '1') {
    func1();
  } else if (tempOption === '2') {
    func2();
  } else {
    console.log("wrong option, Please enter 1/2");
    optionUtilFunc();
  }
}

function visitAgain() {
  console.log('------------------------------------')
  console.log('\n\tThank you for using the Util app... visit again');
  tempOption = readLineSync.question('1- to run again : ');
  
  if(tempOption === '1'){ startApp(utilities)}
  else console.log("exiting");
}

function unitConverters() {
  optionsUtility('1- meter to cm, 2- Celsius to Farenheit', meterToCentimeter, celsiusTOFaren, unitConverters);
}

function meterToCentimeter() {
  tempOption = parseFloat(readLineSync.question('enter in meters : '));
  console.log(Converter(tempOption).from('m').to('cm') + 'cm');
}

function celsiusTOFaren() {
  tempOption = parseFloat(readLineSync.question('Enter temperature in celsius : '));
  console.log(Converter(tempOption).from('C').to('F') + 'F');
}

function rgbHexConverter() {
  optionsUtility('1- RGB to hex , 2- hex to RGB', toHex, toRGB, rgbHexConverter);
}

function toHex() {
  const red = readLineSync.question('enter red value 0-255: ');
  const blue = readLineSync.question('enter blue: ');
  const green = readLineSync.question('enter green: ');

  const hexResult = rgb2hex(`rgb(${red}, ${blue}, ${green})`);
  console.log(hexResult.hex)
}

function toRGB() {
  tempOption = readLineSync.question('enter the hex value ex:#0022ee : ');
  console.log(hexToRGB(tempOption));

}

function baseConverter() {
  console.log('2- binary, 8 - octal, 10- decimal, 16 - hexadecimal');
  const base = readLineSync.question('enter original base type : ');
  const output = readLineSync.question('enter output base type : ');
  const input = readLineSync.question('enter input : ');
  console.log("The converted result is : ")
  console.log(convert(input, base, output));
}

function epochConverter() {
  optionsUtility('1-date to epoch 2 -epoch to date: ', toEpoch, toHumanDate, epochConverter);
}

function toEpoch() {
  // read dates
  const year = parseInt(readLineSync.question('enter year'));
  const month = parseInt(readLineSync.question('enter month'));
  const date = parseInt(readLineSync.question('enter date'));
  const hours = parseInt(readLineSync.question('enter hours'));
  const minutes = parseInt(readLineSync.question('enter minutes'));
  const seconds = parseInt(readLineSync.question('enter seconds'));

  const userDate = new Date(year, month - 1, date, hours, minutes, seconds);
  const epocDate = userDate.getTime(); // epoch
  console.log(epocDate);

}

function toHumanDate() {
  tempOption = parseInt(readLineSync.question('enter epoch : '));
  const a = new Date()
  a.setTime(tempOption);
  console.log(a.toString())
}


function hashString() {
  console.log('Choose an algo to hash : ')
  algos.forEach((algo, index) => console.log(`${index+1}. ${algo}`));
  const algo = parseInt(readLineSync.question("Enter a num 1-4: "));
  const str = readLineSync.question("enter string to hash: ");

  const hash = crypto.createHash(algos[algo - 1]).update(str).digest('hex');
  console.log("hashed stinrg : ", hash);

}

function urlEncodeDecode() {
  optionsUtility('Enter 1-URL Encode, 2-URL Decode : ', urlEncode, urlDecode, urlEncodeDecode);
}

function base64EncodeDecode() {
  optionsUtility('Enter 1 - Base64Encode, 2 Decode : ', base64Encode, base64Decode, base64EncodeDecode);
}

function urlEncode() {
  const urlToEncode = readLineSync.question('Please enter the url to be encoded\n');
  console.log(encodeURIComponent(urlToEncode))
}

function urlDecode() {
  const urlToDecode = readLineSync.question('Please enter the url to be decoded\n');
  console.log(decodeURIComponent(urlToDecode));
}

function base64Encode() {
  const baseEncode = readLineSync.question('Please enter url to encode to base64\n');
  const base64 = Buffer.from(baseEncode).toString('base64');
  console.log(base64);

}

function base64Decode() {
  const baseDecode = readLineSync.question('Please enter url to Decode base64\n');
  const decodedURL = Buffer.from(baseDecode, 'base64').toString('ascii');
  console.log(decodedURL);
}
