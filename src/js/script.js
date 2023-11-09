const RENDER_EVENT = "render-book";
const create_card = `
  <article id="createFormModalBtn" class="card navy create-field">
    <h2>Tambahkan<br />Buku</h2>
    <svg
      class="plus-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
      />
    </svg>
  </article>
`;

document.addEventListener("DOMContentLoaded", function () {
  const searchFormBook = document.getElementById("searchBook");
  const createFormModal = document.getElementById("formModalCreate");
  const editFormModal = document.getElementById("formModalEdit");
  const formBookInput = document.getElementById("inputBook");

  searchFormBook.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  formBookInput.addEventListener("submit", function (event) {
    closeModal("formModalCreate");
    event.preventDefault();
    addBook();
  });

  window.addEventListener("click", function (event) {
    if (event.target == createFormModal || event.target == editFormModal) {
      createFormModal.style.display = "none";
      editFormModal.style.display = "none";
    }
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const incompleteBookshelf = document.getElementById(
    "incompleteBookshelfList"
  );
  incompleteBookshelf.innerHTML = create_card;

  const completeBookshelf = document.getElementById("completeBookshelfList");
  completeBookshelf.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isComplete) {
      incompleteBookshelf.append(bookElement);
    } else {
      completeBookshelf.append(bookElement);
    }
  }
  
  showModal();
});
