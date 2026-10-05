const frames = document.querySelectorAll(".frame");
const displayImage = document.getElementById("displayImage");
const caption = document.getElementById("caption");
const largeImageBox = document.querySelector(".large-image-box");

function selectFrame(frame) {
  frames.forEach((f) => f.classList.remove("is-active"));
  frame.classList.add("is-active");
  displayImage.src = frame.dataset.src;
  displayImage.style.display = "block";
  displayImage.alt = `${frame.dataset.caption} enlarged`;
  if (caption) caption.textContent = frame.dataset.caption;
}

frames.forEach((frame) => {
  // Drag-only. No click handler — click does nothing by design.

  // Native drag: carry frame id via dataTransfer
  frame.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", frame.dataset.src);
    e.dataTransfer.effectAllowed = "copy";
    largeImageBox.classList.add("highlight");
  });

  frame.addEventListener("dragend", () => {
    largeImageBox.classList.remove("highlight");
  });
});

["dragenter", "dragover"].forEach((evt) =>
  largeImageBox.addEventListener(evt, (e) => {
    e.preventDefault();
    largeImageBox.classList.add("highlight");
  })
);

largeImageBox.addEventListener("dragleave", () => {
  largeImageBox.classList.remove("highlight");
});

largeImageBox.addEventListener("drop", (e) => {
  e.preventDefault();
  largeImageBox.classList.remove("highlight");
  const src = e.dataTransfer.getData("text/plain");
  const match = [...frames].find((f) => f.dataset.src === src);
  if (match) selectFrame(match);
});
