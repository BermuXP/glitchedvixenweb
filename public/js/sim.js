document.addEventListener('DOMContentLoaded', function () {
  const dialogueWho = document.getElementById('dialogue-who');
  const dialogueText = document.getElementById('dialogue-text');
  const choices = document.getElementById('choices');

  const restartButton = document.getElementById('restart-button');
  restartButton.onclick = () => startGame();

  const sceneOverview = document.getElementById('scene-overview');
  sceneOverview.onclick = () => showScenes();

  const startGameButton = document.getElementById('start-game');
  startGameButton.onclick = () => startGame();


  // Load the "bzz" sound
  const typeSound = new Audio('../public/sounds/bzz.wav');

  // game data.. probably should be in a separate file
  const scenes = [
    {
      who: "???",
      text: "Well... it seems you've died...",
      class: ["sideways-text"],
      choices: [
        { text: "Continue.", nextScene: 1 }
      ]
    },
    {
      who: "???",
      text: "Don't worry, I'm willing to give you another chance... but you'll need to do something for me... ",
      class: ["sideways-text"],
      choices: [
        { text: "What is it?", nextScene: 2 },
        { text: "No", nextScene: 3 }
      ]
    },
    {
      who: "???",
      text: "You see... there is this fox... she has been tormenting `my world` for centuries...",
      class: ["sideways-text"],
      choices: [
        { text: "Continue", nextScene: 4 }
      ]
    },
    {
      who: "???",
      effect: "shake",
      text: "I guess you're worthless to me after all...",
      class: ["sideways-text", 'red'],
      choices: [
        { text: "Continue", nextScene: 6, class: ['red-button'] }
      ]
    },

    {
      who: "???",
      text: "Every man I send to that world, just ends up being hunted and killed by her...",
      class: ["sideways-text"],
      choices: [
        { text: "Continue", nextScene: 5 }
      ]
    },

    {
      who: "???",
      text: "Soon there will be no men left...",
      class: ["sideways-text"],
      choices: [
        { text: "Continue", nextScene: 7 }
      ]
    },

    {
      text: "You've Died... Again...",
      ending: 1,
      choices: [
        { text: "Restart", nextScene: 0 }
      ]
    },

    {
      who: "???",
      text: "I need you to kill her for me... will you do it...?",
      class: ["sideways-text"],
      choices: [
        { text: "Yes", nextScene: 8 },
        { text: "No", nextScene: 3 },
        { text: "What do I get in return?", nextScene: 8 }
      ]
    },

    {
      who: "",
      text: "TO BE CONTINUED :( Im sorry I didnt get this far yet",
      class: ["sideways-text"],
      choices: [
        { text: "Restart", nextScene: 0 }
      ]
    },
  ];

  function showScenes() {
    if (sceneOverview.getAttribute('data-hide') == 1) {
      sceneOverview.innerHTML = 'Show Scenes';
      sceneOverview.setAttribute('data-hide', '0');
      const sceneContent = document.getElementById('scenes');
      sceneContent.innerHTML = '';
    } else {
      sceneOverview.setAttribute('data-hide', '1');
      sceneOverview.innerHTML = 'Hide Scenes';
      const sceneContent = document.getElementById('scenes');
      sceneContent.innerHTML = '';
      scenes.forEach((scene, index) => {
        const sceneElement = document.createElement('div');
        sceneElement.innerHTML = `<div class='scene-display'>
          <h2>Scene ${index}</h2>
          <p><strong>Who:</strong> ${scene.who || '???'}</p>
          <p><strong>Text:</strong> ${scene.text}</p>
          <p><strong>Choices:</strong></p>
          <ul>
            ${scene.choices.map(choice => `<li>${choice.text} -> Scene ${choice.nextScene}</li>`).join('')}
          </ul>
          <div>
        `;
        sceneContent.appendChild(sceneElement);
      });
    }

  }

  /**
   * Default game start function
   * This function will start the game by showing the first scene
   */
  function startGame() {
    showScene(0);
    startGameButton.style.display = 'none';
  }

  function showScene(sceneIndex) {
    const scene = scenes[sceneIndex];
    dialogueText.textContent = '';
    choices.innerHTML = '';
    dialogueWho.textContent = scene.who || '';
    var effect = scene.effect || ''; // TODO FILTER IN EFFECTS

    // Clear existing classes from dialogueText
    dialogueText.className = '';

    // Check if scene.class exists and is an array, then apply each class
    if (Array.isArray(scene.class)) {
      scene.class.forEach(className => {
        dialogueText.classList.add(className);
      });
    }

    // Function to simulate typing effect
    function typeText(text, index, onComplete) {
      if (index < text.length) {
        let char = text.charAt(index);
        if (effect === 'shake') {
          let span = document.createElement('span');
          span.textContent = char;
          dialogueText.appendChild(span);
          dialogueText.classList.add('shake');
        } else {
          dialogueText.textContent += text.charAt(index);
        }
        typeSound.play();
        setTimeout(() => typeText(text, index + 1, onComplete), 80);
      } else if (onComplete) {
        onComplete();
      }
    }

    // Function to create and append choice buttons
    function createChoiceButtons() {
      scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => showScene(choice.nextScene);

        // Check if the choice has a class property
        if (choice.class) {
          if (Array.isArray(choice.class)) {
            // If class is an array, add each class to the button
            choice.class.forEach(className => {
              button.classList.add(className);
            });
          } else {
            // If class is not an array, directly add it
            button.classList.add(choice.class);
          }
        }

        choices.appendChild(button);
      });
    }

    // Start typing effect and create buttons after it's done
    typeText(scene.text, 0, createChoiceButtons);
  }
});
