 const html5QrCode = new Html5Qrcode("reader");

  const config = { fps: 10, qrbox: 250 };

  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      const cameraId = devices[0].id;

      html5QrCode.start(
        cameraId,
        config,
        (decodedText, decodedResult) => {
          console.log("QR Code:", decodedText);
        },
        (errorMessage) => {
          // scanning errors (ignored usually)
        }
      );
    }
  }).catch(err => {
    console.error("Camera error:", err);
    alert("Unable to access camera. Please allow camera permissions and try again.");
  });