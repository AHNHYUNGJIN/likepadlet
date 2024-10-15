document.addEventListener("DOMContentLoaded", () => {
  const addNoteButton = document.getElementById("addNoteButton");
  const noteInput = document.getElementById("noteInput");
  const board = document.getElementById("board");
  const resetButton = document.getElementById("resetButton");

  // 메모 불러오기
  loadNotes();

  // 메모 추가 버튼 클릭 시
  addNoteButton.addEventListener("click", () => {
    const noteContent = noteInput.value.trim();
    if (noteContent === "") {
      alert("메모 내용을 입력하세요!");
      return;
    }

    addNote(noteContent);
    noteInput.value = ""; // 입력란 초기화
    saveNotes(); // 메모 저장
  });

  // 리셋 버튼 클릭 시
  resetButton.addEventListener("click", () => {
    if (confirm("모든 메모를 삭제하시겠습니까?")) {
      board.innerHTML = "";
      saveNotes(); // 빈 상태로 저장
    }
  });

  // 메모 추가 함수
  function addNote(content, position = { top: 0, left: 0 }) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.textContent = content;
    note.style.position = "absolute";
    note.style.top = `${position.top}px`;
    note.style.left = `${position.left}px`;

    $(note).draggable({
      containment: ".board",
      stop: function () {
        saveNotes();
      }
    });

    board.appendChild(note);
  }

  // 메모 저장 함수
  function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note").forEach(note => {
      notes.push({
        content: note.textContent,
        position: {
          top: note.offsetTop,
          left: note.offsetLeft
        }
      });
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // 메모 불러오기 함수
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => {
      addNote(note.content, note.position);
    });
  }
});
