 import { useState, useEffect } from "react";
import "./Verify.css";

function Verify() {
  const [step, setStep] = useState("options"); // options, upload, waiting, success
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let timer;

    if (step === "waiting") {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft <= 0 && step === "waiting") {
      clearInterval(timer);
      setStep("success");
      setVerified(true);
    }

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleContinue = () => {
    if (frontImage && backImage) {
      setStep("waiting");
      setTimeLeft(10);
    } else {
      alert("You must upload both images.");
    }
  };

  return (
    <div className="verify-container">
      {step === "options" && (
        <div className="verify-card fade-in">
          <h2>Select ID Verification Method</h2>
          <div className="btn-group">
            <button onClick={() => setStep("upload")}>National ID</button>
            <button onClick={() => setStep("upload")}>Passport</button>
            <button onClick={() => setStep("upload")}>Driver's License</button>
          </div>
        </div>
      )}

      {step === "upload" && (
        <div className="verify-card fade-in">
          <h2>Upload Your Document Photos</h2>
          <input
            type="file"
            onChange={(e) => setFrontImage(e.target.files[0])}
          />
          <input
            type="file"
            onChange={(e) => setBackImage(e.target.files[0])}
          />

          {!verified && (
            <button className="verify-btn" onClick={handleContinue}>
              Verify Identity
            </button>
          )}

          {verified && (
            <button className="verified-btn" disabled>
              Identity Verified
            </button>
          )}
        </div>
      )}

      {step === "waiting" && (
        <div className="verify-card fade-in">
          <h2>Please wait 10 seconds</h2>
          <p className="timer">
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </p>
        </div>
      )}

      {step === "success" && (
        <div className="verify-card fade-in">
          <h2>✅ Verification Successful</h2>
          <p>You can now enjoy all features.</p>
        </div>
      )}
    </div>
  );
}

export default Verify;