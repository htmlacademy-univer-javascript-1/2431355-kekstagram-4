const checkStringLength = (text, length) => text.length <= length;

const checkPalindromeString = (str) => {
  str = str.toLowerCase().replaceAll(' ', '');
  const reversedString = str.split('').reverse().join('');
  return str === reversedString;
};

const findNumber = (text) => {
  let newString = '';
  text = text.toString();
  for (let i = 0; i < text.length; i++) {
    if (!isNaN(parseInt(text[i], 10))) {
      newString += text[i];
    }
  }
  return parseInt(newString, 10);
};

findNumber('today is 07 october');
checkPalindromeString('TeneT');
checkStringLength('html academy', 20);
