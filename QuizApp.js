const readLineSync = require('readline-sync');

const questions = [{
    question: "Guess the output ? \n const name = 'javascript'; \n console.log(console.log(name));//ignore the new line on console.log()",
    answer: 3,
    options: ['javascript \tjavascript', "Javascript \tnull", 'javascript \tundefined', 'javascript']
  },
  {
    question: "Guess the output ? \n console.log(typeof null);",
    answer: 2,
    options: ['undefined', 'object', 'primitive', 'none']
  },
  {
    question: "Guess the output ? \n console.log(typeof function () {} );",
    answer: 2,
    options: ['undefined', 'object', 'function', 'func']
  },
  {
    question: "Brendan Eich created JavaScript in __ days",
    answer: 2,
    options: ['30', '10', '7', '22']
  },
  {
    question: `const web = ["HTML", "CSS", "JS", "Nodejs"];
   web.shift();
   web.unshift();
   web.pop();
   console.log(web);`,
    answer: 2,
    options: ['[]', "['CSS', 'JS']", '["HTML", "CSS", "JS"]', '[JS]']
  },

];

const WELCOME = "\tWelcome to the Javascript Quiz\nEnter an option from 1 to 4 to answer\n\n";
let score = 0;
let questionNum = 1;

function startQuiz() {
  console.log(WELCOME);

  for (const question of questions) {
    askQuestion(question, questionNum);
    questionNum++;

    printOptions(question);

    const selectedOption = readOption();
    //validate option
    if (selectedOption - 1 === (question.answer - 1)) {
      console.log("You are correct\n")
      score++;
    } else {
      console.log("Wrong, correct ans is: ", question.options[question.answer - 1], '\n');
    }
  }

  showScore();

}

startQuiz();


function askQuestion(obj, num) {
  console.log(`${num}) ${obj.question}`);
}

function printOptions(obj) {
  let index = 1;

  console.log('-----------------------------------');
  for (const i of obj.options) {
    console.log(`${index}. ${i}`);
    index++;
  }
  console.log('-----------------------------------');
}

function readOption() {
  const a = readLineSync.question("\nEnter your option : ");
  // if('1234'.includes(a)) { //  true for 23
  if (a == '1' || a == '2' || a == '3' || a == '4') {
    return parseInt(a);
  } else {
    console.log('wrong option, Please enter again');
    readOption();
  }
}

function showScore() {
  console.log('======================================');
  console.log(`You got ${score} correct, out of ${questions.length}\n\n`);
}
