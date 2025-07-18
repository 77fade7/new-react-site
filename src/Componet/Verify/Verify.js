 import { useState, useEffect } from "react";
import "./Verify.css";

function Verify() {
  const [step, setStep] = useState("options"); // options, upload, waiting, success
  const [selectedId, setSelectedId] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [verifiedIds, setVerifiedIds] = useState(() => {
    const stored = localStorage.getItem("verifiedIds");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    let timer;
    if (step === "waiting") {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft <= 0 && step === "waiting") {
      clearInterval(timer);
      const newVerified = { ...verifiedIds, [selectedId]: true };
      setVerifiedIds(newVerified);
      localStorage.setItem("verifiedIds", JSON.stringify(newVerified));
      setStep("success");
    }

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const handleIdSelect = (type) => {
    setSelectedId(type);
    if (verifiedIds[type]) {
      setStep("success");
    } else {
      setStep("upload");
    }
  };

  const handleContinue = () => {
    if (frontImage && backImage) {
      setStep("waiting");
      setTimeLeft(10);
    } else {
      alert("You must upload both front and back images.");
    }
  };

  const handleBack = () => {
    setFrontImage(null);
    setBackImage(null);
    setSelectedId("");
    setStep("options");
  };

  return (
    <div className="verify-container">
      {step !== "options" && (
        <button className="back-btn-outside" onClick={handleBack}>← رجوع</button>
      )}

      {step === "options" && (
        <div className="verify-card fade-in">
          <h2>Select ID Verification Method</h2>
          <div className="btn-group">
            <button onClick={() => handleIdSelect("National ID")}>National ID</button>
            <button onClick={() => handleIdSelect("Passport")}>Passport</button>
            <button onClick={() => handleIdSelect("Driver's License")}>Driver's License</button>
          </div>
        </div>
      )}

      {(step === "upload" || step === "waiting" || step === "success") && (
        <div className="verify-card fade-in">
          <h2>
            {`Upload ${selectedId} Photos`}
            {step === "Please wait for verification"}
          </h2>

          {step === "upload" && (
            <>
              <input type="file" onChange={(e) => setFrontImage(e.target.files[0])} />
              <input type="file" onChange={(e) => setBackImage(e.target.files[0])} />
              <button className="verify-btn" onClick={handleContinue}>
                Verify Identity
              </button>
            </>
          )}

          {step === "waiting" && (
            <p className="timer">
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </p>
          )}

          {step === "success" && (
            <p>Your identity has been successfully verified. Thank you for completing the verification process.
               We at CryptoTech202 value your trust and always strive to protect your data and ensure the highest levels of
                security for your investments. You can now enjoy all the platform's benefits without restrictions 
              and begin your investment journey with confidence and peace of mind. Welcome to the elite trading community!.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Verify;