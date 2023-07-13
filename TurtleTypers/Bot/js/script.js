const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 90,
timeLeft = maxTime
charIndex = mistakes = isTyping = 0

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    //set typedChar to last char of inpfield
    let typedChar = inpField.value.slice(-1);


    //let typedChar = inpField.value.split("")[charIndex];


    console.log("this is typed Char ", typedChar);
    console.log("this is characters index", charIndex);
    if(characters[charIndex].innerText === typedChar) {
        console.log("this is correct char");
    }

    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
          timer = setInterval(initTimer, 1000);

            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                console.log("Correct");
                characters[charIndex].classList.add("correct");
                console.log(characters.length);


                charIndex++;

            } else {
                console.log("Incorrect");
                mistakes++;
                characters[charIndex].classList.add("incorrect");

            }

        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        console.log("hi");

        let wpm = Math.round(((charIndex )  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}



loadParagraph();
inpField.addEventListener("input", initTyping);
