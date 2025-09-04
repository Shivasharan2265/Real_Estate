
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import "./Dashboard.css"


const Dashboard = () => {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showDashboard, setShowDashboard] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [name, setName] = useState(localStorage.getItem("name"));
    console.log(name);


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


    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);       // current page
    const [limit] = useState(5);              // items per page
    const [totalPages, setTotalPages] = useState(1);

    const myPropertyList = async (pageNum = 1) => {
        const fd = new FormData();
        fd.append("programType", "myPropertyDetails");
        fd.append("authToken", localStorage.getItem("authToken"));
        fd.append("page", pageNum);
        fd.append("limit", limit);

        try {
            setLoading(true);
            const response = await api.post("/properties/property", fd);
            if (response.data.success) {
                setProperties(response.data.data["My Property"]); // <-- important!
                setTotalPages(Math.ceil(response.data.data.length / limit)); // optional
            }
        } catch (error) {
            console.error("Property fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const remove = async (id) => {

        console.log("removing")
        const fd = new FormData();
        fd.append("programType", "removeFavorites");
        fd.append("authToken", localStorage.getItem("authToken"));
        fd.append("favoriteId", id)
        console.log(id)

        try {

            const response = await api.post("/properties/property", fd);
            console.log(response)
            if (response.data.success) {
                setProperties([])
                myPropertyList()
            }
        } catch (error) {
            console.error("Property fetch error:", error);
        }
    };
    useEffect(() => {
        myPropertyList(page);
    }, [page]);

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
                                                    <div className="avatar avt-40 round">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/10307/10307911.png" alt="avt" />
                                                    </div>
                                                    <p className="name" style={{ cursor: "pointer" }}>{name}<span className="icon icon-arr-down"></span></p>
                                                    <div
                                                        className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '100%',
                                                            right: 0,
                                                            zIndex: 1000,
                                                            marginTop: '0.5rem',

                                                        }}
                                                    >
                                                        <a className="dropdown-item" onClick={() => navigate('/myproperties')}>My Properties</a>
                                                        <a className="dropdown-item" onClick={() => navigate('/myfavorites')}>My Favorites</a>
                                                        <a className="dropdown-item" onClick={() => navigate('/reviews')}>Reviews</a>
                                                        <a className="dropdown-item" onClick={() => navigate('/myprofile')}>My Profile</a>
                                                        <a className="dropdown-item" onClick={(e) => {
                                                            e.preventDefault();
                                                            localStorage.removeItem("authToken"); // clear token
                                                            navigate("/home"); // redirect after logout
                                                            window.location.reload(); // reload so header updates
                                                        }}>Logout</a>

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
                            <div className="main-content-inner">
                                <div className="button-show-hide show-mb">
                                    <span className="body-1">Show Dashboard</span>
                                </div>
                                <div className="flat-counter-v2 tf-counter">
                                    <div className="counter-box">
                                        <div className="box-icon w-68 round">
                                            <span className="icon icon-list-dashes"></span>
                                        </div>
                                        <div className="content-box">
                                            <div className="title-count">your Listing</div>
                                            <div className="d-flex align-items-end">
                                                <h6 className="number" data-speed="2000" data-to="17" data-inviewport="yes">17</h6>
                                                <span className="fw-7 text-variant-2">/17 remaining</span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="counter-box">
                                        <div className="box-icon w-68 round">
                                            <span className="icon icon-clock-countdown"></span>
                                        </div>
                                        <div className="content-box">
                                            <div className="title-count">Pending</div>
                                            <div className="d-flex align-items-end">
                                                <h6 className="number" data-speed="2000" data-to="0" data-inviewport="yes">0</h6>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="counter-box">
                                        <div className="box-icon w-68 round">
                                            <span className="icon icon-bookmark"></span>
                                        </div>
                                        <div className="content-box">
                                            <div className="title-count">Favorite</div>
                                            <div className="d-flex align-items-end">
                                                <h6 className="number" data-speed="2000" data-to="1" data-inviewport="yes">1</h6>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="counter-box">
                                        <div className="box-icon w-68 round">
                                            <span className="icon icon-review"></span>
                                        </div>
                                        <div className="content-box">
                                            <div className="title-count">Reviews</div>
                                            <div className="d-flex align-items-end">
                                                <h6 className="number" data-speed="2000" data-to="17" data-inviewport="yes">0</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper-content row">
                                    <div className="col-xl-9">
                                        <div className="widget-box-2 wd-listing">
                                            <h6 className="title">New Listing</h6>
                                            <div className="wd-filter">
                                                <div className="ip-group">
                                                    <input type="text" placeholder="Search" />
                                                </div>
                                                <div className="ip-group icon">
                                                    <input type="text" id="datepicker1" className="ip-datepicker icon" placeholder="From Date" />
                                                </div>
                                                <div className="ip-group icon">
                                                    <input type="text" id="datepicker2" className="ip-datepicker icon" placeholder="To Date" />
                                                </div>
                                                <div className="ip-group">
                                                    <div className="nice-select" tabindex="0"><span className="current">Select</span>
                                                        <ul className="list">
                                                            <li data-value="1" className="option selected">Select</li>
                                                            <li data-value="2" className="option">Today</li>
                                                            <li data-value="3" className="option">Yesterday</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-4"><span className="text-primary fw-7">17</span><span className="text-variant-1">Results found</span></div>
                                            <div className="wrap-table">
                                                <div className="table-responsive">

                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Listing</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {loading
                                                                ? Array.from({ length: 5 }).map((_, idx) => (
                                                                    <tr key={idx} className="file-delete" style={{ minHeight: "100px" }}>
                                                                        <td>
                                                                            <div className="listing-box" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                                                                                <div className="images">
                                                                                    <div className="skeleton skeleton-img"></div>
                                                                                </div>
                                                                                <div className="content" style={{ flex: 1 }}>
                                                                                    <div className="skeleton skeleton-text title"></div>

                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="status-wrap">
                                                                                <div className="skeleton skeleton-btn"></div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <ul className="list-action" style={{ display: "flex", gap: "10px" }}>
                                                                                <li><div className="skeleton skeleton-action"></div></li>
                                                                                <li><div className="skeleton skeleton-action"></div></li>
                                                                                <li><div className="skeleton skeleton-action"></div></li>
                                                                            </ul>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                                : properties.length > 0
                                                                    ? properties.map((property) => (
                                                                        <tr key={property.id} className="file-delete">
                                                                            <td>
                                                                                <div className="listing-box">
                                                                                    <div className="images">
                                                                                        <img
                                                                                            src="https://themesflat.co/html/homzen/images/home/house-1.jpg"
                                                                                            alt={property.title}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="content">
                                                                                        <div className="title">
                                                                                            <a href={`property-details-v1.html`} className="link">{property.title}</a>
                                                                                        </div>
                                                                                        <div className="text-date">
                                                                                            <p className="fw-5">
                                                                                                <span className="fw-4 text-variant-1">Posting date:</span> {property.created_at?.split(" ")[0]}
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className="text-1 fw-7">
                                                                                            {property.expected_price && property.expected_price !== "0.00"
                                                                                                ? `$${property.expected_price}`
                                                                                                : `$${property.expected_rent}`}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="status-wrap">
                                                                                    <a href="#" className="btn-status">
                                                                                        {property.status === "active" ? "Approved" : "Pending"}
                                                                                    </a>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <ul className="list-action">

                                                                                    <li onClick={() => remove(property.id)}><a className="remove-file item"><i className="icon icon-trash"></i>Remove</a></li>
                                                                                </ul>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                    : (
                                                                        <tr>
                                                                            <td colSpan={3} className="text-center">No properties found.</td>
                                                                        </tr>
                                                                    )}
                                                        </tbody>


                                                    </table>
                                                </div>

                                                <ul className="wd-navigation">
                                                    <li><a href="#" className="nav-item active">1</a></li>

                                                    <li><a href="#" className="nav-item"><i className="icon icon-arr-r"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="widget-box-2 wd-chart">
                                            <h6 className="title">Page Inside</h6>
                                            <div className="wd-filter-date">
                                                <div className="left">
                                                    <div className="dates active">Day</div>
                                                    <div className="dates">Week</div>
                                                    <div className="dates">Month</div>
                                                    <div className="dates">Year</div>
                                                </div>
                                                <div className="right">
                                                    <div className="ip-group icon">
                                                        <input type="text" id="datepicker3" className="ip-datepicker icon" placeholder="From Date" />
                                                    </div>
                                                    <div className="ip-group icon">
                                                        <input type="text" id="datepicker4" className="ip-datepicker icon" placeholder="To Date" />
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="chart-box">
                                                <canvas id="lineChart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3">
                                        <div className="widget-box-3 mess-box">
                                            <h6>Messages</h6>
                                            <span className="text-variant-1">No message</span>
                                        </div>
                                        <div className="widget-box-3 recent-box">
                                            <h6>Recent Reviews</h6>
                                            <div className="box-tes-item">
                                                <div className="box-avt d-flex align-items-center gap-12">
                                                    <div className="avatar avt-40 round">
                                                        <img src="images/avatar/avt-2.jpg" alt="avatar" />
                                                    </div>
                                                    <p>February 18, 2024</p>
                                                </div>
                                                <p className="note p-16">
                                                    The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
                                                </p>
                                                <ul className="list-star">
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                </ul>


                                            </div>
                                            <div className="box-tes-item">
                                                <div className="box-avt d-flex align-items-center gap-12">
                                                    <div className="avatar avt-40 round">
                                                        <img src="images/avatar/avt-2.jpg" alt="avatar" />
                                                    </div>
                                                    <p>February 18, 2024</p>
                                                </div>
                                                <p className="note p-16">
                                                    The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
                                                </p>
                                                <ul className="list-star">
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                </ul>


                                            </div>
                                            <div className="box-tes-item">
                                                <div className="box-avt d-flex align-items-center gap-12">
                                                    <div className="avatar avt-40 round">
                                                        <img src="images/avatar/avt-2.jpg" alt="avatar" />
                                                    </div>
                                                    <p>February 18, 2024</p>
                                                </div>
                                                <p className="note p-16">
                                                    The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
                                                </p>
                                                <ul className="list-star">
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                </ul>


                                            </div>
                                            <div className="box-tes-item">
                                                <div className="box-avt d-flex align-items-center gap-12">
                                                    <div className="avatar avt-40 round">
                                                        <img src="images/avatar/avt-2.jpg" alt="avatar" />
                                                    </div>
                                                    <p>February 18, 2024</p>
                                                </div>
                                                <p className="note p-16">
                                                    The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
                                                </p>
                                                <ul className="list-star">
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                </ul>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-dashboard">
                                <p className="text-variant-2">©2024 Homzen. All Rights Reserved.</p>
                            </div>
                            <div className="overlay-dashboard"></div>

                            <div className="progress-wrap">
                                <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '286.138' }}></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
