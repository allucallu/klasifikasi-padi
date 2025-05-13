async function classifyImage() {
  const input = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");

  if (!input.files[0]) {
    resultDiv.innerText = "Silakan unggah gambar terlebih dahulu.";
    return;
  }

  const file = input.files[0];
  const formData = new FormData();
  formData.append("file", file);

  resultDiv.innerText = "Memproses gambar...";

  try {
    const response = await fetch("https://calluu-klasifikasi-padi.hf.space/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    resultDiv.innerHTML = `
  <p><strong>Label:</strong> ${data.label}</p><p><strong>Tingkat Keyakinan:</strong> ${Math.round(data.confidence * 100)}%</p>`;

  } catch (error) {
    resultDiv.innerText = "Terjadi kesalahan saat memproses gambar.";
    console.error(error);
  }
}

function previewImage() {
  const input = document.getElementById("imageInput");
  const preview = document.getElementById("preview");

  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}
