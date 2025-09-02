import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../api/api';


const MyProfile = () => {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showDashboard, setShowDashboard] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        country: "",
        state: "",
        city: "",
        address: "",
        postalCode: "",
        file: null,
    });



    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMobileMenu = () => {
        setMenuVisible(prev => !prev);
    };

    const toggleDashboard = () => {
        setShowDashboard(prev => !prev);
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
                setShowDashboard(false);
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
        {
            label: 'Home',
            className: 'home',
            onClick: () => navigate('/home')
        },
        {
            label: 'Listing',
            className: 'listing',
            onClick: () => navigate('/listing')
        },
        {
            label: 'Properties',
            className: 'Properties',
            onClick: () => navigate('/Properties')
        },
        {
            label: 'Pages',
            className: 'dropdown2',
            submenu: [
                { text: 'About Us', onClick: () => navigate('/aboutus') },
                { text: 'Contact Us', onClick: () => navigate('/contactus') },
                { text: 'FAQs', onClick: () => navigate('/FAQ') },
                { text: 'Privacy Policy', onClick: () => navigate('/Privacy-Policy') },
            ]
        },
        {
            label: 'My Profile',
            className: 'myprofile',
            onClick: () => navigate('/myprofile')
        }
    ];
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownOpen && !event.target.closest('.box-avatar')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);



    // Fetch customer details on mount
    const getCustomerDetails = async () => {
        const fd = new FormData();
        fd.append("programType", "getPersonalDetailsOfCustomer");
        fd.append("authToken", localStorage.getItem("authToken"));

        try {
            const response = await api.post("customers/customerProfile", fd);
            console.log("Profile response:", response.data);
            if (response.data?.success) {
                setCustomer((prev) => ({
                    ...prev,
                    ...response.data.data, // spread response into state
                }));
            }
        } catch (error) {
            console.error("customer error:", error);
        }
    };

    useEffect(() => {
        getCustomerDetails();
    }, []);

    // Update customer details
    const updateCustomerDetails = async () => {
        const fd = new FormData();
        fd.append("programType", "updateCustomer");
        fd.append("authToken", localStorage.getItem("authToken"));
        fd.append("firstName", customer.firstName);
        fd.append("lastName", customer.lastName);
        fd.append("email", customer.email);
        fd.append("mobile", customer.mobile);
        fd.append("country", customer.country);
        fd.append("state", customer.state);
        fd.append("city", customer.city);
        fd.append("address", customer.address);
        fd.append("postalCode", customer.postalCode);
        if (customer.file) {
            fd.append("file", customer.file);
        }

        try {
            const response = await api.post("customers/customerProfile", fd);
            console.log("Update response:", response.data);
            if (response.data.success) {
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error("customer error:", error);
            alert("Something went wrong while updating profile!");
        }
    };

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Save file in state
            setCustomer({ ...customer, file });

            // Show preview instantly
            const previewUrl = URL.createObjectURL(file);
            setCustomer((prev) => ({ ...prev, profile: previewUrl }));
        }
    };








    return (
        <div className={`body bg-surface ${menuVisible ? 'mobile-menu-visible' : ''}`}>
            <div id="wrapper">
                <div id="page" className="clearfix">
                    <div className={`layout-wrap ${showDashboard ? 'full-width' : ''}`}>
                        {/* <!-- header --> */}
                        <header className="main-header fixed-header header-dashboard">
                            {/* <!-- Header Lower --> */}
                            <div className="header-lower">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="inner-container d-flex justify-content-between align-items-center">
                                            {/* <!-- Logo Box --> */}
                                            <div className="logo-box d-flex">
                                                <div className="logo"><a href="" onClick={(e) => { e.preventDefault(); navigate('/home'); }}><img src="images/logo/homeblack.png" alt="logo" width="174" height="44" /></a></div>
                                                <div className="button-show-hide" onClick={toggleDashboard}>
                                                    <span className="icon icon-categories"></span>
                                                </div>

                                            </div>
                                            <div className="nav-outer">
                                                {/* <!-- Main Menu --> */}
                                                <nav className="main-menu show navbar-expand-md">
                                                    <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                                        <ul className="navigation clearfix">
                                                            <li className="home ms-4">
                                                                <a href="" onClick={(e) => { e.preventDefault(); navigate('/home'); }}>Home</a>
                                                            </li>
                                                            <li className="listing">
                                                                <a href="" onClick={(e) => { e.preventDefault(); navigate('/listing'); }}>Listing</a>
                                                            </li>
                                                            <li className="Properties">
                                                                <a href="" onClick={(e) => { e.preventDefault(); navigate('/Properties'); }}>Properties</a>
                                                            </li>
                                                            <li
                                                                className={`dropdown2 ${activeDropdown === 3 ? 'open' : ''}`}
                                                                onClick={(e) => {
                                                                    if (isMobileView || window.innerWidth <= 991) {
                                                                        e.preventDefault();
                                                                        handleDropdownClick(3);
                                                                    }
                                                                }}
                                                                onMouseEnter={() => {
                                                                    if (!isMobileView && window.innerWidth > 991) {
                                                                        setActiveDropdown(3);
                                                                    }
                                                                }}
                                                                onMouseLeave={() => {
                                                                    if (!isMobileView && window.innerWidth > 991) {
                                                                        setActiveDropdown(null);
                                                                    }
                                                                }}
                                                            >
                                                                <a href="#" onClick={(e) => e.preventDefault()}>Pages</a>
                                                                <ul style={{ display: activeDropdown === 3 ? 'block' : 'none' }}>
                                                                    <li><a href="aboutus" onClick={(e) => { e.preventDefault(); navigate('/aboutus'); }}>About Us</a></li>
                                                                    <li><a href="contactus" onClick={(e) => { e.preventDefault(); navigate('/contactus'); }}>Contact Us</a></li>
                                                                    <li><a href="faq" onClick={(e) => { e.preventDefault(); navigate('/FAQ'); }}>FAQs</a></li>
                                                                    <li><a href="" onClick={(e) => { e.preventDefault(); navigate('/Privacy-Policy'); }}>Privacy Policy</a></li>
                                                                </ul>
                                                            </li>
                                                            <li className="myprofile">
                                                                <a href="" onClick={(e) => { e.preventDefault(); navigate('/myprofile'); }}>Myprofile</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </nav>
                                            </div>
                                            <div className="header-account">
                                                <div
                                                    className={`box-avatar dropdown-toggle ${dropdownOpen ? 'show' : ''}`}
                                                    onClick={toggleDropdown}
                                                    style={{ position: 'relative' }}
                                                >
                                                    {/* <div className="avatar avt-40 round">
                                                        <img src="images/avatar/avt-2.jpg" alt="avt" />
                                                    </div>
                                                    <p className="name" style={{ cursor: "pointer" }}>Tony Nguyen<span className="icon icon-arr-down"></span></p>
                                                    <div
                                                        className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '100%',
                                                            right: 0,
                                                            zIndex: 1000,
                                                            marginTop: '0.5rem'
                                                        }}
                                                    >
                                                        <a className="dropdown-item" onClick={() => navigate('/myproperties')}>My Properties</a>
                                                        <a className="dropdown-item" onClick={() => navigate('/myfavorites')}>My Favorites</a>
                                                        <a className="dropdown-item" onClick={() => navigate('/reviews')}>Reviews</a>
                                                        <a className="dropdown-item" onClick={() => navigate('/myprofile')}>My Profile</a>
                                                        <a className="dropdown-item" onClick={() => navigate('/logout')}>Logout</a>

                                                    </div>
                                                     */}





                                                    <div
                                                        // style={{ position: "relative", display: "inline-block" }}
                                                        // onMouseEnter={() => setDropdownOpen(true)}
                                                        // onMouseLeave={() => setDropdownOpen(false)}
                                                    >
                                                        {/* Avatar + Name */}
                                                        <div
                                                            className="avatar avt-40 round"
                                                            style={{ display: "inline-block", verticalAlign: "middle" }}
                                                        >
                                                            <img src="images/avatar/avt-2.jpg" alt="avt" />
                                                        </div>
                                                        <p
                                                            className="name"
                                                            style={{ cursor: "pointer", display: "inline-block", marginLeft: "8px" }}
                                                        >
                                                            Tony Nguyen <span className="icon icon-arr-down"></span>
                                                        </p>

                                                        {/* Dropdown */}
                                                        <div
                                                            className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
                                                            style={{
                                                                position: "absolute",
                                                                top: "100%",
                                                                right: 0,
                                                                zIndex: 1000,
                                                                marginTop: "0.5rem",
                                                                display: dropdownOpen ? "block" : "none",
                                                                background: "#fff",
                                                                border: "1px solid #ddd",
                                                                borderRadius: "6px",
                                                                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                                                                minWidth: "160px",
                                                            }}
                                                        >
                                                            <a className="dropdown-item" onClick={() => navigate("/myproperties")}>
                                                                My Properties
                                                            </a>
                                                            <a className="dropdown-item" onClick={() => navigate("/myfavorites")}>
                                                                My Favorites
                                                            </a>
                                                            <a className="dropdown-item" onClick={() => navigate("/reviews")}>
                                                                Reviews
                                                            </a>
                                                            <a className="dropdown-item" onClick={() => navigate("/myprofile")}>
                                                                My Profile
                                                            </a>
                                                            <a className="dropdown-item" onClick={() => navigate("/logout")}>
                                                                Logout
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flat-bt-top">
                                                    <a className="tf-btn primary" href="add-property.html">Submit Property</a>
                                                </div>
                                            </div>

                                            <div className="mobile-nav-toggler mobile-button" onClick={toggleMobileMenu}><span></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Mobile Menu  --> */}
                            <div className="close-btn" onClick={toggleMobileMenu}><span className="icon flaticon-cancel-1"></span></div>
                            <div className="mobile-menu" style={{ display: menuVisible ? 'block' : 'none' }}>
                                <div className="menu-backdrop" onClick={toggleMobileMenu}></div>
                                <nav className="menu-box">
                                    <div className="nav-logo">
                                        <a href="" onClick={(e) => { e.preventDefault(); navigate('/home'); toggleMobileMenu(); }}>
                                            <img src="images/logo/homeblack.png" alt="nav-logo" width="174" height="44" />
                                        </a>
                                    </div>
                                    <div className="bottom-canvas">
                                        <div className="menu-outer">
                                            <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                                <ul className="navigation clearfix">
                                                    {menuItems.map((item, index) => (
                                                        <li
                                                            key={index}
                                                            className={`${item.className} ${activeDropdown === index ? 'open' : ''}`}
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
                                                                {item.submenu && <span className=""></span>}
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
                                            <a className="tf-btn primary" href="add-property.html">Submit Property</a>
                                        </div>
                                        <div className="mobi-icon-box">
                                            <div className="box d-flex align-items-center">
                                                <span className="icon icon-phone2"></span>
                                                <div>1-333-345-6868</div>
                                            </div>
                                            <div className="box d-flex align-items-center">
                                                <span className="icon icon-mail"></span>
                                                <div>themesflat@gmail.com</div>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </header>

                        <div className={`sidebar-menu-dashboard ${showDashboard ? 'show' : ''}`}>
                            <ul className="box-menu-dashboard">
                                <li className="nav-menu-item">
                                    <a className="nav-menu-link" href="" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                                        <span className="icon icon-dashboard"></span> Dashboards
                                    </a>
                                </li>
                                <li className="nav-menu-item">
                                    <a className="nav-menu-link" href="" onClick={(e) => { e.preventDefault(); navigate('/myproperties'); }}>
                                        <span className="icon icon-list-dashes"></span> My Properties
                                    </a>
                                </li>
                                <li className="nav-menu-item">
                                    <a className="nav-menu-link" href="" onClick={(e) => { e.preventDefault(); navigate('/myfavorites'); }}>
                                        <span className="icon icon-heart"></span> My Favorites
                                    </a>
                                </li>
                                <li className="nav-menu-item">
                                    <a className="nav-menu-link" href="" onClick={(e) => { e.preventDefault(); navigate('/reviews'); }}>
                                        <span className="icon icon-review"></span> Reviews
                                    </a>
                                </li>
                                <li className="nav-menu-item">
                                    <a
                                        className="nav-menu-link"
                                        href=""
                                        onClick={(e) => {
                                            e.preventDefault();
                                            localStorage.removeItem("authToken"); // clear token
                                            navigate("/home"); // redirect after logout
                                            window.location.reload(); // reload so header updates
                                        }}
                                    >
                                        <span className="icon icon-sign-out"></span> Logout
                                    </a>
                                </li>

                            </ul>
                        </div>

                        <div className="main-content">
                            <div className="main-content-inner wrap-dashboard-content-2">
                                <div className="widget-box-2">
                                    <h6 className="title">Account Settings</h6>

                                    {/* Avatar Upload */}
                                    <div className="box">
                                        <h6 className="title">Avatar</h6>
                                        <div className="box-agent-avt">
                                            <div className="avatar">
                                                <img
                                                    src={`http://192.168.1.103/projects/easyAcers/admin/api/${customer.profile || 'images/avatar/avt-2.jpg'}`}
                                                    alt="avatar"
                                                    width="128"
                                                    height="128"
                                                />
                                            </div>
                                            <div className="content uploadfile">
                                                <p>Upload a new avatar</p>
                                                <div className="box-ip">
                                                    <input
                                                        type="file"
                                                        className="ip-file"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                                <p>JPEG 100x100</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Information Fields */}
                                    <h6 className="title">Information</h6>
                                    <div className="box box-fieldset">
                                        <label>First Name:<span>*</span></label>
                                        <input
                                            type="text"
                                            className="form-control style-1"
                                            value={customer.firstName || ""}
                                            onChange={(e) =>
                                                setCustomer({ ...customer, firstName: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="box box-fieldset">
                                        <label>Last Name:<span>*</span></label>
                                        <input
                                            type="text"
                                            className="form-control style-1"
                                            value={customer.lastName || ""}
                                            onChange={(e) =>
                                                setCustomer({ ...customer, lastName: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="box grid-4 gap-30">
                                        <div className="box-fieldset">
                                            <label>Email:<span>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control style-1"
                                                value={customer.email || ""}
                                                onChange={(e) =>
                                                    setCustomer({ ...customer, email: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="box-fieldset">
                                            <label>Mobile:<span>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control style-1"
                                                value={customer.mobile || ""}
                                                onChange={(e) =>
                                                    setCustomer({ ...customer, mobile: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="box-fieldset">
                                            <label>Country:<span>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control style-1"
                                                value={customer.country || ""}
                                                onChange={(e) =>
                                                    setCustomer({ ...customer, country: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="box-fieldset">
                                            <label>State:<span>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control style-1"
                                                value={customer.state || ""}
                                                onChange={(e) =>
                                                    setCustomer({ ...customer, state: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="box grid-4 gap-30 box-info-2">
                                        <div className="box-fieldset">
                                            <label>City:<span>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control style-1"
                                                value={customer.city || ""}
                                                onChange={(e) =>
                                                    setCustomer({ ...customer, city: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="box-fieldset">
                                            <label>Address:<span>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control style-1"
                                                value={customer.address || ""}
                                                onChange={(e) =>
                                                    setCustomer({ ...customer, address: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="box-fieldset">
                                            <label>Postal Code:<span>*</span></label>
                                            <input
                                                type="number"
                                                className="form-control style-1"
                                                value={customer.postalCode || ""}
                                                onChange={(e) =>
                                                    setCustomer({ ...customer, postalCode: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="box">
                                        <button className="tf-btn primary" onClick={updateCustomerDetails}>
                                            Save & Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;