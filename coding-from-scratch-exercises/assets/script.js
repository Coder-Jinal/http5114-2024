// Initialize page functionality once it is ready
window.onload = pageReady;

function pageReady() {
  // Accordion functionality
  var acc = document.getElementsByClassName("accordion");
  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });
  }


  // Initialize the slideshow (if needed, can be customized further)
  let slideIndex = 1;
  showSlides(slideIndex);

  // Functions for slideshow controls
  window.plusSlides = function(n) {
    showSlides(slideIndex += n);
  }

  window.currentSlide = function(n) {
    showSlides(slideIndex = n);
  }


  // Slideshow logic
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";

  }


  // Books API integration
  var bookList = document.getElementById("bookList");
  var key = "AIzaSyAn3zoWHKES1lSGMZMOjpycBsR5XqTtqy8";
  var url = "https://www.googleapis.com/books/v1/volumes?q=alchemist&key=" + key;

  fetch(url)
    .then(function (response) {
      if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
      return response.json();
    })
    .then(function (data) {
      data.items.forEach(function (item) {
        var title = item.volumeInfo.title || "No title available";
        var author = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No author available";
        var link = item.volumeInfo.canonicalVolumeLink || "#";
        var image = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : "https://via.placeholder.com/128x200?text=No+Image";

        var newItem = `
          <div class="book-block">
            <h2>${title}</h2>
            <p><strong>Author(s):</strong> ${author}</p>
            <a href="${link}" target="_blank">View Book</a><br>
            <img src="${image}" alt="${title} thumbnail">
          </div>
        `;
        bookList.insertAdjacentHTML("beforeend", newItem);
      });
    })
    .catch(function (error) {
      console.error("Error fetching book data:", error);
      bookList.innerHTML = "<p>Sorry, we couldn't fetch the book data. Please try again later.</p>";
    });
}


// Monty Hall Game Logic
function playGame(userChoice) {
  const prizeDoor = Math.floor(Math.random() * 3) + 1;
  let montyReveals = 0;

  if (userChoice !== prizeDoor) {
    do {
      montyReveals = Math.floor(Math.random() * 3) + 1;
    } while (montyReveals === userChoice || montyReveals === prizeDoor);
  } else {
    do {
      montyReveals = Math.floor(Math.random() * 3) + 1;
    } while (montyReveals === userChoice);
  }

  const resultText = `
    You chose Door ${userChoice}.<br>
    Monty reveals Door ${montyReveals} which does not have the prize.<br>
    The prize is behind Door ${prizeDoor}.<br>
  `;
  const switchOption = `
    Do you want to switch your choice to Door ${6 - userChoice - montyReveals}?<br><br>
    <button class="btn" onclick="switchChoice(${userChoice}, ${prizeDoor}, ${montyReveals})">Yes, switch!</button>
    <button class="btn" onclick="stayChoice(${userChoice}, ${prizeDoor})">No, stay!</button>
  `;

  document.getElementById("resultMonty").innerHTML = resultText + switchOption;
}

function switchChoice(userChoice, prizeDoor, montyReveals) {
  const switchChoice = 6 - userChoice - montyReveals;
  const resultText = switchChoice === prizeDoor ? "You won!" : "You lost!";
  document.getElementById("resultMonty").innerHTML = `You switched to Door ${switchChoice}. ${resultText}`;
}

function stayChoice(userChoice, prizeDoor) {
  const resultText = userChoice === prizeDoor ? "You won!" : "You lost!";
  document.getElementById("resultMonty").innerHTML = `You stayed with Door ${userChoice}. ${resultText}`;
}