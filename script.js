// Track completed lessons
let completedLessons = new Set();
let clickCount = 0;

// Show specific lesson
function showLesson(lessonNum) {
    // Hide all lessons
    document.querySelectorAll('.lesson-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected lesson
    document.getElementById('lesson' + lessonNum).classList.add('active');
    
    // Update button states
    document.querySelectorAll('.lesson-btn').forEach((btn, index) => {
        btn.classList.remove('active');
        if (index === lessonNum - 1) {
            btn.classList.add('active');
        }
    });
}

// Complete lesson
function completeLesson(lessonNum) {
    completedLessons.add(lessonNum);
    
    // Mark button as completed
    const buttons = document.querySelectorAll('.lesson-btn');
    buttons[lessonNum - 1].classList.add('completed');
    
    // Update progress bar
    const progress = (completedLessons.size / 6) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
    progressBar.textContent = Math.round(progress) + '%';
    
    // Celebration
    celebrate();
    
    // Move to next lesson if available
    if (lessonNum < 6) {
        setTimeout(() => {
            showLesson(lessonNum + 1);
        }, 2000);
    } else {
        setTimeout(() => {
            alert('🎉 CONGRATULATIONS! You finished all lessons! You\'re a JavaScript superstar! 🌟');
        }, 1000);
    }
}

// Celebration animation
function celebrate() {
    const canvas = document.getElementById('celebration');
    const emojis = ['⭐', '🎉', '🎊', '✨', '🌟', '💫', '🎈'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'star';
            star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = '0px';
            canvas.appendChild(star);
            
            setTimeout(() => star.remove(), 2000);
        }, i * 100);
    }
}

// Demo functions
function runDemo1() {
    const output = document.getElementById('demo1Output');
    output.textContent = "Hello, I'm learning JavaScript!\nThis is so cool! 🚀";
}

function runDemo2() {
    const output = document.getElementById('demo2Output');
    output.textContent = `Hi! I'm Luna
I am 7 years old
My favorite color is rainbow 🌈`;
}

function runDemo3() {
    const output = document.getElementById('demo3Output');
    output.textContent = `5 + 3 = 8
10 - 4 = 6
3 * 4 = 12
20 / 5 = 4
Math is fun! 🧮`;
}

function runDemo4() {
    const output = document.getElementById('demo4Output');
    output.textContent = `Checking weather...
Weather is sunny!
Let's go to the park! ☀️`;
}

function runDemo5() {
    const output = document.getElementById('demo5Output');
    let result = 'Counting:\n';
    for (let i = 1; i <= 5; i++) {
        result += 'Count: ' + i + '\n';
    }
    output.textContent = result;
}

// Exercise checker
function checkExercise(exerciseId) {
    const input = document.getElementById('ex' + exerciseId).value;
    const resultDiv = document.getElementById('result' + exerciseId);
    const outputDiv = document.getElementById('output' + exerciseId);
    
    // Clear previous results
    resultDiv.className = 'result';
    if (outputDiv) outputDiv.textContent = '';
    
    // Check if empty
    if (!input.trim()) {
        resultDiv.textContent = '❌ Oops! You need to write some code first!';
        resultDiv.className = 'result error';
        return;
    }
    
    try {
        // Capture console.log output
        let output = '';
        const originalLog = console.log;
        console.log = function(...args) {
            output += args.join(' ') + '\n';
            originalLog.apply(console, args);
        };
        
        // Execute code
        eval(input);
        
        // Restore console.log
        console.log = originalLog;
        
        // Exercise-specific validation
        let isValid = false;
        let message = '';
        
        switch(exerciseId) {
            case '1-1':
                isValid = input.includes('console.log') && input.includes('name');
                message = isValid ? '🎉 Perfect! Your computer said your name!' : '❌ Try using console.log with your name!';
                break;
            
            case '1-2':
                const logCount = (input.match(/console\.log/g) || []).length;
                isValid = logCount >= 3;
                message = isValid ? '🎉 Awesome! Three messages!' : '❌ You need THREE console.log statements!';
                break;
            
            case '1-3':
                const emojiRegex = /[\u{1F300}-\u{1F9FF}]/u;
                isValid = input.includes('console.log') && (input.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length >= 3;
                message = isValid ? '🎉 Emoji party! So colorful!' : '❌ Add at least 3 emojis to your message!';
                break;
            
            case '2-1':
                isValid = input.includes('let') && input.includes('console.log');
                message = isValid ? '🎉 Great job! You made variables!' : '❌ Create variables with "let" and show them with console.log!';
                break;
            
            case '2-2':
                if (input.includes('let') && input.includes('currentColor')) {
                    const colorMatch = input.match(/currentColor\s*=\s*["'](\w+)["']/);
                    if (colorMatch) {
                        const colorBox = document.getElementById('colorBox');
                        colorBox.style.background = colorMatch[1];
                        colorBox.textContent = colorMatch[1].toUpperCase();
                        isValid = true;
                        message = '🎉 Wow! The box changed color!';
                    }
                }
                if (!isValid) message = '❌ Create a variable: let currentColor = "blue";';
                break;
            
            case '2-3':
                const varCount = (input.match(/let/g) || []).length;
                isValid = varCount >= 3 && input.includes('console.log');
                message = isValid ? '🎉 What a fun story!' : '❌ Create 3 variables and make a story!';
                break;
            
            case '3-1':
                isValid = input.includes('+') || input.includes('-');
                message = isValid ? '🎉 Correct! You did the candy math!' : '❌ Use + and - to calculate candies!';
                break;
            
            case '3-2':
                isValid = input.includes('/') && input.includes('16');
                message = isValid ? '🎉 Perfect! Everyone gets equal pizza!' : '❌ Divide 16 by 4 using the / symbol!';
                break;
            
            case '4-1':
                isValid = input.includes('if') && input.includes('===');
                message = isValid ? '🎉 Great decision making!' : '❌ Use if and === to check moods!';
                break;
            
            case '4-2':
                isValid = input.includes('if') && (input.includes('===') || input.includes('>') || input.includes('<'));
                message = isValid ? '🎉 You made a smart choice!' : '❌ Use if to check something!';
                break;
            
            case '5-1':
                isValid = input.includes('for') && input.includes('10');
                message = isValid ? '🎉 Perfect counting!' : '❌ Use a for loop to count to 10!';
                break;
            
            case '5-2':
                isValid = input.includes('for') && input.includes('⭐');
                message = isValid ? '🎉 Beautiful stars!' : '❌ Use a loop to print ⭐ seven times!';
                break;
            
            case '6-1':
                isValid = input.includes('if') && (input.includes('secretNumber') || input.includes('guess'));
                message = isValid ? '🎉 You built a game! Amazing!' : '❌ Create a guessing game with if statements!';
                break;
            
            default:
                isValid = true;
                message = '✅ Code ran successfully!';
        }
        
        // Show result
        resultDiv.textContent = message;
        resultDiv.className = isValid ? 'result success' : 'result error';
        
        // Show output if available
        if (outputDiv && output) {
            outputDiv.textContent = output;
        }
        
        // Celebrate if correct
        if (isValid) {
            celebrate();
        }
        
    } catch (error) {
        resultDiv.textContent = '❌ Oops! There\'s an error: ' + error.message;
        resultDiv.className = 'result error';
    }
}

// Hint system
function showHint(exerciseId) {
    const hints = {
        '1-1': 'Try: console.log("Hello, my name is Alex!");',
        '1-2': 'Use console.log() three times, one for each thing!\n\nconsole.log("My favorite color is blue");\nconsole.log("My favorite animal is cat");\nconsole.log("My favorite food is pizza");',
        '1-3': 'console.log("I love coding! 🚀🎨🎮");',
        '2-1': 'let myName = "Luna";\nlet myAge = 7;\nlet favoriteAnimal = "unicorn";\nconsole.log("Hi! I\'m " + myName);',
        '2-2': 'let currentColor = "blue";\n\nTry different colors: red, green, purple, orange!',
        '2-3': 'let character = "Luna";\nlet place = "beach";\nlet object = "starfish";\nconsole.log("Once upon a time, " + character + " went to " + place + " and found a " + object + "!");',
        '3-1': 'let candies = 12;\ncandies = candies - 3;\ncandies = candies + 5;\nconsole.log("I have " + candies + " candies!");',
        '3-2': 'let pizzaSlices = 16;\nlet people = 4;\nlet slicesEach = pizzaSlices / people;\nconsole.log("Each person gets " + slicesEach + " slices!");',
        '4-1': 'let mood = "happy";\nif (mood === "happy") {\n    console.log("Yay! Let\'s play! 😊");\n}\nif (mood === "sad") {\n    console.log("It\'s okay! Want a hug? 🤗");\n}',
        '4-2': 'let animal = "dog";\nif (animal === "dog") {\n    console.log("Woof! 🐕");\n}\nif (animal === "cat") {\n    console.log("Meow! 🐱");\n}',
        '5-1': 'for (let i = 1; i <= 10; i++) {\n    console.log(i);\n}',
        '5-2': 'for (let i = 1; i <= 7; i++) {\n    console.log("⭐");\n}',
        '6-1': 'let secretNumber = 7;\nlet myGuess = 5;\nif (myGuess === secretNumber) {\n    console.log("You won! 🎉");\n} else {\n    console.log("Try again!");\n}'
    };
    
    const hint = hints[exerciseId];
    if (hint) {
        alert('💡 Hint:\n\n' + hint);
    }
}

// Click game
function playClickGame() {
    clickCount++;
    const output = document.getElementById('clickGameOutput');
    output.textContent = 'Clicks: ' + clickCount + ' 🎉';
    
    if (clickCount === 10) {
        alert('🎉 WOW! You clicked 10 times! You\'re fast!');
    } else if (clickCount === 25) {
        alert('🌟 AMAZING! 25 clicks! You\'re unstoppable!');
    } else if (clickCount === 50) {
        alert('🏆 LEGENDARY! 50 clicks! You\'re a clicking champion!');
        celebrate();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Welcome to JavaScript Fun for Kids!');
    console.log('💡 Tip: Open your browser console (F12) to see console.log outputs!');
});
