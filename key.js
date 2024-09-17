const word = "TEAMO";
        let currentGuess = [];
        let currentRow = 0;
        const maxGuesses = 6;

        const grid = document.getElementById('grid');
        const keyboard = document.getElementById('keyboard');
        const gift = document.getElementById('gift');
        const envelope = document.getElementById('envelope');
        const letter = document.getElementById('letter');
        const hearts = document.querySelectorAll('.corner-heart');

        // Create grid
        for (let i = 0; i < maxGuesses; i++) {
            for (let j = 0; j < word.length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                grid.appendChild(cell);
            }
        }

        // Create keyboard
        'QWERTYUIOPASDFGHJKLÑZXCVBNM'.split('').forEach(letter => {
            const key = document.createElement('button');
            key.textContent = letter;
            key.classList.add('key');
            key.addEventListener('click', () => handleInput(letter));
            keyboard.appendChild(key);
        });

        const enterKey = document.createElement('button');
        enterKey.textContent = 'aber';
        enterKey.classList.add('key', 'enter');
        enterKey.addEventListener('click', checkGuess);
        keyboard.appendChild(enterKey);

        function handleInput(letter) {
            if (currentGuess.length < word.length) {
                currentGuess.push(letter);
                updateGrid();
            }
        }

        function updateGrid() {
            const row = grid.children;
            for (let i = 0; i < word.length; i++) {
                row[currentRow * word.length + i].textContent = currentGuess[i] || '';
            }
        }

        function checkGuess() {
            if (currentGuess.length !== word.length) return;

            const row = grid.children;
            let correct = 0;

            for (let i = 0; i < word.length; i++) {
                const cell = row[currentRow * word.length + i];
                const letter = currentGuess[i];
                const key = Array.from(keyboard.children).find(k => k.textContent === letter);

                if (letter === word[i]) {
                    cell.classList.add('correct');
                    key.classList.add('correct');
                    correct++;
                } else if (word.includes(letter)) {
                    cell.classList.add('partial');
                    key.classList.add('partial');
                } else {
                    cell.classList.add('incorrect');
                    key.classList.add('incorrect');
                }
            }

            if (correct === word.length) {
                setTimeout(() => {
                    alert('OAAAAAAAAAAAAAAAA! Ahora clickea los gaturros');
                    gift.style.display = 'flex';
                }, 500);
            } else {
                currentRow++;
                currentGuess = [];
                if (currentRow === maxGuesses) {
                    setTimeout(() => {
                        alert(`Xuxa yapoyapoyapo. La palabra era ${word}.`);
                    }, 500);
                }
            }
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                checkGuess();
            } else if (e.key === 'Backspace') {
                currentGuess.pop();
                updateGrid();
            } else if (e.key.match(/^[a-zA-Z]$/)) {
                handleInput(e.key.toUpperCase());
            }
        });

        envelope.addEventListener('click', () => {
            if (letter.style.display === 'none') {
                letter.style.display = 'block';
                setTimeout(() => {
                    letter.classList.add('show');
                    hearts.forEach(heart => heart.style.display = 'block');
                }, 10);
            } else {
                letter.classList.remove('show');
                setTimeout(() => {
                    letter.style.display = 'none';
                    hearts.forEach(heart => heart.style.display = 'none');
                }, 300);
            }
        });

        gift.addEventListener('click', (e) => {
            if (e.target === gift) {
                letter.classList.remove('show');
                setTimeout(() => {
                    letter.style.display = 'none';
                    hearts.forEach(heart => heart.style.display = 'none');
                    gift.style.display = 'none';
                }, 300);
            }
        });
