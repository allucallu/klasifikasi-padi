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
    resultDiv.innerText = "Hasil: " + data.result;
  } catch (error) {
    resultDiv.innerText = "Terjadi kesalahan. Coba lagi.";
    console.error(error);
  }
}
