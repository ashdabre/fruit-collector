// Initialize variables
let level = 1;
let score = 0;
let basketPosition = 0;

// Function to start the game
function startGame() {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("resetBtn").style.display = "inline";

    generateFruits();
}

// Function to reset the game
function resetGame() {
    level = 1;
    score = 0;
    basketPosition = 0;

    document.getElementById("level").innerText = level;
    document.getElementById("score").innerText = "Score: " + score;

    const fruits = document.getElementById("fruits");
    while (fruits.firstChild) {
        fruits.removeChild(fruits.firstChild);
    }

    document.getElementById("startBtn").style.display = "inline";
    document.getElementById("resetBtn").style.display = "none";
}

// Function to generate fruits
function generateFruits() {
    const fruits = document.getElementById("fruits");
    fruits.innerHTML = "";

    for (let i = 0; i < level * 5; i++) {
        const fruit = document.createElement("div");
        fruit.className = "fruit";
        fruit.style.left = Math.floor(Math.random() * 370) + "px"; // Random position
        fruits.appendChild(fruit);
    }

    moveFruits();
}

// Function to move fruits
function moveFruits() {
    const fruits = document.getElementsByClassName("fruit");
    const basket = document.getElementById("basket");

    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];

        fruit.style.top = "0px"; // Start from top
        fruit.style.animationDuration = (Math.random() * 2 + 1) + "s"; // Random duration

        fruit.addEventListener("animationend", function() {
            if (parseInt(fruit.style.top) >= 250 && parseInt(fruit.style.left) >= basketPosition && parseInt(fruit.style.left) <= basketPosition + 50) {
                score++;
               
                // Remove the caught fruit
                fruit.parentNode.removeChild(fruit);

                // Update the score
                document.getElementById("score").innerText = "Score: " + score;

                // Check if all fruits are caught
                if (score === level * 5) {
                    // Increase the level
                    level++;
                    document.getElementById("level").innerText = level;

                    // Generate fruits for the next level
                    generateFruits();
                }
            }
        });
    }
}

// Function to move the basket
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && basketPosition > 0) {
        basketPosition -= 10;
        document.getElementById("basket").style.left = basketPosition + "px";
    } else if (event.key === "ArrowRight" && basketPosition < 350) {
        basketPosition += 10;
        document.getElementById("basket").style.left = basketPosition + "px";
    }
});
