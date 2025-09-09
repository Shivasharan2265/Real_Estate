
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, use } from 'react';
import api from '../api/api';
import "./Myproperties.css"
import easy from "../assets/easy.png"
import toast from 'react-hot-toast';



const Myproperties = () => {
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
            label: 'Properties',
            className: 'Properties',
            onClick: () => navigate('/listing')
        },
        {
            label: 'Pages',
            className: 'dropdown2',
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
        fd.append("page", pageNum);   // ✅ append page
        fd.append("limit", limit);    // ✅ append limit

        try {
            setLoading(true);
            const response = await api.post("/properties/property", fd);

            if (response.data.success) {
                setProperties(response.data.data["My Property"] || []);

                // if API returns total count or total pages, set it here
                if (response.data.data.totalPages) {
                    setTotalPages(response.data.data.totalPages);
                }
            }
        } catch (error) {
            console.error("tax error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        myPropertyList(page);
    }, [page]);



    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };




    const [stats, setStats] = useState({
        active_properties: 0,
        pending_properties: 0,
        total_favorites: 0,
        total_inquiries: 0,
        total_properties: 0,
    });
    const [recentProperties, setRecentProperties] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    const dashboardList = async (from = "", to = "") => {
        const fd = new FormData();
        fd.append("programType", "userProfileDashboard");
        fd.append("authToken", localStorage.getItem("authToken"));

        if (from && to) {
            fd.append("fromDate", from);
            fd.append("toDate", to);
        }

        try {
            setLoading(true);
            const response = await api.post("/properties/property", fd);
            console.log("dashboard list ", response);

            if (response.data?.data?.dashboard_stats) {
                setStats(response.data.data.dashboard_stats);
            }
            if (response.data?.data?.recent_properties) {
                setRecentProperties(response.data.data.recent_properties);
            }
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setLoading(false);
        }
    };




    // Filter button handler
    const handleFilter = () => {
        if (!fromDate || !toDate) {
            toast.error("Please select both From Date and To Date");
            return;
        }
        dashboardList(fromDate, toDate);
    };

    useEffect(() => {
        dashboardList();
    }, []);


    const [showModal, setShowModal] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState([]);




    const handleInquiryClick = (inquiries) => {
        console.log("Inquiry Data:", inquiries); // ✅ Shows full inquiry data in console
        setSelectedInquiry(inquiries);
        setShowModal(true);
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
                                                <div className="logo"><a href="" onClick={(e) => { e.preventDefault(); navigate('/home'); }}><img src={easy} alt="logo" width="174" height="44" /></a></div>
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

                                                            <li className="Properties">
                                                                <a href="" onClick={(e) => { e.preventDefault(); navigate('/listing'); }}>Properties</a>
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
                                                                <a href="" onClick={(e) => { e.preventDefault(); navigate('/myprofile'); }}>My profile</a>
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
                                                    <p className="name" style={{ cursor: "pointer" }}> {name}<span className="icon icon-arr-down"></span></p>
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
                                                        <a className="dropdown-item" onClick={(e) => {
                                                            e.preventDefault();
                                                            localStorage.removeItem("authToken"); // clear token
                                                            navigate("/home"); // redirect after logout
                                                            window.location.reload(); // reload so header updates
                                                        }}>Logout</a>

                                                    </div>
                                                </div>
                                                <div className="flat-bt-top">
                                                    <a className="tf-btn primary" onClick={(e) => {
                                                        e.preventDefault();
                                                        // Navigate to add property if logged in
                                                        navigate("/addproperty");
                                                    }}>Add Property</a>                                                </div>
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
                                            <img src={easy} alt="nav-logo" width="174" height="44" />
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
                                            <a className="tf-btn primary" onClick={(e) => {
                                                e.preventDefault();
                                                // Navigate to add property if logged in
                                                navigate("/addproperty");
                                            }}>Add Property</a>                                        </div>
                                        <div className="mobi-icon-box">
                                            <div className="box d-flex align-items-center">
                                                <span className="icon icon-phone2"></span>
                                                <div>91-7411043895</div>
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
                                        <span className="icon icon-dashboard"></span> Dashboard
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
                                {/* <div className="button-show-hide show-mb" onClick={toggleDashboard}>
                                    <span className="body-1">Show Dashboard</span>
                                </div> */}
                                <div className="row">
                                    <div className="wd-filter" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                        <input
                                            type="date"
                                            id="datepicker1"
                                            className="ip-datepicker icon"
                                            placeholder="From Date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            style={{ width: "20ty0px", padding: "8px", borderRadius: "8px" }}
                                        />

                                        <input
                                            type="date"
                                            id="datepicker2"
                                            className="ip-datepicker icon"
                                            placeholder="To Date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                            style={{ width: "200px", padding: "8px", borderRadius: "8px" }}
                                        />

                                        <button
                                            type="button"
                                            className="tf-btn primary flex items-center gap-2"
                                            style={{ padding: "8px 16px", borderRadius: "8px", whiteSpace: "nowrap" }}
                                            onClick={handleFilter}
                                        >
                                            <i className="icon icon-filter"></i> Filter
                                        </button>
                                    </div>
                                </div>

                                <div className="widget-box-2 wd-listing mt-3">
                                    <h6 className="title">My Properties</h6>
                                    <div className="wrap-table">
                                        <div className="table-responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Date Published</th>
                                                        <th>Status</th>

                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {/* <tbody>
                                                    {loading ? (
                                                        // Show 3 skeleton rows while loading
                                                        [...Array(3)].map((_, idx) => (
                                                            <tr key={idx}>
                                                                <td>
                                                                    <div className="listing-box d-flex align-items-center">
                                                                        <div className="images skeleton-box" style={{ width: "80px", height: "60px" }}></div>
                                                                        <div className="content ms-2">
                                                                            <div className="skeleton-line" style={{ width: "150px", height: "14px" }}></div>
                                                                            <div className="skeleton-line mt-2" style={{ width: "100px", height: "12px" }}></div>
                                                                            <div className="skeleton-line mt-2" style={{ width: "80px", height: "12px" }}></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td><div className="skeleton-line" style={{ width: "100px", height: "12px" }}></div></td>
                                                                <td><div className="skeleton-line" style={{ width: "80px", height: "12px" }}></div></td>
                                                                <td><div className="skeleton-line" style={{ width: "50px", height: "12px" }}></div></td>
                                                                <td><div className="skeleton-line" style={{ width: "120px", height: "12px" }}></div></td>
                                                            </tr>
                                                        ))
                                                    ) : properties.length > 0 ? (
                                                        properties.map((property) => (
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
                                                                                <a href={`/property-details/${property.slug}`} className="link">
                                                                                    {property.title}
                                                                                </a>
                                                                            </div>
                                                                            <div className="text-date">{property.location}</div>
                                                                            <div className="text-1 fw-7">
                                                                                {property.listing_type === "rent"
                                                                                    ? `₹${property.expected_rent}`
                                                                                    : `₹${property.expected_price}`}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span>{new Date(property.created_at).toLocaleDateString()}</span>
                                                                </td>
                                                                <td>
                                                                    <div className="status-wrap">
                                                                        <a href="#" className="btn-status">
                                                                            {property.status === "active" ? "Published" : "Pending"}
                                                                        </a>
                                                                    </div>
                                                                </td>
                                                                <td><span>{property.featured ? "Yes" : "No"}</span></td>
                                                                <td>
                                                                    <ul className="list-action">
                                                                        <li><a className="item"><i className="icon icon-edit"></i>Edit</a></li>
                                                                        <li><a className="item"><i className="icon icon-sold"></i>Sold</a></li>
                                                                        <li><a className="remove-file item"><i className="icon icon-trash"></i>Delete</a></li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" style={{ textAlign: "center" }}>No properties found</td>
                                                        </tr>
                                                    )}
                                                </tbody> */}






                                                <tbody>
                                                    {loading ? (
                                                        Array.from({ length: 5 }).map((_, idx) => (
                                                            <tr key={idx} className="file-delete" style={{ minHeight: "100px" }}>
                                                                {/* Skeleton loader */}
                                                            </tr>
                                                        ))
                                                    ) : recentProperties.length > 0 ? (
                                                        recentProperties.map((property) => {
                                                            // Status handling
                                                            let statusLabel = "Pending";
                                                            if (property.property_status === 1) statusLabel = "Approved";
                                                            else if (property.property_status === 2) statusLabel = "Rejected";

                                                            // Date Published handling
                                                            const datePublished = property.approved_at
                                                                ? property.approved_at.split(" ")[0]
                                                                : "-----";

                                                            // Image handling
                                                            const defaultImg =
                                                                "https://themesflat.co/html/homzen/images/home/house-1.jpg";
                                                            const imageUrl = property.property_images
                                                                ? property.property_images
                                                                : defaultImg;

                                                            return (
                                                                <tr key={property.id} className="file-delete">
                                                                    <td>
                                                                        <div className="listing-box">
                                                                            <div
                                                                                className="images"
                                                                                style={{ cursor: "pointer" }}
                                                                                onClick={() => navigate(`/property/${property.id}`)}
                                                                            >
                                                                                <img src={imageUrl} alt={property.title} />
                                                                            </div>
                                                                            <div className="content">
                                                                                <div className="title">
                                                                                    <a href="#" className="link">
                                                                                        {property.title}
                                                                                    </a>
                                                                                </div>
                                                                                <div className="text-date">
                                                                                    <p className="fw-5">
                                                                                        <span className="fw-4 text-variant-1">Posting date:</span>{" "}
                                                                                        {property.created_at?.split(" ")[0]}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="text-1 fw-7">{property.property_type}</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>{datePublished}</td>
                                                                    <td>
                                                                        <div className="status-wrap">
                                                                            <a href="#" className="btn-status">
                                                                                {statusLabel}
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <ul className="list-action">
                                                                            <li>
                                                                                <a className="remove-file item btn-wrapper">
                                                                                    <button className="btn edit-btn">Edit</button>
                                                                                    <button
                                                                                        className="btn inquiry-btn"
                                                                                        onClick={() => handleInquiryClick(property.inquiry)}
                                                                                    >
                                                                                        Inquiry
                                                                                    </button>

                                                                                    <button className="btn review-btn">Review</button>
                                                                                </a>


                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={4} className="text-center">
                                                                No recent properties found.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                                



                                            </table>
                                        </div>
                                        <ul className="wd-navigation">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="nav-item"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(page - 1);
                                                    }}
                                                >
                                                    <i className="icon icon-arr-l"></i>
                                                </a>
                                            </li>

                                            {[...Array(totalPages)].map((_, index) => (
                                                <li key={index}>
                                                    <a
                                                        href="#"
                                                        className={`nav-item ${page === index + 1 ? "active" : ""}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handlePageChange(index + 1);
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </a>
                                                </li>
                                            ))}

                                            <li>
                                                <a
                                                    href="#"
                                                    className="nav-item"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePageChange(page + 1);
                                                    }}
                                                >
                                                    <i className="icon icon-arr-r"></i>
                                                </a>
                                            </li>
                                        </ul>

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

                        {showModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Inquiry Details</h3>

      {selectedInquiry && selectedInquiry.length > 0 ? (
        <ul>
          {selectedInquiry.map((inq) => (
            <li key={inq.id} className="inquiry-item">
              <p><strong>Name:</strong> {inq.name}</p>
              <p><strong>Email:</strong> {inq.email}</p>
              <p><strong>Phone:</strong> {inq.phone}</p>
              <p><strong>Message:</strong> {inq.message}</p>
              <p><strong>Status:</strong> {inq.status}</p>
              <p><strong>Date:</strong> {inq.created_at?.split(" ")[0] || "N/A"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No inquiries found for this property.</p>
      )}

      <div className="modal-actions">
        <button className="btn cancel-btn" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myproperties
