function makeBook(bookObject) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement("h2");
  bookAuthor.innerText = bookObject.author;

  const bookYear = document.createElement("p");
  bookYear.innerText = bookObject.year;

  const content = document.createElement("div");
  content.classList.add("card-content");
  content.append(bookTitle, bookAuthor, bookYear);

  const card = document.createElement("article");
  card.classList.add("card", "book-field");
  card.setAttribute("id", bookObject.id);

  const action = document.createElement("div");
  action.classList.add("card-action");

  card.append(content, action);

  if (bookObject.isComplete) {
    card.classList.add("bright");
    action.append(
      createTrashButton(),
      createPencilButton(),
      createUndoReadButton()
    );
  } else {
    card.classList.add("navy");
    action.append(
      createTrashButton(),
      createPencilButton(),
      createReadButton()
    );
  }

  return card;
}

function createPencilButton() {
  const editFormModal = document.getElementById("formModalEdit");
  const formBookUpdate = document.getElementById("updateBook");
  const pencilIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>';

  return createButton(
    ["action", "edit"],
    "Edit buku",
    pencilIcon,
    function (event) {
      editFormModal.style.display = "flex";
      const parentEventId = event.target.closest(".card").id;
      editFromBookshelfList(parentEventId);
      formBookUpdate.addEventListener("submit", function (event) {
        closeModal("formModalEdit");
        event.preventDefault();
        updateBook(parentEventId);
      });
    }
  );
}

function createTrashButton() {
  const trashIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';

  return createButton(
    ["action", "delete"],
    "Hapus buku",
    trashIcon,
    function (event) {
      const parentEventId = event.target.closest(".card").id;
      removeFromBookshelfList(parentEventId);
    }
  );
}

function createUndoReadButton() {
  const undoReadIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>';

  return createButton(
    ["action", "undo"],
    "Tandai belum dibaca",
    undoReadIcon,
    function (event) {
      const parentEventId = event.target.closest(".card").id;
      undoBookFromComplete(parentEventId);
    }
  );
}

function createReadButton() {
  const readIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>';

  return createButton(
    ["action", "read"],
    "Tandai sudah dibaca",
    readIcon,
    function (event) {
      const parentEventId = event.target.closest(".card").id;
      addBookToComplete(parentEventId);
    }
  );
}

function createButton(
  buttonTypeClass,
  buttonTitle,
  buttonActionIcon,
  eventListener
) {
  const button = document.createElement("button");
  button.innerHTML = buttonActionIcon;
  button.classList.add(...buttonTypeClass);
  button.setAttribute("title", buttonTitle);
  button.setAttribute("type", "button");

  button.addEventListener("click", function (event) {
    event.stopPropagation();
    eventListener(event);
  });
  return button;
}

function addBook() {
  const title = document.getElementById("inputBookTitle");
  const author = document.getElementById("inputBookAuthor");
  const year = document.getElementById("inputBookYear");
  const isComplete = document.getElementById("inputBookIsComplete");

  const bookObject = composeBookObject(
    title.value,
    author.value,
    parseInt(year.value),
    isComplete.checked
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();

  title.value = "";
  author.value = "";
  year.value = "";
  isComplete.checked = false;

  Swal.fire({
    title: "Sukses!",
    text: "Buku berhasil ditambahkan",
    icon: "success",
    showConfirmButton: false,
    timer: 1500
  });
}

function updateBook(bookId) {
  const title = document.getElementById("updateBookTitle");
  const author = document.getElementById("updateBookAuthor");
  const year = document.getElementById("updateBookYear");
  const isComplete = document.getElementById("updateBookIsComplete");

  const bookTarget = findBookIndex(bookId);

  const bookObject = composeBookObject(
    title.value,
    author.value,
    parseInt(year.value),
    isComplete.checked
  );
  books[bookTarget] = bookObject;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();

  Swal.fire({
    title: "Sukses!",
    text: "Buku berhasil diubah",
    icon: "success",
    showConfirmButton: false,
    timer: 1500
  });
}

function searchBook() {
  const bookTitle = document.getElementById("searchBookTitle").value;

  for (const bookItem of books) {
    if (!bookItem.title.toLowerCase().includes(bookTitle.toLowerCase())) {
      const bookElement = document.getElementById(bookItem.id);
      bookElement.classList.add("hide");
    } else {
      const bookElement = document.getElementById(bookItem.id);
      bookElement.classList.remove("hide");
    }
  }
}

function editFromBookshelfList(bookId) {
  const title = document.getElementById("updateBookTitle");
  const author = document.getElementById("updateBookAuthor");
  const year = document.getElementById("updateBookYear");
  const isComplete = document.getElementById("updateBookIsComplete");

  const bookTarget = findBook(bookId);

  title.value = bookTarget.title;
  author.value = bookTarget.author;
  year.value = bookTarget.year;
  isComplete.checked = bookTarget.isComplete;
}

function removeFromBookshelfList(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();

  Swal.fire({
    title: "Sukses!",
    text: "Buku berhasil dihapus",
    icon: "success",
    showConfirmButton: false,
    timer: 1500
  });
}

function addBookToComplete(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget === null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoBookFromComplete(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget === null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function showModal() {
  const createFormModal = document.getElementById("formModalCreate");
  const createBtn = document.getElementById("createFormModalBtn");

  createBtn.addEventListener("click", function () {
    createFormModal.style.display = "flex";
  });
}

function closeModal(targetId) {
  const targetElement = document.getElementById(targetId);
  targetElement.style.display = "none";
}
