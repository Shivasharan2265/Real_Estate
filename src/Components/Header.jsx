import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import api from '../api/api';
import easy from "../assets/easy.png"
import toast from 'react-hot-toast';


const Header = () => {
  const [otpSent, setOtpSent] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();
  const [loadingButton, setLoadingButton] = useState({
    continue: false,
    verifyOtp: false,
    addProperty: false,
  });


  const toggleMobileMenu = () => {
    setMenuVisible(prev => !prev);
  };

  const handleDropdownClick = (index) => {
    if (isMobileView || window.innerWidth <= 991) {
      setActiveDropdown(prev => (prev === index ? null : index));
    }
  };



  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 991);
      if (window.innerWidth > 991) {
        setMenuVisible(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (menuVisible) {
      document.body.classList.add('mobile-menu-visible');
    } else {
      document.body.classList.remove('mobile-menu-visible');
    }
  }, [menuVisible]);

  const menuItems = [
    { label: 'Home', className: 'home', onClick: () => navigate('/home') },
    { label: 'Properties', className: 'listing', onClick: () => navigate('/listing') },

    {
      label: 'Pages', className: 'dropdown2',
      submenu: [
        { text: 'About Us', onClick: () => navigate('/aboutus') },
        { text: 'Contact Us', onClick: () => navigate('/contactus') },
        { text: 'FAQs', onClick: () => navigate('/FAQ') },
        { text: 'Privacy Policy', onClick: () => navigate('/Privacy-Policy') },
         { text: 'Blogs', onClick: () => navigate('/blogs') },
      ]
    },

    {
      label: 'Options', className: 'dropdown3',
      submenu: [
        { text: 'Dashboard', onClick: () => navigate('/dashboard') },
        { text: 'My Favorites', onClick: () => navigate('/myfavorites') },
        { text: 'My Properties', onClick: () => navigate('/myproperties') },
        { text: 'Reviews', onClick: () => navigate('/reviews') },
      ]
    },
    // { label: 'My Profile', className: 'myprofile', onClick: () => navigate('/myprofile') }
  ];

  // ---------------- Register Form States ----------------
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30); // countdown seconds
  const [canResend, setCanResend] = useState(false);



  useEffect(() => {
    let interval;
    if (showOtpModal) {
      setTimer(30);
      setCanResend(false);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpModal]);






  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);






  // ---- Send OTP API ----
  const sendOtp = async () => {
    const fd = new FormData();
    fd.append("programType", "customerRegister");
    fd.append("username", countryCode + phoneNumber);
    fd.append("country", "india");

    try {
      const response = await api.post("/customers/customer", fd);
      console.log("OTP Sent:", response);
      if (response.data.success) {
        toast.success(response.data.message)
        setOtpSent(response.data.data.otp);
        setShowOtpModal(true);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  // ---- Verify OTP API ----
  const verifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      alert("Please enter the full 4-digit OTP");
      return;
    }

    setLoadingButton(prev => ({ ...prev, verifyOtp: true }));

    const fd = new FormData();
    fd.append("programType", "verifyOTP");
    fd.append("username", countryCode + phoneNumber);
    fd.append("otp", enteredOtp);


    try {
      const response = await api.post("/customers/customer", fd);
      console.log("OTP Verify Response:", response.data);


      if (response.data.success) {
         toast.success(response.data.message)

        localStorage.setItem("authToken", response.data.data.authToken);


        localStorage.setItem("mobile", response.data.data.mobile);
        localStorage.setItem("name", response.data.data.firstName);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("photo", response.data.data.profile);

        setIsLoggedIn(true);   // ✅ mark user logged in
        setShowOtpModal(false);
        setShowRegister(false);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    } finally {
      setLoadingButton(prev => ({ ...prev, verifyOtp: false }));
    }
  };


  const resendOtp = async () => {
    const fd = new FormData();
    fd.append("programType", "customerRegister"); // tells backend we want to register/send OTP
    fd.append("username", countryCode + phoneNumber); // phone number with country code
    fd.append("country", "india"); // include same as first sendOtp call

    try {
      const response = await api.post("/customers/customer", fd);
      console.log("Resend OTP Response:", response.data);

      if (response.data?.status === "success") {
        alert("OTP resent successfully!");
        setShowOtpModal(true); // keep OTP modal open
      } else {
        alert(response.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to Terms and Conditions");
      return;
    }
    if (!phoneNumber) {
      alert("Phone number is required");
      return;
    }

    setLoadingButton(prev => ({ ...prev, continue: true }));

    try {
      await sendOtp();
    } finally {
      setLoadingButton(prev => ({ ...prev, continue: false }));
    }
  };


  // const handleVerify = () => {
  //   verifyOtp();
  // };


  const handleVerify = async () => {
    const enteredOtp = otp.join(""); // combine the 4 digits

    if (enteredOtp.length < 4) {
      alert("Please enter complete OTP");
      return;
    }

    setLoading(true); // show "Verifying OTP..."

    try {
      // Assuming verifyOtp returns a promise and resolves if OTP is correct
      const result = await verifyOtp(enteredOtp);

      if (result.success) { // Adjust based on your API response
        setLoading(false);
        setShowOtpModal(false);
        navigate("/home"); // ✅ redirect to home
      } else {
        setLoading(false);
        alert(result.message || "Invalid OTP, try again");
      }
    } catch (err) {
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };



  const inputsRef = useRef([]);
  const countryCodes = [
    { code: "+91", label: "India", flag: "images/logo/flag (1).png" },
    { code: "+971", label: "Dubai", flag: "images/logo/flag.png" }
  ];

  // dropdown ref & state for the custom country picker
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputsRef.current[index + 1]?.focus();
  };





  const handleCancel = () => {
    setOtp(["", "", "", ""]);
    setShowOtpModal(false);
  };



  const containerStyle = {
    width: "100%",
    maxWidth: "400px",
    // minHeight: "400px",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  };

  const containerStyle1 = {
    width: "100%",
    maxWidth: "400px",
    minHeight: "350px",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ED2027",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <>
      <header className="main-header fixed-header " style={{ height: "75px" }}>
        <div className="header-lower">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-container d-flex justify-content-between align-items-center">
                <div className="logo-box">
                  <div className="logo">
                    <a href="" onClick={(e) => { e.preventDefault(); navigate('/home'); }}>
                      <img src={easy} style={{ color: 'black' }} alt="logo" width="174" height="44" />
                    </a>
                  </div>
                </div>

                <div className="nav-outer">
                  <nav className="main-menu show navbar-expand-md">
                    <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                      <ul className="navigation clearfix">
                        {menuItems.map((item, index) => {
                          // hide "Options" in desktop
                          if (item.label === 'Options' && !isMobileView) return null;

                          return (
                            <li
                              key={index}
                              className={`${item.className || ''} ${activeDropdown === index ? 'open' : ''}`}
                              onClick={(e) => {
                                if (item.submenu) {
                                  e.preventDefault();
                                  handleDropdownClick(index);
                                } else if (item.onClick) {
                                  item.onClick();
                                }
                              }}
                              onMouseEnter={() => {
                                if (!isMobileView && item.submenu) {
                                  setActiveDropdown(index);
                                }
                              }}
                              onMouseLeave={() => {
                                if (!isMobileView && item.submenu) {
                                  setActiveDropdown(null);
                                }
                              }}
                            >
                              <a href="#" onClick={(e) => e.preventDefault()}>
                                {item.label}
                              </a>
                              {item.submenu && (
                                <ul style={{ display: activeDropdown === index ? 'block' : 'none' }}>
                                  {item.submenu.map((sub, i) => (
                                    <li key={i}>
                                      <a
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          if (sub.onClick) sub.onClick();
                                        }}
                                      >
                                        {sub.text}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>

                    </div>
                  </nav>
                </div>

                {/* login/register */}
                <div className="header-account">
                  {!localStorage.getItem("authToken") ? (
                    <>
                      <div className="register">
                        <ul className="d-flex">
                        
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowRegister(true);
                              }}
                            >
                              Login/Register
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="flat-bt-top">
                        <a
                          className="tf-btn primary"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            // Open login modal if not logged in
                            setShowRegister(true);
                          }}
                        >
                          Add property
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <ul className="d-flex">

                        {!isMobileView && ( // <-- hide on mobile
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate("/myprofile");
                              }}
                            >
                              My Profile
                            </a>
                          </li>
                        )}
                      </ul>
                      <div className="flat-bt-top">
                        <a
                          className="tf-btn primary"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            // Navigate to add property if logged in
                            navigate("/addproperty");
                          }}
                        >
                          Add property
                        </a>
                      </div>
                    </>
                  )}
                </div>



                <div className="mobile-nav-toggler mobile-button" onClick={toggleMobileMenu}>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="close-btn" onClick={toggleMobileMenu}>
          <span className="icon flaticon-cancel-1"></span>
        </div>
        {/* login/register mobile */}
        <div className="mobile-menu" style={{ display: menuVisible ? 'block' : 'none' }}>
          <div className="menu-backdrop" onClick={toggleMobileMenu}></div>
          <nav className="menu-box">
            <div className="nav-logo">
              <a href="" onClick={(e) => { e.preventDefault(); navigate('/home'); toggleMobileMenu(); }}>
                <img src={easy} alt="nav-logo" width="174" height="44" />
              </a>
            </div>
            <div className="bottom-canvas">
              <div className="login-box flex align-items-center">
                {isLoggedIn ? (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/myprofile");
                      toggleMobileMenu();
                    }}
                  >
                    My Profile
                  </a>
                ) : (
                  <>
                    <a href="#modalLogin" data-bs-toggle="modal" onClick={toggleMobileMenu}>Login</a>
                    <span>/</span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowRegister(true);
                        toggleMobileMenu();
                      }}
                    >
                      Register
                    </a>
                  </>
                )}
              </div>

              <div className="menu-outer">
                <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                  <ul className="navigation clearfix">
                    {menuItems.map((item, index) => (
                      <li
                        key={index}
                        className={`${item.className || ''} ${activeDropdown === index ? 'open' : ''}`}
                        onClick={() => {
                          if (item.submenu) {
                            handleDropdownClick(index);
                          } else if (item.onClick) {
                            item.onClick();
                            toggleMobileMenu();
                          }
                        }}
                      >
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          {item.label}
                        </a>
                        {item.submenu && (
                          <ul style={{ display: activeDropdown === index ? 'block' : 'none' }}>
                            {item.submenu.map((sub, i) => (
                              <li key={i}>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (sub.onClick) {
                                      sub.onClick();
                                      toggleMobileMenu();
                                    }
                                  }}
                                >
                                  {sub.text}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="button-mobi-sell">
                <div className="button-mobi-sell">
                  <a
                    className="tf-btn primary"
                    onClick={() => {
                      if (isLoggedIn) {
                        navigate("/addproperty");
                      } else {
                        setShowRegister(true);
                      }
                      toggleMobileMenu();
                    }}
                  >
                    Add Property
                  </a>
                </div>

              </div>

              <div className="mobi-icon-box">
                <div className="box d-flex align-items-center">
                  <span className="icon icon-phone2"></span>
                  <div>+91-7411043895</div>
                </div>
                <div className="box d-flex align-items-center">
                  <span className="icon icon-mail"></span>
                  <div>info@eazy_acers.com</div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>


      {/* Register form  */}
      {showRegister && (
        <div style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000
        }}>
          <div style={containerStyle}>
            <button
              onClick={() => setShowRegister(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "22px",
                cursor: "pointer"
              }}
            >×</button>

            <h1 style={{ marginBottom: "1px", fontSize: "25px" }}>Login / Register</h1>
            <p style={{ marginBottom: "10px" }}>Please enter your Phone Number</p>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                {/* Country Selector - merged with input */}
                <div
                  ref={countryDropdownRef}
                  style={{
                    width: "80px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                    border: "1px solid #ddd",
                    borderRight: "none",
                    borderRadius: "5px 0 0 5px",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                    position: "relative"
                  }}
                  onClick={() => setShowCountryDropdown(prev => !prev)}
                >
                  <img
                    src={countryCodes.find(c => c.code === countryCode)?.flag}
                    alt=""
                    style={{ width: "20px", height: "14px", marginRight: "6px" }}
                  />
                  <span>{countryCode}</span>

                  {showCountryDropdown && (
                    <div style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "0 0 5px 5px",
                      zIndex: 10
                    }}>
                      {countryCodes.map((item, idx) => (
                        <div key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCountryCode(item.code);
                            setShowCountryDropdown(false);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 10px",
                            cursor: "pointer",
                            background: countryCode === item.code ? "#f0f0f0" : "transparent"
                          }}
                        >
                          <img src={item.flag} alt="" style={{ width: "20px", height: "14px", marginRight: "6px" }} />
                          <span>{item.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone input */}
                <input
                  type="tel"
                  style={{
                    flex: 1,
                    padding: "12px 15px",
                    border: "1px solid #ddd",
                    borderLeft: "none",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#f9f9f9"
                  }}
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                />
              </div>

              <label style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  style={{ marginRight: "8px", accentColor: "#ED2027" }}
                />
                Agree to Terms and Conditions
              </label>

              <button type="submit" style={buttonStyle} disabled={loadingButton.continue}>
                {loadingButton.continue ? "Sending OTP..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      )}


      {/* OTP Modal */}
      {showOtpModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3000,
          }}
        >
          <div style={containerStyle1}>
            {/* Cancel closes OTP + Registration */}
            <button
              onClick={() => {
                setShowOtpModal(false);
                setShowRegister(false);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h2 style={{ fontSize: "25px" }}>Verify your number</h2>

            {/* Number + Edit link */}
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {countryCode}
              {phoneNumber}
              <span
                style={{
                  fontSize: "14px",
                  color: "#ED2027",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  setShowOtpModal(false);
                  setShowRegister(true);
                }}
              >
                Edit
              </span>
            </p>
            <p>{otpSent}</p>

            {/* OTP Inputs */}
            <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      if (otp[i] === "") {
                        if (i > 0) {
                          inputsRef.current[i - 1].focus();
                          const newOtp = [...otp];
                          newOtp[i - 1] = "";
                          setOtp(newOtp);
                        }
                      } else {
                        const newOtp = [...otp];
                        newOtp[i] = "";
                        setOtp(newOtp);
                      }
                    }
                  }}
                  ref={(el) => (inputsRef.current[i] = el)}
                  style={{
                    width: "50px",
                    height: "50px",
                    textAlign: "center",
                    fontSize: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>

            {/* Resend OTP */}
            <p style={{ color: "#ED2027", cursor: canResend ? "pointer" : "default" }}
              onClick={() => {
                if (canResend) {
                  resendOtp();
                  setTimer(30);
                  setCanResend(false);
                  // restart timer
                  let interval = setInterval(() => {
                    setTimer((prev) => {
                      if (prev <= 1) {
                        clearInterval(interval);
                        setCanResend(true);
                        return 0;
                      }
                      return prev - 1;
                    });
                  }, 1000);
                }
              }}
            >
              {canResend ? "Resend OTP" : `Resend in ${timer}s`}
            </p>


            <button
              onClick={verifyOtp}
              style={buttonStyle}
              disabled={loadingButton.verifyOtp}
            >
              {loadingButton.verifyOtp ? "Verifying OTP..." : "Verify & Continue"}
            </button>
          </div>
        </div>
      )}


    </>
  );
};

export default Header;