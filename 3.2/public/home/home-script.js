let currentPage = 1;

function createBookHTML(book) {
  return `
    <div data-book-id="${book.id}" class="book_item col-xs-6 col-sm-3 col-md-2 col-lg-2">
      <div class="book">
        <a href="/book/${book.id}">
          <img src="/uploads/${book.image}" alt="${book.title}">
          <div data-title="${book.title}" class="blockI" style="height: 46px;">
            <div data-book-title="${book.title}" class="title size_text">${book.title}</div>
            <div data-book-author="${book.author1 || ""}" class="author">${book.author1 || ""}</div>
          </div>
        </a>
        <a href="/book/${book.id}">
          <button type="button" class="details btn btn-success">Читать</button>
        </a>
      </div>
    </div>
  `;
}

async function loadBooks(page = 1) {
  try {
    const response = await fetch(`/api/books?page=${page}`);
    const data = await response.json();

    const content = document.getElementById("content");
    content.innerHTML = "";

    if (data.books.length > 0) {
      data.books.forEach((book) => {
        content.innerHTML += createBookHTML(book);
      });
    } else {
      content.innerHTML = `
        <div class="col-xs-12">
          <p class="text-center">Хто книжки дропнув?</p>
        </div>
      `;
    }

    document.getElementById("currentPage").textContent = `${data.currentPage} / ${data.totalPages}`;
    document.getElementById("prevPage").disabled = data.currentPage === 1;
    document.getElementById("nextPage").disabled = data.currentPage === data.totalPages;

    currentPage = data.currentPage;
  } catch (error) {
    console.error("Помилка при завантаженні книжок", error);
  }
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    loadBooks(currentPage - 1);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  loadBooks(currentPage + 1);
});

window.addEventListener("DOMContentLoaded", () => {
  loadBooks();
});
