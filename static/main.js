document.addEventListener('DOMContentLoaded', function(){

    fetch('/static/words.csv')
        .then(response => response.text()) // Get the text content of the response
        .then(text => {
            // Split the text by commas to get an array of words
            const words = text.split(',');

            // Now 'words' is an array of words from your CSV file
            const randomWord = () => words[Math.floor(Math.random() * words.length)];
            const displayNewWord = () => {
                const container = document.getElementById('word_container');
                container.textContent = randomWord();
            };

            let hero = document.getElementById('hero');
            let wordBox = document.getElementById('word_box');
            let wordContainer = document.getElementById('word_container');
            let pauseButton = document.getElementById('pause_button');
            let resetButton = document.getElementById('reset_button');
            let bpm = document.getElementById('bpm');
            let bars = document.getElementById('beatSelect');
            let bpmPopup = document.getElementById('bpm_popup');
            let startButton = document.getElementById('start_button');
            let instructions = document.getElementById('instructions');
            let tagline = document.getElementById('tagline');

            bpm.addEventListener('input', function(){

                if (isNaN(Number(bpm.value))) {
                    bpmPopup.style.display = 'flex';
                    return;
                }

                else {
                    let bpmValue = Number(bpm.value);

                    if (bpmValue < 1 || bpmValue > 300) {
                        bpmPopup.style.display = 'flex';
                    }
                    else if (bpmValue === ''){
                        bpmPopup.style.display = 'none';
                    }
                    else {
                        generateButton.disabled = false;
                        bpmPopup.style.display = 'none';
                    }
                }
            });

            startButton.addEventListener('click', function(){
                tagline.classList.toggle('tagline');
                instructions.style.display = (instructions.style.display == 'none' ? 'grid' : 'none');
                startButton.textContent = (startButton.textContent == 'Close' ? 'click here for instructions' : 'Close');
            });


            document.getElementById('popup_close').addEventListener('click', function(){
                bpmPopup.style.display = 'none';
            });


            let intervalId;
            const startInterval = () => {
                if (intervalId) clearInterval(intervalId);
                displayNewWord();
                intervalId = setInterval(displayNewWord, calculatedInterval(bpm.value, bars.value));
            };

            const resumeInterval = () => {
                intervalId = setInterval(displayNewWord, calculatedInterval(bpm.value, bars.value));
            }

            const pauseInterval = () => {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            };


            let generateButton = document.getElementById('generate_button');
            generateButton.addEventListener('click', function() {
                hero.style.display = 'none';
                wordBox.style.display = 'flex';
                wordContainer.textContent = '';
                countdown(wordContainer, startInterval);

                if (generateButton.disabled === true){
                    bpmPopup.style.display = 'flex';
                }
            });




            pauseButton.addEventListener('click', function(){
                if (countdownFinished){
                    if (intervalId) {
                        pauseButton.textContent = 'Play';
                        pauseInterval();
                    }
                    else {
                        pauseButton.textContent = 'Pause';
                        resumeInterval();
                    }
                }
            })

            resetButton.addEventListener('click', function(){
                if (countdownFinished) {
                    hero.style.display = 'flex';
                    wordBox.style.display = 'none';
                    pauseInterval();
                    bpm.value = '';
                    generateButton.disabled = true;
                    countdownFinished = false;
                    intervalId = null;
                    pauseButton.textContent = 'pause';
                }
            })

        })

        .catch(error => {
            console.error('Error loading or parsing CSV:', error);
        });



    let countdownFinished;

    function countdown( parent, callback ){

        // This is the function we will call every 1000 ms using setInterval

        function count(){

            if( paragraph ){
                // Remove the paragraph if there is one
                paragraph.remove();
            }

            if( texts.length === 0 ){
                // If we ran out of text, use the callback to get started
                // Also, remove the interval
                // Also, return since we dont want this function to run anymore.
                clearInterval( numberInterval );
                countdownFinished = true;
                callback();
                return;
            }

            // Get the first item of the array out of the array.
            // Your array is now one item shorter.
            var text = texts.shift();

            // Create a paragraph to add to the DOM
            // This new paragraph will trigger an animation
            paragraph = document.createElement("p");
            paragraph.textContent = text;
            paragraph.className = text + " nums";

            parent.appendChild( paragraph );
        }

        // These are all the text we want to display
        var texts = ['3', '2', '1'];

        // This will store the paragraph we are currently displaying
        var paragraph = null;

        // Initiate an interval, but store it in a variable so we can remove it later.
        var numberInterval = setInterval(count, 1000);
    }


    function calculatedInterval(beatsPerMinute, barsNumber) {
        return (240 / beatsPerMinute) * barsNumber * 1000;
    };


});
