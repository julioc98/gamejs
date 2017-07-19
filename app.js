let handPlayerOne = [];
let pointsPlayerOne = 0;

let handPlayerTwo = [];
let pointsPlayerTwo = 0;
let discardPlayerTwo = [0, 0, 0, 0, 0];

const fs = require('fs');
// change the variable to your archive path
const PATH_FILE = 'array.json';

const r = fs.readFileSync(PATH_FILE, 'utf8');
const rounds = JSON.parse(r);

// Variable for test infos by example
// const rounds = [1, 2, 4, 6, 1, 8, 10, 2, 4, 1];

function conteins(handPlayer, card) {
  for (let i = 0; handPlayer.length > i; i += 1) {
    if (handPlayer[i] === card) return { cont: true, position: i };
  }
  return { cont: false };
}

function discardhandPlayerTwo(turn) {
  const lengthRound = turn;
  const objDeletCard = {};
  if (handPlayerTwo.length >= 5) {
    for (let i = 0; i < 5; i += 1) {
      let cont = 0;
      for (let j = lengthRound; j >= 0; j -= 1) {
        cont += 1;
        if (rounds[j] === handPlayerTwo[i]) {
          objDeletCard[cont] = { hand: handPlayerTwo[i], pos: i };
          discardPlayerTwo[i] = cont;
          break;
        }
      }
    }

    const removedCard = discardPlayerTwo.sort((a, b) => b - a)[0];
    const positionRemoveCard = objDeletCard[removedCard].pos;

    if (positionRemoveCard === 0) {
      handPlayerTwo.splice(0, 1);
    } else {
      const change = handPlayerTwo[0];
      handPlayerTwo[0] = handPlayerTwo[positionRemoveCard];
      handPlayerTwo[positionRemoveCard] = change;
      handPlayerTwo = handPlayerTwo.slice(1);
    }
  }
}

function joao(round, turn) {
  const contein = conteins(handPlayerTwo, round);
  const flow = contein.cont;
  if (!flow) {
    if (handPlayerTwo.length >= 5) {
      discardhandPlayerTwo(turn);
    }
    handPlayerTwo.push(round);
  }
  if (flow) {
    pointsPlayerTwo += 1;
  }
}

function maria(round) {
  const contein = conteins(handPlayerOne, round);
  const flow = contein.cont;
  if (!flow) {
    handPlayerOne.push(round);
    if (handPlayerOne.length > 5) {
      handPlayerOne = handPlayerOne.slice(1);
    }
  }
  if (flow) {
    // pointsPlayerOne++ not used form Airbnb guideline
    pointsPlayerOne += 1;
  }
}

// spaceComplete
function sC(string, len) {
  let filde = string.toString();
  while (filde.length < len) {
    filde += '.';
  }
  return filde;
}

function init() {
  for (let i = 0; rounds.length > i; i += 1) {
    joao(rounds[i], i);
    maria(rounds[i]);
  }
  console.log('|pointsPlayerTwo - pointsPlayerOne|:', pointsPlayerTwo - pointsPlayerOne);
}

init();
