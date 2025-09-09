import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import "./HomePage.css"




const HomePage = () => {
    const [bannerUrl, setBannerUrl] = useState(""); // state for dynamic banner
    const [popupBanner, setPopupBanner] = useState(""); // state for dynamic banner
    const [stickyBanner, setStickyBanner] = useState(""); // state for dynamic banner

    const [footerBannerUrl, setFooterBannerUrl] = useState(""); // state for footer banner
    const [offset, setOffset] = useState(307.919); // full length (hidden)
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("View All"); // keep track of which tab is clicked
    const navigate = useNavigate()
    const [bannersLoading, setBannersLoading] = useState(true); // 👈 new state
    const [showPopup, setShowPopup] = useState(false);

    const [showSticky, setShowSticky] = useState(false);

    const authToken = localStorage.getItem("authToken") || "Guest";
    localStorage.setItem("authToken", authToken);

    useEffect(() => {
        if (popupBanner) {
            const hasSeenPopup = localStorage.getItem("hasSeenPopup");

            if (!hasSeenPopup) {
                const timer = setTimeout(() => {
                    setShowPopup(true);
                    localStorage.setItem("hasSeenPopup", "true"); // mark as shown
                }, 10000);

                return () => clearTimeout(timer);
            }
        }
    }, [popupBanner]);

    useEffect(() => {
        if (stickyBanner) {
            const hasSeenSticky = localStorage.getItem("hasSeenSticky");

            if (!hasSeenSticky) {
                setShowSticky(true);
                localStorage.setItem("hasSeenSticky", "true"); // mark as shown
            }
        }
    }, [stickyBanner]);






    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => {
            setOffset(286.138); // target value
        }, 100); // small delay so animation is visible
        return () => clearTimeout(timer);
    }, []);
    const [home, setHome] = useState({

        amenities: [],
        properties: [],
        agents: [],
        testimonials: [],
        blogs: []
    });


    // 👇 runs whenever activeTab changes
    useEffect(() => {
        fetchList(activeTab);
    }, [activeTab]);

    const fetchList = async (tab) => {
        setLoading(true);

        const fd = new FormData();
        fd.append("programType", "getProperties");
        fd.append("authToken", authToken);

        // send filter if not "View All"
        if (tab && tab !== "View All") {
            fd.append("propertyType", tab.toLowerCase());
            // adjust key ("propertyType") depending on your backend
        }

        try {
            const response = await api.post("/properties/property", fd);
            console.log("rr")

            const mapped = response.data.data.properties.map((item) => {
                let priceValue = "N/A";
                let priceUnit = "";

                if (item.listing_type === "rent") {
                    priceValue = item.expected_rent && item.expected_rent !== "0.00" ? item.expected_rent : "N/A";
                    priceUnit = item.rent_period ? `/${item.rent_period}` : "/month";
                } else {
                    priceValue = item.expected_price && item.expected_price !== "0.00" ? item.expected_price : "N/A";
                }

                let meta = [];
                if (item.sub_property_type_id?.toLowerCase().includes("plot")) {
                    meta.push({ icon: "icon-ruler", label: `${item.carpet_area} ${item.carpet_area_unit || ""}` });
                } else if (item.title?.toLowerCase().includes("warehouse")) {
                    meta.push({ icon: "icon-ruler", label: `${item.carpet_area} ${item.carpet_area_unit || ""}` });
                    meta.push({ icon: "icon-bathtub", label: `${item.washrooms || 0} Washrooms` });
                } else {
                    meta.push({ icon: "icon-bed", label: `${item.bedrooms || 0}` });
                    meta.push({ icon: "icon-bathtub", label: `${item.bathrooms || 0}` });
                    meta.push({ icon: "icon-ruler", label: `${item.carpet_area} ${item.carpet_area_unit || ""}` });
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
                    meta,
                };
            });

            setProperties(mapped);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };


    const bannerList = async () => {
        setBannersLoading(true);
        const fd = new FormData();
        fd.append("programType", "getBannerDetails");
        fd.append("authToken", authToken);

        try {
            const response = await api.post("properties/preRequirements", fd);
            console.log("banners", response)

            if (response.data && response.data.data) {
                const banners = response.data.data;
                const baseURL = api.imageUrl;

                const heroBanner = banners.find(b => b.type === "Hero Banner");
                if (heroBanner && heroBanner.sliderImage) {
                    setBannerUrl(heroBanner.sliderImage);
                }

                const popupBanner = banners.find(b => b.type === "Popup Banner");
                if (popupBanner && popupBanner.sliderImage) {
                    setPopupBanner(popupBanner.sliderImage);
                }

                const stickyBanner = banners.find(b => b.type === "Sticky Banner");
                if (stickyBanner && stickyBanner.sliderImage) {
                    setStickyBanner(stickyBanner.sliderImage);
                }


                const footerBanner = banners.find(b => b.type === "Footer Banner");
                if (footerBanner && footerBanner.sliderImage) {
                    setFooterBannerUrl(footerBanner.sliderImage);
                }
            }
        } catch (error) {
            console.error("banner error:", error);
        } finally {
            setBannersLoading(false);
        }
    };

    useEffect(() => {
        bannerList();
    }, []);

    // ✅ Show loader until both banners and properties are ready
    if (loading || bannersLoading) {
        return (
            <div>
                <Header />
                <div
                    style={{
                        minHeight: "80vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <div className="bouncing-cubes">
                        <div className="cube" style={{ backgroundColor: "#EC2126" }}></div>
                        <div className="cube" style={{ backgroundColor: "#EC2126" }}></div>
                        <div className="cube" style={{ backgroundColor: "#EC2126" }}></div>
                    </div>
                    <p className="mt-3">Loading property details...</p>
                </div>

                <style>{`
                .bouncing-cubes {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    height: 50px;
                }
                .cube {
                    width: 20px;
                    height: 20px;
                    animation: bounce 1.5s infinite ease-in-out;
                }
                .cube:nth-child(2) { animation-delay: 0.2s; }
                .cube:nth-child(3) { animation-delay: 0.4s; }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
            </div>
        );
    }



    return (
        <div className='body bg-surface '>
            <div id="wrapper">
                <div id="pagee" className="clearfix">
                    <Header />
                    {/* SLIDER & TABS */}
                    <section
                        className="flat-slider home-1"
                        style={{
                            backgroundImage: bannerUrl
                                ? `url(${api.imageUrl}${bannerUrl})`
                                : "https://eu-central.storage.cloudconvert.com/tasks/ae46ca00-b99e-40e7-9cb8-2407fd19666c/appartment.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cloudconvert-production%2F20250908%2Ffra%2Fs3%2Faws4_request&X-Amz-Date=20250908T080423Z&X-Amz-Expires=86400&X-Amz-Signature=a8431c7d4a33a3b9c76a84e1b4bfab05bf20dcb08377eaa2513f43da782d4a95&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D%22appartment.jpg%22&response-content-type=image%2Fjpeg&x-id=GetObject",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "800px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative"
                        }}
                    >
                        <div className="container relative">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="slider-content">
                                        <div className="heading text-center">
                                            <h1 className="text-white animationtext slide">
                                                Find Your
                                                <span className="tf-text s1 cd-words-wrapper">
                                                    <span className="item-text is-visible">Dream Home</span>
                                                    <span className="item-text is-hidden">Perfect Home</span>
                                                    <span className="item-text is-hidden">Real Estate</span>
                                                </span>
                                            </h1>
                                            <p className="subtitle text-white body-1 wow fadeIn" data-wow-delay=".8s" data-wow-duration="2000ms">We are a real estate agency that will help you find the best residence you dream of, let’s discuss for your dream house?</p>
                                        </div>
                                        <div className="flat-tab flat-tab-form">
                                            <ul className="nav-tab-form style-1 justify-content-center" role="tablist">
                                                <li className="nav-tab-item" role="presentation">
                                                    <a href="#forRent" className="nav-link-item active" data-bs-toggle="tab">For Rent</a>
                                                </li>
                                                <li className="nav-tab-item" role="presentation">
                                                    <a href="#forSale" className="nav-link-item" data-bs-toggle="tab">For Sale</a>
                                                </li>
                                                <li className="nav-tab-item" role="presentation">
                                                    <a href="#forjointVenture" className="nav-link-item" data-bs-toggle="tab">Joint venture</a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane fade active show" role="tabpanel">
                                                    <div className="form-sl">
                                                        <form method="post">
                                                            <div className="wd-find-select">
                                                                <div className="inner-group">
                                                                    <div className="form-group-1 search-form form-style">
                                                                        <label>Keyword</label>
                                                                        <input type="text" className="form-control" placeholder="Search Keyword." title="Search for" required="" />
                                                                    </div>
                                                                    <div className="form-group-2 form-style">
                                                                        <label>Location</label>
                                                                        <div className="group-ip">
                                                                            <input type="text" className="form-control" placeholder="Search Location" title="Search for" required="" />
                                                                            <a href="#" className="icon icon-location"></a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group-3 form-style">
                                                                        <label>Type</label>
                                                                        <div className="group-select">
                                                                            <div className="nice-select" tabindex="0"><span className="current">All</span>
                                                                                <ul className="list">
                                                                                    <li data-value className="option selected">All</li>
                                                                                    <li data-value="villa" className="option">Villa</li>
                                                                                    <li data-value="studio" className="option">Studio</li>
                                                                                    <li data-value="office" className="option">Office</li>
                                                                                    <li data-value="house" className="option">House</li>


                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group-4 box-filter">
                                                                        <a className="filter-advanced pull-right">
                                                                            <span className="icon icon-faders"></span>
                                                                            <span className="text-1">Advanced</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <span type="submit" className="tf-btn primary" href="#">Search</span>
                                                            </div>
                                                            <div className="wd-search-form">
                                                                <div className="grid-2 group-box group-price">
                                                                    <div className="widget-price">
                                                                        <div className="box-title-price">
                                                                            <span className="title-price">Price Range</span>
                                                                            <div className="caption-price">
                                                                                <span>from</span>
                                                                                <span id="slider-range-value1" className="fw-7"></span>
                                                                                <span>to</span>
                                                                                <span id="slider-range-value2" className="fw-7"></span>
                                                                            </div>
                                                                        </div>
                                                                        <div id="slider-range"></div>
                                                                        <div className="slider-labels">
                                                                            <div>
                                                                                <input type="hidden" name="min-value" value="" />
                                                                                <input type="hidden" name="max-value" value="" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="widget-price">
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
                                                                            <div>
                                                                                <input type="hidden" name="min-value2" value="" />
                                                                                <input type="hidden" name="max-value2" value="" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="grid-2 group-box">
                                                                    <div className="group-select grid-2">
                                                                        <div className="box-select">
                                                                            <label className="title-select text-variant-1">Rooms</label>
                                                                            <div className="nice-select" tabindex="0"><span className="current">2</span>
                                                                                <ul className="list">
                                                                                    <li data-value="1" className="option">1</li>
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
                                                                        <div className="box-select">
                                                                            <label className="title-select text-variant-1">Bathrooms</label>
                                                                            <div className="nice-select" tabindex="0"><span className="current">2</span>
                                                                                <ul className="list">
                                                                                    <li data-value="1" className="option">1</li>
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
                                                                    </div>
                                                                    <div className="group-select grid-2">
                                                                        <div className="box-select">
                                                                            <label className="title-select text-variant-1">Bedrooms</label>
                                                                            <div className="nice-select" tabindex="0"><span className="current">2</span>
                                                                                <ul className="list">
                                                                                    <li data-value="1" className="option">1</li>
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
                                                                        <div className="box-select">
                                                                            <label className="title-select fw-5">Type</label>
                                                                            <div className="nice-select" tabindex="0"><span className="current">2</span>
                                                                                <ul className="list">
                                                                                    <li data-value="1" className="option">1</li>
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
                                                                    </div>

                                                                </div>

                                                                <div className="group-checkbox">
                                                                    <div className="text-1">Amenities:</div>
                                                                    <div className="group-amenities mt-8 grid-6">
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb1" checked />
                                                                                <label for="cb1" className="text-cb-amenities">Air Condition</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb2" />
                                                                                <label for="cb2" className="text-cb-amenities">Cable TV</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb3" />
                                                                                <label for="cb3" className="text-cb-amenities">Ceiling Height</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb4" />
                                                                                <label for="cb4" className="text-cb-amenities">Fireplace</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb5" />
                                                                                <label for="cb5" className="text-cb-amenities">Disabled Access</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb6" checked />
                                                                                <label for="cb6" className="text-cb-amenities">Elevator</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb7" />
                                                                                <label for="cb7" className="text-cb-amenities">Fence</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb8" />
                                                                                <label for="cb8" className="text-cb-amenities">Garden</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb9" checked />
                                                                                <label for="cb9" className="text-cb-amenities">Floor</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb10" />
                                                                                <label for="cb10" className="text-cb-amenities">Furnishing</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb11" checked />
                                                                                <label for="cb11" className="text-cb-amenities">Garage</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb12" />
                                                                                <label for="cb12" className="text-cb-amenities">Pet Friendly</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb13" />
                                                                                <label for="cb13" className="text-cb-amenities">Heating</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb14" />
                                                                                <label for="cb14" className="text-cb-amenities">Intercom</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb15" />
                                                                                <label for="cb15" className="text-cb-amenities">Parking</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb16" />
                                                                                <label for="cb16" className="text-cb-amenities">WiFi</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb17" />
                                                                                <label for="cb17" className="text-cb-amenities">Renovation</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb18" />
                                                                                <label for="cb18" className="text-cb-amenities">Security</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb19" />
                                                                                <label for="cb19" className="text-cb-amenities">Swimming Pool</label>
                                                                            </fieldset>

                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb20" />
                                                                                <label for="cb20" className="text-cb-amenities">Window Type</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb21" />
                                                                                <label for="cb21" className="text-cb-amenities">Search property</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-12">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb22" />
                                                                                <label for="cb22" className="text-cb-amenities">Construction Year</label>
                                                                            </fieldset>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                        <div className="overlay"></div>
                    </section>



                    <section className="flat-section flat-recommended">
                        <div className="container">
                            <div className="text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                                <div className="text-subtitle text-primary">Featured Properties</div>
                                <h4 className="mt-4">Recommended For You</h4>
                            </div>
                            <div className="flat-tab-recommended wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                                <ul className="nav-tab-recommended justify-content-center">
                                    {["View All", "Apartment", "Villa", "Studio", "House", "Office"].map((label, i) => (
                                        <li key={i} className="nav-tab-item">
                                            <a
                                                href="#"
                                                className={`nav-link-item ${activeTab === label ? "active" : ""}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActiveTab(label); // sets the clicked tab
                                                }}
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="tab-content">
                                    <div className="tab-pane fade active show" role="tabpanel">
                                        <div className="row">
                                            {loading ? (
                                                // Skeleton Loader
                                                [...Array(6)].map((_, i) => (
                                                    <div key={i} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                                                        <div className="homeya-box p-3">
                                                            <div className="skeleton skeleton-img mb-3"></div>
                                                            <br />
                                                            <div className="skeleton skeleton-text w-75 mb-2"></div>
                                                            <div className="skeleton skeleton-text w-50 mb-2"></div>
                                                            <div className="skeleton skeleton-text w-100 mb-2"></div>
                                                            <div className="d-flex justify-content-between mt-3">
                                                                <div className="skeleton skeleton-avatar"></div>
                                                                <div className="skeleton skeleton-text w-25"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                properties.map((item) => (
                                                    <div key={item.id} className="col-xl-4 col-lg-6 col-md-6">
                                                        <div className="homeya-box">
                                                            <div className="archive-top">
                                                                <a onClick={() => navigate(`/property/${item.id}`)} className="images-group">
                                                                    <div className="images-style">
                                                                        <img src="https://themesflat.co/html/homzen/images/home/house-2.jpg" alt={item.name} />
                                                                    </div>
                                                                    <div className="top">
                                                                        <ul className="d-flex gap-8">
                                                                            {item.featured && (
                                                                                <li className="flag-tag success">Featured</li>
                                                                            )}
                                                                            <li className="flag-tag style-1">{item.for}</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="bottom">
                                                                        <span className="flag-tag style-2">{item.type}</span>
                                                                    </div>
                                                                </a>
                                                                <div className="content">
                                                                    <div
                                                                        className="h7 text-capitalize fw-7"
                                                                        style={{
                                                                            position: 'relative',
                                                                            display: 'block',
                                                                            maxWidth: '100%',
                                                                        }}
                                                                    >
                                                                        <a
                                                                            onClick={() => navigate(`/property/${item.id}`)}
                                                                            style={{
                                                                                display: 'block',
                                                                                whiteSpace: window.innerWidth <= 991 ? 'normal' : 'nowrap', // full name on mobile
                                                                                overflow: window.innerWidth <= 991 ? 'visible' : 'hidden',
                                                                                textOverflow: 'ellipsis',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.3s ease',
                                                                            }}
                                                                            onMouseEnter={(e) => {
                                                                                if (window.innerWidth > 991) {
                                                                                    e.currentTarget.style.whiteSpace = 'normal';
                                                                                    e.currentTarget.style.overflow = 'visible';
                                                                                }
                                                                            }}
                                                                            onMouseLeave={(e) => {
                                                                                if (window.innerWidth > 991) {
                                                                                    e.currentTarget.style.whiteSpace = 'nowrap';
                                                                                    e.currentTarget.style.overflow = 'hidden';
                                                                                }
                                                                            }}
                                                                        >
                                                                            {item.name}
                                                                        </a>
                                                                    </div>


                                                                    <div className="desc">
                                                                        <i className="fs-16 icon icon-mapPin"></i>
                                                                        <p>{item.location}</p>
                                                                    </div>
                                                                    <ul className="meta-list">
                                                                        {item.meta.map((m, idx) => (
                                                                            <li className="item" key={idx}>
                                                                                <i className={`icon ${m.icon}`}></i>
                                                                                <span>{m.label}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>

                                                                </div>
                                                            </div>
                                                            <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                                <div className="d-flex gap-8 align-items-center">
                                                                    <div className="avatar avt-40 round">
                                                                        <img src="https://themesflat.co/html/homzen/images/avatar/avt-7.jpg" alt="avt" />
                                                                    </div>
                                                                    <span>{item.agentName}</span>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <h6>₹{item.priceValue}</h6>
                                                                    <span className="text-variant-1">{item.priceUnit}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        {!loading && (
                                            <div className="text-center">
                                                <a href="/listing" className="tf-btn primary size-1">View All Properties</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <section
                            className="flat-section-v3 flat-location bg-surface p-0"
                            style={{
                                paddingTop: "20px",

                                width: "100%",
                                overflow: "hidden"
                            }}
                        >
                            <div
                                className="container-full"
                                style={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    padding: "0 15px",
                                    margin: "0 auto"
                                }}
                            >
                                {/* Section Title */}
                                <div
                                    className="box-title text-center wow fadeInUpSmall"
                                    data-wow-delay=".2s"
                                    data-wow-duration="2000ms"
                                >
                                    <div
                                        className="text-subtitle text-primary"
                                        style={{ fontSize: "16px", marginTop: "30px" }}
                                    >
                                        Explore Cities
                                    </div>
                                    <h4
                                        className="mt-4"
                                        style={{
                                            fontSize: "28px",
                                            marginTop: "16px",
                                            lineHeight: "1.3"
                                        }}
                                    >
                                        Our Location For You
                                    </h4>
                                </div>

                                {/* Location Cards */}
                                <div
                                    className="wow fadeInUpSmall"
                                    data-wow-delay=".4s"
                                    data-wow-duration="2000ms"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexWrap: "wrap",
                                        gap: "40px", // slightly larger spacing
                                        padding: "20px 15px"
                                    }}
                                >
                                    {/* Card 1 */}
                                    <a
                                        href=""
                                        className="box-location"
                                        style={{
                                            display: "block",
                                            width: "300px", // larger width
                                            borderRadius: "12px",
                                            overflow: "hidden",
                                            boxShadow: "0 6px 16px rgba(0,0,0,0.15)", // slightly stronger shadow
                                            position: "relative",
                                            transition: "transform 0.3s ease",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <div
                                            className="image"
                                            style={{
                                                position: "relative",
                                                paddingBottom: "70%",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <img
                                                src="https://www.dubaiwikia.com/wp-content/uploads/2017/08/Burj-al-Arab.jpg"
                                                alt="London, United Kingdom"
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition: "transform 0.3s ease"
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="content"
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                padding: "15px",
                                                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                                                color: "#fff"
                                            }}
                                        >
                                            {/* <span
                                                className="sub-title"
                                                style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}
                                            >
                                                321 Property
                                            </span> */}
                                            <h6
                                                className="title"
                                                style={{ fontSize: "18px", margin: 0, fontWeight: "600" }}
                                            >
                                                Dubai, United Kingdom
                                            </h6>
                                        </div>
                                    </a>

                                    {/* Card 2 */}
                                    <a
                                        href=""
                                        className="box-location"
                                        style={{
                                            display: "block",
                                            width: "300px",
                                            borderRadius: "12px",
                                            overflow: "hidden",
                                            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                                            position: "relative",
                                            transition: "transform 0.3s ease",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <div
                                            className="image"
                                            style={{
                                                position: "relative",
                                                paddingBottom: "70%",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <img
                                                src="https://s7ap1.scene7.com/is/image/incredibleindia/india-gate-delhi-2-attr-hero?qlt=82&ts=1742164655647"
                                                alt="London, United Kingdom"
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition: "transform 0.3s ease"
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="content"
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                padding: "15px",
                                                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                                                color: "#fff"
                                            }}
                                        >

                                            <h6
                                                className="title"
                                                style={{ fontSize: "18px", margin: 0, fontWeight: "600" }}
                                            >
                                                India
                                            </h6>
                                        </div>
                                    </a>

                                    {/* Add more cards as needed */}
                                </div>
                            </div>
                        </section>

                    </section>




                    {/* <!-- Service & Counter  -->  */}
                    <section className="flat-section">
                        <div className="container">
                            <div className="box-title style-1 wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                                <div className="box-left">
                                    <div className="text-subtitle text-primary">Our Services</div>
                                    <h4 className="mt-4">What We Do?</h4>
                                </div>
                                <a href="#" className="btn-view"><span className="text">View All Services</span> <span className="icon icon-arrow-right2"></span> </a>
                            </div>
                            <div className="flat-service wrap-service wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
                                <div className="box-service hover-btn-view">
                                    <div className="icon-box">
                                        <span className="icon icon-buy-home"></span>
                                    </div>
                                    <div className="content">
                                        <h6 className="title">Buy A New Home</h6>
                                        <p className="description">Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.</p>
                                        <a href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2"></span> </a>
                                    </div>
                                </div>
                                <div className="box-service hover-btn-view">
                                    <div className="icon-box">
                                        <span className="icon icon-rent-home"></span>
                                    </div>
                                    <div className="content">
                                        <h6 className="title">Rent a home</h6>
                                        <p className="description">Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
                                        <a href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2"></span> </a>
                                    </div>
                                </div>
                                <div className="box-service hover-btn-view">
                                    <div className="icon-box">
                                        <span className="icon icon-sale-home"></span>
                                    </div>
                                    <div className="content">
                                        <h6 className="title">Sell a home</h6>
                                        <p className="description">Sell confidently with expert guidance and effective strategies, showcasing your property's best features for a successful sale.</p>
                                        <a href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2"></span> </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flat-counter tf-counter wrap-counter wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
                                <div className="counter-box">
                                    <div className="count-number">
                                        <div className="number" data-speed="2000" data-to="85" data-inviewport="yes">85</div>
                                    </div>
                                    <div className="title-count">Satisfied Clients</div>
                                </div>
                                <div className="counter-box">
                                    <div className="count-number">
                                        <div className="number" data-speed="2000" data-to="112" data-inviewport="yes">112</div>
                                    </div>
                                    <div className="title-count">Awards Received</div>
                                </div>
                                <div className="counter-box">
                                    <div className="count-number">
                                        <div className="number" data-speed="2000" data-to="32" data-inviewport="yes">32</div>
                                    </div>
                                    <div className="title-count">Successful Transactions</div>
                                </div>
                                <div className="counter-box">
                                    <div className="count-number">
                                        <div className="number" data-speed="2000" data-to="66" data-inviewport="yes">66</div>
                                    </div>
                                    <div className="title-count">Monthly Traffic</div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- End Service & Counter -->
            <!-- Benefit --> */}
                    <section className="flat-section flat-benefit bg-surface">
                        <div className="container">
                            <div className="box-title text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                                <div className="text-subtitle text-primary">Our Benifit</div>
                                <h4 className="mt-4">Why Choose Easy Acers</h4>
                            </div>
                            <div className="wrap-benefit wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                                <div className="box-benefit">
                                    <div className="icon-box">
                                        <span className="icon icon-proven"></span>
                                    </div>
                                    <div className="content text-center">
                                        <h6 className="title">Proven Expertise</h6>
                                        <p className="description">Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</p>
                                    </div>
                                </div>
                                <div className="box-benefit">
                                    <div className="icon-box">
                                        <span className="icon icon-double-ruler"></span>
                                    </div>
                                    <div className="content text-center">
                                        <h6 className="title">Customized Solutions</h6>
                                        <p className="description">We pride ourselves on crafting personalized strategies to match your unique goals, ensuring a seamless real estate journey.</p>
                                    </div>
                                </div>
                                <div className="box-benefit">
                                    <div className="icon-box">
                                        <span className="icon icon-hand"></span>
                                    </div>
                                    <div className="content text-center">
                                        <h6 className="title">Transparent Partnerships</h6>
                                        <p className="description">Transparency is key in our client relationships. We prioritize clear communication and ethical practices, fostering trust and reliability throughout.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- End Benefit -->
                    {/* PROPERTIES */}


                    <section className="flat-section flat-property">
                        <div className="container">
                            {/* <div className="box-title style-1 wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                                <div className="box-left">
                                    <div className="text-subtitle text-primary">Top Properties</div>
                                    <h4 className="mt-4">Best Property Value</h4>
                                </div>
                                <a href="#" className="tf-btn primary size-1">View All</a>
                            </div> */}
                            <div className="wrap-property">
                                <div className="box-left  wow fadeInLeftSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                                    {/* Property main card */}
                                    {home.properties.length > 0 && (
                                        <div className="homeya-box lg">
                                            <div className="archive-top">
                                                <a href={home.properties[0].detailsUrl} className="images-group">
                                                    <div className="images-style">
                                                        <img src={home.properties[0].image} alt="img" />
                                                    </div>
                                                    <div className="top">
                                                        <ul className="d-flex gap-8">
                                                            <li className="flag-tag success style-3">{home.properties[0].featured ? "Featured" : ""}</li>
                                                            <li className="flag-tag style-1 style-3">{home.properties[0].for}</li>
                                                        </ul>
                                                        <ul className="d-flex gap-4">
                                                            <li className="box-icon w-40"><span className="icon icon-arrLeftRight"></span></li>
                                                            <li className="box-icon w-40"><span className="icon icon-heart"></span></li>
                                                            <li className="box-icon w-40"><span className="icon icon-eye"></span></li>
                                                        </ul>
                                                    </div>
                                                    <div className="bottom">
                                                        <span className="flag-tag style-2">{home.properties[0].type}</span>
                                                    </div>
                                                </a>
                                                <div className="content">
                                                    <h5 className="text-capitalize"><a href={home.properties[0].detailsUrl} className="link">{home.properties[0].name}</a></h5>
                                                    <div className="desc"><i className="icon icon-mapPin"></i><p>{home.properties[0].location}</p></div>
                                                    <p className="note">"I truly appreciate the professionalism and in-depth..."</p>
                                                    <ul className="meta-list">
                                                        <li className="item"><i className="icon icon-bed"></i><span>{home.properties[0].beds}</span></li>
                                                        <li className="item"><i className="icon icon-bathtub"></i><span>{home.properties[0].baths}</span></li>
                                                        <li className="item"><i className="icon icon-ruler"></i><span>{home.properties[0].size}</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                <div className="d-flex gap-8 align-items-center">
                                                    <div className="avatar avt-40 round">
                                                        <img src={home.properties[0].avatar} alt="avt" />
                                                    </div>
                                                    <span className="body-2">{home.properties[0].agentName}</span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <h6>${home.properties[0].priceValue}</h6>
                                                    <span className="text-variant-1">{home.properties[0].priceUnit}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="box-right wow fadeInRightSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                                    {home.properties.slice(1, 4).map((prop, idx) => (
                                        <div className="homeya-box list-style-1" key={prop.id}>
                                            <a href={prop.detailsUrl} className="images-group">
                                                <div className="images-style">
                                                    <img src={prop.image} alt="img" />
                                                </div>
                                                <div className="top">
                                                    <ul className="d-flex gap-4 flex-wrap flex-column">
                                                        {prop.featured && <li className="flag-tag success">Featured</li>}
                                                        <li className="flag-tag style-1">{prop.for}</li>
                                                    </ul>
                                                    <ul className="d-flex gap-4">

                                                        <li className="box-icon w-28"><span className="icon icon-eye"></span></li>
                                                    </ul>
                                                </div>
                                                <div className="bottom">
                                                    <span className="flag-tag style-2">{prop.type}</span>
                                                </div>
                                            </a>
                                            <div className="content">
                                                <div className="archive-top">
                                                    <div className="h7 text-capitalize fw-7"><a href={prop.detailsUrl} className="link">{prop.name}</a></div>
                                                    <div className="desc"><i className="icon icon-mapPin"></i><p>{prop.location}</p></div>
                                                    <ul className="meta-list">
                                                        <li className="item"><i className="icon icon-bed"></i><span>{prop.beds}</span></li>
                                                        <li className="item"><i className="icon icon-bathtub"></i><span>{prop.baths}</span></li>
                                                        <li className="item"><i className="icon icon-ruler"></i><span>{prop.size}</span></li>
                                                    </ul>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src={prop.avatar} alt="avt" />
                                                        </div>
                                                        <span>{prop.agentName}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="h7 fw-7">${prop.priceValue}</div>
                                                        <span className="text-variant-1">{prop.priceUnit}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>





                    {/* TESTIMONIALS */}
                    <section className="flat-section-v3 bg-surface flat-testimonial">
                        <div className="cus-layout-1">
                            <div className="row align-items-center">
                                <div className="col-lg-3">
                                    <div className="box-title">
                                        <div className="text-subtitle text-primary">Top Properties</div>
                                        <h4 className="mt-4">What’s people say’s</h4>
                                    </div>
                                    <p className="text-variant-1 p-16">
                                        Our seasoned team excels in real estate with years of successful market
                                        navigation, offering informed decisions and optimal results.
                                    </p>

                                </div>

                                <div className="col-lg-9">
                                    <Swiper
                                        modules={[Navigation, Autoplay]}

                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                        }}
                                        speed={1000}
                                        loop={true}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        breakpoints={{
                                            768: { slidesPerView: 2 },
                                            1024: { slidesPerView: 2.6 },
                                        }}
                                        className="tf-sw-testimonial"
                                    >
                                        <SwiperSlide>
                                            <div className="box-tes-item">
                                                <ul className="list-star">
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                </ul>
                                                <p className="note body-1">
                                                    "I truly appreciate the professionalism and in-depth knowledge of the brokerage team. They not only helped me find the perfect home but also assisted with legal and financial aspects, making me feel confident and secure in my decision."
                                                </p>
                                                <div className="box-avt d-flex align-items-center gap-12">
                                                    <div className="avatar avt-60 round">
                                                        <img src="images/avatar/avt-7.jpg" alt="avatar" />
                                                    </div>
                                                    <div className="info">
                                                        <div className="h7 fw-7">Rohit Sharma</div>
                                                        <p className="text-variant-1 mt-4">CEO Realty</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <div className="box-tes-item">
                                                <ul className="list-star">
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                </ul>
                                                <p className="note body-1">
                                                    "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively."
                                                </p>
                                                <div className="box-avt d-flex align-items-center gap-12">
                                                    <div className="avatar avt-60 round">
                                                        <img src="images/avatar/avt-5.jpg" alt="avatar" />
                                                    </div>
                                                    <div className="info">
                                                        <div className="h7 fw-7">Priya Singh</div>
                                                        <p className="text-variant-1 mt-4">Founder, HomeSpace</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <div className="box-tes-item">
                                                <ul className="list-star">
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                </ul>
                                                <p className="note body-1">
                                                    "Excellent service! The team helped me with every step and made the process smooth and transparent. Highly recommended."
                                                </p>
                                                <div className="box-avt d-flex align-items-center gap-12">
                                                    <div className="avatar avt-60 round">
                                                        <img src="images/avatar/avt-6.jpg" alt="avatar" />
                                                    </div>
                                                    <div className="info">
                                                        <div className="h7 fw-7">Amit Verma</div>
                                                        <p className="text-variant-1 mt-4">Managing Director, PropMart</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <div className="box-tes-item">
                                                <ul className="list-star">
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                    <li className="icon icon-star"></li>
                                                </ul>
                                                <p className="note body-1">
                                                    "Very professional and transparent team. I felt supported throughout my home buying journey. Exceptional experience!"
                                                </p>
                                                <div className="box-avt d-flex align-items-center gap-12">
                                                    <div className="avatar avt-60 round">
                                                        <img src="images/avatar/avt-8.jpg" alt="avatar" />
                                                    </div>
                                                    <div className="info">
                                                        <div className="h7 fw-7">Sneha Reddy</div>
                                                        <p className="text-variant-1 mt-4">CEO DreamHomes</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>

                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* AGENTS */}
                    {/* <section className="flat-section flat-agents">
                        <div className="container">
                            <div className="box-title text-center wow fadeIn" data-wow-delay=".2s" data-wow-duration="2000ms">
                                <div className="text-subtitle text-primary">Our Teams</div>
                                <h4 className="mt-4">Meet Our Agents</h4>
                            </div>
                            <div className="row">
                                {home.agents.map((agent, idx) => (
                                    <div className="box col-lg-3 col-sm-6" key={idx}>
                                        <div
                                            className="box-agent hover-img wow fadeIn"
                                            data-wow-delay={`${0.2 + idx * 0.2}s`}
                                            data-wow-duration="2000ms"
                                        >
                                            <a href="#" className="box-img img-style" style={{ display: "block", width: "100%", height: "300px", overflow: "hidden" }}>
                                                <img
                                                    src={agent.image}
                                                    alt="image-agent"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover", // makes sure the image fills properly
                                                    }}
                                                />
                                                <ul className="agent-social">
                                                    {agent.social.map((icon, i) => (
                                                        <li key={i}>
                                                            <span className={`icon icon-${icon}`}></span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </a>

                                            <a href="#" className="content">
                                                <div className="info">
                                                    <h6 className="link">{agent.name}</h6>
                                                    <p className="mt-4 text-variant-1">{agent.role}</p>
                                                </div>
                                                <span className="icon-phone"></span>
                                            </a>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </section> */}

                    {footerBannerUrl && (
                        <div className="footer-banner text-center my-4">
                            <img
                                src={`${api.imageUrl}${footerBannerUrl}`}
                                alt="Footer Banner"
                                style={{ width: "1200px", height: "300px" }}
                            />
                        </div>
                    )}

                    {/* ✅ Popup Banner Modal */}
                    {showPopup && popupBanner && (
                        <div className="popup-overlay">
                            <div className="popup-container">
                                <button className="popup-close" style={{ zIndex: "999" }} onClick={() => setShowPopup(false)}>
                                    ✖
                                </button>
                                <img
                                    src={`${api.imageUrl}${popupBanner}`}
                                    alt="Popup Banner"
                                    className="popup-img"
                                />
                            </div>
                        </div>
                    )}

                    <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.5s ease-in-out;
        }
        .popup-container {
          position: relative;
          background: #fff;
          padding: 10px;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          animation: scaleUp 0.4s ease-in-out;
          max-width: 600px;
          width: 90%;
        }
        .popup-img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        .popup-close {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #ec2126;
          border: none;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          cursor: pointer;
          transition: 0.3s;
        }
        .popup-close:hover {
          background: #b8161a;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>


                    {showSticky && stickyBanner && (
                        <div
                            style={{
                                position: "fixed",
                                bottom: "20px",
                                left: "20px",
                                zIndex: 9999,
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    background: "#fff",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                    overflow: "hidden",
                                    maxWidth: "280px",
                                    animation: "slideUp 0.5s ease-out",
                                }}
                            >
                                {/* Close Button */}
                                <button className="popup-close" style={{ zIndex: "999" }} onClick={() => {
                                    setShowSticky(false);
                                    localStorage.setItem("hasSeenSticky", "true"); // mark dismissed
                                }}>
                                    ✖
                                </button>

                                {/* Banner Image */}
                                <img
                                    src={`${api.imageUrl}${stickyBanner}`}
                                    alt="Sticky Banner"
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "12px",
                                    }}
                                />
                            </div>
                        </div>
                    )}





                    <Footer />

                    <div className="progress-wrap">
                        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '286.138' }}></path>
                        </svg>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomePage;