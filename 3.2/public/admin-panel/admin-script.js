let currentPage = 1;

function createRowHTML(book) {
  const authors = [book.author1, book.author2, book.author3].filter(Boolean).join(", ");
  return `
          <tr>
            <td>${book.title}</td>
            <td>${authors}</td>
            <td>${book.year || ""}</td>
            <td>
              <button class="delete-btn" data-id="${book.id}">Видалити</button>
            </td>
            <td>${book.clicks || 0}</td>
          </tr>
        `;
}

async function loadBooks(page = 1) {
  try {
    const response = await fetch(`/api/books?page=${page}`);
    const data = await response.json();

    const booksTable = document.getElementById("books-body");
    booksTable.innerHTML = "";

    if (data.books.length > 0) {
      data.books.forEach((book) => {
        const row = createRowHTML(book);
        booksTable.insertAdjacentHTML("beforeend", row);
      });
    } else {
      booksTable.innerHTML = '<tr><td colspan="5">{Хто книжки дропнув?}</td></tr>';
    }

    document.getElementById("currentPage").textContent = `${data.currentPage} / ${data.totalPages}`;
    document.getElementById("prevPage").disabled = data.currentPage === 1;
    document.getElementById("nextPage").disabled = data.currentPage === data.totalPages;

    currentPage = data.currentPage;
  } catch (error) {
    console.error("Помилка при завантаженні книжок", error);
  }
}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const bookId = e.target.getAttribute("data-id");
    if (confirm("Ви впевнені, що хочете видалити цю книгу?")) {
      try {
        const response = await fetch(`/api/delete-book/${bookId}`, { method: "DELETE" });
        if (response.ok) {
          loadBooks(currentPage);
        } else {
          alert("Помилка при видаленні книги");
        }
      } catch (error) {
        console.error("Помилка сервера:", error);
        alert("Помилка сервера");
      }
    }
  }
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    loadBooks(currentPage - 1);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  loadBooks(currentPage + 1);
});

document.getElementById("create-book-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    const response = await fetch("/api/create-book", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      loadBooks(currentPage);
      e.target.reset();
      document.getElementById("imagePreview").style.display = "none";
    } else {
      alert("Помилка при додаванні книги");
    }
  } catch (error) {
    console.error("Помилка при додаванні книги:", error);
    alert("Помилка сервера");
  }
});

// Попередній перегляд зображення
document.getElementById("image").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const preview = document.getElementById("imagePreview");
      preview.src = event.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// Завантажити книжки при старті
window.addEventListener("DOMContentLoaded", () => {
  loadBooks();
});
