const html5QrCode = new Html5Qrcode("reader");
const qrinput = document.getElementsByClassName("form-control")[0];

const config = {
  fps: 10,
  qrbox: (width, height) => {
    const minEdge = Math.min(width, height);
    return {
      width: minEdge * 0.7,
      height: minEdge * 0.7
    };
  },
  aspectRatio: 1.0
};

html5QrCode.start(
  { facingMode: "environment" },
  config,
  onScanSuccess,
  onScanFailure
).catch(() => {

  Html5Qrcode.getCameras().then(devices => {
    if (devices.length) {
      return html5QrCode.start(
        devices[0].id,
        config,
        onScanSuccess,
        onScanFailure
      );
    }
  });

});

function onScanSuccess(decodedText) {
  console.log("QR Code:", decodedText);
  qrinput.value = decodedText;
  html5QrCode.stop();
}

function onScanFailure(errorMessage) {
  // Ignore scan errors
}
