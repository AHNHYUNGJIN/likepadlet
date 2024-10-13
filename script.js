document.addEventListener("DOMContentLoaded", () => {
  const addNoteButton = document.getElementById("addNoteButton");
  const noteInput = document.getElementById("noteInput");
  const board = document.getElementById("board");

  addNoteButton.addEventListener("click", () => {
    const noteContent = noteInput.value.trim();
    if (noteContent === "") {
      alert("메모 내용을 입력하세요!");
      return;
    }

    addNote(noteContent);
    noteInput.value = ""; // 입력란 초기화
  });

  function addNote(content) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.textContent = content;
    board.appendChild(note);
  }
});
