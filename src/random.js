window.addEventListener('DOMContentLoaded', function() {
  // Check if it's July 4th
  var today = new Date();
  var isIndependenceDay = today.getMonth() === 6 && today.getDate() === 4;
  var isHalloween = today.getMonth() === 9 && today.getDate() === 31;
  var isChristmas = today.getMonth() === 11 && today.getDate() === 25;
  var isNewYear = today.getMonth() === 0 && today.getDate() === 1;
  var isAprilFools = today.getMonth() === 3 && today.getDate() === 1;
  var isValentines = today.getMonth() === 1 && today.getDate() === 14;
  var isThanksgiving = today.getMonth() === 10 && today.getDate() === 26;

  if (isThanksgiving) {
    document.getElementById('shuffleText').textContent = 'Happy Thanksgiving!';
  }
  if (isAprilFools) {
    document.getElementById('shuffleText').textContent = 'Happy April Fools Day!';
  }
  if (isNewYear) {
    document.getElementById('shuffleText').textContent = 'Happy New Year!';
  }
  if (isChristmas) {
    document.getElementById('shuffleText').textContent = 'Merry Christmas!';
  }
  if (isHalloween) {
    document.getElementById('shuffleText').textContent = 'Happy Halloween!';
  } else
  if (isIndependenceDay) {
    // It's July 4th, display the message
    document.getElementById('shuffleText').textContent = 'Happy Independence Day!';
  } else {
    // It's not July 4th, proceed as normal
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
  }
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
      timeout = isDeleting ? 1000 : 1200; // Pause for 1 second after deletion, 5 seconds after line display
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
