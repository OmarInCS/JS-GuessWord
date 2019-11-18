
var words = []
var selectedWord = ""

function loadWords() {
    var file = "https://raw.githubusercontent.com/OmarInCS/GuessWordApp/master/words.txt";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status === 200) {
            words = rawFile.responseText.split("\n");
            words = cleanWordsList();
            pickWord();
        }
    }
    rawFile.send()
}

function loadLetterBox(letter) {
    if (letter !== " ") {
        letterBox = `<input type='text' class='letter-box correct' value='${letter}' disabled>\n`;
    }
    else {
        letterBox = `<input type='text' class='letter-box wrong' value='${letter.trim()}'>\n`;
    }
    
    wordDiv = document.getElementById("word");
    wordDiv.innerHTML += letterBox;
}

function pickWord() {
    var idx = parseInt(Math.random() * words.length);
    selectedWord = words[idx];
    var word = hideLetters(selectedWord);
    for (let i = 0; i < word.length; i++) {
        loadLetterBox(word[i]);
    }
}

function cleanWordsList() {
    cleanedWords = [];
    for (let i = 0; i < words.length; i++) {
        const element = words[i];
        if (element.length > 3 && element.length < 10) {
            cleanedWords.push(element);
        }
    }
    return cleanedWords;
}


function hideLetters(word="") {
    word = word.split("");
    idx = parseInt(Math.random() * word.length);
    word[idx] = " ";
    idx = parseInt(Math.random() * word.length);
    word[idx] = " ";
    return word.join("");
}

function checkGuess() {
    var answer = "";
    for (let i = 0; i < selectedWord.length; i++) {
        const letter = selectedWord.charAt(i);
        const letterBox = document
                            .querySelector(`#word > .letter-box:nth-child(${i+1})`)
        const userLetter = letterBox.value.toLowerCase();
        
        answer += userLetter;
        if (letter === userLetter) {
            letterBox.setAttribute("class", "letter-box correct");
            letterBox.setAttribute("disabled", "true");
        }
        else {
            letterBox.setAttribute("class", "letter-box wrong");
        }
    }

    if (answer === selectedWord) {
        document.getElementsByTagName("img")[0].src = "happy.png";
        cheerLettersBoxs();
    }
    else {
        teaseLettersBoxs();
    }
}

function playAgain() {
    document.getElementById("word").innerHTML = "";
    document.getElementsByTagName("img")[0].src = "think.png";
    pickWord();
}

document.addEventListener("DOMContentLoaded", loadWords);
document.getElementById("bt-check").onclick = checkGuess;
document.getElementById("bt-again").onclick = playAgain;