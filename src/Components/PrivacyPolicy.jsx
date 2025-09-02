import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div>
        <Header />
                  <section class="flat-title-page style-2">
                <div class="container">
                    <ul class="breadcrumb">
                        <li><Link to="/home">Home</Link></li>
                        <li>/ Pages</li>
                        <li>/ Privacy Policy</li>
                    </ul>
                    <h2 class="text-center">Privacy Policy</h2>
                </div>
            </section>
            {/* <!-- End Page Title --> */}

          
            <section class="flat-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <ul class="nav-tab-privacy" role="tablist">
                                <li class="nav-tab-item" role="presentation">   
                                    <Link to="/terms" class="nav-link-item" data-bs-toggle="tab">1. Terms </Link>
                                </li>
                                <li class="nav-tab-item" role="presentation">
                                    <Link to="/limitations" class="nav-link-item active" data-bs-toggle="tab">2. Limitations</Link>
                                </li>
                                <li class="nav-tab-item" role="presentation">
                                    <Link to="/revisions" class="nav-link-item" data-bs-toggle="tab">3. Revisions and errata</Link>
                                </li>
                                <li class="nav-tab-item" role="presentation">
                                    <Link to="/modifications" class="nav-link-item" data-bs-toggle="tab">4. Site terms of use modifications</Link>
                                </li>
                                
                                <li class="nav-tab-item" role="presentation">
                                    <Link to="/risks" class="nav-link-item" data-bs-toggle="tab">5. Risks</Link>
                                </li>
                            </ul>
                           
                        </div>
                        <div class="col-lg-7">
                            <h5 class="text-capitalize title">Terms of use</h5>
                            <div class="tab-content content-box-privacy">
                                <div class="tab-pane fade" id="terms" role="tabpanel">
                                    <h6>1. Terms </h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed euismod justo, sit amet efficitur dui. Aliquam sodales vestibulum velit, eget sollicitudin quam. Donec non aliquam eros. Etiam sit amet lectus vel justo dignissim condimentum.</p>
                                    <p>In malesuada neque quis libero laoreet posuere. In consequat vitae ligula quis rutrum. Morbi dolor orci, maximus a pulvinar sed, bibendum ac lacus. Suspendisse in consectetur lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis blandit.</p>
                                    <p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie</p>
                                    
                                </div>
                                <div class="tab-pane fade active show" id="limitations" role="tabpanel">
                                    <h6>2. Limitations</h6>
                                    <p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie a, finibus nec ex.</p>
                                    <ul class="box-list">
                                        <li>Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis blandit.</li>
                                        <li>Etiam eleifend metus at nunc ultricies facilisis.</li>
                                        <li>Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie a, finibus nec ex.</li>
                                    </ul>
                                    <p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie</p>
                                </div>
                                <div class="tab-pane fade" id="revisions" role="tabpanel">
                                    <h6>3. Revisions and errata</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed euismod justo, sit amet efficitur dui. Aliquam sodales vestibulum velit, eget sollicitudin quam. Donec non aliquam eros. Etiam sit amet lectus vel justo dignissim condimentum.</p>
                                    <p>In malesuada neque quis libero laoreet posuere. In consequat vitae ligula quis rutrum. Morbi dolor orci, maximus a pulvinar sed, bibendum ac lacus. Suspendisse in consectetur lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis</p>
                                    <p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie a, finibus nec ex.</p>
                                </div>
                                <div class="tab-pane fade" id="modifications" role="tabpanel">
                                    <h6>4. Site terms of use modifications</h6>
                                    <p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie </p>
                                    <ul class="box-list">
                                        <li>Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis blandit.</li>
                                        <li>Etiam eleifend metus at nunc ultricies facilisis.</li>
                                        <li>Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie a, finibus nec ex.</li>
                                    </ul>
                                    <p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie </p>
                                </div>
                                <div class="tab-pane fade" id="risks" role="tabpanel">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed euismod justo, sit amet efficitur dui. Aliquam sodales vestibulum velit, eget sollicitudin quam. Donec non aliquam eros. Etiam sit amet lectus vel justo dignissim condimentum.</p>
                                    <p>In malesuada neque quis libero laoreet posuere. In consequat vitae ligula quis rutrum. Morbi dolor orci, maximus a pulvinar sed, bibendum ac lacus. Suspendisse in consectetur lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis blandit.</p>
                                    <p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie </p>
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
            <Footer />
            
    </div>
  )
}

export default PrivacyPolicy
