import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Modal, Slider } from 'antd'; // Import only for functionality, not styling!
import "./Listing.css";

const Listing = () => {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchList(page);
    }, [page]);

    const fetchList = async (pageNumber) => {
        setLoading(true);
        const fd = new FormData();
        fd.append("programType", "getProperties");
        fd.append("authToken", localStorage.getItem("authToken"));
        fd.append("page", pageNumber);
        fd.append("limit", limit);

        try {
            const response = await api.post("/properties/property", fd);
            const { properties, page, limit } = response.data.data;
            const mapped = properties.map((item) => {
                let priceValue = "N/A";
                let priceUnit = "";

                if (item.listing_type === "rent") {
                    priceValue = item.expected_rent && item.expected_rent !== "0.00"
                        ? item.expected_rent
                        : "N/A";
                    priceUnit = item.rent_period ? `/${item.rent_period}` : "/month";
                } else {
                    priceValue = item.expected_price && item.expected_price !== "0.00"
                        ? item.expected_price
                        : "N/A";
                }

                // dynamically prepare meta info
                const metaInfo = [];
                if (item.bedrooms) {
                    metaInfo.push({ icon: "icon-bed", label: `${item.bedrooms} Beds` });
                }
                if (item.bathrooms) {
                    metaInfo.push({ icon: "icon-bathtub", label: `${item.bathrooms} Baths` });
                }
                if (item.carpet_area) {
                    metaInfo.push({
                        icon: "icon-ruler",
                        label: `${item.carpet_area} ${item.carpet_area_unit || ""}`,
                    });
                }

                return {
                    id: item.id,
                    image: item.image_path,
                    name: item.title,
                    location: item.location,
                    featured: item.featured === 1,
                    for: item.listing_type,
                    type: item.property_type_id,
                    detailsUrl: `/property/${item.slug}`,
                    avatar: "/assets/images/default-agent.jpg",
                    agentName: item.customerName || "Agent",
                    priceValue,
                    priceUnit,
                    metaInfo,
                };
            });

            setProperties(mapped);

            // if API provides total count, compute totalPages
            if (response.data.data.total) {
                setTotalPages(Math.ceil(response.data.data.total / limit));
            } else {
                // fallback: stop if less results than limit
                setTotalPages(mapped.length < limit ? page : page + 1);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    // Property types for filtering
    const propertyTypes = [
        "Flat / Apartment",
        "Independent House / Villa",
        "Farmhouse",
        "Serviced Apartment",
        "1 RK / Studio Apartment",
        "Independent Floor",
        "Plot / Land",
        "Office",
        "Retail"
    ];

    // Advanced filter states (functionality only, NOT HomePage styling)
    const [selectedListingType, setSelectedListingType] = useState("rent");
    const [selectedType, setSelectedType] = useState("All");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [priceRange, setPriceRange] = useState([1000000, 10000000]);
    const [rentRange, setRentRange] = useState([5000, 50000]);
    const [selectedBHK, setSelectedBHK] = useState('');
    const [selectedBathroom, setSelectedBathroom] = useState("");

    const handleOpenAdvanced = () => setShowAdvanced(true);
    const handleCloseAdvanced = () => setShowAdvanced(false);

    // Skeleton card for loading
    const SkeletonCard = () => (
        <div className="col-md-12">
            <div className="homeya-box list-style-1 list-style-2">
                <div className="images-group">
                    <div className="images-style skeleton" style={{ height: "200px" }}></div>
                </div>
                <div className="content p-3">
                    <div className="skeleton mb-2" style={{ height: "20px", width: "60%" }}></div>
                    <div className="skeleton mb-2" style={{ height: "15px", width: "40%" }}></div>
                    <div className="skeleton" style={{ height: "15px", width: "80%" }}></div>
                </div>
            </div>
        </div>
    );


    return (

        <div>
            <Header />
            <section className="flat-section-v6 flat-recommended flat-sidebar">
                <div className="container">
                    <div className="box-title-listing">
                        <h5>Property listing</h5>
                        <div className="box-filter-tab">
                            <ul className="nav-tab-filter" role="tablist">
                                <li className="nav-tab-item" role="presentation">
                                    <a href="#gridLayout" className="nav-link-item" data-bs-toggle="tab"><i className="icon icon-grid"></i></a>
                                </li>
                                <li className="nav-tab-item" role="presentation">
                                    <a href="#listLayout" className="nav-link-item active" data-bs-toggle="tab"><i className="icon icon-list"></i></a>
                                </li>
                            </ul>
                            {/* <div className="nice-select list-page" tabindex="0"><span className="current">12 Per Page</span>
                                <ul className="list">
                                    <li data-value="1" className="option">10 Per Page</li>
                                    <li data-value="2" className="option">11 Per Page</li>
                                    <li data-value="3" className="option selected">12 Per Page</li>
                                </ul>
                            </div> */}
                            <div className="nice-select list-sort" tabindex="0"><span className="current">Sort by (Default)</span>
                                <ul className="list">
                                    <li data-value="default" className="option selected">Sort by (Default)</li>
                                    <li data-value="new" className="option">Newest</li>
                                    <li data-value="old" className="option">Oldest</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="widget-sidebar fixed-sidebar">
                                <div className="flat-tab flat-tab-form widget-filter-search widget-box bg-surface mb-4" style={{ background: "#E8E8E8" }}>
                                    <div className="h7 title fw-7">Search</div>
                                    <ul className="nav-tab-form" role="tablist">
                                        <li className="nav-tab-item">
                                            <a
                                                href="#forRent"
                                                className={`nav-link-item ${selectedListingType === "rent" ? "active" : ""}`}
                                                onClick={e => { e.preventDefault(); setSelectedListingType("rent"); setSelectedType("All"); }}
                                            >For Rent</a>
                                        </li>
                                        <li className="nav-tab-item">
                                            <a
                                                href="#forSale"
                                                className={`nav-link-item ${selectedListingType === "sale" ? "active" : ""}`}
                                                onClick={e => { e.preventDefault(); setSelectedListingType("sale"); setSelectedType("All"); }}
                                            >For Sale</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade active show" role="tabpanel">
                                            <div className="form-sl">
                                                <form method="post">
                                                    <div className="wd-filter-select">
                                                        <div className="inner-group inner-filter">
                                                            <div className="form-style">
                                                                <label className="title-select">Keyword</label>
                                                                <input type="text" className="form-control" placeholder="Search Keyword." required="" />
                                                            </div>
                                                            <div className="form-group-2 form-style">
                                                                <label>Location</label>
                                                                <div className="group-select">
                                                                    <div className="nice-select" tabIndex="0">
                                                                        <span className="current">Select Location</span>
                                                                        <ul className="list">

                                                                            <li data-value="india" className="option">India</li>
                                                                            <li data-value="dubai" className="option">Dubai</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="form-style">
                                                                <label className="title-select">Type</label>
                                                                <div className="group-select">
                                                                    <div className="nice-select" tabIndex="0">
                                                                        <span className="current">{selectedType}</span>
                                                                        <ul className="list">
                                                                            <li
                                                                                className={`option ${selectedType === "All" ? "selected" : ""}`}
                                                                                onClick={() => setSelectedType("All")}
                                                                            >All</li>
                                                                            {propertyTypes.map(type => (
                                                                                <li
                                                                                    key={type}
                                                                                    className={`option ${selectedType === type ? "selected" : ""}`}
                                                                                    onClick={() => setSelectedType(type)}
                                                                                >{type}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* REMOVE rooms, bathrooms, bedrooms dropdowns here */}
                                                            <div className="form-style btn-show-advanced">
                                                                <a className="filter-advanced pull-right" onClick={handleOpenAdvanced} style={{ cursor: "pointer" }}>
                                                                    <span className="icon icon-faders"></span>
                                                                    <span className="text-advanced">Show Advanced</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="tf-btn primary" href="#">Find Properties</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Advanced Filter Modal - functionality only! */}
                                <Modal
                                    title={<h5 style={{ margin: 0, fontWeight: 600, color: "#333" }}>Advanced Filters</h5>}
                                    open={showAdvanced}
                                    onCancel={handleCloseAdvanced}
                                    footer={null}
                                    centered
                                    bodyStyle={{ padding: "20px 24px" }}
                                    width="90%"
                                    style={{ maxWidth: "600px" }}
                                >
                                    {selectedListingType === "rent" ? (
                                        <div style={{ marginBottom: "25px" }}>
                                            <h6>Rent Range</h6>
                                            <Slider
                                                range
                                                min={0}
                                                max={200000}
                                                step={1000}
                                                value={rentRange}
                                                onChange={setRentRange}
                                            />
                                            <div>
                                                <span>₹{rentRange[0]}</span> - <span>₹{rentRange[1]}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ marginBottom: "25px" }}>
                                            <h6>Price Range</h6>
                                            <Slider
                                                range
                                                min={0}
                                                max={50000000}
                                                step={50000}
                                                value={priceRange}
                                                onChange={setPriceRange}
                                            />
                                            <div>
                                                <span>₹{priceRange[0]}</span> - <span>₹{priceRange[1]}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Property type conditionals */}
                                    {["Flat / Apartment", "Independent House / Villa", "Farmhouse", "Serviced Apartment", "1 RK / Studio Apartment", "Independent Floor"].includes(selectedType) && (
                                        <>
                                            <div style={{ marginBottom: "20px" }}>
                                                <h6>BHK Type</h6>
                                                {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map(bhk => (
                                                    <button
                                                        key={bhk}
                                                        type="button"
                                                        style={{
                                                            marginRight: "10px",
                                                            background: selectedBHK === bhk ? "#EC2126" : "#fff",
                                                            color: selectedBHK === bhk ? "#fff" : "#333",
                                                            border: selectedBHK === bhk ? "2px solid #EC2126" : "1px solid #ccc",
                                                            borderRadius: "20px",
                                                            padding: "8px 16px",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() => setSelectedBHK(bhk)}
                                                    >{bhk}</button>
                                                ))}
                                            </div>
                                            <div>
                                                <h6>Bathrooms</h6>
                                                {["1", "2", "3", "4", "4+"].map(bath => (
                                                    <button
                                                        key={bath}
                                                        type="button"
                                                        style={{
                                                            marginRight: "10px",
                                                            background: selectedBathroom === bath ? "#EC2126" : "#fff",
                                                            color: selectedBathroom === bath ? "#fff" : "#333",
                                                            border: selectedBathroom === bath ? "2px solid #EC2126" : "1px solid #ccc",
                                                            borderRadius: "20px",
                                                            padding: "8px 16px",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() => setSelectedBathroom(bath)}
                                                    >{bath}</button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {selectedType === "Plot / Land" && (
                                        <div>
                                            <h6>Plot Size</h6>
                                            <Slider range min={500} max={10000} step={100} defaultValue={[1000, 5000]} />
                                            <h6>Facing</h6>
                                            {["East", "West", "North", "South"].map(dir => (
                                                <button key={dir} type="button" style={{ marginRight: "10px" }}>{dir}</button>
                                            ))}
                                        </div>
                                    )}
                                    {(selectedType === "Office" || selectedType === "Retail") && (
                                        <div>
                                            <h6>Carpet Area (sq.ft)</h6>
                                            <Slider range min={200} max={10000} step={100} defaultValue={[500, 5000]} />
                                        </div>
                                    )}

                                    {/* Apply Filters Button */}
                                    <div style={{ textAlign: "right", marginTop: "25px" }}>
                                        <button
                                            type="button"
                                            onClick={handleCloseAdvanced}
                                            style={{
                                                padding: "10px 24px",
                                                borderRadius: "25px",
                                                background: "#EC2126",
                                                color: "#fff",
                                                fontWeight: 600,
                                                border: "none",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                </Modal>

                                {/* Property Cards Section */}

                                {/* <div className="widget-box bg-surface box-latest-property">
                                    <div className="h7 fw-7 title">Latest Properties</div>
                                    <ul>
                                        {latest.map((property) => (
                                            <li key={property.id} className="latest-property-item">
                                                <Link to={`/property/${item.id}`} className="images-style">
                                                    <img src={property.image} alt="img" />
                                                </Link>

                                                <div className="content">
                                                    <div className="h7 text-capitalize fw-7">
                                                        <a className="link">
                                                            {property.name}
                                                        </a>
                                                    </div>
                                                    <ul className="meta-list">
                                                        <li className="item">
                                                            <span>Bed:</span>
                                                            <span className="fw-7">{property.beds}</span>
                                                        </li>
                                                        <li className="item">
                                                            <span>Bath:</span>
                                                            <span className="fw-7">{property.baths}</span>
                                                        </li>
                                                        <li className="item">
                                                            <span className="fw-7">{property.size}</span>
                                                        </li>
                                                    </ul>
                                                    <div className="d-flex align-items-center">
                                                        <div className="h7 fw-7">${property.priceValue}</div>
                                                        <span className="text-variant-1">{property.priceUnit}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div> */}

                            </div>

                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="tab-content">
                                <div className="tab-pane fade" id="gridLayout" role="tabpanel">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="homeya-box">
                                                <div className="archive-top">
                                                    <a href="property-details-v1.html" className="images-group">
                                                        <div className="images-style">
                                                            <img src="images/home/house-1.jpg" alt="img" />
                                                        </div>
                                                        <div className="top">
                                                            <ul className="d-flex gap-8">
                                                                <li className="flag-tag success">Featured</li>
                                                                <li className="flag-tag style-1">For Sale</li>
                                                            </ul>
                                                            <ul className="d-flex gap-4">
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-arrLeftRight"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-heart"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-eye"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bottom">
                                                            <span className="flag-tag style-2">Studio</span>
                                                        </div>
                                                    </a>
                                                    <div className="content">
                                                        <div className="h7 text-capitalize fw-7"><a href="property-details-v1.html" className="link"> Casa Lomas de Machalí Machashey</a></div>
                                                        <div className="desc"><i className="fs-16 icon icon-mapPin"></i><p>33 Maple Street, San Francisco, California</p> </div>
                                                        <ul className="meta-list">
                                                            <li className="item">
                                                                <i className="icon icon-bed"></i>
                                                                <span>3</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-bathtub"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-ruler"></i>
                                                                <span>600 SqFT</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src="images/avatar/avt-6.jpg" alt="avt" />
                                                        </div>
                                                        <span>Arlene McCoy</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>$7250,00</h6>
                                                        <span className="text-variant-1">/SqFT</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="homeya-box">
                                                <div className="archive-top">
                                                    <a href="property-details-v1.html" className="images-group">
                                                        <div className="images-style">
                                                            <img src="images/home/house-2.jpg" alt="img" />
                                                        </div>
                                                        <div className="top">
                                                            <ul className="d-flex gap-8">
                                                                <li className="flag-tag success">Featured</li>
                                                                <li className="flag-tag style-1">For Sale</li>
                                                            </ul>
                                                            <ul className="d-flex gap-4">
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-arrLeftRight"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-heart"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-eye"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bottom">
                                                            <span className="flag-tag style-2">Apartment</span>
                                                        </div>
                                                    </a>
                                                    <div className="content">
                                                        <div className="h7 text-capitalize fw-7"><a href="property-details-v1.html" className="link">Villa del Mar Retreat, Malibu</a></div>
                                                        <div className="desc"><i className="fs-16 icon icon-mapPin"></i><p>72 Sunset Avenue, Los Angeles, California</p> </div>
                                                        <ul className="meta-list">
                                                            <li className="item">
                                                                <i className="icon icon-bed"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-bathtub"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-ruler"></i>
                                                                <span>600 SqFT</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src="images/avatar/avt-7.jpg" alt="avt" />
                                                        </div>
                                                        <span>Annette Black</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>$250,00</h6>
                                                        <span className="text-variant-1">/month</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="homeya-box">
                                                <div className="archive-top">
                                                    <a href="property-details-v1.html" className="images-group">
                                                        <div className="images-style">
                                                            <img src="images/home/house-3.jpg" alt="img" />
                                                        </div>
                                                        <div className="top">
                                                            <ul className="d-flex gap-8">
                                                                <li className="flag-tag success">Featured</li>
                                                                <li className="flag-tag style-1">For Sale</li>
                                                            </ul>
                                                            <ul className="d-flex gap-4">
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-arrLeftRight"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-heart"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-eye"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bottom">
                                                            <span className="flag-tag style-2">Villa</span>
                                                        </div>
                                                    </a>
                                                    <div className="content">
                                                        <div className="h7 text-capitalize fw-7"><a href="property-details-v1.html" className="link">Rancho Vista Verde, Santa Barbara</a></div>
                                                        <div className="desc"><i className="fs-16 icon icon-mapPin"></i><p>33 Maple Street, San Francisco, California</p> </div>
                                                        <ul className="meta-list">
                                                            <li className="item">
                                                                <i className="icon icon-bed"></i>
                                                                <span>4</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-bathtub"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-ruler"></i>
                                                                <span>600 SqFT</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src="images/avatar/avt-5.jpg" alt="avt" />
                                                        </div>
                                                        <span>Ralph Edwards</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>$5050,00</h6>
                                                        <span className="text-variant-1">/SqFT</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="homeya-box">
                                                <div className="archive-top">
                                                    <a href="property-details-v1.html" className="images-group">
                                                        <div className="images-style">
                                                            <img src="images/home/house-4.jpg" alt="img" />
                                                        </div>
                                                        <div className="top">
                                                            <ul className="d-flex gap-8">
                                                                <li className="flag-tag success">Featured</li>
                                                                <li className="flag-tag style-1">For Sale</li>
                                                            </ul>
                                                            <ul className="d-flex gap-4">
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-arrLeftRight"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-heart"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-eye"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bottom">
                                                            <span className="flag-tag style-2">House</span>
                                                        </div>
                                                    </a>
                                                    <div className="content">
                                                        <div className="h7 text-capitalize fw-7"><a href="property-details-v1.html" className="link">Sunset Heights Estate, Beverly Hills</a></div>
                                                        <div className="desc"><i className="fs-16 icon icon-mapPin"></i><p>1040 Ocean, Santa Monica, California</p> </div>
                                                        <ul className="meta-list">
                                                            <li className="item">
                                                                <i className="icon icon-bed"></i>
                                                                <span>3</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-bathtub"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-ruler"></i>
                                                                <span>600 SqFT</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src="images/avatar/avt-8.jpg" alt="avt" />
                                                        </div>
                                                        <span>Jacob Jones</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>$250,00</h6>
                                                        <span className="text-variant-1">/month</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="homeya-box">
                                                <div className="archive-top">
                                                    <a href="property-details-v1.html" className="images-group">
                                                        <div className="images-style">
                                                            <img src="images/home/house-5.jpg" alt="img" />
                                                        </div>
                                                        <div className="top">
                                                            <ul className="d-flex gap-8">
                                                                <li className="flag-tag success">Featured</li>
                                                                <li className="flag-tag style-1">For Sale</li>
                                                            </ul>
                                                            <ul className="d-flex gap-4">
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-arrLeftRight"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-heart"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-eye"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bottom">
                                                            <span className="flag-tag style-2">Office</span>
                                                        </div>
                                                    </a>
                                                    <div className="content">
                                                        <div className="h7 text-capitalize fw-7"><a href="property-details-v1.html" className="link">Coastal Serenity Cottage</a></div>
                                                        <div className="desc"><i className="fs-16 icon icon-mapPin"></i><p>21 Hillside Drive, Beverly Hills, California</p> </div>
                                                        <ul className="meta-list">
                                                            <li className="item">
                                                                <i className="icon icon-bed"></i>
                                                                <span>4</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-bathtub"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-ruler"></i>
                                                                <span>600 SqFT</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src="images/avatar/avt-9.jpg" alt="avt" />
                                                        </div>
                                                        <span>Kathryn Murphy</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>$7250,00</h6>
                                                        <span className="text-variant-1">/SqFT</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="homeya-box">
                                                <div className="archive-top">
                                                    <a href="property-details-v1.html" className="images-group">
                                                        <div className="images-style">
                                                            <img src="images/home/house-6.jpg" alt="img" />
                                                        </div>
                                                        <div className="top">
                                                            <ul className="d-flex gap-8">
                                                                <li className="flag-tag success">Featured</li>
                                                                <li className="flag-tag style-1">For Sale</li>
                                                            </ul>
                                                            <ul className="d-flex gap-4">
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-arrLeftRight"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-heart"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-eye"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bottom">
                                                            <span className="flag-tag style-2">Studio</span>
                                                        </div>
                                                    </a>
                                                    <div className="content">
                                                        <div className="h7 text-capitalize fw-7"><a href="property-details-v1.html" className="link">Lakeview Haven, Lake Tahoe</a></div>
                                                        <div className="desc"><i className="fs-16 icon icon-mapPin"></i><p>8 Broadway, Brooklyn, New York</p> </div>
                                                        <ul className="meta-list">
                                                            <li className="item">
                                                                <i className="icon icon-bed"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-bathtub"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-ruler"></i>
                                                                <span>600 SqFT</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src="images/avatar/avt-6.jpg" alt="avt" />
                                                        </div>
                                                        <span>Floyd Miles</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>$250,00</h6>
                                                        <span className="text-variant-1">/SqFT</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="homeya-box">
                                                <div className="archive-top">
                                                    <a href="property-details-v1.html" className="images-group">
                                                        <div className="images-style">
                                                            <img src="images/home/house-11.jpg" alt="img" />
                                                        </div>
                                                        <div className="top">
                                                            <ul className="d-flex gap-8">
                                                                <li className="flag-tag success">Featured</li>
                                                                <li className="flag-tag style-1">For Sale</li>
                                                            </ul>
                                                            <ul className="d-flex gap-4">
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-arrLeftRight"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-heart"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-eye"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bottom">
                                                            <span className="flag-tag style-2">Apartment</span>
                                                        </div>
                                                    </a>
                                                    <div className="content">
                                                        <div className="h7 text-capitalize fw-7"><a href="property-details-v1.html" className="link">Sunset Heights Estate, Beverly Hills</a></div>
                                                        <div className="desc"><i className="fs-16 icon icon-mapPin"></i><p>1040 Ocean, Santa Monica, California</p> </div>
                                                        <ul className="meta-list">
                                                            <li className="item">
                                                                <i className="icon icon-bed"></i>
                                                                <span>3</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-bathtub"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-ruler"></i>
                                                                <span>600 SqFT</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src="images/avatar/avt-8.jpg" alt="avt" />
                                                        </div>
                                                        <span>Jacob Jones</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>$250,00</h6>
                                                        <span className="text-variant-1">/month</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="homeya-box">
                                                <div className="archive-top">
                                                    <a href="property-details-v1.html" className="images-group">
                                                        <div className="images-style">
                                                            <img src="images/home/house-12.jpg" alt="img" />
                                                        </div>
                                                        <div className="top">
                                                            <ul className="d-flex gap-8">
                                                                <li className="flag-tag success">Featured</li>
                                                                <li className="flag-tag style-1">For Sale</li>
                                                            </ul>
                                                            <ul className="d-flex gap-4">
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-arrLeftRight"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-heart"></span>
                                                                </li>
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-eye"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bottom">
                                                            <span className="flag-tag style-2">Villa</span>
                                                        </div>
                                                    </a>
                                                    <div className="content">
                                                        <div className="h7 text-capitalize fw-7"><a href="property-details-v1.html" className="link">Coastal Serenity Cottage</a></div>
                                                        <div className="desc"><i className="fs-16 icon icon-mapPin"></i><p>21 Hillside Drive, Beverly Hills, California</p> </div>
                                                        <ul className="meta-list">
                                                            <li className="item">
                                                                <i className="icon icon-bed"></i>
                                                                <span>4</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-bathtub"></i>
                                                                <span>2</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-ruler"></i>
                                                                <span>600 SqFT</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src="images/avatar/avt-12.jpg" alt="avt" />
                                                        </div>
                                                        <span>Kathryn Murphy</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>$2050,00</h6>
                                                        <span className="text-variant-1">/SqFT</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <ul className="wd-navigation">
                                        <li><a href="#" className="nav-item active">1</a></li>
                                        <li><a href="#" className="nav-item">2</a></li>
                                        <li><a href="#" className="nav-item">3</a></li>
                                        <li><a href="#" className="nav-item"><i className="icon icon-arr-r"></i></a></li>
                                    </ul> */}
                                </div>
                                <div
                                    className="tab-pane fade active show"
                                    id="listLayout"
                                    role="tabpanel"
                                >
                                    <div className="row">
                                        {loading
                                            ? [...Array(limit)].map((_, i) => <SkeletonCard key={i} />)
                                            : properties.map((property) => (
                                                <div className="col-md-12" key={property.id}>
                                                    <div className="homeya-box list-style-1 list-style-2">
                                                        <Link to={`/property/${property.id}`} className="images-group">
                                                            <div className="images-style">
                                                                <img
                                                                    src={
                                                                        property.image
                                                                            ? `${api.imageUrl}/${property.image}`
                                                                            : "https://themesflat.co/html/homzen/images/home/house-2.jpg"
                                                                    }
                                                                    alt={property.name}
                                                                    style={{
                                                                        width: "100%",       // full width of container
                                                                        height: "220px",     // fixed height
                                                                        objectFit: "cover",  // crops instead of stretching
                                                                        borderRadius: "8px", // optional rounded corners
                                                                    }}
                                                                />

                                                            </div>
                                                            <div className="top">
                                                                <ul className="d-flex gap-4 flex-wrap">
                                                                    <li className="flag-tag style-1">{property.for}</li>
                                                                </ul>
                                                            </div>
                                                            <div className="bottom">
                                                                <span className="flag-tag style-2">
                                                                    {property.type}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                        <div className="content" onClick={() => navigate(`/property/${property.id}`)}>
                                                            <div className="archive-top">
                                                                <div className="h7 text-capitalize fw-7">
                                                                    {property.name}
                                                                </div>
                                                                <div className="desc">
                                                                    <i className="fs-16 icon icon-mapPin"></i>
                                                                    <p>{property.location}</p>
                                                                </div>
                                                                <ul className="meta-list">
                                                                    {property.metaInfo.map((meta, i) => (
                                                                        <li className="item" key={i}>
                                                                            <i className={`icon ${meta.icon}`}></i>{" "}
                                                                            <span>{meta.label}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>

                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center archive-bottom">
                                                                <div className="d-flex gap-8 align-items-center">
                                                                    <div className="avatar avt-40 round">
                                                                        <img
                                                                            src="https://themesflat.co/html/homzen/images/avatar/avt-9.jpg"
                                                                            alt="avt"
                                                                        />
                                                                    </div>
                                                                    <span>{property.agentName}</span>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="h7 fw-7">
                                                                        ₹{property.priceValue}
                                                                    </div>
                                                                    <span className="text-variant-1">
                                                                        {property.priceUnit}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Pagination */}
                                    <ul className="justify-content-center wd-navigation">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i}>
                                                <button
                                                    style={{ border: "none" }}
                                                    onClick={() => setPage(i + 1)}
                                                    className={`nav-item ${page === i + 1 ? "active" : ""}`}
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                style={{ border: "none" }}
                                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                                className="nav-item"
                                            >
                                                <i className="icon icon-arr-r"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </section>


            <div className="progress-wrap">
                <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '286.138' }}></path>
                </svg>
            </div>
            < Footer />
        </div>

    )
}

export default Listing
