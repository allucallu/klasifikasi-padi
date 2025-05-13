async function classifyImage() {
  const input = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");

  if (!input.files[0]) {
    resultDiv.innerText = "Silakan pilih gambar terlebih dahulu.";
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
    resultDiv.innerHTML = `<p><strong>Label:</strong> ${data.label}</p><p><strong>Tingkat Keyakinan:</strong> ${Math.round(data.confidence * 100)}%</p>`;

  } catch (error) {
    resultDiv.innerText = "Terjadi kesalahan. Coba lagi.";
    console.error(error);
  }
}
