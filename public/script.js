document.addEventListener("DOMContentLoaded", () => {
  // ===== Auto-resize textarea =====
  const messageTextarea = document.getElementById('message');
  if (messageTextarea) {
    messageTextarea.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }

  // ===== URL Scan Form =====
  const scanForm = document.getElementById("scanForm");

  // Frontend URL format validator
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }

  if (scanForm) {
    scanForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const urlInput = document.getElementById("urlInput").value.trim();
      const resultDiv = document.getElementById("scanResult");

      // Validate URL format before sending
      if (!isValidUrl(urlInput)) {
        resultDiv.innerText = "❌ Please enter a valid URL.";
        return;
      }

      resultDiv.innerText = "⏳ Scanning... Please wait...";
      scanForm.querySelector("button").disabled = true; // disable button during scan

      try {
        const response = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlInput })
        });

        const data = await response.json();

        if (data.error) {
          resultDiv.innerText = `❌ Error: ${data.error}`;
        } else {
          resultDiv.innerText = data.malicious
            ? "⚠️ Malicious URL detected!"
            : "✅ This URL seems safe.";
        }
      } catch (err) {
        resultDiv.innerText = "❌ Error scanning the URL.";
      } finally {
        scanForm.querySelector("button").disabled = false;
      }
    });

    const clearResult = () => {
      document.getElementById("scanResult").innerText = "";
    };

    document.getElementById("urlInput").addEventListener("input", clearResult);
    document.getElementById("urlInput").addEventListener("focus", clearResult);
  }

  // ===== Contact Form =====
  const contactForm = document.getElementById('contactForm');
  const loadingSpinner = document.getElementById('loadingSpinner');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      loadingSpinner.style.display = 'block'; // Show spinner

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await res.json();
        if (res.ok) {
          contactForm.reset();
        } 
      } catch (error) {
        console.error(error);
      } finally {
        loadingSpinner.style.display = 'none'; // Hide spinner
      }
    });
  }
});
