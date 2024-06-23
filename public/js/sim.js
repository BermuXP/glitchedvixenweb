document.addEventListener('DOMContentLoaded', function () {
  const dialogueWho = document.getElementById('dialogue-who');
  const dialogueText = document.getElementById('dialogue-text');
  const choices = document.getElementById('choices');

  const restartButton = document.getElementById('restart-button');
  restartButton.onclick = () => startGame();

  const sceneOverview = document.getElementById('scene-overview');
  sceneOverview.onclick = () => showScenes();

  const startGameButton =   document.getElementById('start-game');
  startGameButton.onclick = () => startGame();


  // Load the "bzz" sound
  const typeSound = new Audio('../public/sounds/bzz.wav');

  // game data.. probably should be in a separate file
  const scenes = [
    {
      who: "???",
      text: "Well... it seems you've died...",
      class: "sideways-text",
      choices: [
        { text: "Continue.", nextScene: 1 }
      ]
    },
    {
      who: "???",
      text: "Don't worry, I'm willing to give you a second chance... but you'll need to do something for me... will you do it?",
      class: "sideways-text",
      choices: [
        { text: "What is it?", nextScene: 2 },
        { text: "No", nextScene: 3 }
      ]
    },
    {
      who: "???",
      text: "You see... there is this fox... she has been tormenting me for centuries...",
      class: "sideways-text",
      choices: [
        { text: "Continue", nextScene: 4 }
      ]
    },
    {
      who: "???",
      effect: "shake",
      text: "Guess you're worthless to me after all...",
      choices: [
        { text: "Continue", nextScene: 5 }
      ]
    },

    {
      who: "???",
      text: "Every man I send to that world, just ends up being killed by her...",
      class: "sideways-text",
      choices: [
        { text: "Continue", nextScene: 6 }
      ]
    },

    {
      text: "You've Died... Again...",
      choices: [
        { text: "Restart", nextScene: 0 }
      ]
    },

    {
      who: "???",
      text: "I need you to kill her for me... will you do it...?",
      class: "sideways-text",
      choices: [
        { text: "Yes", nextScene: 7 },
        { text: "No", nextScene: 7 },
        { text: "What do I get in return?", nextScene: 7 }
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


    // Function to simulate typing effect
    function typeText(text, index) {
      if (index < text.length) {
        dialogueText.textContent += text.charAt(index);
        dialogueText.classList.add(scene.class);
        // typeSound.currentTime = 0; // Reset audio to start to ensure it plays immediately
        typeSound.play(); // Play the sound for each letter
        setTimeout(() => typeText(text, index + 1), 80); // Keep the typing speed consistent with the timeout
      }
    }
  
    // Start typing effect
    typeText(scene.text, 0);
  
    scene.choices.forEach(choice => {
      const button = document.createElement('button');
      button.textContent = choice.text;
      button.onclick = () => showScene(choice.nextScene);
      // Apply a class if needed
      if (choice.class) {
        button.classList.add(choice.class);
      }
      choices.appendChild(button);
    });
  }
});
