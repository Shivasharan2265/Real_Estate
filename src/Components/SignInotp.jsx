// import React, { useState, useRef } from "react";

// const SignInotp = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otp, setOtp] = useState(["", "", "", ""]);

//   const inputsRef = useRef([]);
//   const countryCodes = [{ code: "+91" }, { code: "+971" }];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!agreedToTerms) {
//       alert("Please agree to Terms and Conditions");
//       return;
//     }
//     if (!phoneNumber) {
//       alert("Phone number is required");
//       return;
//     }
//     setShowOtpModal(true);
//   };

//   const handleOtpChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 3) inputsRef.current[index + 1]?.focus();
//   };

//   const handleVerify = () => {
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length < 4) {
//       alert("Please enter the full 4-digit OTP");
//       return;
//     }
//     console.log("Verifying OTP:", enteredOtp);
//     setShowOtpModal(false);
//   };

//   const handleResend = () => {
//     console.log("Resend OTP triggered for:", countryCode + phoneNumber);
//     alert("OTP resent successfully! (Backend integration needed)");
//   };

//   const handleCancel = () => {
//     // clear OTP and close modal
//     setOtp(["", "", "", ""]);
//     setShowOtpModal(false);
//   };

//   // Shared styles
//   const containerStyle = {
//     width: "100%",
//     maxWidth: "400px",
//     minHeight: "400px",
//     padding: "30px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     backgroundColor: "white",
//     fontFamily: "Arial, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     position: "relative",
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#ED2027",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "16px",
//     fontWeight: "bold",
//     cursor: "pointer",
//     transition: "background-color 0.3s",
//   };

//   return (
//     <>
//       {/* Phone Number Form */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "100vh",
//           backgroundColor: "#f5f5f5",
//           padding: "20px",
//         }}
//       >
//         <div style={containerStyle}>
//           <div>
//             <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "1px", textAlign: "left" }}>
//               Login / Register
//             </h1>
//             <p style={{ color: "#666", fontSize: "16px", textAlign: "left", marginBottom: "0px" }}>
//               Please enter your Phone Number
//             </p>
//             <div style={{ height: "1px", backgroundColor: "#eee", margin: "10px 0" }} />

//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: "20px" }}>
//                 <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}>
//                   Phone Number
//                 </label>
//                 <div style={{ display: "flex" }}>
//                   <select
//                     value={countryCode}
//                     onChange={(e) => setCountryCode(e.target.value)}
//                     style={{
//                       padding: "12px 10px",
//                       border: "1px solid #ddd",
//                       borderRight: "none",
//                       borderRadius: "5px 0 0 5px",
//                       fontSize: "16px",
//                       backgroundColor: "#f9f9f9",
//                       cursor: "pointer",
//                       outline: "none",
//                     }}
//                   >
//                     {countryCodes.map((item, index) => (
//                       <option key={index} value={item.code}>
//                         {item.code}
//                       </option>
//                     ))}
//                   </select>

//                   <input
//                     type="tel"
//                     style={{
//                       flex: 1,
//                       padding: "12px 15px",
//                       border: "1px solid #ddd",
//                       borderRadius: "0 5px 5px 0",
//                       fontSize: "16px",
//                       outline: "none",
//                       backgroundColor: "#f9f9f9",
//                     }}
//                     placeholder="Enter phone number"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
//                     required
//                   />
//                 </div>
//               </div>

//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//                 <label style={{ display: "flex", alignItems: "center", color: "#666", cursor: "pointer", position: "relative" }}>
//                   <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} style={{ opacity: 0, position: "absolute" }} />
//                   <span
//                     style={{
//                       display: "inline-block",
//                       width: "18px",
//                       height: "18px",
//                       backgroundColor: agreedToTerms ? "#ED2027" : "transparent",
//                       borderRadius: "3px",
//                       marginRight: "8px",
//                       position: "relative",
//                       border: "2px solid black",
//                       boxSizing: "border-box",
//                     }}
//                   >
//                     {agreedToTerms && (
//                       <span style={{ position: "absolute", color: "white", fontSize: "12px", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
//                         ✓
//                       </span>
//                     )}
//                   </span>
//                   <span>Agree to Terms and Conditions</span>
//                 </label>

//                 <a
//                   href="#"
//                   style={{
//                     color: "#ED2027",
//                     textDecoration: "none",
//                     fontSize: "14px",
//                     marginleft:"4px"
//                   }}
//                   onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
//                   onMouseOut={(e) => (e.target.style.textDecoration = "none")}
//                 >
//                   Know More
//                 </a>

//               </div>

//               <button
//                 type="submit"
//                 style={buttonStyle}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = "#d11a20")}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = "#ED2027")}
//               >
//                 Continue
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* OTP Modal */}
//       {showOtpModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",

//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//           }}
//         >
//           <div style={containerStyle}>
//             {/* Close Button (top-right) */}
//             <button
//               onClick={handleCancel}
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 background: "none",
//                 border: "none",
//                 fontSize: "22px",
//                 cursor: "pointer",
//               }}
//             >
//               ×
//             </button>

//             {/* Modal Content */}
//             <div>
//               <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Verify your number</h2>
//               <p style={{ color: "#333", fontWeight: "bold" }}>
//                 {countryCode}
//                 {phoneNumber}
//               </p>
//               <p style={{ marginTop: "10px" }}>Enter your 4 digit OTP</p>

//               <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
//                 {otp.map((digit, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     maxLength="1"
//                     value={digit}
//                     onChange={(e) => handleOtpChange(e.target.value, index)}
//                     ref={(el) => (inputsRef.current[index] = el)}
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       textAlign: "center",
//                       fontSize: "20px",
//                       border: "1px solid #ccc",
//                       borderRadius: "5px",
//                     }}
//                   />
//                 ))}
//               </div>

//               <p style={{ color: "#ED2027", fontSize: "14px", cursor: "pointer", marginBottom: 0 }} onClick={handleResend}>
//                 Resend OTP
//               </p>
//             </div>

//             {/* Cancel (right-aligned, inside container) placed above the full-width Verify button */}
//             <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", marginBottom: "10px" }}>

//             </div>

//             {/* Verify & Continue (full width, same position as Continue) */}
//             <button
//               onClick={handleVerify}
//               style={buttonStyle}
//               onMouseOver={(e) => (e.target.style.backgroundColor = "#d11a20")}
//               onMouseOut={(e) => (e.target.style.backgroundColor = "#ED2027")}
//             >
//               Verify & Continue
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SignInotp;
