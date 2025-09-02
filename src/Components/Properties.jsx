
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import Header from "./Header";
import Footer from "./Footer";
import propertyData from "./propertyData.json";




const images1 = [
    "images/banner/banner-property-1.jpg",
    "images/banner/banner-property-3.jpg",
    "images/banner/banner-property-2.jpg",
    "images/banner/banner-property-1.jpg",
    "images/banner/banner-property-3.jpg",
    "images/banner/banner-property-2.jpg",
];


const Properties = () => {
    const data = propertyData;
    const featured = data.featuredProperties;

    const [activeFloor, setActiveFloor] = useState(null);

    const handleToggleFloor = (index) => {
        // if already open, close it; otherwise open it
        setActiveFloor(activeFloor === index ? null : index);
    };




    return (
        <div>
            <Header />

            <section className="flat-location flat-slider-detail-v1">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={2}
                    spaceBetween={20}
                    centeredSlides={true}
                    loop={true} // Infinite loop
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: ".nav-next-location",
                        prevEl: ".nav-prev-location",
                    }}
                    className="tf-sw-location"
                >
                    {images1.map((src, index) => (
                        <SwiperSlide key={index}>
                            <Link
                                to={src}
                                data-fancybox="gallery"
                                className="box-imgage-detail d-block"
                            >
                                <img src={src} alt={`img-property-${index}`} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation buttons */}
                <div className="box-navigation">
                    <div className="navigation swiper-nav-next nav-next-location">
                        <span className="icon icon-arr-l"></span>
                    </div>
                    <div className="navigation swiper-nav-prev nav-prev-location">
                        <span className="icon icon-arr-r"></span>
                    </div>
                </div>

                {/* Icon box */}
                <div className="icon-box">
                    <Link to="#" className="item">
                        <span className="icon icon-map-trifold"></span>
                    </Link>
                    <Link
                        to="images/banner/banner-property-1.jpg"
                        className="item active"
                        data-fancybox="gallery"
                    >
                        <span className="icon icon-images"></span>
                    </Link>
                </div>
            </section>
            <section className="flat-section pt-0 flat-property-detail">
                <div className="container">
                    {/* Header */}
                    <div className="header-property-detail">
                        <div className="content-top d-flex justify-content-between align-items-center">
                            <div className="box-name">
                                <a href="#" className="flag-tag primary">{data.header.status}</a>
                                <h4 className="title link">{data.header.title}</h4>
                            </div>
                            <div className="box-price d-flex align-items-center">
                                <h4>{data.header.price.value}</h4>
                                <span className="body-1 text-variant-1">{data.header.price.period}</span>
                            </div>
                        </div>
                        <div className="content-bottom">
                            <div className="info-box">
                                <div className="label">FEATUREs:</div>
                                <ul className="meta">
                                    {data.header.features.map((f, i) => (
                                        <li className="meta-item" key={i}>
                                            <span className={`icon ${f.icon}`}></span> {f.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="info-box">
                                <div className="label">LOCATION:</div>
                                <p className="meta-item">
                                    <span className={`icon ${data.header.location.icon}`}></span>
                                    {data.header.location.address}
                                </p>
                            </div>
                            <ul className="icon-box">
                                {data.header.actions.map((a, i) => (
                                    <li key={i}><a href="#" className="item"><span className={`icon ${a.icon}`}></span></a></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        {/* Main Content */}
                        <div className="col-lg-8">
                            {/* Description */}
                            <div className="single-property-element single-property-desc">
                                <div className="h7 title fw-7">{data.description.title}</div>
                                {data.description.paragraphs.map((p, i) => (
                                    <p key={i} className="body-2 text-variant-1">{p}</p>
                                ))}
                                <a href={data.description.viewMore} className="btn-view"><span className="text">View More</span></a>
                            </div>
                            {/* Overview */}
                            <div className="single-property-element single-property-overview">
                                <div className="h7 title fw-7">Overview</div>
                                <ul className="info-box">
                                    {data.overview.map((o, i) => (
                                        <li className="item" key={i}>
                                            <a href="#" className="box-icon w-52"><i className={`icon ${o.icon}`}></i></a>
                                            <div className="content">
                                                <span className="label">{o.label}:</span>
                                                <span>{o.value}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Video */}
                            <div className="single-property-element single-property-video">
                                <div className="h7 title fw-7">{data.video.title}</div>
                                <div className="img-video">
                                    <img src={data.video.thumbnail} alt="img-video" />
                                    <a href={data.video.url} data-fancybox="gallery2" className="btn-video"> <span className="icon icon-play"></span></a>
                                </div>
                            </div>
                            {/* Property Details */}
                            <div className="single-property-element single-property-info">
                                <div className="h7 title fw-7">Property Details</div>
                                <div className="row">
                                    {data.propertyDetails.map((d, i) => (
                                        <div className="col-md-6" key={i}>
                                            <div className="inner-box">
                                                <span className="label">{d.label}:</span>
                                                <div className="content fw-7">
                                                    {d.value}
                                                    {d.period && <span className="caption-1 fw-4 text-variant-1">{d.period}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Amenities and Features */}
                            <div className="single-property-element single-property-feature">
                                <div className="h7 title fw-7">Amenities and features</div>
                                <div className="wrap-feature">
                                    {data.amenitiesAndFeatures.map((cat, ci) => (
                                        <div className="box-feature" key={ci}>
                                            <div className="fw-7">{cat.category}:</div>
                                            <ul>
                                                {cat.items.map((f, fi) => (
                                                    <li className="feature-item" key={fi}>
                                                        <span className={`icon ${f.icon}`}></span>
                                                        {f.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Map */}
                            <div className="single-property-element single-property-map">
                                <div className="h7 title fw-7">Map</div>
                                <div id="map-single" className="map-single"></div>
                                <ul className="info-map">
                                    {data.map.info.map((m, i) => (
                                        <li key={i}>
                                            <div className="fw-7">{m.label}</div>
                                            <span className="mt-4 text-variant-1">{m.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Floor Plans */}
                            <div className="single-property-element single-property-floor">
                                <div className="h7 title fw-7">Floor plans</div>
                                <ul className="box-floor" id="parent-floor">
                                    {data.floorPlans.map((floor, fi) => (
                                        <li className="floor-item" key={fi}>
                                            <div
                                                className="floor-header"
                                                onClick={() => handleToggleFloor(fi)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <div className="inner-left">
                                                    <i className="icon icon-arr-r"></i>
                                                    <span className="fw-7">{floor.name}</span>
                                                </div>
                                                <ul className="inner-right">
                                                    {floor.details.map((det, di) => (
                                                        <li className="d-flex align-items-center gap-8" key={di}>
                                                            <i className={`icon ${det.icon}`}></i> {det.label}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {activeFloor === fi && (
                                                <div className="faq-body">
                                                    <div className="box-img">
                                                        <img src={floor.image} alt="img-floor" />
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Attachments */}
                            <div className="single-property-element single-property-attachments">
                                <div className="h7 title fw-7">File Attachments</div>
                                <div className="row">
                                    {data.attachments.map((a, i) => (
                                        <div className="col-sm-6" key={i}>
                                            <a href="#" target="_blank" className="attachments-item">
                                                <div className="box-icon w-60">
                                                    <img src={a.icon} alt="file" />
                                                </div>
                                                <span>{a.name}</span>
                                                <i className="icon icon-download"></i>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Explore */}
                            <div className="single-property-element single-property-explore">
                                <div className="h7 title fw-7">Explore Property</div>
                                <div className="box-img">
                                    <img src={data.explore.image} alt="img" />
                                    <div className="box-icon w-80">
                                        <span className={`icon ${data.explore.icon}`}></span>
                                    </div>
                                </div>
                            </div>
                            {/* Loan Calculator */}
                            <div className="single-property-element single-property-loan">
                                <div className="h7 title fw-7">Loan Calculator</div>
                                <form action="#" className="box-loan-calc">
                                    <div className="box-top">
                                        {data.loanCalculator.fields.map((f, i) => (
                                            <div className="item-calc" key={i}>
                                                <label className="label">{f.label}:</label>
                                                <input type="number" placeholder={f.placeholder} className="form-control" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="box-bottom">
                                        <button className="tf-btn primary">Calculator</button>
                                        <div className="d-flex gap-4">
                                            <span className="h7 fw-7">Monthly Payment:</span>
                                            <span className="result h7 fw-7">{data.loanCalculator.monthlyPayment}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* Nearby */}
                            <div className="single-property-element single-property-nearby">
                                <div className="h7 title fw-7">What’s nearby?</div>
                                <p className="body-2">{data.nearby.description}</p>
                                <div className="grid-2 box-nearby">
                                    <ul className="box-left">
                                        {data.nearby.left.map((n, i) => (
                                            <li className="item-nearby" key={i}>
                                                <span className="label">{n.label}:</span>
                                                <span className="fw-7">{n.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className="box-right">
                                        {data.nearby.right.map((n, i) => (
                                            <li className="item-nearby" key={i}>
                                                <span className="label">{n.label}:</span>
                                                <span className="fw-7">{n.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Reviews */}
                            <div className="single-property-element single-wrapper-review">
                                <div className="box-title-review d-flex justify-content-between align-items-center flex-wrap gap-20">
                                    <div className="h7 fw-7">Guest Reviews</div>
                                    <a href="#" className="tf-btn">View All Reviews</a>
                                </div>
                                <div className="wrap-review">
                                    <ul className="box-review">
                                        {data.reviews.map((r, i) => (
                                            <li className="list-review-item" key={i}>
                                                <div className="avatar avt-60 round">
                                                    <img src={r.avatar} alt="avatar" />
                                                </div>
                                                <div className="content">
                                                    <div className="name h7 fw-7 text-black">{r.name}</div>
                                                    <span className="mt-4 d-inline-block date body-3 text-variant-2">{r.date}</span>
                                                    <ul className="mt-8 list-star">
                                                        {[...Array(r.stars)].map((_, si) => (
                                                            <li className="icon-star" key={si}></li>
                                                        ))}
                                                    </ul>
                                                    <p className="mt-12 body-2 text-black">{r.content}</p>
                                                    {r.images && r.images.length > 0 && (
                                                        <ul className="box-img-review">
                                                            {r.images.map((img, ii) => (
                                                                <li key={ii}><a href="#" className="img-review"><img src={img} alt="img-review" /></a></li>
                                                            ))}
                                                            {r.moreImages && (
                                                                <li><a href="#" className="img-review"><span className="fw-7">+{r.moreImages}</span></a></li>
                                                            )}
                                                        </ul>
                                                    )}
                                                    {r.questions && (
                                                        <a href="#" className="view-question">
                                                            See more answered questions ({r.questions})
                                                        </a>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>


                                <div className="wrap-form-comment">
                                    <div className="h7">Leave A Reply</div>
                                    <div id="comments" className="comments">
                                        <div className="respond-comment">
                                            <form method="post" id="contactform" className="comment-form form-submit"
                                                action="https://themesflat.co/html/homzen/contact/contact-process.php" accept-charset="utf-8"
                                                novalidate="novalidate">

                                                <div className="form-wg group-ip">
                                                    <fieldset>
                                                        <label className="sub-ip">Name</label>
                                                        <input type="text" className="form-control" name="text" placeholder="Your name" required="" />
                                                    </fieldset>
                                                    <fieldset>
                                                        <label className="sub-ip">Email</label>
                                                        <input type="email" className="form-control" name="email" placeholder="Your email" required="" />
                                                    </fieldset>
                                                </div>
                                                <fieldset className="form-wg d-flex align-items-center gap-8">
                                                    <input type="checkbox" className="tf-checkbox" id="cb-ip"style={{accentColor:"#ED2027"}}/>
                                                    <label for="cb-ip" className="text-black text-checkbox">Save your name, email for the next time review </label>
                                                </fieldset>
                                                <fieldset className="form-wg">
                                                    <label className="sub-ip">Review</label>
                                                    <textarea id="comment-message" name="message" rows="4" tabindex="4"
                                                        placeholder="Write comment " aria-required="true"></textarea>
                                                </fieldset>
                                                <button className="form-wg tf-btn primary" name="submit" type="submit">
                                                    <span>Post Comment</span>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* You can add the review form here if needed */}
                            </div>
                        </div>
                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="widget-sidebar fixed-sidebar wrapper-sidebar-right">
                                {/* Contact Seller */}
                                <div className="widget-box single-property-contact bg-surface">
                                    <div className="h7 title fw-7">Contact Sellers</div>
                                    <div className="box-avatar">
                                        <div className="avatar avt-100 round">
                                            <img src={data.contactSeller.avatar} alt="avatar" />
                                        </div>
                                        <div className="info">
                                            <div className="text-1 name">{data.contactSeller.name}</div>
                                            <span>{data.contactSeller.phone} {data.contactSeller.email}</span>
                                        </div>
                                    </div>
                                    {/* Contact form (static) */}
                                    <form action="#" className="contact-form">
                                        <div className="ip-group">
                                            <label>Full Name:</label>
                                            <input type="text" placeholder="Jony Dane" className="form-control" />
                                        </div>
                                        <div className="ip-group">
                                            <label>Phone Number:</label>
                                            <input type="text" placeholder="ex 0123456789" className="form-control" />
                                        </div>
                                        <div className="ip-group">
                                            <label>Email Address:</label>
                                            <input type="text" placeholder={data.contactSeller.email} className="form-control" />
                                        </div>
                                        <div className="ip-group">
                                            <label>Your Message:</label>
                                            <textarea name="message" rows="4" placeholder="Message" aria-required="true" className="form-control"></textarea>
                                        </div>
                                        <button className="tf-btn primary w-100">Send Message</button>
                                    </form>
                                </div>
                                {/* Search Widget */}
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
                                                                <input type="text" className="form-control" placeholder="Search Keyword." value="" name="s" title="Search for" required="" />
                                                            </div>
                                                            <div className="form-style">
                                                                <label className="title-select">Location</label>
                                                                <div className="group-ip ip-icon">
                                                                    <input type="text" className="form-control" placeholder="Search Location" value="" name="s" title="Search for" required="" />
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
                                                            <div className="form-style widget-price">
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
                                                                    <input type="hidden" name="min-value" value="" />
                                                                    <input type="hidden" name="max-value" value="" />
                                                                </div>
                                                            </div>
                                                            <div className="form-style widget-price wd-price-2">
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
                                                            </div>
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
                                {/* Why Choose Us */}
                                <div className="widget-box single-property-whychoose bg-surface">
                                    <div className="h7 title fw-7">Why Choose Us?</div>
                                    <ul className="box-whychoose">
                                        {data.whyChooseUs.map((w, i) => (
                                            <li className="item-why" key={i}>
                                                <i className={`icon ${w.icon}`}></i>
                                                {w.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <section className="flat-section pt-0 flat-latest-property">
                            <div className="container">
                                <div className="box-title">
                                    <div className="text-subtitle text-primary">Featured properties</div>
                                    <h4 className="mt-4">The Most Recent Estate</h4>
                                </div>

                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    loop={true}
                                    spaceBetween={30}
                                    breakpoints={{
                                        0: { slidesPerView: 1 },
                                        768: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                    }}
                                >
                                    {featured.map((property, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="homeya-box style-2">
                                                <div className="archive-top">
                                                    <Link to="#" className="images-group">
                                                        <div className="images-style">
                                                            <img src={property.img} alt="img" />
                                                        </div>
                                                        <div className="top">
                                                            <ul className="d-flex gap-8">
                                                                <li className="flag-tag success">Featured</li>
                                                                <li className="flag-tag style-1">For Sale</li>
                                                            </ul>
                                                            <ul className="d-flex gap-4">
                                                              
                                                                <li className="box-icon w-32">
                                                                    <span className="icon icon-eye"></span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bottom">
                                                            <span className="flag-tag style-2">{property.tag}</span>
                                                        </div>
                                                    </Link>
                                                    <div className="content">
                                                        <div className="h7 text-capitalize fw-7">
                                                            <Link to="#" className="link">
                                                                {property.title}
                                                            </Link>
                                                        </div>
                                                        <div className="desc">
                                                            <i className="fs-16 icon icon-mapPin"></i>
                                                            <p>{property.location}</p>
                                                        </div>
                                                        <ul className="meta-list">
                                                            <li className="item">
                                                                <i className="icon icon-bed"></i>
                                                                <span>{property.bed}</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-bathtub"></i>
                                                                <span>{property.bath}</span>
                                                            </li>
                                                            <li className="item">
                                                                <i className="icon icon-ruler"></i>
                                                                <span>{property.size}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="archive-bottom d-flex justify-content-between align-items-center">
                                                    <div className="d-flex gap-8 align-items-center">
                                                        <div className="avatar avt-40 round">
                                                            <img src={property.avatar} alt="avt" />
                                                        </div>
                                                        <span>{property.author}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>{property.price}</h6>
                                                        <span className="text-variant-1">{property.period}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </section>

                    </div>
                </div>
            </section>
            <Footer />
            
                    <div className="progress-wrap">
                        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '286.138' }}></path>
                        </svg>
                    </div>
        </div>
    );
};

export default Properties;