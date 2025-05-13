
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
          Label: ${data.result.label} <br/>
          Tingkat Keyakinan: ${data.result.confidence}%
        `;
      } catch (error) {
        resultDiv.innerText = "Terjadi kesalahan saat memproses gambar.";
        console.error(error);
      }
    }

    function previewImage() {
      const input = document.getElementById("imageInput");
      const preview = document.getElementById("imagePreview");

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
