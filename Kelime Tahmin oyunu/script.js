const inputs = document.querySelector('.word');
const hintTag = document.querySelector('.hint span');
const guessLeft = document.querySelector('.guess span');
const mistakes = document.querySelector('.wrong span');
const resetBtn = document.querySelector('.reset');
const hintBtn = document.querySelector('.showhint');
const hintElement = document.querySelector('.hint');
const typeInput = document.querySelector('.type-input');

//* oyunda kullanacağım değişkenler
let word,incorrectLetters= [],correctletters = [],maxGuesses;

//* yeni oyun başlatmak için kullanılacağımız fonksiyon
function startNewGame(){
    alert("Yeni oyun başladı !");
    hintElement.style.display = "none";
    hintElement.style.opacity = "0";

    //* veritabanından (ben burda js dosyası kullancağım) rastgele bir kelime seçelim

    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

    word = randomWord.word;

    maxGuesses = word.length >=5  ? 8 : 6;
    incorrectLetters =[];
    correctletters = [];
    hintTag.innerText = randomWord.hint;
    guessLeft.innerText = maxGuesses;
    mistakes.innerText = incorrectLetters;

    //* Her harf için bir tane input oluşturmalıyım
    inputs.innerHTML="";
    for(let i =0; i < word.length; i++){
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input);
    }
}

//*kullanıcını girişini işleyen ve istatistikleri güncelleyen fonksiyon

function handleInput(e){
    const key = e.target.value.toLowerCase();
    if(key.match(/^[a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctletters.includes(`${key}`)){
        if(word.includes(key)){
            //* burada doğru tahmini güncelliyorum
            for(let i =0; i<word.length; i++){
                if(word[i] == key){
                    inputs.querySelectorAll("input")[i].value += key;
                }
            }
            correctletters += key;
        }else{
            //* yanlış tahmini güncelliyorum
            maxGuesses--;
            incorrectLetters.push(`${key}`);
            mistakes.innerText = incorrectLetters;
        }   
    }


    //* kalan tahmins sayısını güncelleme ve oyunu kazanma veya kaybetme koşullarını kontrol ediyorum
    guessLeft.innerText = maxGuesses;
    if(correctletters.length === word.length){
        alert(`Tebrikler kelimeyi buldunuz: ${word.toUpperCase()}`);
        startNewGame();
    }
    else if(maxGuesses < 1){
        alert("oyun bitti");
        for(let i = 0 ; i< word.length; i++){
            //* inputlara dogru harfleri yazdırma
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }

    //* giriş alanını temizleme
    typeInput.value ="";
}

//* ipucu elementini gösterme
function showhintElement(){
    hintElement.style.display = "block";
    hintElement.style.opacity = "1";
}

//* olay dinleicilerini ayarlıyorum
    resetBtn.addEventListener('click',startNewGame);
    hintBtn.addEventListener('click',showhintElement);
    typeInput.addEventListener("input",handleInput);
    inputs.addEventListener('click',() =>typeInput.focus());
    document.addEventListener('click',typeInput.focus());
//* yreni bir oyun başlatıyorum
startNewGame();
