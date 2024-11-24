document.getElementById("upload-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const fileInput = document.getElementById("file-input");
    if (!fileInput.files[0]) return alert("Please select a file to upload!");
  
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
  
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        const fileList = document.getElementById("file-list");
        const li = document.createElement("li");
        li.textContent = data.fileUrl;
        li.addEventListener("click", () => {
          document.getElementById("audio-player").src = data.fileUrl;
        });
        fileList.appendChild(li);
      } else {
        alert("Upload failed!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred!");
    }
  });
  