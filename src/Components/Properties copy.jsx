import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import Header from "./Header";
import Footer from "./Footer";



const images1 = [
    "images/banner/banner-property-1.jpg",
    "images/banner/banner-property-3.jpg",
    "images/banner/banner-property-2.jpg",
    "images/banner/banner-property-1.jpg",
    "images/banner/banner-property-3.jpg",
    "images/banner/banner-property-2.jpg",
];



const Properties = () => {
    // const propertyData = [
    //     {
    //         img: "images/home/house-4.jpg",
    //         tag: "House",
    //         title: "Sunset Heights Estate, Beverly Hills",
    //         location: "1040 Ocean, Santa Monica, California",
    //         bed: 3,
    //         bath: 2,
    //         size: "600 SqFT",
    //         avatar: "images/avatar/avt-8.jpg",
    //         author: "Jacob Jones",
    //         price: "$250,00",
    //         period: "/month",
    //     },
    //     {
    //         img: "images/home/house-5.jpg",
    //         tag: "Office",
    //         title: "Coastal Serenity Cottage",
    //         location: "21 Hillside Drive, Beverly Hills, California",
    //         bed: 4,
    //         bath: 2,
    //         size: "600 SqFT",
    //         avatar: "images/avatar/avt-6.jpg",
    //         author: "Kathryn Murphy",
    //         price: "$2050,00",
    //         period: "/SqFT",
    //     },
    //     {
    //         img: "images/home/house-6.jpg",
    //         tag: "Studio",
    //         title: "Lakeview Haven, Lake Tahoe",
    //         location: "8 Broadway, Brooklyn, New York",
    //         bed: 2,
    //         bath: 2,
    //         size: "600 SqFT",
    //         avatar: "images/avatar/avt-10.jpg",
    //         author: "Floyd Miles",
    //         price: "$250,00",
    //         period: "/month",
    //     },
    //     {
    //         img: "images/home/house-1.jpg",
    //         tag: "Studio",
    //         title: "Casa Lomas de Machalí Machas",
    //         location: "33 Maple Street, San Francisco, California",
    //         bed: 3,
    //         bath: 2,
    //         size: "600 SqFT",
    //         avatar: "images/avatar/avt-6.jpg",
    //         author: "Arlene McCoy",
    //         price: "$7250,00",
    //         period: "/SqFT",
    //     },
    // ];


    return (
        <div>
            < Header />
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
                    <div className="header-property-detail">
                        <div className="content-top d-flex justify-content-between align-items-center">
                            <div className="box-name">
                                <a href="#" className="flag-tag primary">For Rent</a>
                                <h4 className="title link">Lakeview Haven, Lake Tahoe</h4>
                            </div>
                            <div className="box-price d-flex align-items-center">
                                <h4>$250,00</h4>
                                <span className="body-1 text-variant-1">/month</span>
                            </div>
                        </div>
                        <div className="content-bottom">
                            <div className="info-box">
                                <div className="label">FEATUREs:</div>
                                <ul className="meta">
                                    <li className="meta-item"><span className="icon icon-bed"></span> 2 Bedroom</li>
                                    <li className="meta-item"><span className="icon icon-bathtub"></span> 2 Bathroom</li>
                                    <li className="meta-item"><span className="icon icon-ruler"></span> 6,000 SqFT</li>
                                </ul>
                            </div>
                            <div className="info-box">
                                <div className="label">LOCATION:</div>
                                <p className="meta-item"><span className="icon icon-mapPin"></span> 8 Broadway, Brooklyn, New York</p>
                            </div>
                            <ul className="icon-box">
                                <li><a href="#" className="item"><span className="icon icon-arrLeftRight"></span> </a></li>
                                <li><a href="#" className="item"><span className="icon icon-share"></span></a></li>
                                <li><a href="#" className="item"><span className="icon icon-heart"></span></a></li>
                            </ul>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="single-property-element single-property-desc">
                                <div className="h7 title fw-7">Description</div>
                                <p className="body-2 text-variant-1">Located around an hour away from Paris, between the Perche and the Iton valley, in a beautiful wooded park bordered by a charming stream, this country property immediately seduces with its bucolic and soothing environment.</p>
                                <p className="mt-8 body-2 text-variant-1">An ideal choice for sports and leisure enthusiasts who will be able to take advantage of its swimming pool (11m x 5m), tennis court, gym and sauna.</p>
                                <a href="#" className="btn-view"><span className="text">View More</span> </a>
                            </div>
                            <div className="single-property-element single-property-overview">
                                <div className="h7 title fw-7">Overview</div>
                                <ul className="info-box">
                                    <li className="item">
                                        <a href="#" className="box-icon w-52"><i className="icon icon-house-line"></i></a>
                                        <div className="content">
                                            <span className="label">ID:</span>
                                            <span>2297</span>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="box-icon w-52"><i className="icon icon-arrLeftRight"></i></a>
                                        <div className="content">
                                            <span className="label">Type:</span>
                                            <span>House</span>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="box-icon w-52"><i className="icon icon-bed"></i></a>
                                        <div className="content">
                                            <span className="label">Bedrooms:</span>
                                            <span>2 Rooms</span>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="box-icon w-52"><i className="icon icon-bathtub"></i></a>
                                        <div className="content">
                                            <span className="label">Bathrooms:</span>
                                            <span>2 Rooms</span>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="box-icon w-52"><i className="icon icon-garage"></i></a>
                                        <div className="content">
                                            <span className="label">Garages:</span>
                                            <span>2 Rooms</span>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="box-icon w-52"><i className="icon icon-ruler"></i></a>
                                        <div className="content">
                                            <span className="label">Size:</span>
                                            <span>900 SqFt</span>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="box-icon w-52"><i className="icon icon-crop"></i></a>
                                        <div className="content">
                                            <span className="label">Land Size:</span>
                                            <span>2,000 SqFt</span>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <a href="#" className="box-icon w-52"><i className="icon icon-hammer"></i></a>
                                        <div className="content">
                                            <span className="label">Year Built:</span>
                                            <span>2024</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="single-property-element single-property-video">
                                <div className="h7 title fw-7">Video</div>
                                <div className="img-video">
                                    <img src="images/banner/img-video.jpg" alt="img-video" />
                                    <a href="https://youtu.be/MLpWrANjFbI" data-fancybox="gallery2" className="btn-video"> <span className="icon icon-play"></span></a>
                                </div>
                            </div>
                            <div className="single-property-element single-property-info">
                                <div className="h7 title fw-7">Property Details</div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Property ID:</span>
                                            <div className="content fw-7">AVT1020</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Bedrooms:</span>
                                            <div className="content fw-7">4</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Price:</span>
                                            <div className="content fw-7">$250,00<span className="caption-1 fw-4 text-variant-1">/month</span></div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Bedrooms:</span>
                                            <div className="content fw-7">1</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Property Size:</span>
                                            <div className="content fw-7">1200 SqFt</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Bathsrooms:</span>
                                            <div className="content fw-7">1</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Year built:</span>
                                            <div className="content fw-7">2023 - 12 - 11</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Bathsrooms:</span>
                                            <div className="content fw-7">3</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Property Type:</span>
                                            <div className="content fw-7">House, Apartment</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Garage:</span>
                                            <div className="content fw-7">1</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Property Status:</span>
                                            <div className="content fw-7">For Rent</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inner-box">
                                            <span className="label">Garage Size:</span>
                                            <div className="content fw-7">1200 SqFt</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single-property-element single-property-feature">
                                <div className="h7 title fw-7">Amenities and features</div>
                                <div className="wrap-feature">
                                    <div className="box-feature">
                                        <div className="fw-7">Home safety:</div>
                                        <ul>
                                            <li className="feature-item">
                                                <span className="icon icon-smoke-alarm"></span>
                                                Smoke alarm
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-carbon"></span>
                                                Carbon monoxide alarm
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-kit"></span>
                                                First aid kit
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-lockbox"></span>
                                                Self check-in with lockbox
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-security"></span>
                                                Security cameras
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="box-feature">
                                        <div className="fw-7">Bedroom:</div>
                                        <ul>
                                            <li className="feature-item">
                                                <span className="icon icon-hanger"></span>
                                                Hangers
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-bed-line"></span>
                                                Bed linens
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-pillows"></span>
                                                Extra pillows & blankets
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-iron"></span>
                                                Iron
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-tv"></span>
                                                TV with standard cable
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="box-feature">
                                        <div className="fw-7">Kitchen:</div>
                                        <ul>
                                            <li className="feature-item">
                                                <span className="icon icon-refrigerator"></span>
                                                Refrigerator
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-microwave"></span>
                                                Microwave
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-microwave"></span>
                                                Dishwasher
                                            </li>
                                            <li className="feature-item">
                                                <span className="icon icon-coffee"></span>
                                                Coffee maker
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="single-property-element single-property-map">
                                <div className="h7 title fw-7">Map</div>
                                <div id="map-single" className="map-single" data-map-zoom="16" data-map-scroll="true"></div>
                                <ul className="info-map">
                                    <li>
                                        <div className="fw-7">Address</div>
                                        <span className="mt-4 text-variant-1">8 Broadway, Brooklyn, New York</span>
                                    </li>
                                    <li>
                                        <div className="fw-7">Downtown</div>
                                        <span className="mt-4 text-variant-1">5 min</span>

                                    </li>
                                    <li>
                                        <div className="fw-7">FLL</div>
                                        <span className="mt-4 text-variant-1">15 min</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="single-property-element single-property-floor">
                                <div className="h7 title fw-7">Floor plans</div>
                                <ul className="box-floor" id="parent-floor">
                                    <li className="floor-item">
                                        <div className="floor-header" data-bs-target="#floor-one" data-bs-toggle="collapse" aria-expanded="false" aria-controls="floor-one">
                                            <div className="inner-left">
                                                <i className="icon icon-arr-r"></i>
                                                <span className="fw-7">First Floor</span>
                                            </div>
                                            <ul className="inner-right">
                                                <li className="d-flex align-items-center gap-8">
                                                    <i className="icon icon-bed"></i>
                                                    2 Bedroom
                                                </li>
                                                <li className="d-flex align-items-center gap-8">
                                                    <i className="icon icon-bathtub"></i>
                                                    2 Bathroom
                                                </li>
                                            </ul>
                                        </div>
                                        <div id="floor-one" className="collapse show" data-bs-parent="#parent-floor">
                                            <div className="faq-body">
                                                <div className="box-img">
                                                    <img src="images/banner/floor.png" alt="img-floor" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="floor-item">
                                        <div className="floor-header collapsed" data-bs-target="#floor-two" data-bs-toggle="collapse" aria-expanded="false" aria-controls="floor-two">
                                            <div className="inner-left">
                                                <i className="icon icon-arr-r"></i>
                                                <span className="fw-7">Second Floor</span>
                                            </div>
                                            <ul className="inner-right">
                                                <li className="d-flex align-items-center gap-8">
                                                    <i className="icon icon-bed"></i>
                                                    2 Bedroom
                                                </li>
                                                <li className="d-flex align-items-center gap-8">
                                                    <i className="icon icon-bathtub"></i>
                                                    2 Bathroom
                                                </li>
                                            </ul>
                                        </div>
                                        <div id="floor-two" className="collapse" data-bs-parent="#parent-floor">
                                            <div className="faq-body">
                                                <div className="box-img">
                                                    <img src="images/banner/floor.png" alt="img-floor" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="single-property-element single-property-attachments">
                                <div className="h7 title fw-7">File Attachments</div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <a href="#" target="_blank" className="attachments-item">
                                            <div className="box-icon w-60">
                                                <img src="images/home/file-1.png" alt="file" />
                                            </div>
                                            <span>Villa-Document.pdf</span>
                                            <i className="icon icon-download"></i>
                                        </a>
                                    </div>
                                    <div className="col-sm-6">
                                        <a href="#" target="_blank" className="attachments-item">
                                            <div className="box-icon w-60">
                                                <img src="images/home/file-2.png" alt="file" />
                                            </div>
                                            <span>Villa-Document.pdf</span>
                                            <i className="icon icon-download"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="single-property-element single-property-explore">
                                <div className="h7 title fw-7">Explore Property</div>
                                <div className="box-img">
                                    <img src="images/banner/img-explore.jpg" alt="img" />
                                    <div className="box-icon w-80">
                                        <span className="icon icon-360"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="single-property-element single-property-loan">
                                <div className="h7 title fw-7">Loan Calculator</div>
                                <form action="#" className="box-loan-calc">
                                    <div className="box-top">
                                        <div className="item-calc">
                                            <label for="loan1" className="label">Total Amount:</label>
                                            <input type="number" id="loan1" placeholder="10,000" className="form-control" />
                                        </div>
                                        <div className="item-calc">
                                            <label for="loan1" className="label">Down Payment:</label>
                                            <input type="number" id="loan1" placeholder="3000" className="form-control" />
                                        </div>
                                        <div className="item-calc">
                                            <label for="loan1" className="label">Amortization Period (months):</label>
                                            <input type="number" id="loan1" placeholder="12" className="form-control" />
                                        </div>
                                        <div className="item-calc">
                                            <label for="loan1" className="label">Interest rate (%):</label>
                                            <input type="number" id="loan1" placeholder="5" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="box-bottom">
                                        <button className="tf-btn primary">Calculator</button>
                                        <div className="d-flex gap-4">
                                            <span className="h7 fw-7">Monthly Payment:</span>
                                            <span className="result h7 fw-7">$599.25</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="single-property-element single-property-nearby">
                                <div className="h7 title fw-7">What’s nearby?</div>
                                <p className="body-2">Explore nearby amenities to precisely locate your property and identify surrounding conveniences, providing a comprehensive overview of the living environment and the property's convenience.</p>
                                <div className="grid-2 box-nearby">
                                    <ul className="box-left">
                                        <li className="item-nearby">
                                            <span className="label">School:</span>
                                            <span className="fw-7">0.7 km</span>
                                        </li>
                                        <li className="item-nearby">
                                            <span className="label">University:</span>
                                            <span className="fw-7">1.3 km</span>
                                        </li>
                                        <li className="item-nearby">
                                            <span className="label">Grocery center:</span>
                                            <span className="fw-7">0.6 km</span>
                                        </li>
                                        <li className="item-nearby">
                                            <span className="label">Market:</span>
                                            <span className="fw-7">1.1 km</span>
                                        </li>
                                    </ul>
                                    <ul className="box-right">
                                        <li className="item-nearby">
                                            <span className="label">Hospital:</span>
                                            <span className="fw-7">0.4 km</span>
                                        </li>
                                        <li className="item-nearby">
                                            <span className="label">Metro station:</span>
                                            <span className="fw-7">1.8 km</span>
                                        </li>
                                        <li className="item-nearby">
                                            <span className="label">Gym, wellness:</span>
                                            <span className="fw-7">1.3 km</span>
                                        </li>
                                        <li className="item-nearby">
                                            <span className="label">River:</span>
                                            <span className="fw-7">2.1 km</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div className="single-property-element single-wrapper-review">
                                <div className="box-title-review d-flex justify-content-between align-items-center flex-wrap gap-20">
                                    <div className="h7 fw-7">Guest Reviews</div>
                                    <a href="#" className="tf-btn">View All Reviews</a>
                                </div>
                                <div className="wrap-review">
                                    <ul className="box-review">
                                        <li className="list-review-item">
                                            <div className="avatar avt-60 round">
                                                <img src="images/avatar/avt-2.jpg" alt="avatar" />
                                            </div>
                                            <div className="content">
                                                <div className="name h7 fw-7 text-black">Viola Lucas
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                            d="M0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0C3.5888 0 0 3.5888 0 8ZM12.1657 6.56569C12.4781 6.25327 12.4781 5.74673 12.1657 5.43431C11.8533 5.1219 11.3467 5.1219 11.0343 5.43431L7.2 9.26863L5.36569 7.43431C5.05327 7.12189 4.54673 7.12189 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L6.63432 10.9657C6.94673 11.2781 7.45327 11.2781 7.76569 10.9657L12.1657 6.56569Z"
                                                            fill="#198754" />
                                                    </svg>
                                                </div>
                                                <span className="mt-4 d-inline-block  date body-3 text-variant-2">August 13,
                                                    2023</span>
                                                <ul className="mt-8 list-star">
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                </ul>
                                                <p className="mt-12 body-2 text-black">It's really easy to use and it is
                                                    exactly what I am looking for. A lot of good looking templates &
                                                    it's highly customizable. Live support is helpful, solved my issue
                                                    in no time.</p>
                                                <ul className="box-img-review">
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <img src="images/blog/review1.jpg" alt="img-review" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <img src="images/blog/review2.jpg" alt="img-review" />

                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <img src="images/blog/review3.jpg" alt="img-review" />

                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <img src="images/blog/review4.jpg" alt="img-review" />

                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <span className="fw-7">+12</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="list-review-item">
                                            <div className="avatar avt-60 round">
                                                <img src="images/avatar/avt-3.jpg" alt="avatar" />
                                            </div>
                                            <div className="content">
                                                <div className="name h7 fw-7 text-black">Viola Lucas
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                            d="M0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0C3.5888 0 0 3.5888 0 8ZM12.1657 6.56569C12.4781 6.25327 12.4781 5.74673 12.1657 5.43431C11.8533 5.1219 11.3467 5.1219 11.0343 5.43431L7.2 9.26863L5.36569 7.43431C5.05327 7.12189 4.54673 7.12189 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L6.63432 10.9657C6.94673 11.2781 7.45327 11.2781 7.76569 10.9657L12.1657 6.56569Z"
                                                            fill="#198754" />
                                                    </svg>
                                                </div>
                                                <span className="mt-4 d-inline-block  date body-3 text-variant-2">August 13,
                                                    2023</span>
                                                <ul className="mt-8 list-star">
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                </ul>
                                                <p className="mt-12 body-2 text-black">It's really easy to use and it is
                                                    exactly what I am looking for. A lot of good looking templates &
                                                    it's highly customizable. Live support is helpful, solved my issue
                                                    in no time.</p>

                                            </div>
                                        </li>
                                        <li className="list-review-item">
                                            <div className="avatar avt-60 round">
                                                <img src="images/avatar/avt-4.jpg" alt="avatar" />
                                            </div>
                                            <div className="content">
                                                <div className="name h7 fw-7 text-black">Darlene Robertson
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                            d="M0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0C3.5888 0 0 3.5888 0 8ZM12.1657 6.56569C12.4781 6.25327 12.4781 5.74673 12.1657 5.43431C11.8533 5.1219 11.3467 5.1219 11.0343 5.43431L7.2 9.26863L5.36569 7.43431C5.05327 7.12189 4.54673 7.12189 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L6.63432 10.9657C6.94673 11.2781 7.45327 11.2781 7.76569 10.9657L12.1657 6.56569Z"
                                                            fill="#198754" />
                                                    </svg>
                                                </div>
                                                <span className="mt-4 d-inline-block  date body-3 text-variant-2">August 13, 2023</span>
                                                <ul className="mt-8 list-star">
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                </ul>
                                                <p className="mt-12 body-2 text-black">It's really easy to use and it is
                                                    exactly what I am looking for. A lot of good looking templates &
                                                    it's highly customizable. Live support is helpful, solved my issue
                                                    in no time.</p>

                                            </div>
                                        </li>
                                        <li className="list-review-item">
                                            <div className="avatar avt-60 round">
                                                <img src="images/avatar/avt-2.jpg" alt="avatar" />
                                            </div>
                                            <div className="content">
                                                <div className="name h7 fw-7 text-black">Viola Lucas
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                            d="M0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0C3.5888 0 0 3.5888 0 8ZM12.1657 6.56569C12.4781 6.25327 12.4781 5.74673 12.1657 5.43431C11.8533 5.1219 11.3467 5.1219 11.0343 5.43431L7.2 9.26863L5.36569 7.43431C5.05327 7.12189 4.54673 7.12189 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L6.63432 10.9657C6.94673 11.2781 7.45327 11.2781 7.76569 10.9657L12.1657 6.56569Z"
                                                            fill="#198754" />
                                                    </svg>
                                                </div>
                                                <span className="mt-4 d-inline-block  date body-3 text-variant-2">August 13,
                                                    2023</span>
                                                <ul className="mt-8 list-star">
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                    <li className="icon-star"></li>
                                                </ul>
                                                <p className="mt-12 body-2 text-black">It's really easy to use and it is
                                                    exactly what I am looking for. A lot of good looking templates &
                                                    it's highly customizable. Live support is helpful, solved my issue
                                                    in no time.</p>
                                                <ul className="box-img-review">
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <img src="images/blog/review1.jpg" alt="img-review" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <img src="images/blog/review2.jpg" alt="img-review" />

                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <img src="images/blog/review3.jpg" alt="img-review" />

                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <img src="images/blog/review4.jpg" alt="img-review" />

                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="img-review">
                                                            <span className="fw-7">+12</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <a href="#" className="view-question">See more answered questions (719)</a>
                                            </div>
                                        </li>
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
                                                    <input type="checkbox" className="tf-checkbox" id="cb-ip" />
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
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="widget-sidebar fixed-sidebar wrapper-sidebar-right">
                                <div className="widget-box single-property-contact bg-surface">
                                    <div className="h7 title fw-7">Contact Sellers</div>
                                    <div className="box-avatar">
                                        <div className="avatar avt-100 round">
                                            <img src="images/avatar/avt-12.jpg" alt="avatar" />
                                        </div>
                                        <div className="info">
                                            <div className="text-1 name">Shara Conner</div>
                                            <span>91-7411043895 themesflat@gmail.com</span>
                                        </div>
                                    </div>
                                    <form action="#" className="contact-form">
                                        <div className="ip-group">
                                            <label for="fullname">Full Name:</label>
                                            <input type="text" placeholder="Jony Dane" className="form-control" />
                                        </div>
                                        <div className="ip-group">
                                            <label for="phone">Phone Number:</label>
                                            <input type="text" placeholder="ex 0123456789" className="form-control" />
                                        </div>
                                        <div className="ip-group">
                                            <label for="email">Email Address:</label>
                                            <input type="text" placeholder="themesflat@gmail.com" className="form-control" />
                                        </div>
                                        <div className="ip-group">
                                            <label for="message">Your Message:</label>
                                            <textarea id="comment-message" name="message" rows="4" tabindex="4"
                                                placeholder="Message" aria-required="true"></textarea>
                                        </div>
                                        <button className="tf-btn primary w-100">Send Message</button>
                                    </form>
                                </div>
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
                                <div className="widget-box single-property-whychoose bg-surface">
                                    <div className="h7 title fw-7">Why Choose Us?</div>
                                    <ul className="box-whychoose">
                                        <li className="item-why">
                                            <i className="icon icon-secure"></i>
                                            Secure Booking
                                        </li>
                                        <li className="item-why">
                                            <i className="icon icon-guarantee"></i>
                                            Best Price Guarantee
                                        </li>
                                        <li className="item-why">
                                            <i className="icon icon-booking"></i>
                                            Easy Booking Process
                                        </li>
                                        <li className="item-why">
                                            <i className="icon icon-support"></i>
                                            Available Support 24/7
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            * <section className="flat-section pt-0 flat-latest-property">
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
                        {propertyData.map((property, index) => (
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

            <Footer />


        </div>
    )
}

export default Properties
