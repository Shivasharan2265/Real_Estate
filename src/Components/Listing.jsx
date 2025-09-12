import React, { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import "./Listing.css"



const Listing = () => {
    const [properties, setProperties] = useState([]);
    const [latest, setLatest] = useState([]);

    const navigate = useNavigate()

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);


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
            console.log("API Response:", response);

            const { properties, page, limit } = response.data.data;
            const mapped = properties.map((item) => {
                let priceValue = "N/A";
                let priceUnit = "";

                if (item.listing_type === "rent") {
                    priceValue =
                        item.expected_rent && item.expected_rent !== "0.00"
                            ? item.expected_rent
                            : "N/A";
                    priceUnit = item.rent_period ? `/${item.rent_period}` : "/month";
                } else {
                    priceValue =
                        item.expected_price && item.expected_price !== "0.00"
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
                // if (item.property_type_id) {
                //     metaInfo.push({ icon: "icon-home", label: item.property_type_id });
                // }

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
                    metaInfo, // attach here
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

    // Skeleton component
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
                        <h5 >Property listing</h5>
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
                                <div className="flat-tab flat-tab-form widget-filter-search widget-box bg-surface">
                                    <div className="h7 title fw-7">Search</div>
                                    <ul className="nav-tab-form" role="tablist">
                                        <li className="nav-tab-item" role="presentation">
                                            <a href="#forRent" className="nav-link-item active" data-bs-toggle="tab">For Rent</a>
                                        </li>
                                        <li className="nav-tab-item" role="presentation">
                                            <a href="#forSale" className="nav-link-item" data-bs-toggle="tab">For Sale</a>
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
                                                            <div className="form-style">
                                                                <label className="title-select">Location</label>
                                                                <div className="group-ip ip-icon">
                                                                    <input type="text" className="form-control" placeholder="Search Location" required="" />
                                                                    <a href="#" className="icon-right icon-location"></a>
                                                                </div>
                                                            </div>
                                                            <div className="form-style">
                                                                <label className="title-select">Type</label>
                                                                <div className="group-select">
                                                                    <div className="nice-select" tabindex="0"><span className="current">All</span>
                                                                        <ul className="list">
                                                                            <li data-value className="option selected">All</li>
                                                                            <li data-value="villa" className="option">Villa</li>
                                                                            <li data-value="studio" className="option">Studio</li>
                                                                            <li data-value="office" className="option">Office</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-style box-select">
                                                                <label className="title-select">Rooms</label>
                                                                <div className="nice-select" tabindex="0"><span className="current">2</span>
                                                                    <ul className="list">
                                                                        <li data-value="2" className="option">1</li>
                                                                        <li data-value="2" className="option selected">2</li>
                                                                        <li data-value="3" className="option">3</li>
                                                                        <li data-value="4" className="option">4</li>
                                                                        <li data-value="5" className="option">5</li>
                                                                        <li data-value="6" className="option">6</li>
                                                                        <li data-value="7" className="option">7</li>
                                                                        <li data-value="8" className="option">8</li>
                                                                        <li data-value="9" className="option">9</li>
                                                                        <li data-value="10" className="option">10</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="form-style box-select">
                                                                <label className="title-select">Bathrooms</label>
                                                                <div className="nice-select" tabindex="0"><span className="current">4</span>
                                                                    <ul className="list">
                                                                        <li data-value="all" className="option">All</li>
                                                                        <li data-value="1" className="option">1</li>
                                                                        <li data-value="2" className="option">2</li>
                                                                        <li data-value="3" className="option">3</li>
                                                                        <li data-value="4" className="option selected">4</li>
                                                                        <li data-value="5" className="option">5</li>
                                                                        <li data-value="6" className="option">6</li>
                                                                        <li data-value="7" className="option">7</li>
                                                                        <li data-value="8" className="option">8</li>
                                                                        <li data-value="9" className="option">9</li>
                                                                        <li data-value="10" className="option">10</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="form-style box-select">
                                                                <label className="title-select">Bedrooms</label>
                                                                <div className="nice-select" tabindex="0"><span className="current">4</span>
                                                                    <ul className="list">
                                                                        <li data-value="1" className="option">All</li>
                                                                        <li data-value="1" className="option">1</li>
                                                                        <li data-value="2" className="option">2</li>
                                                                        <li data-value="3" className="option">3</li>
                                                                        <li data-value="4" className="option selected">4</li>
                                                                        <li data-value="5" className="option">5</li>
                                                                        <li data-value="6" className="option">6</li>
                                                                        <li data-value="7" className="option">7</li>
                                                                        <li data-value="8" className="option">8</li>
                                                                        <li data-value="9" className="option">9</li>
                                                                        <li data-value="10" className="option">10</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            {/* <div className="form-style widget-price">
                                                                <div className="box-title-price">
                                                                    <span className="title-price">Price Range</span>
                                                                    <div className="caption-price">
                                                                        <span>fromx</span>
                                                                        <span id="slider-range-value1" className="fw-7"></span>
                                                                        <span>to</span>
                                                                        <span id="slider-range-value2" className="fw-7"></span>
                                                                    </div>
                                                                </div>
                                                                <div id="slider-range"></div>
                                                                <div className="slider-labels">
                                                                    <input type="hidden" name="min-value" value="" />
                                                                    <input type="hidden" name="max-value" value="" />
                                                                </div>
                                                            </div> */}
                                                            {/* <div className="form-style widget-price wd-price-2">
                                                                <div className="box-title-price">
                                                                    <span className="title-price">Size Range</span>
                                                                    <div className="caption-price">
                                                                        <span>from</span>
                                                                        <span id="slider-range-value01" className="fw-7"></span>
                                                                        <span>to</span>
                                                                        <span id="slider-range-value02" className="fw-7"></span>
                                                                    </div>
                                                                </div>
                                                                <div id="slider-range2"></div>
                                                                <div className="slider-labels">
                                                                    <input type="hidden" name="min-value2" value="" />
                                                                    <input type="hidden" name="max-value2" value="" />
                                                                </div>
                                                            </div> */}
                                                            <div className="form-style btn-show-advanced">
                                                                <a className="filter-advanced pull-right">
                                                                    <span className="icon icon-faders"></span>
                                                                    <span className="text-advanced">Show Advanced</span>
                                                                </a>
                                                            </div>
                                                            <div className="form-style wd-amenities">
                                                                <div className="group-checkbox">
                                                                    <div className="text-1">Amenities:</div>
                                                                    <div className="group-amenities">
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb1" checked />
                                                                            <label for="cb1" className="text-cb-amenities">Air Condition</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb2" />
                                                                            <label for="cb2" className="text-cb-amenities">Disabled Access</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb3" />
                                                                            <label for="cb3" className="text-cb-amenities">Ceiling Height</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb4" checked />
                                                                            <label for="cb4" className="text-cb-amenities">Floor</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb5" />
                                                                            <label for="cb5" className="text-cb-amenities">Heating</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb6" />
                                                                            <label for="cb6" className="text-cb-amenities">Renovation</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb7" />
                                                                            <label for="cb7" className="text-cb-amenities">Window Type</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb8" />
                                                                            <label for="cb8" className="text-cb-amenities">Cable TV</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb9" checked />
                                                                            <label for="cb9" className="text-cb-amenities">Elevator</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb10" />
                                                                            <label for="cb10" className="text-cb-amenities">Furnishing</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb11" />
                                                                            <label for="cb11" className="text-cb-amenities">Intercom</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb12" />
                                                                            <label for="cb12" className="text-cb-amenities">Security</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb13" />
                                                                            <label for="cb13" className="text-cb-amenities">Search property</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb14" />
                                                                            <label for="cb14" className="text-cb-amenities">Ceiling Height</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb15" />
                                                                            <label for="cb15" className="text-cb-amenities">Fence</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb16" />
                                                                            <label for="cb16" className="text-cb-amenities">Fence</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb17" checked />
                                                                            <label for="cb17" className="text-cb-amenities">Garage</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb18" />
                                                                            <label for="cb18" className="text-cb-amenities">Parking</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb19" />
                                                                            <label for="cb19" className="text-cb-amenities">Swimming Pool</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb20" />
                                                                            <label for="cb20" className="text-cb-amenities">Construction Year</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb21" />
                                                                            <label for="cb21" className="text-cb-amenities">Fireplace</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb22" />
                                                                            <label for="cb22" className="text-cb-amenities">Garden</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb23" />
                                                                            <label for="cb23" className="text-cb-amenities">Pet Friendly</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb24" />
                                                                            <label for="cb24" className="text-cb-amenities">WiFi</label>
                                                                        </fieldset>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="form-style btn-hide-advanced">
                                                                <a className="filter-advanced pull-right">
                                                                    <span className="icon icon-faders"></span>
                                                                    <span className="text-advanced">Hide Advanced</span>
                                                                </a>
                                                            </div>
                                                            <div className="form-style">
                                                                <button type="submit" className="tf-btn primary" href="#">Find Properties</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
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
