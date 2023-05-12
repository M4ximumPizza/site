window.addEventListener('DOMContentLoaded', function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'splashes.txt', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var splashes = xhr.responseText.split('\n').filter(Boolean);
      shuffleArray(splashes);
      typewrite(splashes);
    }
  };
  xhr.send();
});

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function typewrite(lines) {
  var typewriteElement = document.getElementById('shuffleText');
  var currentIndex = 0;
  var currentLine = '';
  var isDeleting = false;

  function type() {
    var line = lines[currentIndex];
    var timeout = isDeleting ? 50 : 100; // Delay between each character (in milliseconds)

    if (!isDeleting && currentLine.length < line.length) {
      currentLine += line.charAt(currentLine.length);
      typewriteElement.textContent = currentLine;
    } else if (isDeleting && currentLine.length > 0) {
      currentLine = currentLine.slice(0, -1);
      typewriteElement.textContent = currentLine;
    } else {
      timeout = isDeleting ? 1000 : 3500; // Pause for 1 seconds after deletion, 5 seconds after line display
      isDeleting = !isDeleting;

      if (!isDeleting) {
        currentIndex++;
        if (currentIndex === lines.length) {
          currentIndex = 0; // Start from the beginning when all lines are displayed
        }
      }
    }

    setTimeout(type, timeout);
  }

  type(); // Start the typewriter effect
}