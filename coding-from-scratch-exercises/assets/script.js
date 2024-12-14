
window.onload = pageReady;

function pageReady() {
  initializeAccordion();
  initializeSlideshow();
  fetchBooks();
}

// Accordion functionality
function initializeAccordion() {
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      accordion.classList.toggle("active");
      const panel = accordion.nextElementSibling;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
  });
}

// Slideshow functionality
function initializeSlideshow() {
  let slideIndex = 1;
  showSlides(slideIndex);

  window.plusSlides = (n) => showSlides(slideIndex += n);
  window.currentSlide = (n) => showSlides(slideIndex = n);

  function showSlides(n) {
    const slides = document.querySelectorAll(".mySlides");
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    slides.forEach(slide => slide.style.display = "none");
    slides[slideIndex - 1].style.display = "block";
  }
}

// Books API integration
function fetchBooks() {
  const bookList = document.getElementById("bookList");
  const apiKey = "AIzaSyAn3zoWHKES1lSGMZMOjpycBsR5XqTtqy8";
  const url = `https://www.googleapis.com/books/v1/volumes?q=alchemist&key=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
      return response.json();
    })
    .then(data => {
      data.items.forEach(item => {
        const { title = "No title available", authors = ["Unknown author"], canonicalVolumeLink, imageLinks } = item.volumeInfo;
        const bookHTML = `
          <div class="book-block">
            <h2>${title}</h2>
            <p><strong>Author(s):</strong> ${authors.join(", ")}</p>
            <a href="${canonicalVolumeLink || "#"}" target="_blank">View Book</a>
            <img src="${imageLinks?.smallThumbnail || "https://via.placeholder.com/128x200?text=No+Image"}" alt="${title}">
          </div>`;
        bookList.insertAdjacentHTML("beforeend", bookHTML);
      });
    })
    .catch(error => {
      console.error("Error fetching book data:", error);
      bookList.innerHTML = "<p>Unable to fetch book data. Try again later.</p>";
    });
}

// Monty Hall Game Logic
function playGame(userChoice) {
  const prizeDoor = Math.floor(Math.random() * 3) + 1;
  let montyReveals;

  do {
    montyReveals = Math.floor(Math.random() * 3) + 1;
  } while (montyReveals === userChoice || montyReveals === prizeDoor);

  const switchDoor = 6 - userChoice - montyReveals;
  const resultHTML = `
    You chose Door ${userChoice}. Monty reveals Door ${montyReveals} without the prize.<br>
    <button class="btn" onclick="makeChoice(${switchDoor}, ${prizeDoor}, true)">Switch to Door ${switchDoor}</button>
    <button class="btn" onclick="makeChoice(${userChoice}, ${prizeDoor}, false)">Stay with Door ${userChoice}</button>
  `;
  document.getElementById("resultMonty").innerHTML = resultHTML;
}

function makeChoice(choice, prizeDoor, switched) {
  const result = choice === prizeDoor ? "You won!" : "You lost!";
  document.getElementById("resultMonty").innerHTML = `
    You ${switched ? "switched" : "stayed"} and chose Door ${choice}. ${result}
  `;
}
