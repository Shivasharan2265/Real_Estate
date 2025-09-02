import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import "./Addproperty.css"; // Import styles
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AddProperty = () => {

  const [percentage, setPercentage] = useState(0);
  const [listingType, setListingType] = useState("Sell");
  const [ownerPercentage, setOwnerPercentage] = useState("");
  const [developerPercentage, setDeveloperPercentage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [brokerageAmount, setBrokerageAmount] = useState("");
  const [amenities, setAmenities] = useState({
    // Amenities
    maintenanceStaff: false,
    waterStorage: false,
    wasteDisposal: false,
    rainWaterHarvesting: false,
    pipedGas: false,
    waterPurifier: false,
    visitorParking: false,
    fengShui: false,
    park: false,

    // Property Features
    highCeilingHeight: false,
    falseCeilingLighting: false,
    internetWifi: false,
    centrallyAirConditioned: false,
    securityFireAlarm: false,
    recentlyRenovated: false,
    privateGardenTerrace: false,
    naturalLight: false,
    anyRooms: false,
    intercomFacility: false,
    spaciousInteriors: false,

    // Society/Building features
    fitnessCentre: false,
    swimmingPool: false,
    clubHouse: false,
    securityPersonnel: false,
    lift: false,

    // Additional Features
    separateEntryServantRoom: false,
    noOpenDrainage: false,
    bankAttachedProperty: false,
    lowDensitySociety: false,

    // Water Source
    municipalCorporation: false,
    borewellTank: false,
    water24x7: false,

    // Overlooking
    overlookingPool: false,
    overlookingPark: false,
    overlookingClub: false,
    overlookingMainRoad: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [propertyType, setPropertyType] = useState("");
  const [subPropertyType, setSubPropertyType] = useState("");
  const [subPropertyQuestionOption, setSubPropertyQuestionOption] = useState("");
  const [subPropertyQuestionOptionLvl2, setSubPropertyQuestionOptionLvl2] = useState("");
  // 🟡 RENT DETAILS STATES
  const [availableFrom, setAvailableFrom] = useState("");
  const [willingTo, setWillingTo] = useState("");            // Family / Single men / Single women
  const [expectedRent, setExpectedRent] = useState("");
  const [elecWaterExcluded, setElecWaterExcluded] = useState(false);
  const [agreementType, setAgreementType] = useState("");    // Company lease agreement / Any
  const [allowBroker, setAllowBroker] = useState("");        // Yes / No
  const [membershipCharge, setMembershipCharge] = useState("");
  const [apartmentBhk, setApartmentBhk] = useState("");
  const [retailWashroom, setRetailWashroom] = useState([]);
  const [files, setFiles] = useState([]);

  const [previewList, setPreviewList] = useState([]);
  const fileInputRef = useRef(null);




  // handlers
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    addFiles(Array.from(e.target.files));
  };

  const addFiles = (incoming) => {
    const valid = incoming.filter((file) => {
      return (
        file.type.startsWith("image/") ||
        file.type.startsWith("video/")
      );
    });

    const previews = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setFiles((prev) => [...prev, ...valid]);
    setPreviewList((prev) => [...prev, ...previews]);
  };

  const handleOwnerPercentageChange = (e) => {
    setOwnerPercentage(e.target.value);
  };

  const handleDeveloperPercentageChange = (e) => {
    setDeveloperPercentage(e.target.value);
  };



  // Location step states
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [subLocality, setSubLocality] = useState("");
  const [apartment, setApartment] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [selectedOwnership, setSelectedOwnership] = useState("")
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [balconies, setBalconies] = useState(0);
  const [areaType, setAreaType] = useState("");
  const [areaUnit, setAreaUnit] = useState("");
  const [otherRooms, setOtherRooms] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [furnishingType, setFurnishingType] = useState("Furnished");
  const [totalFloors, setTotalFloors] = useState("");
  const [propertyOnFloor, setPropertyOnFloor] = useState("");
  const [ageOfProperty, setAgeOfProperty] = useState("0-1 years");
  const [previewFiles, setPreviewFiles] = useState([]);
  const [minSeats, setMinSeats] = useState("");
  const [maxSeats, setMaxSeats] = useState("");
  const [noOfCabins, setNoOfCabins] = useState("");
  const [noOfMeetingRooms, setNoOfMeetingRooms] = useState("");
  const [washroom, setWashroom] = useState("");
  const [conferenceRoom, setConferenceRoom] = useState("");
  const [receptionArea, setReceptionArea] = useState("");
  const [pantryType, setPantryType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [airConditioning, setAirConditioning] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [ups, setUps] = useState("");
  const [fireSafety, setFireSafety] = useState([]);     // stores array of selected fire-safety options
  const [staircases, setStaircases] = useState("");     // 1 / 2 / 3 etc.
  const [lifts, setLifts] = useState("");
  const [parking, setParking] = useState("");
  const [wallStatus, setWallStatus] = useState("");
  const [doorsConstructed, setDoorsConstructed] = useState("");
  const [washroomBare, setWashroomBare] = useState("");
  const [flooringType, setFlooringType] = useState("");
  const [entranceWidth, setEntranceWidth] = useState("");
  const [entranceUnit, setEntranceUnit] = useState("");
  const [showEntranceUnit, setShowEntranceUnit] = useState(false);
  const [ceilingHeight, setCeilingHeight] = useState("");
  const [ceilingUnit, setCeilingUnit] = useState("");
  const [showCeilingUnit, setShowCeilingUnit] = useState(false);
  // const [retailWashroom, setRetailWashroom] = useState("");
  const [locatedNear, setLocatedNear] = useState("");
  const [parkingTypeRetail, setParkingTypeRetail] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [showBusinessTypes, setShowBusinessTypes] = useState(false);
  const [roadWidth, setRoadWidth] = useState("");
  const [roadUnit, setRoadUnit] = useState("");
  const [showRoadUnit, setShowRoadUnit] = useState(false);
  const [propertyFacing, setPropertyFacing] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [hospitalityWash, setHospitalityWash] = useState("");
  const [qualityRating, setQualityRating] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [allInclusive, setAllInclusive] = useState(false);
  const [taxGovt, setTaxGovt] = useState(false);
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [showAdditionalPricing, setShowAdditionalPricing] = useState(false);
  const [maintenanceUnit, setMaintenanceUnit] = useState("");
  const [rental, setRental] = useState("");
  const [uniqueProperty, setUniqueProperty] = useState("");
  const [apartmentType, setApartmentType] = useState('');
  // Step 5 states (paste with your other useState declarations)
  const [selectedSubProperty, setSelectedSubProperty] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [pricePerSqYards, setPricePerSqYards] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    allInclusive: false,
    taxExcluded: false,
    negotiable: false,
  });
  const [maintenance, setMaintenance] = useState("");
  const [maintenanceFreq, setMaintenanceFreq] = useState("Monthly");
  const [expectedRental, setExpectedRental] = useState("");
  const [bookingAmount, setBookingAmount] = useState("");
  const [annualDues, setAnnualDues] = useState("");
  const [brokerage, setBrokerage] = useState(""); // "yes" | "no"
  const [description, setDescription] = useState("");
  const UNIT_OPTIONS = ["Sq.ft", "Sq.yards", "Sq.m", "Acres", "Marla", "Cents"];
  const [carpetArea, setCarpetArea] = useState("");
  const [carpetUnit, setCarpetUnit] = useState("");
  const [showCarpetUnits, setShowCarpetUnits] = useState(false);
  const [showBuiltUpArea, setShowBuiltUpArea] = useState(false);
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [builtUpUnit, setBuiltUpUnit] = useState("");
  const [showBuiltUpUnits, setShowBuiltUpUnits] = useState(false);
  const [possessionBy, setPossessionBy] = useState("");
  const [coveredParking, setCoveredParking] = useState(0);
  const [openParking, setOpenParking] = useState(0);
  const [sharedUnit, setSharedUnit] = useState("Sq.ft");
  const [plotArea, setPlotArea] = useState('');
  const [plotAreaUnit, setPlotAreaUnit] = useState('Sq.ft');
  const [plotLength, setPlotLength] = useState('');
  const [plotBreadth, setPlotBreadth] = useState('');
  const [floorsAllowed, setFloorsAllowed] = useState('');
  const [hasBoundaryWall, setHasBoundaryWall] = useState(null);
  const [openSides, setOpenSides] = useState(null);
  const [hasConstruction, setHasConstruction] = useState(null);
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [showCarpetArea, setShowCarpetArea] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [furnishings, setFurnishings] = useState({
    Light: 1,
    Warehouse: 0,
  });
  const [furnishingCheckboxes, setFurnishingCheckboxes] = useState({
    "Sofa": false,
    "Washing Machine": true,
    "Stove": false,
    "Fridge": true,
    "Water Purifier": false,
    "Microwave": true,
    "Modular Kitchen": false,
    "Chimney": false,
    "Dinning Table": false,
    "Curtains": false,
    "Exhaust Fan": false,
  });

  const steps = [
    { title: "Basic Details", subtitle: "Step 1" },
    { title: "Location Details", subtitle: "step 2" },
    { title: "Property Profile", subtitle: "Step 3" },
    { title: "Photos, Videos & Voice-over", subtitle: "Step 4" },
    { title: "Pricing & Others", subtitle: "Step 5" },
    { title: "Amenities", subtitle: "Step 6" }
  ];


  const toggleAmenity = (amenity) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };


  // ---- add these two states above return ----
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingPropertyType, setPendingPropertyType] = useState("");

  // confirmation handler
  const handlePropertyTypeChange = (newType) => {
    if (
      (propertyType === "Residential" && (newType === "Commercial" || newType === "Layout/Land development")) ||
      (propertyType === "Commercial" && (newType === "Residential" || newType === "Layout/Land development")) ||
      (propertyType === "Layout/Land development" && (newType === "Residential" || newType === "Commercial"))
    ) {
      // Show confirmation modal+
      setPendingPropertyType(newType);
      setShowConfirmModal(true);
      return;
    }

    // Directly change if no confirmation needed
    setPropertyType(newType);
    setSubPropertyType("");
    setSubPropertyQuestionOption("");
    setSubPropertyQuestionOptionLvl2("");
  };



  const handleFurnishingCount = (item, change) => {
    setFurnishings((prev) => ({
      ...prev,
      [item]: Math.max(0, (prev[item] || 0) + change),
    }));
  };

  const toggleFurnishingCheckbox = (item) => {
    setFurnishingCheckboxes((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };
  const toggleRentOption = (option) => {
    setWillingToRent((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };



  const propertyOptions = ["Residential", "Commercial", "Layout/Land development"];


  const subPropertyOptions = {
    Residential: [
      "Flat / Apartment",
      "Independent House / Villa",
      "Independent Floor",
      "Plot / Land",
      "1 RK / Studio Apartment",
      "Serviced Apartment",
      "Farmhouse ",
      "Others"
    ],
    Commercial: ["Office", "Retail", "Plot", "Storage", "Industry", "Hospitality", "Others"]
  };

  const propertyTypes = (listingType === "Joint Venture"
    ? ["Residential", "Commercial", "Layout/Land development"]
    : ["Residential", "Commercial"]
  ) || [];


  const commercialOfficeOptions = [
    "Ready to move office space",
    "Bare shell office space",
    "Co-working office space"
  ];

  const commercialRetailOptions = [
    "Commercial Shops",
    "Commercial Showrooms"
  ];

  const commercialRetailLocationOptions = [
    "Mall",
    "Commercial Project",
    "Residential Project",
    "Retail Complex / Building",
    "Market / High Street",
    "Other"
  ];

  const commercialPlotOptions = [
    "Commercial Land/inst.Land",
    "Agriculture/Farm Land",
    "Industrial Lands/Plots"
  ];

  const commercialStorageOptions = [
    "Ware House",
    "Cold Storage"
  ];

  const commercialIndustryOptions = [
    "Factory",
    "Manufacturing"
  ];

  const commercialHospitalityOptions = [
    "Hotel / Resorts",
    "Guest-House / Banquet Hall"
  ];


  const questionOptions = {
    Flat: ["1 BHK", "2 BHK", "3 BHK"],
    Villa: ["Independent Villa", "Row House"],
    Plot: ["Residential Plot", "Gated Plot"],
    Farmhouse: ["Developed", "Undeveloped"],

    Office: ["Ready to move office space", "Bare shell office space"],
    "Retail Plot": ["Mall", "High Street"],
    Storage: ["Warehouse", "Cold Storage"],
    Industry: ["Small Scale", "Large Scale"]



  };

  // Function to handle Continue
  const handleContinue = () => {
    if (selectedSubProperty) {
      setCurrentStep("location"); // move to location step
    }
  };

  const handleLocationContinue = () => {
    setCurrentStep(3); // Move to Property Profile
  };

  const handleFileUpdate = (fileItems) => {
    // Clean old URLs to prevent memory leaks
    previewFiles.forEach(file => URL.revokeObjectURL(file.preview));

    const newFiles = fileItems.map(fileItem => {
      const fileObj = fileItem.file;
      return {
        file: fileObj,
        preview: URL.createObjectURL(fileObj),
      };
    });

    setFiles(fileItems.map(fileItem => fileItem.file));
    setPreviewFiles(newFiles);
  };

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      previewFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [previewFiles]);

  // helpers
  const toggleCheckbox = (key) =>
    setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleStep5Continue = () => {
    setCurrentStep(6); // Go directly to Amenities step
  };

  const handleConstructionTypeChange = (type, isChecked) => {
    if (isChecked) {
      setConstructionTypes([...constructionTypes, type]);
    } else {
      setConstructionTypes(constructionTypes.filter(t => t !== type));
    }
  };

  useEffect(() => {
    const allData = {
      currentStep,
      listingType,
      propertyType,
      subPropertyType,
      subPropertyQuestionOption,
      city,
      selectedOwnership,
      location,
      subLocality,
      apartment,
      houseNo,
      bedrooms,
      bathrooms,
      balconies,
      areaType,
      areaUnit,
      otherRooms,
      furnishingType,
      furnishings,
      furnishingCheckboxes,
      totalFloors,
      propertyOnFloor,
      ageOfProperty,
      files,
      expectedPrice,
      pricePerSqYards,
      checkboxes,
      maintenance,
      maintenanceFreq,
      expectedRental,
      bookingAmount,
      annualDues,
      brokerage,
      description,
      carpetArea,
      carpetUnit,
      builtUpArea,
      builtUpUnit,
      availabilityStatus,
      allInclusive,
      taxGovt,
      priceNegotiable,
      showAdditionalPricing,
      maintenanceUnit,
      rental,
      uniqueProperty,
      apartmentType,
      amenities
    };

    localStorage.setItem("addPropertyForm", JSON.stringify(allData));
  }, [
    currentStep,
    listingType,
    propertyType,
    subPropertyType,
    subPropertyQuestionOption,
    city,
    selectedOwnership,
    location,
    subLocality,
    apartment,
    houseNo,
    bedrooms,
    bathrooms,
    balconies,
    areaType,
    areaUnit,
    otherRooms,
    furnishingType,
    furnishings,
    furnishingCheckboxes,
    totalFloors,
    propertyOnFloor,
    ageOfProperty,
    files,
    expectedPrice,
    pricePerSqYards,
    checkboxes,
    maintenance,
    maintenanceFreq,
    expectedRental,
    bookingAmount,
    annualDues,
    brokerage,
    description,
    carpetArea,
    carpetUnit,
    builtUpArea,
    builtUpUnit,
    availabilityStatus,
    allInclusive,
    taxGovt,
    priceNegotiable,
    showAdditionalPricing,
    maintenanceUnit,
    rental,
    uniqueProperty,
    apartmentType,
    amenities
  ]);
  useEffect(() => {
    const savedData = localStorage.getItem("addPropertyForm");
    if (savedData) {
      const parsed = JSON.parse(savedData);

      setCurrentStep(parsed.currentStep || 1);
      setListingType(parsed.listingType || "");
      setPropertyType(parsed.propertyType || "");
      setSubPropertyType(parsed.subPropertyType || "");
      setSubPropertyQuestionOption(parsed.subPropertyQuestionOption || "");
      setCity(parsed.city || "");
      setSelectedOwnership(parsed.selectedOwnership || "");
      setLocation(parsed.location || "");
      setSubLocality(parsed.subLocality || "");
      setApartment(parsed.apartment || "");
      setHouseNo(parsed.houseNo || "");
      setBedrooms(parsed.bedrooms || 1);
      setBathrooms(parsed.bathrooms || 1);
      setBalconies(parsed.balconies || 0);
      setAreaType(parsed.areaType || "");
      setAreaUnit(parsed.areaUnit || "");
      setOtherRooms(parsed.otherRooms || []);
      setFurnishingType(parsed.furnishingType || "Furnished");
      setFurnishings(parsed.furnishings || {});
      setFurnishingCheckboxes(parsed.furnishingCheckboxes || {});
      setTotalFloors(parsed.totalFloors || "");
      setPropertyOnFloor(parsed.propertyOnFloor || "");
      setAgeOfProperty(parsed.ageOfProperty || "0-1 years");
      setFiles(parsed.files || []);
      setExpectedPrice(parsed.expectedPrice || "");
      setPricePerSqYards(parsed.pricePerSqYards || "");
      setCheckboxes(parsed.checkboxes || {});
      setMaintenance(parsed.maintenance || "");
      setMaintenanceFreq(parsed.maintenanceFreq || "Monthly");
      setExpectedRental(parsed.expectedRental || "");
      setBookingAmount(parsed.bookingAmount || "");
      setAnnualDues(parsed.annualDues || "");
      setBrokerage(parsed.brokerage || "");
      setDescription(parsed.description || "");
      setCarpetArea(parsed.carpetArea || "");
      setCarpetUnit(parsed.carpetUnit || "");
      setBuiltUpArea(parsed.builtUpArea || "");
      setBuiltUpUnit(parsed.builtUpUnit || "");
      setAvailabilityStatus(parsed.availabilityStatus || "");
      setAllInclusive(parsed.allInclusive || false);
      setTaxGovt(parsed.taxGovt || false);
      setPriceNegotiable(parsed.priceNegotiable || false);
      setShowAdditionalPricing(parsed.showAdditionalPricing || false);
      setMaintenanceUnit(parsed.maintenanceUnit || "");
      setRental(parsed.rental || "");
      setUniqueProperty(parsed.uniqueProperty || "");
      setApartmentType(parsed.apartmentType || "");
      setAmenities(parsed.amenities || {});
    }
  }, []);

  async function handleSubmitPropperty() {
    const fd = new FormData();

    // Simple field values

    fd.append('title', title);
    fd.append('keyword', keyword);
    fd.append('brokerageAmount', brokerageAmount);
    fd.append('listingType', listingType);
    fd.append('propertyType', propertyType);
    fd.append('subPropertyType', subPropertyType);
    fd.append('subPropertyQuestionOption', subPropertyQuestionOption);
    fd.append('subPropertyQuestionOptionLvl2', subPropertyQuestionOptionLvl2);
    fd.append('city', city);
    fd.append('location', location);
    fd.append('subLocality', subLocality);
    fd.append('apartment', apartment);
    fd.append('houseNo', houseNo);
    fd.append('selectedOwnership', selectedOwnership);
    fd.append('bedrooms', bedrooms);
    fd.append('bathrooms', bathrooms);
    fd.append('balconies', balconies);
    fd.append('areaType', areaType);
    fd.append('areaUnit', areaUnit);
    fd.append('totalFloors', totalFloors);
    fd.append('propertyOnFloor', propertyOnFloor);
    fd.append('ageOfProperty', ageOfProperty);
    fd.append('minSeats', minSeats);
    fd.append('maxSeats', maxSeats);
    fd.append('noOfCabins', noOfCabins);
    fd.append('noOfMeetingRooms', noOfMeetingRooms);
    fd.append('washroom', washroom);
    fd.append('conferenceRoom', conferenceRoom);
    fd.append('receptionArea', receptionArea);
    fd.append('pantryType', pantryType);
    fd.append('furnishing', furnishing);
    fd.append('airConditioning', airConditioning);
    fd.append('oxygen', oxygen);
    fd.append('ups', ups);
    fd.append('staircases', staircases);
    fd.append('lifts', lifts);
    fd.append('parking', parking);
    fd.append('wallStatus', wallStatus);
    fd.append('doorsConstructed', doorsConstructed);
    fd.append('washroomBare', washroomBare);
    fd.append('flooringType', flooringType);
    fd.append('entranceWidth', entranceWidth);
    fd.append('entranceUnit', entranceUnit);
    fd.append('ceilingHeight', ceilingHeight);
    fd.append('ceilingUnit', ceilingUnit);
    fd.append('retailWashroom', retailWashroom);
    fd.append('locatedNear', locatedNear);
    fd.append('parkingTypeRetail', parkingTypeRetail);
    fd.append('roadWidth', roadWidth);
    fd.append('roadUnit', roadUnit);
    fd.append('propertyFacing', propertyFacing);
    fd.append('totalRooms', totalRooms);
    fd.append('hospitalityWash', hospitalityWash);
    fd.append('qualityRating', qualityRating);
    fd.append('availabilityStatus', availabilityStatus);
    fd.append('maintenance', maintenance);
    fd.append('maintenanceFreq', maintenanceFreq);
    fd.append('expectedRental', expectedRental);
    fd.append('bookingAmount', bookingAmount);
    fd.append('annualDues', annualDues);
    fd.append('brokerage', brokerage);
    fd.append('description', description);
    fd.append('carpetArea', carpetArea);
    fd.append('carpetUnit', carpetUnit);
    fd.append('builtUpArea', builtUpArea);
    fd.append('builtUpUnit', builtUpUnit);
    fd.append('possessionBy', possessionBy);
    fd.append('coveredParking', coveredParking);
    fd.append('openParking', openParking);
    fd.append('plotArea', plotArea);
    fd.append('plotAreaUnit', plotAreaUnit);
    fd.append('plotLength', plotLength);
    fd.append('plotBreadth', plotBreadth);
    fd.append('floorsAllowed', floorsAllowed);
    fd.append('hasBoundaryWall', hasBoundaryWall);
    fd.append('openSides', openSides);
    fd.append('hasConstruction', hasConstruction);


    fd.append('availableFrom', availableFrom);
    fd.append('willingTo', willingTo);
    fd.append('expectedRent', expectedRent);
    fd.append('elecWaterExcluded', elecWaterExcluded);
    fd.append('agreementType', agreementType);
    fd.append('allowBroker', allowBroker);
    fd.append('membershipCharge', membershipCharge);
    fd.append('apartmentBhk', apartmentBhk);

    fd.append('selectedSubProperty', selectedSubProperty);
    fd.append('expectedPrice', expectedPrice);
    fd.append('pricePerSqYards', pricePerSqYards);

    fd.append('uniqueProperty', uniqueProperty);
    fd.append('apartmentType', apartmentType);






    // Arrays / objects need special handling
    // Append amenities
    // Object.keys(amenities).forEach(key => {
    //   fd.append(`amenities[${key}]`, amenities[key]);
    // });

    Object.keys(amenities).forEach(key => {
      if (amenities[key] === true) {
        fd.append('amenities[]', key);
      }
    });


    // Fire Safety (array of selected options)
    fireSafety.forEach((fs, index) => {
      fd.append(`fireSafety[${index}]`, fs);
    });

    // Business Types (array of selected)
    businessTypes.forEach((b, index) => {
      fd.append(`businessTypes[${index}]`, b);
    });

    // Furnishing Checkboxes
    Object.keys(furnishingCheckboxes).forEach(key => {
      fd.append(`furnishingCheckboxes[${key}]`, furnishingCheckboxes[key]);
    });

    // Additional pricing checkboxes
    Object.keys(checkboxes).forEach(key => {
      fd.append(`checkboxes[${key}]`, checkboxes[key]);
    });

    // Images/files
    files.forEach((file) => {
      fd.append("files", file);
    });

    fd.forEach((value, key) => {
      console.log(key, value);


    });

  }

  useEffect(() => {
    const progress = Math.floor((currentStep / 6) * 100);
    setPercentage(progress);
  }, [currentStep]);









  return (



    <div
      style={{
        fontFamily: '"Josefin Sans", sans-serif',
        color: "#161E2D",
        fontWeight: "600",

      }}
    >
      <Header />
      <div className="container" style={{
        marginTop: "10px",
        maxWidth: "1200px",
        padding: "0 20px",
        position: "relative"

      }}>
        <div className="row" style={{ display: "flex", width: "100%" }}>
          {/* Mobile Stepper (Horizontal) */}
          <div
            className="col-12 d-md-none"
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              overflowX: "auto",
              whiteSpace: "nowrap",
              paddingBottom: "10px",
              position: "sticky",
              top: "0",
              backgroundColor: "#fff",
              zIndex: 100,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "flex-start" }}>
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                  <div
                    key={`mobile-${index}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: "80px",
                      padding: "0 5px",
                      cursor: "pointer",
                      position: "relative"
                    }}
                    onClick={() => {
                      if (stepNumber <= currentStep) setCurrentStep(stepNumber);
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: `2px solid ${isCompleted || isActive ? "#ED2027" : "#999"}`,
                        backgroundColor: isCompleted ? "#ED2027" : "#fff",
                        color: isCompleted ? "#fff" : isActive ? "#ED2027" : "#999",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "12px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {isCompleted ? "✓" : stepNumber}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "5px",
                        fontWeight: isActive ? "600" : "500",
                        fontSize: "12px",
                        color: isActive ? "#333" : "#666",
                        whiteSpace: "normal",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      {step.title}
                    </div>
                    {index !== steps.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          left: "calc(50% + 20px)",
                          top: "12px",
                          width: "40px",
                          height: "2px",
                          backgroundColor: stepNumber < currentStep ? "#ED2027" : "#999",
                          opacity: 0.8
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Stepper (Vertical) */}

          <div
            className="col-md-4 d-none d-md-block"
            style={{

              width: "30%",
              position: "sticky",
              top: "100px",
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
              paddingRight: "30px",
              fontWeight: "600",
              marginTop: "15px"
            }}
          >
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;

              return (
                <div
                  key={`desktop-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    marginBottom: "0.6rem"

                  }}
                  onClick={() => {
                    if (stepNumber <= currentStep) setCurrentStep(stepNumber);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: `2px solid ${isCompleted || isActive ? "#ED2027" : "#999"}`,
                        backgroundColor: isCompleted ? "#ED2027" : "#fff",
                        color: isCompleted ? "#fff" : isActive ? "#ED2027" : "#999",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "12px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {isCompleted ? "✓" : stepNumber}
                    </div>
                    {index !== steps.length - 1 && (
                      <div
                        style={{
                          width: "2px",
                          height: "30px",
                          backgroundColor: stepNumber < currentStep ? "#ED2027" : "#999",
                          margin: "5px 0",
                          opacity: 0.8
                        }}
                      />
                    )}
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <div
                      style={{
                        fontWeight: isActive ? "600" : "500",
                        fontSize: "15px",
                        color: isActive ? "#161E2D" : "#161E2D",
                        marginBottom: "2px"
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: isActive ? "#ED2027" : "#999",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {step.subtitle}
                      {step.editable && (
                        <span
                          style={{
                            marginLeft: "8px",
                            color: "#ED2027",
                            cursor: "pointer",
                            fontSize: "11px",
                            fontWeight: "500"
                          }}
                        >
                          Edit
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              );
            })}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f4f6f8",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
                marginLeft: "-25px"
              }}
            >
              <div style={{ width: "70px", marginRight: "15px", marginTop: "20px" }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={{
                    path: { stroke: "#31AB3D" },
                    text: { fill: "#161E2D", fontSize: "28px" },   // keep same font size
                    trail: { stroke: "#e6e6e6" },
                  }}
                />
              </div>


              <div>
                <p style={{ margin: 0, fontWeight: 600, color: "#161E2D", fontFamily: '"Josefin Sans", sans-serif', fontSize: "16px", }}>
                  Property Score
                </p>

                <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>
                  Better your property score,<br />
                  greater your visibility
                </p>
              </div>
            </div>

          </div>


          {/* Step Content */}
          <div className="col-12 col-md-8" style={{
            // width: "70%",
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            marginBottom: "30px",
          }}>



            {/* Inline responsive styles */}
            <style>
              {`
      @media (max-width: 575px) {
        .button-group,
        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .subproperty-option {
          width: 100%;
        }

        .continue-btn {
          width: 100%;
        }

        .title h6 {
          font-size: 14px;
          line-height: 20px;
        }

        .step-heading,
        .step-subheading {
          font-size: 15px;
          line-height: 22px;
        }
      }
    `}
            </style>


            {/* Step 1 - Basic Details */}
            {/* ----------------------- STEP 1 ----------------------- */}
            {/* ----------------------- STEP 1 ----------------------- */}
            {currentStep === 1 && (
              <>
                <div
                  className="title"
                  style={{ text: "semibold", color: "#161E2D", marginBottom: "20px" }}
                >
                  <h6>
                    Welcome Back Buddy
                    <br className="title-break" />
                    Fill out basic deatils
                  </h6>
                </div>

                {/* LISTING TYPE */}
                <h4 className="step-heading" style={{ color: "#161E2D" }}>
                  Choose Listing Type
                </h4>
                <div className="button-group">
                  {["Sell", "Rent", "Joint Venture"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setListingType(type);
                        setPropertyType("");
                        setSubPropertyType("");
                        setSubPropertyQuestionOption("");
                        setSubPropertyQuestionOptionLvl2("");
                      }}
                      className={`button-option ${listingType === type ? "active" : ""}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* PROPERTY TYPE */}
                <h4 className="step-subheading" style={{ color: "#161E2D" }}>
                  What kind of property do you have?
                </h4>
                <div className="radio-group">
                  {(listingType === "Joint Venture"
                    ? ["Residential", "Commercial", "Layout/Land development"]
                    : ["Residential", "Commercial"]
                  ).map((type) => (
                    <label key={type} className="radio-label">
                      <input
                        type="radio"
                        name="propertyType"
                        value={type}
                        checked={propertyType === type}
                        onChange={() => handlePropertyTypeChange(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>

                {/* If Layout/Land development under Joint Venture */}
                {listingType === "Joint Venture" &&
                  propertyType === "Layout/Land development" && (
                    <button
                      className="continue-btn"
                      onClick={() => setCurrentStep(2)}
                      style={{
                        marginTop: "20px",
                        padding: "12px 24px",
                        backgroundColor: "#ED2027",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
                      Continue
                    </button>
                  )}

                {/* SUB PROPERTY OPTIONS */}
                {propertyType && propertyType !== "Layout/Land development" && (
                  <div className="button-group">
                    {(() => {
                      if (listingType === "Joint Venture") {
                        if (propertyType === "Residential") {
                          return [
                            "Flat / Apartment",
                            "Independent House / Villa",
                            "1 RK / Studio Apartment",
                            "Farmhouse",
                          ].map((subType) => (
                            <div
                              key={subType}
                              onClick={() => {
                                setSubPropertyType(subType);
                                setSubPropertyQuestionOption("");
                                setSubPropertyQuestionOptionLvl2("");
                              }}
                              className={`subproperty-option ${subPropertyType === subType ? "active" : ""
                                }`}
                            >
                              {subType}
                            </div>
                          ));
                        } else if (propertyType === "Commercial") {
                          return ["Office", "Retail", "Industry", "Hospitality"].map(
                            (subType) => (
                              <div
                                key={subType}
                                onClick={() => {
                                  setSubPropertyType(subType);
                                  setSubPropertyQuestionOption("");
                                  setSubPropertyQuestionOptionLvl2("");
                                }}
                                className={`subproperty-option ${subPropertyType === subType ? "active" : ""
                                  }`}
                              >
                                {subType}
                              </div>
                            )
                          );
                        }
                      }

                      // Default SELL/RENT
                      return (propertyType === "Residential"
                        ? subPropertyOptions[propertyType].filter(
                          (sub) => (listingType === "Rent" ? sub !== "Plot / Land" : true)
                        )
                        : subPropertyOptions[propertyType]
                      ).map((subType) => (
                        <div
                          key={subType}
                          onClick={() => {
                            setSubPropertyType(subType);
                            setSubPropertyQuestionOption("");
                            setSubPropertyQuestionOptionLvl2("");
                          }}
                          className={`subproperty-option ${subPropertyType === subType ? "active" : ""
                            }`}
                        >
                          {subType}
                        </div>
                      ));
                    })()}
                  </div>
                )}

                {/* ===== Commercial follow-ups (ONLY for Sell/Rent, not Joint Venture) ===== */}
                {listingType !== "Joint Venture" && (
                  <>
                    {propertyType === "Commercial" && subPropertyType === "Office" && (
                      <>
                        <h4 className="step-label" style={{ color: "#161E2D" }}>
                          What type of office is it?
                        </h4>
                        <div className="button-group">
                          {commercialOfficeOptions.map((opt) => (
                            <div
                              key={opt}
                              onClick={() => setSubPropertyQuestionOption(opt)}
                              className={`subproperty-option ${subPropertyQuestionOption === opt ? "active" : ""
                                }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {propertyType === "Commercial" && subPropertyType === "Retail" && (
                      <>
                        <h4 className="step-label" style={{ color: "#161E2D" }}>
                          What type of retail space do you have?
                        </h4>
                        <div className="button-group">
                          {commercialRetailOptions.map((opt) => (
                            <div
                              key={opt}
                              onClick={() => {
                                setSubPropertyQuestionOption(opt);
                                setSubPropertyQuestionOptionLvl2("");
                              }}
                              className={`subproperty-option ${subPropertyQuestionOption === opt ? "active" : ""
                                }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>

                        {subPropertyQuestionOption && (
                          <>
                            <p className="step-label" style={{ color: "#161E2D" }}>
                              Your shop is located inside?
                            </p>
                            <div className="button-group">
                              {commercialRetailLocationOptions.map((opt) => (
                                <div
                                  key={opt}
                                  onClick={() => setSubPropertyQuestionOptionLvl2(opt)}
                                  className={`subproperty-option ${subPropertyQuestionOptionLvl2 === opt ? "active" : ""
                                    }`}
                                >
                                  {opt}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {propertyType === "Commercial" && subPropertyType === "Plot" && (
                      <>
                        <p className="step-label">What kind of plot/land is it?</p>
                        <div className="button-group">
                          {commercialPlotOptions.map((opt) => (
                            <div
                              key={opt}
                              onClick={() => setSubPropertyQuestionOption(opt)}
                              className={`subproperty-option ${subPropertyQuestionOption === opt ? "active" : ""
                                }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {propertyType === "Commercial" && subPropertyType === "Storage" && (
                      <>
                        <p className="step-label">What kind of storage is it?</p>
                        <div className="button-group">
                          {commercialStorageOptions.map((opt) => (
                            <div
                              key={opt}
                              onClick={() => setSubPropertyQuestionOption(opt)}
                              className={`subproperty-option ${subPropertyQuestionOption === opt ? "active" : ""
                                }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {propertyType === "Commercial" && subPropertyType === "Industry" && (
                      <>
                        <p className="step-label">What kind of industry is it?</p>
                        <div className="button-group">
                          {commercialIndustryOptions.map((opt) => (
                            <div
                              key={opt}
                              onClick={() => setSubPropertyQuestionOption(opt)}
                              className={`subproperty-option ${subPropertyQuestionOption === opt ? "active" : ""
                                }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {propertyType === "Commercial" && subPropertyType === "Hospitality" && (
                      <>
                        <p className="step-label" style={{ color: "#161E2D" }}>
                          What kind of hospitality is it?
                        </p>
                        <div className="button-group">
                          {commercialHospitalityOptions.map((opt) => (
                            <div
                              key={opt}
                              onClick={() => setSubPropertyQuestionOption(opt)}
                              className={`subproperty-option ${subPropertyQuestionOption === opt ? "active" : ""
                                }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* CONTINUE BUTTON */}
                {subPropertyType && propertyType !== "Layout/Land development" && (
                  <>
                    {(() => {
                      const isCommercial = propertyType === "Commercial";
                      const isListingTypeSet = listingType !== "";
                      const isPropertyTypeSet = propertyType !== "";

                      // For Sell/Rent, validation stays same
                      const isValidRetail =
                        listingType !== "Joint Venture" &&
                        isCommercial &&
                        subPropertyType === "Retail" &&
                        subPropertyQuestionOption &&
                        subPropertyQuestionOptionLvl2;

                      const isValidOffice =
                        listingType !== "Joint Venture" &&
                        isCommercial &&
                        subPropertyType === "Office" &&
                        subPropertyQuestionOption;

                      const isValidOtherCommercial =
                        listingType !== "Joint Venture" &&
                        isCommercial &&
                        ["Plot", "Storage", "Industry", "Hospitality"].includes(
                          subPropertyType
                        ) &&
                        subPropertyQuestionOption;

                      // Joint Venture = simple continue if subPropertyType selected
                      const isJV = listingType === "Joint Venture" && subPropertyType;

                      const isResidentialOrSimple =
                        !isCommercial ||
                        (isCommercial &&
                          ![
                            "Retail",
                            "Office",
                            "Plot",
                            "Storage",
                            "Industry",
                            "Hospitality",
                          ].includes(subPropertyType));

                      const canContinue =
                        isListingTypeSet &&
                        isPropertyTypeSet &&
                        (isJV ||
                          isValidRetail ||
                          isValidOffice ||
                          isValidOtherCommercial ||
                          (isResidentialOrSimple && subPropertyType));

                      return canContinue ? (
                        <button className="continue-btn" onClick={() => setCurrentStep(2)}>
                          Continue
                        </button>
                      ) : (
                        <button
                          className="continue-btn"
                          onClick={() =>
                            alert("Please complete all selections before continuing.")
                          }
                        >
                          Continue
                        </button>
                      );
                    })()}
                  </>
                )}

                {/* ===== Confirmation Popup Card ===== */}
                {showConfirmModal && (
                  <div className="modal-overlay">
                    <div className="confirm-card">
                      <h6 className="confirm-message">
                        Changing this field will change inputs made throughout the form. Do
                        you want to continue?
                      </h6>
                      <div className="button-group">
                        <button
                          className="cancel-btn"
                          onClick={() => {
                            setShowConfirmModal(false);
                            setPendingPropertyType("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="popup-continue-btn"
                          onClick={() => {
                            setShowConfirmModal(false);
                            setPropertyType(pendingPropertyType);
                            setPendingPropertyType("");
                            setSubPropertyType("");
                            setSubPropertyQuestionOption("");
                            setSubPropertyQuestionOptionLvl2("");
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}




            {/* Step 2 - Location Details */}
            {/* Step 2 - Location Details */}
            {currentStep === 2 && (
              <div>
                <h4 className="step-heading">Where is your property Located?</h4>

                {/* City Select */}
                <div className="form-group">
                  <label>City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select City</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>

                {/* You are? Buttons */}
                {city && (
                  <div className="form-group">
                    <label>You are?</label>
                    <div className="ownership-buttons">
                      {["Owner", "Broker", "Builder"].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedOwnership(role)}
                          className={`ownership-option ${selectedOwnership === role ? "active" : ""
                            }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Input */}
                {selectedOwnership && (
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="Enter Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="input-field"
                    />
                  </div>
                )}

                {/* Apartment Select */}
                {location && (
                  <div className="form-group">
                    <label>Apartment/Project</label>
                    <select
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="select-field"
                    >
                      <option value="">Select Apartment</option>
                      <option value="Prestige Lakeside">Prestige Lakeside</option>
                      <option value="Brigade Gateway">Brigade Gateway</option>
                      <option value="Sobha Dream Acres">Sobha Dream Acres</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}

                {/* House No. Input */}
                <div className="house-no-group">
                  <label>House No. (Optional)</label>
                  <input
                    type="text"
                    placeholder="House No."
                    value={houseNo}
                    onChange={(e) => setHouseNo(e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* Continue button */}
                {city && selectedOwnership && location && apartment && (
                  <button onClick={handleLocationContinue} className="continue-btn">
                    Continue
                  </button>
                )}
              </div>
            )}

            {/* Steps 3 Placeholder */}
            {currentStep === 3 && (
              <div className="step3-container">
                {/* Property Profile Header */}
                <h4 className="step3-header">
                  Tell us about your property
                </h4>


                {(subPropertyType.includes("Flat / Apartment") || subPropertyType.includes("Independent Floor") || subPropertyType.includes("Serviced Apartment")) && (
                  <>


                    {/* Rent + Residential */}
                    {listingType === "Rent" && propertyType === "Residential" && (
                      <>
                        {/* Apartment Type (BHK) */}
                        <div className="step3-section">
                          <label className="step3-label">Your apartment is a</label>
                          <div className="step3-button-group">
                            {["1 BHK", "2 BHK", "3 BHK", "Other"].map((bhk) => (
                              <button
                                key={bhk}
                                type="button"
                                onClick={() => setApartmentBhk(bhk)}
                                className={`step3-option-btn ${apartmentBhk === bhk ? "active" : ""
                                  }`}
                              >
                                {bhk}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Room Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Add Room Details
                          </h6>

                          {/* Bedrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bedrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBedrooms(num)}
                                  className={`step3-number-btn ${bedrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bathrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bathrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBathrooms(num)}
                                  className={`step3-number-btn ${bathrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Balconies */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              Balconies
                            </label>
                            <div className="step3-button-group">
                              {[0, 1, 2, 3, "More than 3"].map((val) => (
                                <div
                                  key={val}
                                  onClick={() => setBalconies(val)}
                                  className={`step3-option-btn ${balconies === val ? 'active' : ''}`}
                                >
                                  {val}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Area Details */}
                        <div className="step3-section">
                          <div className="step3-section-header">
                            <label className="step3-label">
                              Add Area Details
                            </label>
                            <span className="step3-info-icon">ⓘ</span>
                          </div>
                          <p className="step3-mandatory-text">
                            At least one area type mandatory
                          </p>

                          {/* Carpet Area */}
                          {/* Carpet Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u); // 🔹 Sync both units
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Validation for Carpet Area */}
                          {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                            <p className="step3-error">Carpet area must be smaller than built-up area</p>
                          )}

                          {/* Built-up Area */}
                          {!showBuiltUpArea ? (
                            <button
                              type="button"
                              onClick={() => setShowBuiltUpArea(true)}
                              className="step3-add-btn"
                            >
                              + Add Built-up Area
                            </button>
                          ) : (
                            <div className="step3-input-group">
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowBuiltUpUnits((p) => !p)}
                              >
                                {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                              </div>

                              {showBuiltUpUnits && (
                                <div className="step3-unit-dropdown">
                                  {UNIT_OPTIONS.map((u) => (
                                    <div
                                      key={u}
                                      onClick={() => {
                                        setBuiltUpUnit(u);
                                        setCarpetUnit(u); // 🔹 Sync both units
                                        setShowBuiltUpUnits(false);
                                      }}
                                      className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                    >
                                      {u}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                        </div>



                        {/* Furnishing */}
                        <div className="section">
                          <label className="section-label">Furnishing</label>
                          <div className="furnishing-options">
                            {["Furnished", "Semi-furnished", "Un-furnished"].map((type) => (
                              <div
                                key={type}
                                onClick={() => setFurnishingType(type)}
                                className={`furnishing-chip ${furnishingType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </div>
                            ))}
                          </div>

                          {/* Show only when Furnished or Semi-furnished */}
                          {(furnishingType === "Furnished" || furnishingType === "Semi-furnished") && (
                            <>

                              <p style={{ marginTop: "10px", fontFamily: '"Josefin Sans", sans-serif', fontWeight: "600" }}>
                                At least three furnishings are mandatory for furnished
                              </p>


                              <div className="furnishing-grid">
                                {Object.keys(furnishings).map((item) => (
                                  <div key={item} className="furnishing-item">
                                    <button
                                      onClick={() => handleFurnishingCount(item, -1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-minus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-minus` ? "hovered" : ""
                                        }`}
                                    >
                                      –
                                    </button>
                                    <span className="count-value">{furnishings[item]}</span>
                                    <button
                                      onClick={() => handleFurnishingCount(item, 1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-plus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-plus` ? "hovered" : ""
                                        }`}
                                    >
                                      +
                                    </button>
                                    <span className="furnishing-name">{item}</span>
                                  </div>
                                ))}

                                {Object.keys(furnishingCheckboxes).map((item) => (
                                  <label key={item} className="furnishing-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={furnishingCheckboxes[item]}
                                      onChange={() => toggleFurnishingCheckbox(item)}
                                    />
                                    {item}
                                  </label>
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Floor Details */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Floor Details
                          </label>
                          <div className="step3-floor-group">
                            <input
                              type="number"
                              value={totalFloors}
                              onChange={(e) => {
                                const v = e.target.value;
                                setTotalFloors(v);
                                const nTotal = parseInt(v, 10);
                                const nProp = parseInt(propertyOnFloor, 10);
                                if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                  setPropertyOnFloor(String(nTotal));
                                }
                              }}
                              placeholder="Total Floors"
                              className="step3-floor-input"
                            />
                            <select
                              value={propertyOnFloor}
                              onChange={(e) => setPropertyOnFloor(e.target.value)}
                              className="step3-floor-select"
                            >
                              <option value="" hidden>Property on Floor</option>
                              <option value="Basement">Basement</option>
                              <option value="Lower Ground">Lower Ground</option>
                              <option value="Ground">Ground</option>
                              {(() => {
                                const n = parseInt(totalFloors, 10);
                                if (!Number.isNaN(n) && n > 0) {
                                  return Array.from({ length: n }, (_, i) => i + 1).map((f) => (
                                    <option key={f} value={String(f)}>
                                      {f}
                                    </option>
                                  ));
                                }
                                return null;
                              })()}
                            </select>
                          </div>
                        </div>



                        {/* Age of property if Ready to Move */}

                        <div className="step3-section">
                          <label className="step3-label">Age of property</label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? "active" : ""
                                  }`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* ------------------- RENT DETAILS ------------------- */}
                        {/* Available From */}
                        <div className="step3-section">
                          <label className="step3-label">Available from</label>
                          <input
                            type="date"
                            value={availableFrom}
                            onChange={(e) => setAvailableFrom(e.target.value)}
                            className="step3-input"
                          />
                        </div>

                        {/* Willing to rent out to */}
                        <div className="step3-section">
                          <label className="step3-label">Willing to rent out to</label>
                          <div className="step3-button-group">
                            {["Family", "Single men", "Single women"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setWillingTo(opt)}
                                className={`step3-option-btn ${willingTo === opt ? "active" : ""
                                  }`}
                              >
                                + {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Rent Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">Rent Details</h6>
                          <div className="step3-price-group">
                            <input
                              type="number"
                              placeholder="₹ Expected Rent"
                              value={expectedRent}
                              onChange={(e) => setExpectedRent(e.target.value)}
                              className={`step3-input ${!expectedRent ? "error-border" : ""}`}
                            />
                          </div>
                          <small className="step3-subnote">₹ Price in words</small>

                          {/* Checkboxes */}
                          <div className="step3-checkbox-group">
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={elecWaterExcluded}
                                onChange={(e) => setElecWaterExcluded(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Electricity & Water charges excluded
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={priceNegotiable}
                                onChange={(e) => setPriceNegotiable(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Price Negotiable
                            </label>
                          </div>
                        </div>
                        {/* Additional Price Details */}
                        <div className="step3-section">
                          <button
                            type="button"
                            onClick={() => setShowAdditionalPricing((prev) => !prev)}
                            className="step3-toggle-btn"
                          >
                            {showAdditionalPricing
                              ? "− Hide  more Rent Details"
                              : "+ Add more Rent Details (Optional)"}
                          </button>

                          {showAdditionalPricing && (
                            <div className="step3-additional-fields">
                              {/* Maintenance + unit */}
                              <div className="step3-input-group">
                                <input
                                  type="number"
                                  placeholder="Maintenance"
                                  value={maintenance}
                                  onChange={(e) => setMaintenance(e.target.value)}
                                  className="step3-input"
                                />
                                <select
                                  value={maintenanceUnit}
                                  onChange={(e) => setMaintenanceUnit(e.target.value)}
                                  className="step3-unit-select"
                                >
                                  <option value="">Select</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Annually">Annually</option>
                                  <option value="One Time">One Time</option>
                                  <option value="Per Unit">Per Unit</option>
                                </select>
                              </div>

                              {/* Booking Amount */}
                              <input
                                type="number"
                                placeholder="Booking Amount"
                                value={bookingAmount}
                                onChange={(e) => setBookingAmount(e.target.value)}
                                className="step3-input"
                              />

                              {/* Membership Charge */}
                              <input
                                type="number"
                                placeholder="Membership Charge"
                                value={membershipCharge}
                                onChange={(e) => setMembershipCharge(e.target.value)}
                                className="step3-input"
                              />
                            </div>
                          )}
                        </div>


                        {/* Preferred Agreement Type */}
                        <div className="step3-section">
                          <label className="step3-label">Preferred agreement type</label>
                          <div className="step3-button-group">
                            {["Company lease agreement", "Any"].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setAgreementType(type)}
                                className={`step3-option-btn ${agreementType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Broker contact permission */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Are you ok with brokers contacting you?
                          </label>
                          <div className="step3-button-group">
                            {["Yes", "No"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setAllowBroker(opt)}
                                className={`step3-option-btn ${allowBroker === opt ? "active" : ""
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Unique Property */}
                        <div className="step3-section">
                          <p className="step3-label">
                            What makes your property unique?
                          </p>
                          <textarea
                            placeholder="What makes your property unique?"
                            value={uniqueProperty}
                            onChange={(e) => setUniqueProperty(e.target.value)}
                            rows={3}
                            className="step3-textarea"
                          />
                        </div>
                        {/* ------------------- END OF RENT DETAILS ------------------- */}


                      </>
                    )}

                    {/* Sell + Residential */}
                    {listingType === "Sell" && propertyType === "Residential" && (
                      <>
                        {/* Room Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Add Room Details
                          </h6>

                          {/* Bedrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bedrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBedrooms(num)}
                                  className={`step3-number-btn ${bedrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bathrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bathrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBathrooms(num)}
                                  className={`step3-number-btn ${bathrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Balconies */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              Balconies
                            </label>
                            <div className="step3-button-group">
                              {[0, 1, 2, 3, "More than 3"].map((val) => (
                                <div
                                  key={val}
                                  onClick={() => setBalconies(val)}
                                  className={`step3-option-btn ${balconies === val ? 'active' : ''}`}
                                >
                                  {val}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Area Details */}
                        <div className="step3-section">
                          <div className="step3-section-header">
                            <label className="step3-label">
                              Add Area Details
                            </label>
                            <span className="step3-info-icon">ⓘ</span>
                          </div>
                          <p className="step3-mandatory-text">
                            At least one area type mandatory
                          </p>

                          {/* Carpet Area */}
                          {/* Carpet Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u); // 🔹 Sync both units
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Validation for Carpet Area */}
                          {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                            <p className="step3-error">Carpet area must be smaller than built-up area</p>
                          )}

                          {/* Built-up Area */}
                          {!showBuiltUpArea ? (
                            <button
                              type="button"
                              onClick={() => setShowBuiltUpArea(true)}
                              className="step3-add-btn"
                            >
                              + Add Built-up Area
                            </button>
                          ) : (
                            <div className="step3-input-group">
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowBuiltUpUnits((p) => !p)}
                              >
                                {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                              </div>

                              {showBuiltUpUnits && (
                                <div className="step3-unit-dropdown">
                                  {UNIT_OPTIONS.map((u) => (
                                    <div
                                      key={u}
                                      onClick={() => {
                                        setBuiltUpUnit(u);
                                        setCarpetUnit(u); // 🔹 Sync both units
                                        setShowBuiltUpUnits(false);
                                      }}
                                      className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                    >
                                      {u}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                        </div>

                        {/* Floor Details */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Floor Details
                          </label>
                          <div className="step3-floor-group">
                            <input
                              type="number"
                              value={totalFloors}
                              onChange={(e) => {
                                const v = e.target.value;
                                setTotalFloors(v);
                                const nTotal = parseInt(v, 10);
                                const nProp = parseInt(propertyOnFloor, 10);
                                if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                  setPropertyOnFloor(String(nTotal));
                                }
                              }}
                              placeholder="Total Floors"
                              className="step3-floor-input"
                            />
                            <select
                              value={propertyOnFloor}
                              onChange={(e) => setPropertyOnFloor(e.target.value)}
                              className="step3-floor-select"
                            >
                              <option value="" hidden>Property on Floor</option>
                              <option value="Basement">Basement</option>
                              <option value="Lower Ground">Lower Ground</option>
                              <option value="Ground">Ground</option>
                              {(() => {
                                const n = parseInt(totalFloors, 10);
                                if (!Number.isNaN(n) && n > 0) {
                                  return Array.from({ length: n }, (_, i) => i + 1).map((f) => (
                                    <option key={f} value={String(f)}>
                                      {f}
                                    </option>
                                  ));
                                }
                                return null;
                              })()}
                            </select>
                          </div>
                        </div>

                        {/* Availability Status */}
                        {/* Availability Status */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Availability Status
                          </label>
                          <div className="step3-button-group">
                            {["Ready to Move", "Under Construction"].map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => setAvailabilityStatus(status)}
                                className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Age of property if Ready to Move */}
                        {availabilityStatus === "Ready to Move" && (
                          <div className="step3-section">
                            <label className="step3-label">
                              Age of property
                            </label>
                            <div className="step3-button-group">
                              {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                                <button
                                  key={age}
                                  type="button"
                                  onClick={() => setAgeOfProperty(age)}
                                  className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                                >
                                  {age}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Possession By if Under Construction */}
                        {availabilityStatus === "Under Construction" && (
                          <div className="step3-section">
                            <label className="step3-label">Possession By</label>
                            <select
                              value={possessionBy}
                              onChange={(e) => setPossessionBy(e.target.value)}
                              className="step3-input"
                            >
                              <option value="" hidden>Expected time</option>
                              <option value="Within 3 Months">Within 3 Months</option>
                              <option value="Within 6 Months">Within 6 Months</option>
                              <option value="By 2026">By 2026</option>
                              <option value="By 2027">By 2027</option>
                              <option value="By 2028">By 2028</option>
                              <option value="By 2029">By 2029</option>
                              <option value="By 2030">By 2030</option>
                            </select>
                          </div>
                        )}

                        {/* Age of property */}

                        {/* Ownership */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Ownership
                          </label>
                          <div className="step3-button-group">
                            {["Freehold", "Leasehold", "Co-operative Society", "Power of Attorney"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setSelectedOwnership(opt)}
                                className={`step3-option-btn ${selectedOwnership === opt ? 'active' : ''}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="step3-container">
                          {/* Price Details */}
                          <div className="step3-section">
                            <h6 className="step3-subheader">
                              Price Details
                            </h6>
                            <div className="step3-price-group">
                              <input
                                type="number"
                                placeholder="Expected Price"
                                value={expectedPrice}
                                onChange={(e) => setExpectedPrice(e.target.value)}
                                className="step3-input"
                              />
                              <input
                                type="number"
                                placeholder="Price per Sq.Ft"
                                value={
                                  expectedPrice && (carpetArea || builtUpArea)
                                    ? (
                                      parseFloat(expectedPrice) /
                                      parseFloat(carpetArea || builtUpArea)
                                    ).toFixed(2)
                                    : ""
                                }
                                readOnly
                                className="step3-input step3-readonly-input"
                              />
                            </div>
                            <div className="step3-checkbox-group">
                              <label className="step3-checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={allInclusive}
                                  onChange={(e) => setAllInclusive(e.target.checked)}
                                  className="step3-checkbox"
                                />
                                All Inclusive Price?
                              </label>
                              <label className="step3-checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={taxGovt}
                                  onChange={(e) => setTaxGovt(e.target.checked)}
                                  className="step3-checkbox"
                                />
                                Tax & Govt. Charges
                              </label>
                              <label className="step3-checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={priceNegotiable}
                                  onChange={(e) => setPriceNegotiable(e.target.checked)}
                                  className="step3-checkbox"
                                />
                                Price Negotiable
                              </label>
                            </div>
                          </div>

                          {/* Additional Price Details */}
                          <div className="step3-section">
                            <button
                              type="button"
                              onClick={() => setShowAdditionalPricing((prev) => !prev)}
                              className="step3-toggle-btn"
                            >
                              {showAdditionalPricing
                                ? "− Hide Additional Price Details"
                                : "+ Add Additional Price Details (Optional)"}
                            </button>

                            {showAdditionalPricing && (
                              <div className="step3-additional-fields">
                                <div className="step3-input-group">
                                  <input
                                    type="number"
                                    placeholder="Maintenance"
                                    value={maintenance}
                                    onChange={(e) => setMaintenance(e.target.value)}
                                    className="step3-input"
                                  />
                                  <select
                                    value={maintenanceUnit}
                                    onChange={(e) => setMaintenanceUnit(e.target.value)}
                                    className="step3-unit-select"
                                  >
                                    <option value="">Select</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Annually">Annually</option>
                                    <option value="One Time">One Time</option>
                                    <option value="Per Unit">Per Unit</option>
                                  </select>
                                </div>
                                <input
                                  type="number"
                                  placeholder="Rental"
                                  value={rental}
                                  onChange={(e) => setRental(e.target.value)}
                                  className="step3-input"
                                />
                                <input
                                  type="number"
                                  placeholder="Booking Amount"
                                  value={bookingAmount}
                                  onChange={(e) => setBookingAmount(e.target.value)}
                                  className="step3-input"
                                />
                                <input
                                  type="number"
                                  placeholder="Annual Dues Payable Membership Charge"
                                  value={annualDues}
                                  onChange={(e) => setAnnualDues(e.target.value)}
                                  className="step3-input"
                                />
                              </div>
                            )}
                          </div>

                          {/* Unique Property */}
                          <div className="step3-section">
                            <p className="step3-label">
                              What makes your property unique?
                            </p>
                            <textarea
                              placeholder="What makes your property unique?"
                              value={uniqueProperty}
                              onChange={(e) => setUniqueProperty(e.target.value)}
                              rows={3}
                              className="step3-textarea"
                            />
                          </div>
                        </div>
                      </>
                    )}

                  </>
                )}

                {subPropertyType.includes("Independent House / Villa") && (
                  <>

                    {/* Sell + Residential */}
                    {listingType === "Sell" && propertyType === "Residential" && (
                      <>
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Add Room Details
                          </h6>

                          {/* Bedrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bedrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBedrooms(num)}
                                  className={`step3-number-btn ${bedrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bathrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bathrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBathrooms(num)}
                                  className={`step3-number-btn ${bathrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Balconies */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              Balconies
                            </label>
                            <div className="step3-button-group">
                              {[0, 1, 2, 3, "More than 3"].map((val) => (
                                <div
                                  key={val}
                                  onClick={() => setBalconies(val)}
                                  className={`step3-option-btn ${balconies === val ? 'active' : ''}`}
                                >
                                  {val}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* plotinput */}


                        {/* Area Details */}
                        <div className="step3-section">
                          <label className="step3-label">Add Area Details</label>
                          <p className="step3-mandatory-text">Please enter the plot size</p>

                          {/* Plot Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Plot Area"
                              value={plotArea}
                              onChange={(e) => setPlotArea(e.target.value)}
                              className="step3-input"
                            />
                            <select
                              value={sharedUnit}
                              onChange={(e) => setSharedUnit(e.target.value)}
                              className="step3-unit-select"
                            >
                              {UNIT_OPTIONS.map((u) => (
                                <option key={u} value={u}>{u}</option>
                              ))}
                            </select>
                          </div>

                          {/* Before Clicking - Both buttons in 1 row */}
                          {!showBuiltUpArea && !showCarpetArea && (
                            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                              <button
                                type="button"
                                onClick={() => setShowBuiltUpArea(true)}
                                className="step3-add-btn"
                                style={{ flex: 1 }}
                              >
                                + Add Built-up Area
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowCarpetArea(true)}
                                className="step3-add-btn"
                                style={{ flex: 1 }}
                              >
                                + Add Carpet Area
                              </button>
                            </div>
                          )}

                          {/* Built-up Area Input (its own row) */}
                          {showBuiltUpArea && (
                            <div className="step3-input-group" style={{ marginTop: "10px" }}>
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowUnitDropdown((p) => !p)}
                              >
                                {sharedUnit} <span className="step3-dropdown-icon">▼</span>
                              </div>
                            </div>
                          )}

                          {/* Carpet Area Input (its own row) */}
                          {showCarpetArea && (
                            <div className="step3-input-group" style={{ marginTop: "10px" }}>
                              <input
                                type="number"
                                placeholder="Carpet Area"
                                value={carpetArea}
                                onChange={(e) => setCarpetArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowUnitDropdown((p) => !p)}
                              >
                                {sharedUnit} <span className="step3-dropdown-icon">▼</span>
                              </div>
                            </div>
                          )}

                          {/* Custom Dropdown (shared) */}
                          {showUnitDropdown && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setSharedUnit(u);
                                    setShowUnitDropdown(false);
                                  }}
                                  className={`step3-unit-option ${sharedUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* {floor deatils} */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Floor Details
                          </label>
                          <div className="step3-floor-group">
                            <input
                              type="number"
                              value={totalFloors}
                              onChange={(e) => {
                                const v = e.target.value;
                                setTotalFloors(v);
                                const nTotal = parseInt(v, 10);
                                const nProp = parseInt(propertyOnFloor, 10);
                                if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                  setPropertyOnFloor(String(nTotal));
                                }
                              }}
                              placeholder="Total Floors"
                              className="step3-floor-input"
                            />

                          </div>
                        </div>


                        {/* Availability Status */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Availability Status
                          </label>
                          <div className="step3-button-group">
                            {["Ready to Move", "Under Construction"].map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => setAvailabilityStatus(status)}
                                className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Age of property if Ready to Move */}
                        {availabilityStatus === "Ready to Move" && (
                          <div className="step3-section">
                            <label className="step3-label">
                              Age of property
                            </label>
                            <div className="step3-button-group">
                              {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                                <button
                                  key={age}
                                  type="button"
                                  onClick={() => setAgeOfProperty(age)}
                                  className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                                >
                                  {age}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Possession By if Under Construction */}
                        {availabilityStatus === "Under Construction" && (
                          <div className="step3-section">
                            <label className="step3-label">Possession By</label>
                            <select
                              value={possessionBy}
                              onChange={(e) => setPossessionBy(e.target.value)}
                              className="step3-input"
                            >
                              <option value="" hidden>Expected time</option>
                              <option value="Within 3 Months">Within 3 Months</option>
                              <option value="Within 6 Months">Within 6 Months</option>
                              <option value="By 2026">By 2026</option>
                              <option value="By 2027">By 2027</option>
                              <option value="By 2028">By 2028</option>
                              <option value="By 2029">By 2029</option>
                              <option value="By 2030">By 2030</option>
                            </select>
                          </div>
                        )}



                        {/* Ownership */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Ownership
                          </label>
                          <div className="step3-button-group">
                            {["Freehold", "Leasehold", "Co-operative Society", "Power of Attorney"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setSelectedOwnership(opt)}
                                className={`step3-option-btn ${selectedOwnership === opt ? 'active' : ''}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* Price Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Price Details
                          </h6>
                          <div className="step3-price-group">
                            <input
                              type="number"
                              placeholder="Expected Price"
                              value={expectedPrice}
                              onChange={(e) => setExpectedPrice(e.target.value)}
                              className="step3-input"
                            />
                            <input
                              type="number"
                              placeholder="Price per Sq.Ft"
                              value={
                                expectedPrice && (carpetArea || builtUpArea)
                                  ? (
                                    parseFloat(expectedPrice) /
                                    parseFloat(carpetArea || builtUpArea)
                                  ).toFixed(2)
                                  : ""
                              }
                              readOnly
                              className="step3-input step3-readonly-input"
                            />
                          </div>
                          <div className="step3-checkbox-group">
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={allInclusive}
                                onChange={(e) => setAllInclusive(e.target.checked)}
                                className="step3-checkbox"
                              />
                              All Inclusive Price?
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={taxGovt}
                                onChange={(e) => setTaxGovt(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Tax & Govt. Charges
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={priceNegotiable}
                                onChange={(e) => setPriceNegotiable(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Price Negotiable
                            </label>
                          </div>
                        </div>

                        {/* Additional Price Details */}
                        <div className="step3-section">
                          <button
                            type="button"
                            onClick={() => setShowAdditionalPricing((prev) => !prev)}
                            className="step3-toggle-btn"
                          >
                            {showAdditionalPricing
                              ? "− Hide Additional Price Details"
                              : "+ Add Additional Price Details (Optional)"}
                          </button>

                          {showAdditionalPricing && (
                            <div className="step3-additional-fields">
                              <div className="step3-input-group">
                                <input
                                  type="number"
                                  placeholder="Maintenance"
                                  value={maintenance}
                                  onChange={(e) => setMaintenance(e.target.value)}
                                  className="step3-input"
                                />
                                <select
                                  value={maintenanceUnit}
                                  onChange={(e) => setMaintenanceUnit(e.target.value)}
                                  className="step3-unit-select"
                                >
                                  <option value="">Select</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Annually">Annually</option>
                                  <option value="One Time">One Time</option>
                                  <option value="Per Unit">Per Unit</option>
                                </select>
                              </div>
                              <input
                                type="number"
                                placeholder="Rental"
                                value={rental}
                                onChange={(e) => setRental(e.target.value)}
                                className="step3-input"
                              />
                              <input
                                type="number"
                                placeholder="Booking Amount"
                                value={bookingAmount}
                                onChange={(e) => setBookingAmount(e.target.value)}
                                className="step3-input"
                              />
                              <input
                                type="number"
                                placeholder="Annual Dues Payable Membership Charge"
                                value={annualDues}
                                onChange={(e) => setAnnualDues(e.target.value)}
                                className="step3-input"
                              />
                            </div>
                          )}
                        </div>

                        {/* Unique Property */}
                        <div className="step3-section">
                          <p className="step3-label">
                            What makes your property unique?
                          </p>
                          <textarea
                            placeholder="What makes your property unique?"
                            value={uniqueProperty}
                            onChange={(e) => setUniqueProperty(e.target.value)}
                            rows={3}
                            className="step3-textarea"
                          />
                        </div>
                      </>
                    )}

                    {/* Rent + Residential */}
                    {listingType === "Rent" && propertyType === "Residential" && (
                      <>
                        {/* Room Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Add Room Details
                          </h6>

                          {/* Bedrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bedrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBedrooms(num)}
                                  className={`step3-number-btn ${bedrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bathrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bathrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBathrooms(num)}
                                  className={`step3-number-btn ${bathrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Balconies */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              Balconies
                            </label>
                            <div className="step3-button-group">
                              {[0, 1, 2, 3, "More than 3"].map((val) => (
                                <div
                                  key={val}
                                  onClick={() => setBalconies(val)}
                                  className={`step3-option-btn ${balconies === val ? 'active' : ''}`}
                                >
                                  {val}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Area Details */}
                        <div className="step3-section">
                          <label className="step3-label">Add Area Details</label>
                          <p className="step3-mandatory-text">Please enter the plot size</p>

                          {/* Plot Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Plot Area"
                              value={plotArea}
                              onChange={(e) => setPlotArea(e.target.value)}
                              className="step3-input"
                            />
                            <select
                              value={sharedUnit}
                              onChange={(e) => setSharedUnit(e.target.value)}
                              className="step3-unit-select"
                            >
                              {UNIT_OPTIONS.map((u) => (
                                <option key={u} value={u}>{u}</option>
                              ))}
                            </select>
                          </div>

                          {/* Before Clicking - Both buttons in 1 row */}
                          {!showBuiltUpArea && !showCarpetArea && (
                            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                              <button
                                type="button"
                                onClick={() => setShowBuiltUpArea(true)}
                                className="step3-add-btn"
                                style={{ flex: 1 }}
                              >
                                + Add Built-up Area
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowCarpetArea(true)}
                                className="step3-add-btn"
                                style={{ flex: 1 }}
                              >
                                + Add Carpet Area
                              </button>
                            </div>
                          )}

                          {/* Built-up Area Input (its own row) */}
                          {showBuiltUpArea && (
                            <div className="step3-input-group" style={{ marginTop: "10px" }}>
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowUnitDropdown((p) => !p)}
                              >
                                {sharedUnit} <span className="step3-dropdown-icon">▼</span>
                              </div>
                            </div>
                          )}

                          {/* Carpet Area Input (its own row) */}
                          {showCarpetArea && (
                            <div className="step3-input-group" style={{ marginTop: "10px" }}>
                              <input
                                type="number"
                                placeholder="Carpet Area"
                                value={carpetArea}
                                onChange={(e) => setCarpetArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowUnitDropdown((p) => !p)}
                              >
                                {sharedUnit} <span className="step3-dropdown-icon">▼</span>
                              </div>
                            </div>
                          )}

                          {/* Custom Dropdown (shared) */}
                          {showUnitDropdown && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setSharedUnit(u);
                                    setShowUnitDropdown(false);
                                  }}
                                  className={`step3-unit-option ${sharedUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>



                        {/* Furnishing */}
                        <div className="section">
                          <label className="section-label">Furnishing</label>
                          <div className="furnishing-options">
                            {["Furnished", "Semi-furnished", "Un-furnished"].map((type) => (
                              <div
                                key={type}
                                onClick={() => setFurnishingType(type)}
                                className={`furnishing-chip ${furnishingType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </div>
                            ))}
                          </div>

                          {/* Show only when Furnished or Semi-furnished */}
                          {(furnishingType === "Furnished" || furnishingType === "Semi-furnished") && (
                            <>

                              <p style={{ marginTop: "10px", fontFamily: '"Josefin Sans", sans-serif', fontWeight: "600" }}>
                                At least three furnishings are mandatory for furnished
                              </p>


                              <div className="furnishing-grid">
                                {Object.keys(furnishings).map((item) => (
                                  <div key={item} className="furnishing-item">
                                    <button
                                      onClick={() => handleFurnishingCount(item, -1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-minus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-minus` ? "hovered" : ""
                                        }`}
                                    >
                                      –
                                    </button>
                                    <span className="count-value">{furnishings[item]}</span>
                                    <button
                                      onClick={() => handleFurnishingCount(item, 1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-plus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-plus` ? "hovered" : ""
                                        }`}
                                    >
                                      +
                                    </button>
                                    <span className="furnishing-name">{item}</span>
                                  </div>
                                ))}

                                {Object.keys(furnishingCheckboxes).map((item) => (
                                  <label key={item} className="furnishing-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={furnishingCheckboxes[item]}
                                      onChange={() => toggleFurnishingCheckbox(item)}
                                    />
                                    {item}
                                  </label>
                                ))}
                              </div>
                            </>
                          )}
                        </div>


                        {/* {floor deatils} */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Floor Details
                          </label>
                          <div className="step3-floor-group">
                            <input
                              type="number"
                              value={totalFloors}
                              onChange={(e) => {
                                const v = e.target.value;
                                setTotalFloors(v);
                                const nTotal = parseInt(v, 10);
                                const nProp = parseInt(propertyOnFloor, 10);
                                if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                  setPropertyOnFloor(String(nTotal));
                                }
                              }}
                              placeholder="Total Floors"
                              className="step3-floor-input"
                            />

                          </div>
                        </div>

                        {/* Age of property if Ready to Move */}

                        <div className="step3-section">
                          <label className="step3-label">Age of property</label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? "active" : ""
                                  }`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* ------------------- RENT DETAILS ------------------- */}
                        {/* Available From */}
                        <div className="step3-section">
                          <label className="step3-label">Available from</label>
                          <input
                            type="date"
                            value={availableFrom}
                            onChange={(e) => setAvailableFrom(e.target.value)}
                            className="step3-input"
                          />
                        </div>

                        {/* Willing to rent out to */}
                        <div className="step3-section">
                          <label className="step3-label">Willing to rent out to</label>
                          <div className="step3-button-group">
                            {["Family", "Single men", "Single women"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setWillingTo(opt)}
                                className={`step3-option-btn ${willingTo === opt ? "active" : ""
                                  }`}
                              >
                                + {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Rent Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">Rent Details</h6>
                          <div className="step3-price-group">
                            <input
                              type="number"
                              placeholder="₹ Expected Rent"
                              value={expectedRent}
                              onChange={(e) => setExpectedRent(e.target.value)}
                              className={`step3-input ${!expectedRent ? "error-border" : ""}`}
                            />
                          </div>
                          <small className="step3-subnote">₹ Price in words</small>

                          {/* Checkboxes */}
                          <div className="step3-checkbox-group">
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={elecWaterExcluded}
                                onChange={(e) => setElecWaterExcluded(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Electricity & Water charges excluded
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={priceNegotiable}
                                onChange={(e) => setPriceNegotiable(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Price Negotiable
                            </label>
                          </div>
                        </div>
                        {/* Additional Price Details */}
                        <div className="step3-section">
                          <button
                            type="button"
                            onClick={() => setShowAdditionalPricing((prev) => !prev)}
                            className="step3-toggle-btn"
                          >
                            {showAdditionalPricing
                              ? "− Hide  more Rent Details"
                              : "+ Add more Rent Details (Optional)"}
                          </button>

                          {showAdditionalPricing && (
                            <div className="step3-additional-fields">
                              {/* Maintenance + unit */}
                              <div className="step3-input-group">
                                <input
                                  type="number"
                                  placeholder="Maintenance"
                                  value={maintenance}
                                  onChange={(e) => setMaintenance(e.target.value)}
                                  className="step3-input"
                                />
                                <select
                                  value={maintenanceUnit}
                                  onChange={(e) => setMaintenanceUnit(e.target.value)}
                                  className="step3-unit-select"
                                >
                                  <option value="">Select</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Annually">Annually</option>
                                  <option value="One Time">One Time</option>
                                  <option value="Per Unit">Per Unit</option>
                                </select>
                              </div>

                              {/* Booking Amount */}
                              <input
                                type="number"
                                placeholder="Booking Amount"
                                value={bookingAmount}
                                onChange={(e) => setBookingAmount(e.target.value)}
                                className="step3-input"
                              />


                            </div>
                          )}
                        </div>


                        {/* Preferred Agreement Type */}
                        <div className="step3-section">
                          <label className="step3-label">Preferred agreement type</label>
                          <div className="step3-button-group">
                            {["Company lease agreement", "Any"].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setAgreementType(type)}
                                className={`step3-option-btn ${agreementType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Broker contact permission */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Are you ok with brokers contacting you?
                          </label>
                          <div className="step3-button-group">
                            {["Yes", "No"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setAllowBroker(opt)}
                                className={`step3-option-btn ${allowBroker === opt ? "active" : ""
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Unique Property */}
                        <div className="step3-section">
                          <p className="step3-label">
                            What makes your property unique?
                          </p>
                          <textarea
                            placeholder="What makes your property unique?"
                            value={uniqueProperty}
                            onChange={(e) => setUniqueProperty(e.target.value)}
                            rows={3}
                            className="step3-textarea"
                          />
                        </div>





                      </>
                    )}

                  </>
                )}

                {subPropertyType.includes("Plot / Land") && (
                  <>
                    <div className="step3-section">
                      <label className="step3-label">
                        Add Area Details
                      </label>
                      <p className="step3-mandatory-text">
                        Please enter the plot size
                      </p>

                      <div className="step3-input-group">
                        <input
                          type="number"
                          placeholder="Plot Area"
                          value={plotArea}
                          onChange={(e) => setPlotArea(e.target.value)}
                          className="step3-input"
                        />
                        <select
                          value={plotAreaUnit}
                          onChange={(e) => setPlotAreaUnit(e.target.value)}
                          className="step3-unit-select"
                        >
                          <option value="Sq.ft">Sq.ft</option>
                          <option value="Sq.yards">Sq.yards</option>
                          <option value="Sq.m">Sq.m</option>
                          <option value="Acres">Acres</option>
                          <option value="Marla">Marla</option>
                          <option value="Cents">Cents</option>
                        </select>
                      </div>
                    </div>

                    {/* Property Dimensions (Optional) */}
                    <div className="step3-section">
                      <label className="step3-label">
                        Property Dimensions (Optional)
                      </label>

                      <div className="step3-input-group">
                        <input
                          type="number"
                          placeholder="Length of plot (in Ft.)"
                          value={plotLength}
                          onChange={(e) => setPlotLength(e.target.value)}
                          className="step3-input"
                        />
                      </div>

                      <div className="step3-input-group">
                        <input
                          type="number"
                          placeholder="Breadth of plot (in Ft.)"
                          value={plotBreadth}
                          onChange={(e) => setPlotBreadth(e.target.value)}
                          className="step3-input"
                        />
                      </div>
                    </div>

                    {/* Floors Allowed */}
                    <div className="step3-section">
                      <label className="step3-label">
                        Floors Allowed For Construction
                      </label>
                      <div className="step3-input-group">
                        <input
                          type="number"
                          placeholder="No. of floors"
                          value={floorsAllowed}
                          onChange={(e) => setFloorsAllowed(e.target.value)}
                          className="step3-input"
                        />
                      </div>
                    </div>

                    {/* Boundary Wall */}
                    <div className="step3-section">
                      <label className="step3-label">
                        Is there a boundary wall around the property?
                      </label>
                      <div className="step3-button-group">
                        <button
                          type="button"
                          onClick={() => setHasBoundaryWall(true)}
                          className={`step3-option-btn ${hasBoundaryWall ? 'active' : ''}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasBoundaryWall(false)}
                          className={`step3-option-btn ${hasBoundaryWall === false ? 'active' : ''}`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {/* Open Sides */}
                    <div className="step3-section">
                      <label className="step3-label">
                        No. of open sides
                      </label>
                      <div className="step3-button-group">
                        {[1, 2, 3, "3+"].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setOpenSides(num)}
                            className={`step3-option-btn ${openSides === num ? 'active' : ''}`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Existing Construction */}
                    <div className="step3-section">
                      <label className="step3-label">
                        Any construction done on this property?
                      </label>
                      <div className="step3-button-group">
                        <button
                          type="button"
                          onClick={() => setHasConstruction(true)}
                          className={`step3-option-btn ${hasConstruction ? 'active' : ''}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasConstruction(false)}
                          className={`step3-option-btn ${hasConstruction === false ? 'active' : ''}`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {/* Construction Type (if hasConstruction is true) */}
                    {hasConstruction && (
                      <div className="step3-section">
                        <label className="step3-label">
                          What type of construction has been done?
                        </label>
                        <div className="step3-button-group">
                          {['Shed', 'Rooms', 'Washroom', 'Other'].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                if (constructionTypes.includes(type)) {
                                  setConstructionTypes(constructionTypes.filter(t => t !== type));
                                } else {
                                  setConstructionTypes([...constructionTypes, type]);
                                }
                              }}
                              className={`step3-option-btn ${constructionTypes.includes(type) ? 'active' : ''}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Possession By */}
                    <div className="step3-section">
                      <label className="step3-label">Possession By</label>
                      <select
                        value={possessionBy}
                        onChange={(e) => setPossessionBy(e.target.value)}
                        className="step3-input"
                      >
                        <option value="" hidden>Expected time</option>
                        <option value="Immediate">Immediate</option>
                        <option value="Within 3 Months">Within 3 Months</option>
                        <option value="Within 6 Months">Within 6 Months</option>
                        <option value="By 2026">By 2026</option>
                        <option value="By 2027">By 2027</option>
                        <option value="By 2028">By 2028</option>
                        <option value="By 2029">By 2029</option>

                      </select>
                    </div>
                    {/* ownership */}
                    <div className="step3-section">
                      <label className="step3-label">
                        Ownership
                      </label>
                      <div className="step3-button-group">
                        {["Freehold", "Leasehold", "Co-operative Society", "Power of Attorney"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedOwnership(opt)}
                            className={`step3-option-btn ${selectedOwnership === opt ? 'active' : ''}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Price Details */}
                    <div className="step3-section">
                      <h6 className="step3-subheader">
                        Price Details
                      </h6>
                      <div className="step3-price-group">
                        <input
                          type="number"
                          placeholder="Expected Price"
                          value={expectedPrice}
                          onChange={(e) => setExpectedPrice(e.target.value)}
                          className="step3-input"
                        />
                        <input
                          type="number"
                          placeholder="Price per Sq.Ft"
                          value={
                            expectedPrice && (carpetArea || builtUpArea)
                              ? (
                                parseFloat(expectedPrice) /
                                parseFloat(carpetArea || builtUpArea)
                              ).toFixed(2)
                              : ""
                          }
                          readOnly
                          className="step3-input step3-readonly-input"
                        />
                      </div>
                      <div className="step3-checkbox-group">
                        <label className="step3-checkbox-label">
                          <input
                            type="checkbox"
                            checked={allInclusive}
                            onChange={(e) => setAllInclusive(e.target.checked)}
                            className="step3-checkbox"
                          />
                          All Inclusive Price?
                        </label>
                        <label className="step3-checkbox-label">
                          <input
                            type="checkbox"
                            checked={taxGovt}
                            onChange={(e) => setTaxGovt(e.target.checked)}
                            className="step3-checkbox"
                          />
                          Tax & Govt. Charges
                        </label>
                        <label className="step3-checkbox-label">
                          <input
                            type="checkbox"
                            checked={priceNegotiable}
                            onChange={(e) => setPriceNegotiable(e.target.checked)}
                            className="step3-checkbox"
                          />
                          Price Negotiable
                        </label>
                      </div>
                    </div>

                    {/* Additional Price Details */}
                    <div className="step3-section">
                      <button
                        type="button"
                        onClick={() => setShowAdditionalPricing((prev) => !prev)}
                        className="step3-toggle-btn"
                      >
                        {showAdditionalPricing
                          ? "− Hide Additional Price Details"
                          : "+ Add Additional Price Details (Optional)"}
                      </button>

                      {showAdditionalPricing && (
                        <div className="step3-additional-fields">
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Maintenance"
                              value={maintenance}
                              onChange={(e) => setMaintenance(e.target.value)}
                              className="step3-input"
                            />
                            <select
                              value={maintenanceUnit}
                              onChange={(e) => setMaintenanceUnit(e.target.value)}
                              className="step3-unit-select"
                            >
                              <option value="">Select</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Annually">Annually</option>
                              <option value="One Time">One Time</option>
                              <option value="Per Unit">Per Unit</option>
                            </select>
                          </div>
                          <input
                            type="number"
                            placeholder="Rental"
                            value={rental}
                            onChange={(e) => setRental(e.target.value)}
                            className="step3-input"
                          />
                          <input
                            type="number"
                            placeholder="Booking Amount"
                            value={bookingAmount}
                            onChange={(e) => setBookingAmount(e.target.value)}
                            className="step3-input"
                          />
                          <input
                            type="number"
                            placeholder="Annual Dues Payable Membership Charge"
                            value={annualDues}
                            onChange={(e) => setAnnualDues(e.target.value)}
                            className="step3-input"
                          />
                        </div>
                      )}
                    </div>

                    {/* Unique Property */}
                    <div className="step3-section">
                      <p className="step3-label">
                        What makes your property unique?
                      </p>
                      <textarea
                        placeholder="What makes your property unique?"
                        value={uniqueProperty}
                        onChange={(e) => setUniqueProperty(e.target.value)}
                        rows={3}
                        className="step3-textarea"
                      />
                    </div>

                  </>
                )}

                {subPropertyType === "1 RK / Studio Apartment" && (

                  <>
                    {/* Sell + Residential */}
                    {listingType === "Sell" && propertyType === "Residential" && (
                      <>
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Add Room Details
                          </h6>

                          {/* Bedrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bedrooms
                            </label>
                            <div className="step3-button-group">
                              {[1].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBedrooms(num)}
                                  className={`step3-number-btn ${bedrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bathrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bathrooms
                            </label>
                            <div className="step3-button-group">
                              {[1].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBathrooms(num)}
                                  className={`step3-number-btn ${bathrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Balconies */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              Balconies
                            </label>
                            <div className="step3-button-group">
                              {[0, 1, 2, 3, "More than 3"].map((val) => (
                                <div
                                  key={val}
                                  onClick={() => setBalconies(val)}
                                  className={`step3-option-btn ${balconies === val ? 'active' : ''}`}
                                >
                                  {val}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Area Details */}
                        <div className="step3-section">
                          <div className="step3-section-header">
                            <label className="step3-label">
                              Add Area Details
                            </label>
                            <span className="step3-info-icon">ⓘ</span>
                          </div>
                          <p className="step3-mandatory-text">
                            At least one area type mandatory
                          </p>

                          {/* Carpet Area */}
                          {/* Carpet Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u); // 🔹 Sync both units
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Validation for Carpet Area */}
                          {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                            <p className="step3-error">Carpet area must be smaller than built-up area</p>
                          )}

                          {/* Built-up Area */}
                          {!showBuiltUpArea ? (
                            <button
                              type="button"
                              onClick={() => setShowBuiltUpArea(true)}
                              className="step3-add-btn"
                            >
                              + Add Built-up Area
                            </button>
                          ) : (
                            <div className="step3-input-group">
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowBuiltUpUnits((p) => !p)}
                              >
                                {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                              </div>

                              {showBuiltUpUnits && (
                                <div className="step3-unit-dropdown">
                                  {UNIT_OPTIONS.map((u) => (
                                    <div
                                      key={u}
                                      onClick={() => {
                                        setBuiltUpUnit(u);
                                        setCarpetUnit(u); // 🔹 Sync both units
                                        setShowBuiltUpUnits(false);
                                      }}
                                      className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                    >
                                      {u}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                        </div>

                        <div className="section">
                          <label className="section-label">Other rooms (Optional)</label>
                          <div className="room-options">
                            {["Pooja Room", "Study Room", "Servant Room", "Store Room"].map((room) => (
                              <div
                                key={room}
                                onClick={() =>
                                  setOtherRooms((prev) =>
                                    prev.includes(room)
                                      ? prev.filter((r) => r !== room)
                                      : [...prev, room]
                                  )
                                }
                                className={`room-chip ${otherRooms.includes(room) ? "active" : ""}`}
                              >
                                {room}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* furnished */}
                        <div className="section">
                          <label className="section-label">Furnishing</label>
                          <div className="furnishing-options">
                            {["Furnished", "Semi-furnished", "Un-furnished"].map((type) => (
                              <div
                                key={type}
                                onClick={() => setFurnishingType(type)}
                                className={`furnishing-chip ${furnishingType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </div>
                            ))}
                          </div>

                          {/* Show only when Furnished or Semi-furnished */}
                          {(furnishingType === "Furnished" || furnishingType === "Semi-furnished") && (
                            <>

                              <p style={{ marginTop: "10px", fontFamily: '"Josefin Sans", sans-serif', fontWeight: "600" }}>
                                At least three furnishings are mandatory for furnished
                              </p>


                              <div className="furnishing-grid">
                                {Object.keys(furnishings).map((item) => (
                                  <div key={item} className="furnishing-item">
                                    <button
                                      onClick={() => handleFurnishingCount(item, -1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-minus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-minus` ? "hovered" : ""
                                        }`}
                                    >
                                      –
                                    </button>
                                    <span className="count-value">{furnishings[item]}</span>
                                    <button
                                      onClick={() => handleFurnishingCount(item, 1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-plus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-plus` ? "hovered" : ""
                                        }`}
                                    >
                                      +
                                    </button>
                                    <span className="furnishing-name">{item}</span>
                                  </div>
                                ))}

                                {Object.keys(furnishingCheckboxes).map((item) => (
                                  <label key={item} className="furnishing-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={furnishingCheckboxes[item]}
                                      onChange={() => toggleFurnishingCheckbox(item)}
                                    />
                                    {item}
                                  </label>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="section">
                          <label className="section-label">Reserved Parking (Optional)</label>
                          <div className="parking-container">
                            <div className="parking-item">
                              <span className="parking-label">Covered Parking</span>
                              <button
                                className={`count-btn ${hoveredButton === "covered-minus" ? "hovered" : ""
                                  }`}
                                onClick={() => setCoveredParking(Math.max(0, coveredParking - 1))}
                                onMouseEnter={() => setHoveredButton("covered-minus")}
                                onMouseLeave={() => setHoveredButton(null)}
                              >
                                –
                              </button>
                              <span className="count-value">{coveredParking}</span>
                              <button
                                className={`count-btn ${hoveredButton === "covered-plus" ? "hovered" : ""
                                  }`}
                                onClick={() => setCoveredParking(coveredParking + 1)}
                                onMouseEnter={() => setHoveredButton("covered-plus")}
                                onMouseLeave={() => setHoveredButton(null)}
                              >
                                +
                              </button>
                            </div>

                            <div className="parking-item">
                              <span className="parking-label">Open Parking</span>
                              <button
                                className={`count-btn ${hoveredButton === "open-minus" ? "hovered" : ""
                                  }`}
                                onClick={() => setOpenParking(Math.max(0, openParking - 1))}
                                onMouseEnter={() => setHoveredButton("open-minus")}
                                onMouseLeave={() => setHoveredButton(null)}
                              >
                                –
                              </button>
                              <span className="count-value">{openParking}</span>
                              <button
                                className={`count-btn ${hoveredButton === "open-plus" ? "hovered" : ""
                                  }`}
                                onClick={() => setOpenParking(openParking + 1)}
                                onMouseEnter={() => setHoveredButton("open-plus")}
                                onMouseLeave={() => setHoveredButton(null)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* floor */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Floor Details
                          </label>
                          <div className="step3-floor-group">
                            <input
                              type="number"
                              value={totalFloors}
                              onChange={(e) => {
                                const v = e.target.value;
                                setTotalFloors(v);
                                const nTotal = parseInt(v, 10);
                                const nProp = parseInt(propertyOnFloor, 10);
                                if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                  setPropertyOnFloor(String(nTotal));
                                }
                              }}
                              placeholder="Total Floors"
                              className="step3-floor-input"
                            />
                            <select
                              value={propertyOnFloor}
                              onChange={(e) => setPropertyOnFloor(e.target.value)}
                              className="step3-floor-select"
                            >
                              <option value="" hidden>Property on Floor</option>
                              <option value="Basement">Basement</option>
                              <option value="Lower Ground">Lower Ground</option>
                              <option value="Ground">Ground</option>
                              {(() => {
                                const n = parseInt(totalFloors, 10);
                                if (!Number.isNaN(n) && n > 0) {
                                  return Array.from({ length: n }, (_, i) => i + 1).map((f) => (
                                    <option key={f} value={String(f)}>
                                      {f}
                                    </option>
                                  ));
                                }
                                return null;
                              })()}
                            </select>
                          </div>
                        </div>

                        {/* Availability Status */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Availability Status
                          </label>
                          <div className="step3-button-group">
                            {["Ready to Move", "Under Construction"].map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => setAvailabilityStatus(status)}
                                className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Age of property if Ready to Move */}
                        {availabilityStatus === "Ready to Move" && (
                          <div className="step3-section">
                            <label className="step3-label">
                              Age of property
                            </label>
                            <div className="step3-button-group">
                              {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                                <button
                                  key={age}
                                  type="button"
                                  onClick={() => setAgeOfProperty(age)}
                                  className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                                >
                                  {age}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Possession By if Under Construction */}
                        {availabilityStatus === "Under Construction" && (
                          <div className="step3-section">
                            <label className="step3-label">Possession By</label>
                            <select
                              value={possessionBy}
                              onChange={(e) => setPossessionBy(e.target.value)}
                              className="step3-input"
                            >
                              <option value="" hidden>Expected time</option>
                              <option value="Within 3 Months">Within 3 Months</option>
                              <option value="Within 6 Months">Within 6 Months</option>
                              <option value="By 2026">By 2026</option>
                              <option value="By 2027">By 2027</option>
                              <option value="By 2028">By 2028</option>
                              <option value="By 2029">By 2029</option>
                              <option value="By 2030">By 2030</option>
                            </select>
                          </div>
                        )}

                        {/* Ownership */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Ownership
                          </label>
                          <div className="step3-button-group">
                            {["Freehold", "Leasehold", "Co-operative Society", "Power of Attorney"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setSelectedOwnership(opt)}
                                className={`step3-option-btn ${selectedOwnership === opt ? 'active' : ''}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Price Details
                          </h6>
                          <div className="step3-price-group">
                            <input
                              type="number"
                              placeholder="Expected Price"
                              value={expectedPrice}
                              onChange={(e) => setExpectedPrice(e.target.value)}
                              className="step3-input"
                            />
                            <input
                              type="number"
                              placeholder="Price per Sq.Ft"
                              value={
                                expectedPrice && (carpetArea || builtUpArea)
                                  ? (
                                    parseFloat(expectedPrice) /
                                    parseFloat(carpetArea || builtUpArea)
                                  ).toFixed(2)
                                  : ""
                              }
                              readOnly
                              className="step3-input step3-readonly-input"
                            />
                          </div>
                          <div className="step3-checkbox-group">
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={allInclusive}
                                onChange={(e) => setAllInclusive(e.target.checked)}
                                className="step3-checkbox"
                              />
                              All Inclusive Price?
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={taxGovt}
                                onChange={(e) => setTaxGovt(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Tax & Govt. Charges
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={priceNegotiable}
                                onChange={(e) => setPriceNegotiable(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Price Negotiable
                            </label>
                          </div>
                        </div>

                        {/* Additional Price Details */}
                        <div className="step3-section">
                          <button
                            type="button"
                            onClick={() => setShowAdditionalPricing((prev) => !prev)}
                            className="step3-toggle-btn"
                          >
                            {showAdditionalPricing
                              ? "− Hide Additional Price Details"
                              : "+ Add Additional Price Details (Optional)"}
                          </button>

                          {showAdditionalPricing && (
                            <div className="step3-additional-fields">
                              <div className="step3-input-group">
                                <input
                                  type="number"
                                  placeholder="Maintenance"
                                  value={maintenance}
                                  onChange={(e) => setMaintenance(e.target.value)}
                                  className="step3-input"
                                />
                                <select
                                  value={maintenanceUnit}
                                  onChange={(e) => setMaintenanceUnit(e.target.value)}
                                  className="step3-unit-select"
                                >
                                  <option value="">Select</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Annually">Annually</option>
                                  <option value="One Time">One Time</option>
                                  <option value="Per Unit">Per Unit</option>
                                </select>
                              </div>
                              <input
                                type="number"
                                placeholder="Rental"
                                value={rental}
                                onChange={(e) => setRental(e.target.value)}
                                className="step3-input"
                              />
                              <input
                                type="number"
                                placeholder="Booking Amount"
                                value={bookingAmount}
                                onChange={(e) => setBookingAmount(e.target.value)}
                                className="step3-input"
                              />
                              <input
                                type="number"
                                placeholder="Annual Dues Payable Membership Charge"
                                value={annualDues}
                                onChange={(e) => setAnnualDues(e.target.value)}
                                className="step3-input"
                              />
                            </div>
                          )}
                        </div>

                        {/* Unique Property */}
                        <div className="step3-section">
                          <p className="step3-label">
                            What makes your property unique?
                          </p>
                          <textarea
                            placeholder="What makes your property unique?"
                            value={uniqueProperty}
                            onChange={(e) => setUniqueProperty(e.target.value)}
                            rows={3}
                            className="step3-textarea"
                          />
                        </div>
                      </>
                    )}
                    {/* Rent + Residential */}
                    {listingType === "Rent" && propertyType === "Residential" && (
                      <>


                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Add Room Details
                          </h6>

                          {/* Bedrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bedrooms
                            </label>
                            <div className="step3-button-group">
                              {[1].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBedrooms(num)}
                                  className={`step3-number-btn ${bedrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bathrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bathrooms
                            </label>
                            <div className="step3-button-group">
                              {[1].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBathrooms(num)}
                                  className={`step3-number-btn ${bathrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Balconies */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              Balconies
                            </label>
                            <div className="step3-button-group">
                              {[0, 1, 2, 3, "More than 3"].map((val) => (
                                <div
                                  key={val}
                                  onClick={() => setBalconies(val)}
                                  className={`step3-option-btn ${balconies === val ? 'active' : ''}`}
                                >
                                  {val}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Area Details */}
                        <div className="step3-section">
                          <div className="step3-section-header">
                            <label className="step3-label">
                              Add Area Details
                            </label>
                            <span className="step3-info-icon">ⓘ</span>
                          </div>
                          <p className="step3-mandatory-text">
                            At least one area type mandatory
                          </p>

                          {/* Carpet Area */}
                          {/* Carpet Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u); // 🔹 Sync both units
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Validation for Carpet Area */}
                          {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                            <p className="step3-error">Carpet area must be smaller than built-up area</p>
                          )}

                          {/* Built-up Area */}
                          {!showBuiltUpArea ? (
                            <button
                              type="button"
                              onClick={() => setShowBuiltUpArea(true)}
                              className="step3-add-btn"
                            >
                              + Add Built-up Area
                            </button>
                          ) : (
                            <div className="step3-input-group">
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowBuiltUpUnits((p) => !p)}
                              >
                                {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                              </div>

                              {showBuiltUpUnits && (
                                <div className="step3-unit-dropdown">
                                  {UNIT_OPTIONS.map((u) => (
                                    <div
                                      key={u}
                                      onClick={() => {
                                        setBuiltUpUnit(u);
                                        setCarpetUnit(u); // 🔹 Sync both units
                                        setShowBuiltUpUnits(false);
                                      }}
                                      className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                    >
                                      {u}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                        </div>


                        {/* furnished */}
                        <div className="section">
                          <label className="section-label">Furnishing</label>
                          <div className="furnishing-options">
                            {["Furnished", "Semi-furnished", "Un-furnished"].map((type) => (
                              <div
                                key={type}
                                onClick={() => setFurnishingType(type)}
                                className={`furnishing-chip ${furnishingType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </div>
                            ))}
                          </div>

                          {/* Show only when Furnished or Semi-furnished */}
                          {(furnishingType === "Furnished" || furnishingType === "Semi-furnished") && (
                            <>

                              <p style={{ marginTop: "10px", fontFamily: '"Josefin Sans", sans-serif', fontWeight: "600" }}>
                                At least three furnishings are mandatory for furnished
                              </p>


                              <div className="furnishing-grid">
                                {Object.keys(furnishings).map((item) => (
                                  <div key={item} className="furnishing-item">
                                    <button
                                      onClick={() => handleFurnishingCount(item, -1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-minus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-minus` ? "hovered" : ""
                                        }`}
                                    >
                                      –
                                    </button>
                                    <span className="count-value">{furnishings[item]}</span>
                                    <button
                                      onClick={() => handleFurnishingCount(item, 1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-plus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-plus` ? "hovered" : ""
                                        }`}
                                    >
                                      +
                                    </button>
                                    <span className="furnishing-name">{item}</span>
                                  </div>
                                ))}

                                {Object.keys(furnishingCheckboxes).map((item) => (
                                  <label key={item} className="furnishing-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={furnishingCheckboxes[item]}
                                      onChange={() => toggleFurnishingCheckbox(item)}
                                    />
                                    {item}
                                  </label>
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        {/* floor */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Floor Details
                          </label>
                          <div className="step3-floor-group">
                            <input
                              type="number"
                              value={totalFloors}
                              onChange={(e) => {
                                const v = e.target.value;
                                setTotalFloors(v);
                                const nTotal = parseInt(v, 10);
                                const nProp = parseInt(propertyOnFloor, 10);
                                if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                  setPropertyOnFloor(String(nTotal));
                                }
                              }}
                              placeholder="Total Floors"
                              className="step3-floor-input"
                            />
                            <select
                              value={propertyOnFloor}
                              onChange={(e) => setPropertyOnFloor(e.target.value)}
                              className="step3-floor-select"
                            >
                              <option value="" hidden>Property on Floor</option>
                              <option value="Basement">Basement</option>
                              <option value="Lower Ground">Lower Ground</option>
                              <option value="Ground">Ground</option>
                              {(() => {
                                const n = parseInt(totalFloors, 10);
                                if (!Number.isNaN(n) && n > 0) {
                                  return Array.from({ length: n }, (_, i) => i + 1).map((f) => (
                                    <option key={f} value={String(f)}>
                                      {f}
                                    </option>
                                  ));
                                }
                                return null;
                              })()}
                            </select>
                          </div>
                        </div>

                        {/* Age of property if Ready to Move */}

                        <div className="step3-section">
                          <label className="step3-label">Age of property</label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? "active" : ""
                                  }`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* ------------------- RENT DETAILS ------------------- */}
                        {/* Available From */}
                        <div className="step3-section">
                          <label className="step3-label">Available from</label>
                          <input
                            type="date"
                            value={availableFrom}
                            onChange={(e) => setAvailableFrom(e.target.value)}
                            className="step3-input"
                          />
                        </div>

                        {/* Willing to rent out to */}
                        <div className="step3-section">
                          <label className="step3-label">Willing to rent out to</label>
                          <div className="step3-button-group">
                            {["Family", "Single men", "Single women"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setWillingTo(opt)}
                                className={`step3-option-btn ${willingTo === opt ? "active" : ""
                                  }`}
                              >
                                + {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Rent Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">Rent Details</h6>
                          <div className="step3-price-group">
                            <input
                              type="number"
                              placeholder="₹ Expected Rent"
                              value={expectedRent}
                              onChange={(e) => setExpectedRent(e.target.value)}
                              className={`step3-input ${!expectedRent ? "error-border" : ""}`}
                            />
                          </div>
                          <small className="step3-subnote">₹ Price in words</small>

                          {/* Checkboxes */}
                          <div className="step3-checkbox-group">
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={elecWaterExcluded}
                                onChange={(e) => setElecWaterExcluded(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Electricity & Water charges excluded
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={priceNegotiable}
                                onChange={(e) => setPriceNegotiable(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Price Negotiable
                            </label>
                          </div>
                        </div>
                        {/* Additional Price Details */}
                        <div className="step3-section">
                          <button
                            type="button"
                            onClick={() => setShowAdditionalPricing((prev) => !prev)}
                            className="step3-toggle-btn"
                          >
                            {showAdditionalPricing
                              ? "− Hide  more Rent Details"
                              : "+ Add more Rent Details (Optional)"}
                          </button>

                          {showAdditionalPricing && (
                            <div className="step3-additional-fields">
                              {/* Maintenance + unit */}
                              <div className="step3-input-group">
                                <input
                                  type="number"
                                  placeholder="Maintenance"
                                  value={maintenance}
                                  onChange={(e) => setMaintenance(e.target.value)}
                                  className="step3-input"
                                />
                                <select
                                  value={maintenanceUnit}
                                  onChange={(e) => setMaintenanceUnit(e.target.value)}
                                  className="step3-unit-select"
                                >
                                  <option value="">Select</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Annually">Annually</option>
                                  <option value="One Time">One Time</option>
                                  <option value="Per Unit">Per Unit</option>
                                </select>
                              </div>

                              {/* Booking Amount */}
                              <input
                                type="number"
                                placeholder="Booking Amount"
                                value={bookingAmount}
                                onChange={(e) => setBookingAmount(e.target.value)}
                                className="step3-input"
                              />

                              {/* Membership Charge */}
                              <input
                                type="number"
                                placeholder="Membership Charge"
                                value={membershipCharge}
                                onChange={(e) => setMembershipCharge(e.target.value)}
                                className="step3-input"
                              />
                            </div>
                          )}
                        </div>


                        {/* Preferred Agreement Type */}
                        <div className="step3-section">
                          <label className="step3-label">Preferred agreement type</label>
                          <div className="step3-button-group">
                            {["Company lease agreement", "Any"].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setAgreementType(type)}
                                className={`step3-option-btn ${agreementType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Broker contact permission */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Are you ok with brokers contacting you?
                          </label>
                          <div className="step3-button-group">
                            {["Yes", "No"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setAllowBroker(opt)}
                                className={`step3-option-btn ${allowBroker === opt ? "active" : ""
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Unique Property */}
                        <div className="step3-section">
                          <p className="step3-label">
                            What makes your property unique?
                          </p>
                          <textarea
                            placeholder="What makes your property unique?"
                            value={uniqueProperty}
                            onChange={(e) => setUniqueProperty(e.target.value)}
                            rows={3}
                            className="step3-textarea"
                          />
                        </div>


                      </>
                    )}
                  </>
                )}


                {subPropertyType.includes("Farmhouse") && (
                  <>
                    {/* Sell + Residential */}
                    {listingType === "Sell" && propertyType === "Residential" && (
                      <>
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Add Room Details
                          </h6>

                          {/* Bedrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bedrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBedrooms(num)}
                                  className={`step3-number-btn ${bedrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bathrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bathrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBathrooms(num)}
                                  className={`step3-number-btn ${bathrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Balconies */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              Balconies
                            </label>
                            <div className="step3-button-group">
                              {[0, 1, 2, 3, "More than 3"].map((val) => (
                                <div
                                  key={val}
                                  onClick={() => setBalconies(val)}
                                  className={`step3-option-btn ${balconies === val ? 'active' : ''}`}
                                >
                                  {val}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Area Details */}
                        <div className="step3-section">
                          <label className="step3-label">Add Area Details</label>
                          <p className="step3-mandatory-text">Please enter the plot size</p>

                          {/* Plot Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Plot Area"
                              value={plotArea}
                              onChange={(e) => setPlotArea(e.target.value)}
                              className="step3-input"
                            />
                            <select
                              value={sharedUnit}
                              onChange={(e) => setSharedUnit(e.target.value)}
                              className="step3-unit-select"
                            >
                              {UNIT_OPTIONS.map((u) => (
                                <option key={u} value={u}>{u}</option>
                              ))}
                            </select>
                          </div>

                          {/* Before Clicking - Both buttons in 1 row */}
                          {!showBuiltUpArea && !showCarpetArea && (
                            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                              <button
                                type="button"
                                onClick={() => setShowBuiltUpArea(true)}
                                className="step3-add-btn"
                                style={{ flex: 1 }}
                              >
                                + Add Built-up Area
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowCarpetArea(true)}
                                className="step3-add-btn"
                                style={{ flex: 1 }}
                              >
                                + Add Carpet Area
                              </button>
                            </div>
                          )}

                          {/* Built-up Area Input (its own row) */}
                          {showBuiltUpArea && (
                            <div className="step3-input-group" style={{ marginTop: "10px" }}>
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowUnitDropdown((p) => !p)}
                              >
                                {sharedUnit} <span className="step3-dropdown-icon">▼</span>
                              </div>
                            </div>
                          )}

                          {/* Carpet Area Input (its own row) */}
                          {showCarpetArea && (
                            <div className="step3-input-group" style={{ marginTop: "10px" }}>
                              <input
                                type="number"
                                placeholder="Carpet Area"
                                value={carpetArea}
                                onChange={(e) => setCarpetArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowUnitDropdown((p) => !p)}
                              >
                                {sharedUnit} <span className="step3-dropdown-icon">▼</span>
                              </div>
                            </div>
                          )}

                          {/* Custom Dropdown (shared) */}
                          {showUnitDropdown && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setSharedUnit(u);
                                    setShowUnitDropdown(false);
                                  }}
                                  className={`step3-unit-option ${sharedUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* {floor deatils} */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Floor Details
                          </label>
                          <div className="step3-floor-group">
                            <input
                              type="number"
                              value={totalFloors}
                              onChange={(e) => {
                                const v = e.target.value;
                                setTotalFloors(v);
                                const nTotal = parseInt(v, 10);
                                const nProp = parseInt(propertyOnFloor, 10);
                                if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                  setPropertyOnFloor(String(nTotal));
                                }
                              }}
                              placeholder="Total Floors"
                              className="step3-floor-input"
                            />

                          </div>
                        </div>


                        {/* Availability Status */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Availability Status
                          </label>
                          <div className="step3-button-group">
                            {["Ready to Move", "Under Construction"].map((status) => (
                              <button
                                key={status}
                                type="button"
                                onClick={() => setAvailabilityStatus(status)}
                                className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Age of property if Ready to Move */}
                        {availabilityStatus === "Ready to Move" && (
                          <div className="step3-section">
                            <label className="step3-label">
                              Age of property
                            </label>
                            <div className="step3-button-group">
                              {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                                <button
                                  key={age}
                                  type="button"
                                  onClick={() => setAgeOfProperty(age)}
                                  className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                                >
                                  {age}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Possession By if Under Construction */}
                        {availabilityStatus === "Under Construction" && (
                          <div className="step3-section">
                            <label className="step3-label">Possession By</label>
                            <select
                              value={possessionBy}
                              onChange={(e) => setPossessionBy(e.target.value)}
                              className="step3-input"
                            >
                              <option value="" hidden>Expected time</option>
                              <option value="Within 3 Months">Within 3 Months</option>
                              <option value="Within 6 Months">Within 6 Months</option>
                              <option value="By 2026">By 2026</option>
                              <option value="By 2027">By 2027</option>
                              <option value="By 2028">By 2028</option>
                              <option value="By 2029">By 2029</option>
                              <option value="By 2030">By 2030</option>
                            </select>
                          </div>
                        )}

                        {/* Ownership */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Ownership
                          </label>
                          <div className="step3-button-group">
                            {["Freehold", "Leasehold", "Co-operative Society", "Power of Attorney"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setSelectedOwnership(opt)}
                                className={`step3-option-btn ${selectedOwnership === opt ? 'active' : ''}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>


                        {/*  pooja Others rooms */}
                        <div className="section">
                          <label className="section-label">Other rooms (Optional)</label>
                          <div className="room-options">
                            {["Pooja Room", "Study Room", "Servant Room", "Store Room"].map((room) => (
                              <div
                                key={room}
                                onClick={() =>
                                  setOtherRooms((prev) =>
                                    prev.includes(room)
                                      ? prev.filter((r) => r !== room)
                                      : [...prev, room]
                                  )
                                }
                                className={`room-chip ${otherRooms.includes(room) ? "active" : ""}`}
                              >
                                {room}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Furnishing */}
                        <div className="section">
                          <label className="section-label">Furnishing</label>
                          <div className="furnishing-options">
                            {["Furnished", "Semi-furnished", "Un-furnished"].map((type) => (
                              <div
                                key={type}
                                onClick={() => setFurnishingType(type)}
                                className={`furnishing-chip ${furnishingType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </div>
                            ))}
                          </div>

                          {/* Show only when Furnished or Semi-furnished */}
                          {(furnishingType === "Furnished" || furnishingType === "Semi-furnished") && (
                            <>

                              <p style={{ marginTop: "10px", fontFamily: '"Josefin Sans", sans-serif', fontWeight: "600" }}>
                                At least three furnishings are mandatory for furnished
                              </p>


                              <div className="furnishing-grid">
                                {Object.keys(furnishings).map((item) => (
                                  <div key={item} className="furnishing-item">
                                    <button
                                      onClick={() => handleFurnishingCount(item, -1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-minus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-minus` ? "hovered" : ""
                                        }`}
                                    >
                                      –
                                    </button>
                                    <span className="count-value">{furnishings[item]}</span>
                                    <button
                                      onClick={() => handleFurnishingCount(item, 1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-plus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-plus` ? "hovered" : ""
                                        }`}
                                    >
                                      +
                                    </button>
                                    <span className="furnishing-name">{item}</span>
                                  </div>
                                ))}

                                {Object.keys(furnishingCheckboxes).map((item) => (
                                  <label key={item} className="furnishing-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={furnishingCheckboxes[item]}
                                      onChange={() => toggleFurnishingCheckbox(item)}
                                    />
                                    {item}
                                  </label>
                                ))}
                              </div>











                            </>
                          )}
                        </div>
                        {/* Price Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Price Details
                          </h6>
                          <div className="step3-price-group">
                            <input
                              type="number"
                              placeholder="Expected Price"
                              value={expectedPrice}
                              onChange={(e) => setExpectedPrice(e.target.value)}
                              className="step3-input"
                            />
                            <input
                              type="number"
                              placeholder="Price per Sq.Ft"
                              value={
                                expectedPrice && (carpetArea || builtUpArea)
                                  ? (
                                    parseFloat(expectedPrice) /
                                    parseFloat(carpetArea || builtUpArea)
                                  ).toFixed(2)
                                  : ""
                              }
                              readOnly
                              className="step3-input step3-readonly-input"
                            />
                          </div>
                          <div className="step3-checkbox-group">
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={allInclusive}
                                onChange={(e) => setAllInclusive(e.target.checked)}
                                className="step3-checkbox"
                              />
                              All Inclusive Price?
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={taxGovt}
                                onChange={(e) => setTaxGovt(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Tax & Govt. Charges
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={priceNegotiable}
                                onChange={(e) => setPriceNegotiable(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Price Negotiable
                            </label>
                          </div>
                        </div>

                        {/* Additional Price Details */}
                        <div className="step3-section">
                          <button
                            type="button"
                            onClick={() => setShowAdditionalPricing((prev) => !prev)}
                            className="step3-toggle-btn"
                          >
                            {showAdditionalPricing
                              ? "− Hide Additional Price Details"
                              : "+ Add Additional Price Details (Optional)"}
                          </button>

                          {showAdditionalPricing && (
                            <div className="step3-additional-fields">
                              <div className="step3-input-group">
                                <input
                                  type="number"
                                  placeholder="Maintenance"
                                  value={maintenance}
                                  onChange={(e) => setMaintenance(e.target.value)}
                                  className="step3-input"
                                />
                                <select
                                  value={maintenanceUnit}
                                  onChange={(e) => setMaintenanceUnit(e.target.value)}
                                  className="step3-unit-select"
                                >
                                  <option value="">Select</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Annually">Annually</option>
                                  <option value="One Time">One Time</option>
                                  <option value="Per Unit">Per Unit</option>
                                </select>
                              </div>
                              <input
                                type="number"
                                placeholder="Rental"
                                value={rental}
                                onChange={(e) => setRental(e.target.value)}
                                className="step3-input"
                              />
                              <input
                                type="number"
                                placeholder="Booking Amount"
                                value={bookingAmount}
                                onChange={(e) => setBookingAmount(e.target.value)}
                                className="step3-input"
                              />
                              <input
                                type="number"
                                placeholder="Annual Dues Payable Membership Charge"
                                value={annualDues}
                                onChange={(e) => setAnnualDues(e.target.value)}
                                className="step3-input"
                              />
                            </div>
                          )}
                        </div>

                        {/* Unique Property */}
                        <div className="step3-section">
                          <p className="step3-label">
                            What makes your property unique?
                          </p>
                          <textarea
                            placeholder="What makes your property unique?"
                            value={uniqueProperty}
                            onChange={(e) => setUniqueProperty(e.target.value)}
                            rows={3}
                            className="step3-textarea"
                          />
                        </div>

                      </>
                    )}

                    {/* Rent + Residential */}
                    {listingType === "Rent" && propertyType === "Residential" && (
                      <>
                        <div className="step3-section">
                          <h6 className="step3-subheader">
                            Add Room Details
                          </h6>

                          {/* Bedrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bedrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBedrooms(num)}
                                  className={`step3-number-btn ${bedrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bathrooms */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              No. of Bathrooms
                            </label>
                            <div className="step3-button-group">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <div
                                  key={num}
                                  onClick={() => setBathrooms(num)}
                                  className={`step3-number-btn ${bathrooms === num ? 'active' : ''}`}
                                >
                                  {num}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Balconies */}
                          <div className="step3-subsection">
                            <label className="step3-label">
                              Balconies
                            </label>
                            <div className="step3-button-group">
                              {[0, 1, 2, 3, "More than 3"].map((val) => (
                                <div
                                  key={val}
                                  onClick={() => setBalconies(val)}
                                  className={`step3-option-btn ${balconies === val ? 'active' : ''}`}
                                >
                                  {val}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Area Details */}
                        <div className="step3-section">
                          <label className="step3-label">Add Area Details</label>
                          <p className="step3-mandatory-text">Please enter the plot size</p>

                          {/* Plot Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Plot Area"
                              value={plotArea}
                              onChange={(e) => setPlotArea(e.target.value)}
                              className="step3-input"
                            />
                            <select
                              value={sharedUnit}
                              onChange={(e) => setSharedUnit(e.target.value)}
                              className="step3-unit-select"
                            >
                              {UNIT_OPTIONS.map((u) => (
                                <option key={u} value={u}>{u}</option>
                              ))}
                            </select>
                          </div>

                          {/* Before Clicking - Both buttons in 1 row */}
                          {!showBuiltUpArea && !showCarpetArea && (
                            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                              <button
                                type="button"
                                onClick={() => setShowBuiltUpArea(true)}
                                className="step3-add-btn"
                                style={{ flex: 1 }}
                              >
                                + Add Built-up Area
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowCarpetArea(true)}
                                className="step3-add-btn"
                                style={{ flex: 1 }}
                              >
                                + Add Carpet Area
                              </button>
                            </div>
                          )}

                          {/* Built-up Area Input (its own row) */}
                          {showBuiltUpArea && (
                            <div className="step3-input-group" style={{ marginTop: "10px" }}>
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowUnitDropdown((p) => !p)}
                              >
                                {sharedUnit} <span className="step3-dropdown-icon">▼</span>
                              </div>
                            </div>
                          )}

                          {/* Carpet Area Input (its own row) */}
                          {showCarpetArea && (
                            <div className="step3-input-group" style={{ marginTop: "10px" }}>
                              <input
                                type="number"
                                placeholder="Carpet Area"
                                value={carpetArea}
                                onChange={(e) => setCarpetArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowUnitDropdown((p) => !p)}
                              >
                                {sharedUnit} <span className="step3-dropdown-icon">▼</span>
                              </div>
                            </div>
                          )}

                          {/* Custom Dropdown (shared) */}
                          {showUnitDropdown && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setSharedUnit(u);
                                    setShowUnitDropdown(false);
                                  }}
                                  className={`step3-unit-option ${sharedUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="section">
                          <label className="section-label">Furnishing</label>
                          <div className="furnishing-options">
                            {["Furnished", "Semi-furnished", "Un-furnished"].map((type) => (
                              <div
                                key={type}
                                onClick={() => setFurnishingType(type)}
                                className={`furnishing-chip ${furnishingType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </div>
                            ))}
                          </div>

                          {/* Show only when Furnished or Semi-furnished */}
                          {(furnishingType === "Furnished" || furnishingType === "Semi-furnished") && (
                            <>

                              <p style={{ marginTop: "10px", fontFamily: '"Josefin Sans", sans-serif', fontWeight: "600" }}>
                                At least three furnishings are mandatory for furnished
                              </p>


                              <div className="furnishing-grid">
                                {Object.keys(furnishings).map((item) => (
                                  <div key={item} className="furnishing-item">
                                    <button
                                      onClick={() => handleFurnishingCount(item, -1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-minus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-minus` ? "hovered" : ""
                                        }`}
                                    >
                                      –
                                    </button>
                                    <span className="count-value">{furnishings[item]}</span>
                                    <button
                                      onClick={() => handleFurnishingCount(item, 1)}
                                      onMouseEnter={() => setHoveredButton(`${item}-plus`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className={`count-btn ${hoveredButton === `${item}-plus` ? "hovered" : ""
                                        }`}
                                    >
                                      +
                                    </button>
                                    <span className="furnishing-name">{item}</span>
                                  </div>
                                ))}

                                {Object.keys(furnishingCheckboxes).map((item) => (
                                  <label key={item} className="furnishing-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={furnishingCheckboxes[item]}
                                      onChange={() => toggleFurnishingCheckbox(item)}
                                    />
                                    {item}
                                  </label>
                                ))}
                              </div>

                            </>
                          )}
                        </div>


                        {/* {floor deatils} */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Floor Details
                          </label>
                          <div className="step3-floor-group">
                            <input
                              type="number"
                              value={totalFloors}
                              onChange={(e) => {
                                const v = e.target.value;
                                setTotalFloors(v);
                                const nTotal = parseInt(v, 10);
                                const nProp = parseInt(propertyOnFloor, 10);
                                if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                  setPropertyOnFloor(String(nTotal));
                                }
                              }}
                              placeholder="Total Floors"
                              className="step3-floor-input"
                            />

                          </div>
                        </div>



                        {/* Age of property if Ready to Move */}

                        <div className="step3-section">
                          <label className="step3-label">Age of property</label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? "active" : ""
                                  }`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* ------------------- RENT DETAILS ------------------- */}
                        {/* Available From */}
                        <div className="step3-section">
                          <label className="step3-label">Available from</label>
                          <input
                            type="date"
                            value={availableFrom}
                            onChange={(e) => setAvailableFrom(e.target.value)}
                            className="step3-input"
                          />
                        </div>

                        {/* Willing to rent out to */}
                        <div className="step3-section">
                          <label className="step3-label">Willing to rent out to</label>
                          <div className="step3-button-group">
                            {["Family", "Single men", "Single women"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setWillingTo(opt)}
                                className={`step3-option-btn ${willingTo === opt ? "active" : ""
                                  }`}
                              >
                                + {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Rent Details */}
                        <div className="step3-section">
                          <h6 className="step3-subheader">Rent Details</h6>
                          <div className="step3-price-group">
                            <input
                              type="number"
                              placeholder="₹ Expected Rent"
                              value={expectedRent}
                              onChange={(e) => setExpectedRent(e.target.value)}
                              className={`step3-input ${!expectedRent ? "error-border" : ""}`}
                            />
                          </div>
                          <small className="step3-subnote">₹ Price in words</small>

                          {/* Checkboxes */}
                          <div className="step3-checkbox-group">
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={elecWaterExcluded}
                                onChange={(e) => setElecWaterExcluded(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Electricity & Water charges excluded
                            </label>
                            <label className="step3-checkbox-label">
                              <input
                                type="checkbox"
                                checked={priceNegotiable}
                                onChange={(e) => setPriceNegotiable(e.target.checked)}
                                className="step3-checkbox"
                              />
                              Price Negotiable
                            </label>
                          </div>
                        </div>
                        {/* Additional Price Details */}
                        <div className="step3-section">
                          <button
                            type="button"
                            onClick={() => setShowAdditionalPricing((prev) => !prev)}
                            className="step3-toggle-btn"
                          >
                            {showAdditionalPricing
                              ? "− Hide  more Rent Details"
                              : "+ Add more Rent Details (Optional)"}
                          </button>

                          {showAdditionalPricing && (
                            <div className="step3-additional-fields">
                              {/* Maintenance + unit */}
                              <div className="step3-input-group">
                                <input
                                  type="number"
                                  placeholder="Maintenance"
                                  value={maintenance}
                                  onChange={(e) => setMaintenance(e.target.value)}
                                  className="step3-input"
                                />
                                <select
                                  value={maintenanceUnit}
                                  onChange={(e) => setMaintenanceUnit(e.target.value)}
                                  className="step3-unit-select"
                                >
                                  <option value="">Select</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Annually">Annually</option>
                                  <option value="One Time">One Time</option>
                                  <option value="Per Unit">Per Unit</option>
                                </select>
                              </div>

                              {/* Booking Amount */}
                              <input
                                type="number"
                                placeholder="Booking Amount"
                                value={bookingAmount}
                                onChange={(e) => setBookingAmount(e.target.value)}
                                className="step3-input"
                              />


                            </div>
                          )}
                        </div>


                        {/* Preferred Agreement Type */}
                        <div className="step3-section">
                          <label className="step3-label">Preferred agreement type</label>
                          <div className="step3-button-group">
                            {["Company lease agreement", "Any"].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setAgreementType(type)}
                                className={`step3-option-btn ${agreementType === type ? "active" : ""
                                  }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Broker contact permission */}
                        <div className="step3-section">
                          <label className="step3-label">
                            Are you ok with brokers contacting you?
                          </label>
                          <div className="step3-button-group">
                            {["Yes", "No"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setAllowBroker(opt)}
                                className={`step3-option-btn ${allowBroker === opt ? "active" : ""
                                  }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Unique Property */}
                        <div className="step3-section">
                          <p className="step3-label">
                            What makes your property unique?
                          </p>
                          <textarea
                            placeholder="What makes your property unique?"
                            value={uniqueProperty}
                            onChange={(e) => setUniqueProperty(e.target.value)}
                            rows={3}
                            className="step3-textarea"
                          />
                        </div>





                      </>
                    )}

                  </>
                )}







                {propertyType === "Commercial" &&
                  subPropertyType === "Office" &&
                  subPropertyQuestionOption === "Ready to move office space" && (
                    <>
                      {/* Area Details */}
                      <div className="step3-section">
                        <div className="step3-section-header">
                          <label className="step3-label">
                            Add Area Details
                          </label>
                          <span className="step3-info-icon">ⓘ</span>
                        </div>
                        <p className="step3-mandatory-text">
                          At least one area type mandatory
                        </p>

                        {/* Carpet Area */}
                        {/* Carpet Area */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Carpet Area"
                            value={carpetArea}
                            onChange={(e) => setCarpetArea(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowCarpetUnits((p) => !p)}
                          >
                            {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showCarpetUnits && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setCarpetUnit(u);
                                    setBuiltUpUnit(u); // 🔹 Sync both units
                                    setShowCarpetUnits(false);
                                  }}
                                  className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Validation for Carpet Area */}
                        {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                          <p className="step3-error">Carpet area must be smaller than built-up area</p>
                        )}

                        {/* Built-up Area */}
                        {!showBuiltUpArea ? (
                          <button
                            type="button"
                            onClick={() => setShowBuiltUpArea(true)}
                            className="step3-add-btn"
                          >
                            + Add Built-up Area
                          </button>
                        ) : (
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Built-up Area"
                              value={builtUpArea}
                              onChange={(e) => setBuiltUpArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowBuiltUpUnits((p) => !p)}
                            >
                              {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showBuiltUpUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setBuiltUpUnit(u);
                                      setCarpetUnit(u); // 🔹 Sync both units
                                      setShowBuiltUpUnits(false);
                                    }}
                                    className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                      </div>

                      {/* Describe your office setup */}
                      <div className="step3-section">
                        <label className="step3-label">Describe your office setup</label>
                        <div className="step3-input-row">
                          <input
                            type="number"
                            placeholder="Min. no. of Seats"
                            value={minSeats}
                            onChange={(e) => setMinSeats(e.target.value)}
                            className="step3-input"
                          />
                          <input
                            type="number"
                            placeholder="Max. no. of Seats (optional)"
                            value={maxSeats}
                            onChange={(e) => setMaxSeats(e.target.value)}
                            className="step3-input"
                          />
                        </div>
                        <input
                          type="number"
                          placeholder="No. of Cabins"
                          value={noOfCabins}
                          onChange={(e) => setNoOfCabins(e.target.value)}
                          className="step3-input"
                        />
                      </div>

                      {/* No. of meeting rooms */}
                      <div className="step3-section">
                        <label className="step3-label">No. of Meeting Rooms</label>
                        <input
                          type="number"
                          placeholder="No. of Meeting Rooms"
                          value={noOfMeetingRooms}
                          onChange={(e) => setNoOfMeetingRooms(e.target.value)}
                          className="step3-input"
                        />
                      </div>

                      {/* Washrooms */}
                      <div className="step3-section">
                        <label className="step3-label">Washrooms</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setWashroom("Available")}
                            className={`subproperty-option ${washroom === "Available" ? "active" : ""
                              }`}
                          >
                            Available
                          </button>
                          <button
                            type="button"
                            onClick={() => setWashroom("Not Available")}
                            className={`subproperty-option ${washroom === "Not Available" ? "active" : ""
                              }`}
                          >
                            Not - Available
                          </button>
                        </div>
                      </div>

                      {/* Conference Room */}
                      <div className="step3-section">
                        <label className="step3-label">Conference Room</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setConferenceRoom("Available")}
                            className={`subproperty-option ${conferenceRoom === "Available" ? "active" : ""
                              }`}
                          >
                            Available
                          </button>
                          <button
                            type="button"
                            onClick={() => setConferenceRoom("Not Available")}
                            className={`subproperty-option ${conferenceRoom === "Not Available" ? "active" : ""
                              }`}
                          >
                            Not - Available
                          </button>
                        </div>
                      </div>

                      {/* Reception Area */}
                      <div className="step3-section">
                        <label className="step3-label">Reception Area</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setReceptionArea("Available")}
                            className={`subproperty-option ${receptionArea === "Available" ? "active" : ""
                              }`}
                          >
                            Available
                          </button>
                          <button
                            type="button"
                            onClick={() => setReceptionArea("Not Available")}
                            className={`subproperty-option ${receptionArea === "Not Available" ? "active" : ""
                              }`}
                          >
                            Not - Available
                          </button>
                        </div>
                      </div>

                      {/* Pantry Type */}
                      <div className="step3-section">
                        <label className="step3-label">Pantry Type</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setPantryType("Private")}
                            className={`subproperty-option ${pantryType === "Private" ? "active" : ""
                              }`}
                          >
                            Private
                          </button>
                          <button
                            type="button"
                            onClick={() => setPantryType("Shared")}
                            className={`subproperty-option ${pantryType === "Shared" ? "active" : ""
                              }`}
                          >
                            Shared
                          </button>
                          <button
                            type="button"
                            onClick={() => setPantryType("Not Available")}
                            className={`subproperty-option ${pantryType === "Not Available" ? "active" : ""
                              }`}
                          >
                            Not - Available
                          </button>
                        </div>
                      </div>

                      {/* Facilities Available */}
                      <div className="step3-section">
                        <label className="step3-label">Please select the facilities available</label>

                        {/* Furnishing */}
                        <div className="step3-facility-row" style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <span style={{ minWidth: "200px" }}>Furnishing</span>
                          <label style={{ marginRight: "15px" }}>
                            <input
                              type="radio"
                              name="furnishing"
                              checked={furnishing === "Available"}
                              onChange={() => setFurnishing("Available")}
                            />{" "}
                            Available
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="furnishing"
                              checked={furnishing === "Not Available"}
                              onChange={() => setFurnishing("Not Available")}
                            />{" "}
                            Not Available
                          </label>
                        </div>

                        {/* Air Conditioning */}
                        <div className="step3-facility-row" style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <span style={{ minWidth: "200px" }}>Central Air Conditioning</span>
                          <label style={{ marginRight: "15px" }}>
                            <input
                              type="radio"
                              name="airConditioning"
                              checked={airConditioning === "Available"}
                              onChange={() => setAirConditioning("Available")}
                            />{" "}
                            Available
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="airConditioning"
                              checked={airConditioning === "Not Available"}
                              onChange={() => setAirConditioning("Not Available")}
                            />{" "}
                            Not Available
                          </label>
                        </div>

                        {/* Oxygen Duct */}
                        <div className="step3-facility-row" style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <span style={{ minWidth: "200px" }}>Oxygen Duct</span>
                          <label style={{ marginRight: "15px" }}>
                            <input
                              type="radio"
                              name="oxygen"
                              checked={oxygen === "Available"}
                              onChange={() => setOxygen("Available")}
                            />{" "}
                            Available
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="oxygen"
                              checked={oxygen === "Not Available"}
                              onChange={() => setOxygen("Not Available")}
                            />{" "}
                            Not Available
                          </label>
                        </div>

                        {/* UPS */}
                        <div className="step3-facility-row" style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ minWidth: "200px" }}>UPS</span>
                          <label style={{ marginRight: "15px" }}>
                            <input
                              type="radio"
                              name="ups"
                              checked={ups === "Available"}
                              onChange={() => setUps("Available")}
                            />{" "}
                            Available
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="ups"
                              checked={ups === "Not Available"}
                              onChange={() => setUps("Not Available")}
                            />{" "}
                            Not Available
                          </label>
                        </div>
                      </div>



                      {/* 🔥 Fire Safety Measures Include */}
                      <div className="step3-section">
                        <label className="step3-label">Fire safety measures include</label>
                        <div className="button-group">
                          {["Fire Extinguisher", "Fire Sensors", "Sprinklers", "Fire Hose"].map((item) => (
                            <button
                              type="button"
                              key={item}
                              onClick={() =>
                                setFireSafety((prev) =>
                                  prev.includes(item)
                                    ? prev.filter((i) => i !== item)
                                    : [...prev, item]
                                )
                              }
                              className={`subproperty-option ${fireSafety.includes(item) ? "active" : ""
                                }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Floor deatils */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Floor Details
                        </label>
                        <div className="step3-floor-group">
                          <input
                            type="number"
                            value={totalFloors}
                            onChange={(e) => {
                              const v = e.target.value;
                              setTotalFloors(v);
                              const nTotal = parseInt(v, 10);
                              const nProp = parseInt(propertyOnFloor, 10);
                              if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                setPropertyOnFloor(String(nTotal));
                              }
                            }}
                            placeholder="Total Floors"
                            className="step3-floor-input"
                          />
                          <select
                            value={propertyOnFloor}
                            onChange={(e) => setPropertyOnFloor(e.target.value)}
                            className="step3-floor-select"
                          >
                            <option value="" hidden>Property on Floor</option>
                            <option value="Basement">Basement</option>
                            <option value="Lower Ground">Lower Ground</option>
                            <option value="Ground">Ground</option>
                            {(() => {
                              const n = parseInt(totalFloors, 10);
                              if (!Number.isNaN(n) && n > 0) {
                                return Array.from({ length: n }, (_, i) => i + 1).map((f) => (
                                  <option key={f} value={String(f)}>
                                    {f}
                                  </option>
                                ));
                              }
                              return null;
                            })()}
                          </select>
                        </div>
                      </div>

                      {/* 🧱 Number of Staircases */}
                      <div className="step3-section">
                        <label className="step3-label">
                          No. of Staircases <span className="step3-optional">(Optional)</span>
                        </label>
                        <div className="button-group">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setStaircases(num)}
                              className={`subproperty-option ${staircases === num ? "active" : ""
                                }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 🛗 Lifts */}
                      <div className="step3-section">
                        <label className="step3-label">Lifts</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setLifts("Available")}
                            className={`subproperty-option ${lifts === "Available" ? "active" : ""
                              }`}
                          >
                            Available
                          </button>
                          <button
                            type="button"
                            onClick={() => setLifts("Not Available")}
                            className={`subproperty-option ${lifts === "Not Available" ? "active" : ""
                              }`}
                          >
                            Not - Available
                          </button>
                        </div>
                      </div>

                      {/* 🚗 Parking */}
                      <div className="step3-section">
                        <label className="step3-label">Parking</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setParking("Available")}
                            className={`subproperty-option ${parking === "Available" ? "active" : ""
                              }`}
                          >
                            Available
                          </button>
                          <button
                            type="button"
                            onClick={() => setParking("Not Available")}
                            className={`subproperty-option ${parking === "Not Available" ? "active" : ""
                              }`}
                          >
                            Not - Available
                          </button>
                        </div>
                      </div>


                      {/* Availability Status */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Availability Status
                        </label>
                        <div className="step3-button-group">
                          {["Ready to Move", "Under Construction"].map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setAvailabilityStatus(status)}
                              className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Age of property if Ready to Move */}
                      {availabilityStatus === "Ready to Move" && (
                        <div className="step3-section">
                          <label className="step3-label">
                            Age of property
                          </label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Possession By if Under Construction */}
                      {availabilityStatus === "Under Construction" && (
                        <div className="step3-section">
                          <label className="step3-label">Possession By</label>
                          <select
                            value={possessionBy}
                            onChange={(e) => setPossessionBy(e.target.value)}
                            className="step3-input"
                          >
                            <option value="" hidden>Expected time</option>
                            <option value="Within 3 Months">Within 3 Months</option>
                            <option value="Within 6 Months">Within 6 Months</option>
                            <option value="By 2026">By 2026</option>
                            <option value="By 2027">By 2027</option>
                            <option value="By 2028">By 2028</option>
                            <option value="By 2029">By 2029</option>
                            <option value="By 2030">By 2030</option>
                          </select>
                        </div>
                      )}
                    </>
                  )}


                {propertyType === "Commercial" &&
                  subPropertyType === "Office" &&
                  subPropertyQuestionOption === "Bare shell office space" && (
                    <>

                      {/* buit and carpet  Details */}
                      <div className="step3-section">
                        <div className="step3-section-header">
                          <label className="step3-label">Add Area Details</label>
                          <span className="step3-info-icon">ⓘ</span>
                        </div>
                        <p className="step3-mandatory-text">At least one area type mandatory</p>

                        {/* Built-up Area - this will show by default */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Built-up Area"
                            value={builtUpArea}
                            onChange={(e) => setBuiltUpArea(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowBuiltUpUnits((p) => !p)}
                          >
                            {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showBuiltUpUnits && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setBuiltUpUnit(u);
                                    setCarpetUnit(u); // 🔹 keep units in sync
                                    setShowBuiltUpUnits(false);
                                  }}
                                  className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Carpet Area - shown only after clicking the button */}
                        {!showCarpetArea ? (
                          <button
                            type="button"
                            onClick={() => setShowCarpetArea(true)}
                            className="step3-add-btn"
                          >
                            + Add Carpet Area
                          </button>
                        ) : (
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u);
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Validation */}
                        {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                          <p className="step3-error">Carpet area must be smaller than built-up area</p>
                        )}
                      </div>


                      {/* Construction status of walls */}
                      <div className="step3-section">
                        <label className="step3-label">Construction status of walls</label>
                        <div className="button-group">
                          {["No walls", "Brick walls", "Cemented walls", "Plastered walls"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${wallStatus === opt ? "active" : ""}`}
                              onClick={() => setWallStatus(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Doors constructed */}
                      <div className="step3-section">
                        <label className="step3-label">Are doors constructed</label>
                        <div className="button-group">
                          {["Yes", "No"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${doorsConstructed === opt ? "active" : ""}`}
                              onClick={() => setDoorsConstructed(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Washrooms */}
                      <div className="step3-section">
                        <label className="step3-label">Washrooms</label>
                        <div className="button-group">
                          {["Available", "Not built yet"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${washroomBare === opt ? "active" : ""}`}
                              onClick={() => setWashroomBare(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>


                      {/* Pantry Type */}
                      <div className="step3-section">
                        <label className="step3-label">Pantry Type</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setPantryType("Shared Pantry")}
                            className={`subproperty-option ${pantryType === "Shared Pantry" ? "active" : ""
                              }`}
                          >
                            Shared Pantry
                          </button>

                          <button
                            type="button"
                            onClick={() => setPantryType("No Shared Pantry")}
                            className={`subproperty-option ${pantryType === "No Shared Pantry" ? "active" : ""
                              }`}
                          >
                            No Shared Pantry
                          </button>
                        </div>
                      </div>


                      {/* Flooring  */}
                      <div className="step3-section">
                        <label className="step3-label">Type of flooring</label>
                        <select
                          className="step3-input"
                          value={flooringType}
                          onChange={(e) => setFlooringType(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="Marble">Marble</option>
                          <option value="Concrete">Concrete</option>
                          <option value="Polished concrete">Polished concrete</option>
                          <option value="Granite">Granite</option>
                          <option value="Ceramic">Ceramic</option>
                        </select>
                      </div>

                      {/* Central Air Conditioning (3 options) */}
                      <div className="step3-section">
                        <label className="step3-label">Please select the facilities available</label>


                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <span style={{ minWidth: "200px" }}>Central Air Conditioning</span>

                          <label style={{ marginRight: "15px" }}>
                            <input
                              type="radio"
                              name="airConditioning"
                              checked={airConditioning === "Duct Only"}
                              onChange={() => setAirConditioning("Duct Only")}
                            />{" "}
                            Duct Only
                          </label>

                          <label style={{ marginRight: "15px" }}>
                            <input
                              type="radio"
                              name="airConditioning"
                              checked={airConditioning === "Available"}
                              onChange={() => setAirConditioning("Available")}
                            />{" "}
                            Available
                          </label>

                          <label style={{ marginRight: "15px" }}>
                            <input
                              type="radio"
                              name="airConditioning"
                              checked={airConditioning === "Not Available"}
                              onChange={() => setAirConditioning("Not Available")}
                            />{" "}
                            Not Available
                          </label>


                        </div>

                        {/* Oxygen Duct (2 options) */}
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ minWidth: "200px" }}>Oxygen Duct</span>

                          <label style={{ marginRight: "22px" }}>
                            <input
                              type="radio"
                              name="oxygen"
                              checked={oxygen === "Available"}
                              onChange={() => setOxygen("Available")}
                            />{" "}
                            Available
                          </label>

                          <label>
                            <input
                              type="radio"
                              name="oxygen"
                              checked={oxygen === "Not Available"}
                              onChange={() => setOxygen("Not Available")}
                            />{" "}
                            Not Available
                          </label>
                        </div>
                      </div>

                      {/* 🔥 Fire Safety Measures Include */}
                      <div className="step3-section">
                        <label className="step3-label">Fire safety measures include</label>
                        <div className="button-group">
                          {["Fire Extinguisher", "Fire Sensors", "Sprinklers", "Fire Hose"].map((item) => (
                            <button
                              type="button"
                              key={item}
                              onClick={() =>
                                setFireSafety((prev) =>
                                  prev.includes(item)
                                    ? prev.filter((i) => i !== item)
                                    : [...prev, item]
                                )
                              }
                              className={`subproperty-option ${fireSafety.includes(item) ? "active" : ""
                                }`}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>


                      {/* Floor deatils */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Floor Details
                        </label>
                        <div className="step3-floor-group">
                          <input
                            type="number"
                            value={totalFloors}
                            onChange={(e) => {
                              const v = e.target.value;
                              setTotalFloors(v);
                              const nTotal = parseInt(v, 10);
                              const nProp = parseInt(propertyOnFloor, 10);
                              if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                setPropertyOnFloor(String(nTotal));
                              }
                            }}
                            placeholder="Total Floors"
                            className="step3-floor-input"
                          />
                          <select
                            value={propertyOnFloor}
                            onChange={(e) => setPropertyOnFloor(e.target.value)}
                            className="step3-floor-select"
                          >
                            <option value="" hidden>Property on Floor</option>
                            <option value="Basement">Basement</option>
                            <option value="Lower Ground">Lower Ground</option>
                            <option value="Ground">Ground</option>
                            {(() => {
                              const n = parseInt(totalFloors, 10);
                              if (!Number.isNaN(n) && n > 0) {
                                return Array.from({ length: n }, (_, i) => i + 1).map((f) => (
                                  <option key={f} value={String(f)}>
                                    {f}
                                  </option>
                                ));
                              }
                              return null;
                            })()}
                          </select>
                        </div>
                      </div>

                      {/* 🧱 Number of Staircases */}
                      <div className="step3-section">
                        <label className="step3-label">
                          No. of Staircases <span className="step3-optional">(Optional)</span>
                        </label>
                        <div className="button-group">
                          {[1, 2, 3, 4].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setStaircases(num)}
                              className={`subproperty-option ${staircases === num ? "active" : ""
                                }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 🛗 Lifts */}
                      <div className="step3-section">
                        <label className="step3-label">Lifts</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setLifts("Available")}
                            className={`subproperty-option ${lifts === "Available" ? "active" : ""
                              }`}
                          >
                            Available
                          </button>
                          <button
                            type="button"
                            onClick={() => setLifts("Not Available")}
                            className={`subproperty-option ${lifts === "Not Available" ? "active" : ""
                              }`}
                          >
                            Not - Available
                          </button>
                        </div>
                      </div>

                      {/* 🚗 Parking */}
                      <div className="step3-section">
                        <label className="step3-label">Parking</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setParking("Available")}
                            className={`subproperty-option ${parking === "Available" ? "active" : ""
                              }`}
                          >
                            Available
                          </button>
                          <button
                            type="button"
                            onClick={() => setParking("Not Available")}
                            className={`subproperty-option ${parking === "Not Available" ? "active" : ""
                              }`}
                          >
                            Not - Available
                          </button>
                        </div>
                      </div>


                      {/* Availability Status */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Availability Status
                        </label>
                        <div className="step3-button-group">
                          {["Ready to Move", "Under Construction"].map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setAvailabilityStatus(status)}
                              className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Age of property if Ready to Move */}
                      {availabilityStatus === "Ready to Move" && (
                        <div className="step3-section">
                          <label className="step3-label">
                            Age of property
                          </label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Possession By if Under Construction */}
                      {availabilityStatus === "Under Construction" && (
                        <div className="step3-section">
                          <label className="step3-label">Possession By</label>
                          <select
                            value={possessionBy}
                            onChange={(e) => setPossessionBy(e.target.value)}
                            className="step3-input"
                          >
                            <option value="" hidden>Expected time</option>
                            <option value="Within 3 Months">Within 3 Months</option>
                            <option value="Within 6 Months">Within 6 Months</option>
                            <option value="By 2026">By 2026</option>
                            <option value="By 2027">By 2027</option>
                            <option value="By 2028">By 2028</option>
                            <option value="By 2029">By 2029</option>
                            <option value="By 2030">By 2030</option>
                          </select>
                        </div>
                      )}
                    </>
                  )}


                {propertyType === "Commercial" &&
                  subPropertyType === "Office" &&
                  subPropertyQuestionOption === "Co-working office space" && (
                    <>

                      {/* Washrooms */}
                      <div className="step3-section">
                        <label className="step3-label">Washrooms</label>
                        <div className="button-group">
                          {["None", "Shared", "1", "2", "3", "4"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${washroomBare === opt ? "active" : ""}`}
                              onClick={() => setWashroomBare(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Area Details */}
                      <div className="step3-section">
                        <div className="step3-section-header">
                          <label className="step3-label">Add Area Details</label>
                          <span className="step3-info-icon">ⓘ</span>
                        </div>
                        <p className="step3-mandatory-text">At least one area type mandatory</p>

                        {/* Plot Area (Built-up Area shown by default) */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Plot Area"
                            value={builtUpArea}
                            onChange={(e) => setBuiltUpArea(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowBuiltUpUnits((p) => !p)}
                          >
                            {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showBuiltUpUnits && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setBuiltUpUnit(u);
                                    setCarpetUnit(u); // keep units in sync
                                    setShowBuiltUpUnits(false);
                                  }}
                                  className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Add Carpet Area button + input */}
                        {!showCarpetArea ? (
                          <button
                            type="button"
                            onClick={() => setShowCarpetArea(true)}
                            className="step3-add-btn"
                          >
                            + Add Carpet Area
                          </button>
                        ) : (
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u);
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Validation */}
                        {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                          <p className="step3-error">Carpet area must be smaller than plot area</p>
                        )}
                      </div>


                      {/* Availability Status */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Availability Status
                        </label>
                        <div className="step3-button-group">
                          {["Ready to Move", "Under Construction"].map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setAvailabilityStatus(status)}
                              className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Age of property if Ready to Move */}
                      {availabilityStatus === "Ready to Move" && (
                        <div className="step3-section">
                          <label className="step3-label">
                            Age of property
                          </label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Possession By if Under Construction */}
                      {availabilityStatus === "Under Construction" && (
                        <div className="step3-section">
                          <label className="step3-label">Possession By</label>
                          <select
                            value={possessionBy}
                            onChange={(e) => setPossessionBy(e.target.value)}
                            className="step3-input"
                          >
                            <option value="" hidden>Expected time</option>
                            <option value="Within 3 Months">Within 3 Months</option>
                            <option value="Within 6 Months">Within 6 Months</option>
                            <option value="By 2026">By 2026</option>
                            <option value="By 2027">By 2027</option>
                            <option value="By 2028">By 2028</option>
                            <option value="By 2029">By 2029</option>
                            <option value="By 2030">By 2030</option>
                          </select>
                        </div>
                      )}
                    </>
                  )}

                {propertyType === "Commercial" &&
                  subPropertyType === "Retail" &&
                  (subPropertyQuestionOption === "Commercial Shops" ||
                    subPropertyQuestionOption === "Commercial Showrooms") && (
                    <>
                      {/* Area Details */}
                      <div className="step3-section">
                        <div className="step3-section-header">
                          <label className="step3-label">
                            Add Area Details
                          </label>
                          <span className="step3-info-icon">ⓘ</span>
                        </div>
                        <p className="step3-mandatory-text">
                          At least one area type mandatory
                        </p>

                        {/* Carpet Area */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Carpet Area"
                            value={carpetArea}
                            onChange={(e) => setCarpetArea(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowCarpetUnits((p) => !p)}
                          >
                            {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showCarpetUnits && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setCarpetUnit(u);
                                    setBuiltUpUnit(u); // 🔹 Sync both units
                                    setShowCarpetUnits(false);
                                  }}
                                  className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Validation for Carpet Area */}
                        {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                          <p className="step3-error">Carpet area must be smaller than built-up area</p>
                        )}

                        {/* Built-up Area */}
                        {!showBuiltUpArea ? (
                          <button
                            type="button"
                            onClick={() => setShowBuiltUpArea(true)}
                            className="step3-add-btn"
                          >
                            + Add Built-up Area
                          </button>
                        ) : (
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Built-up Area"
                              value={builtUpArea}
                              onChange={(e) => setBuiltUpArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowBuiltUpUnits((p) => !p)}
                            >
                              {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showBuiltUpUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setBuiltUpUnit(u);
                                      setCarpetUnit(u); // 🔹 Sync both units
                                      setShowBuiltUpUnits(false);
                                    }}
                                    className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                      </div>

                      {/* Shop Facade Size */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Shop facade size <span className="step3-optional">(Optional)</span>
                        </label>
                        <p className="step3-subtext">Shop - front related details</p>

                        {/* Entrance width */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Entrance width"
                            value={entranceWidth}
                            onChange={(e) => setEntranceWidth(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowEntranceUnit((p) => !p)}
                          >
                            {entranceUnit || "ft."} <span className="step3-dropdown-icon">▼</span>
                          </div>
                          {showEntranceUnit && (
                            <div className="step3-unit-dropdown">
                              {["ft.", "mtr."].map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setEntranceUnit(u);
                                    setShowEntranceUnit(false);
                                  }}
                                  className="step3-unit-option"
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Ceiling Height */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Ceiling Height"
                            value={ceilingHeight}
                            onChange={(e) => setCeilingHeight(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowCeilingUnit((p) => !p)}
                          >
                            {ceilingUnit || "ft."} <span className="step3-dropdown-icon">▼</span>
                          </div>
                          {showCeilingUnit && (
                            <div className="step3-unit-dropdown">
                              {["ft.", "mtr."].map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setCeilingUnit(u);
                                    setShowCeilingUnit(false);
                                  }}
                                  className="step3-unit-option"
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Washroom details */}
                      <div className="step3-section">
                        <label className="step3-label">Washroom details</label>
                        <div className="button-group">
                          {["Private washrooms", "Public washrooms", "Not Available"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${retailWashroom.includes(opt) ? "active" : ""}`}
                              onClick={() => {
                                if (opt === "Not Available") {
                                  // If "Not Available" clicked -> clear all other options and select only this
                                  setRetailWashroom(["Not Available"]);
                                } else {
                                  setRetailWashroom((prev) => {
                                    // if "Not Available" is already selected -> remove it
                                    let updated = prev.filter((i) => i !== "Not Available");

                                    // then toggle the selected option
                                    if (updated.includes(opt)) {
                                      return updated.filter((i) => i !== opt);
                                    } else {
                                      return [...updated, opt];
                                    }
                                  });
                                }
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Floor Details */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Floor Details
                        </label>
                        <div className="step3-floor-group">
                          <input
                            type="number"
                            value={totalFloors}
                            onChange={(e) => {
                              const v = e.target.value;
                              setTotalFloors(v);
                              const nTotal = parseInt(v, 10);
                              const nProp = parseInt(propertyOnFloor, 10);
                              if (!Number.isNaN(nTotal) && !Number.isNaN(nProp) && nProp > nTotal) {
                                setPropertyOnFloor(String(nTotal));
                              }
                            }}
                            placeholder="Total Floors"
                            className="step3-floor-input"
                          />
                          <select
                            value={propertyOnFloor}
                            onChange={(e) => setPropertyOnFloor(e.target.value)}
                            className="step3-floor-select"
                          >
                            <option value="" hidden>Property on Floor</option>
                            <option value="Basement">Basement</option>
                            <option value="Lower Ground">Lower Ground</option>
                            <option value="Ground">Ground</option>
                            {(() => {
                              const n = parseInt(totalFloors, 10);
                              if (!Number.isNaN(n) && n > 0) {
                                return Array.from({ length: n }, (_, i) => i + 1).map((f) => (
                                  <option key={f} value={String(f)}>
                                    {f}
                                  </option>
                                ));
                              }
                              return null;
                            })()}
                          </select>
                        </div>
                      </div>

                      {/* Located Near */}
                      <div className="step3-section">
                        <label className="step3-label">Located Near <span className="step3-optional">(Optional)</span></label>
                        <div className="button-group">
                          {["Entrance", "Elevator", "Stairs"].map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={`subproperty-option ${locatedNear.includes(option) ? "active" : ""}`}
                              onClick={() => {
                                setLocatedNear((prev) =>
                                  prev.includes(option)
                                    ? prev.filter((i) => i !== option)
                                    : [...prev, option]
                                );
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Parking Type */}
                      <div className="step3-section">
                        <label className="step3-label">Parking Type</label>
                        <div className="button-group">
                          {["Private Parking", "Public Parking", "Multilevel Parking", "Not Available"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${parkingTypeRetail.includes(opt) ? "active" : ""}`}
                              onClick={() => {
                                if (opt === "Not Available") {
                                  setParkingTypeRetail(["Not Available"]);
                                } else {
                                  setParkingTypeRetail((prev) => {
                                    let updated = prev.filter((i) => i !== "Not Available");
                                    if (updated.includes(opt)) {
                                      return updated.filter((i) => i !== opt);
                                    } else {
                                      return [...updated, opt];
                                    }
                                  });
                                }
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>


                      {/* Availability Status */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Availability Status
                        </label>
                        <div className="step3-button-group">
                          {["Ready to Move", "Under Construction"].map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setAvailabilityStatus(status)}
                              className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Age of property if Ready to Move */}
                      {availabilityStatus === "Ready to Move" && (
                        <div className="step3-section">
                          <label className="step3-label">
                            Age of property
                          </label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Possession By if Under Construction */}
                      {availabilityStatus === "Under Construction" && (
                        <div className="step3-section">
                          <label className="step3-label">Possession By</label>
                          <select
                            value={possessionBy}
                            onChange={(e) => setPossessionBy(e.target.value)}
                            className="step3-input"
                          >
                            <option value="" hidden>Expected time</option>
                            <option value="Within 3 Months">Within 3 Months</option>
                            <option value="Within 6 Months">Within 6 Months</option>
                            <option value="By 2026">By 2026</option>
                            <option value="By 2027">By 2027</option>
                            <option value="By 2028">By 2028</option>
                            <option value="By 2029">By 2029</option>
                            <option value="By 2030">By 2030</option>
                          </select>
                        </div>
                      )}

                      {/* Business Type (multi-select dropdown with checkboxes) */}
                      <div className="step3-section">
                        <label className="step3-label">Business Type</label>

                        <div
                          className="step3-input"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            marginTop: "4px",
                          }}
                          onClick={() => setShowBusinessTypes((p) => !p)}
                        >
                          {businessTypes.length === 0
                            ? "Select"
                            : businessTypes.length === 1
                              ? businessTypes[0]
                              : `${businessTypes[0]} +${businessTypes.length - 1}`
                          }
                          <span className="step3-dropdown-icon">▼</span>
                        </div>

                        {showBusinessTypes && (
                          <div
                            className="step3-dropdown-checkbox-list"
                            style={{
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              padding: "12px",
                              maxHeight: "170px",
                              overflowY: "auto",
                              marginTop: "6px"
                            }}
                          >
                            {[
                              "ATM",
                              "Bakery",
                              "Boutique",
                              "Clinic",
                              "Grocery Store",
                              "Restaurant"
                            ].map((type) => (
                              <label
                                key={type}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "10px",
                                  gap: "8px"
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={businessTypes.includes(type)}
                                  onChange={() => {
                                    setBusinessTypes((prev) =>
                                      prev.includes(type)
                                        ? prev.filter((i) => i !== type)
                                        : [...prev, type]
                                    );
                                  }}
                                />
                                <span>{type}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                    </>
                  )}

                {propertyType === "Commercial" &&
                  subPropertyType === "Plot" &&
                  (
                    subPropertyQuestionOption === "Commercial Land/inst.Land" ||
                    subPropertyQuestionOption === "Agriculture/Farm Land" ||
                    subPropertyQuestionOption === "Industrial Lands/Plots"
                  ) && (
                    <>
                      {/* Plot Area Section */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Add Area Details
                        </label>
                        <p className="step3-mandatory-text">
                          Please enter the plot size
                        </p>

                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Plot Area"
                            value={plotArea}
                            onChange={(e) => setPlotArea(e.target.value)}
                            className="step3-input"
                          />
                          <select
                            value={plotAreaUnit}
                            onChange={(e) => setPlotAreaUnit(e.target.value)}
                            className="step3-unit-select"
                          >
                            <option value="Sq.ft">Sq.ft</option>
                            <option value="Sq.yards">Sq.yards</option>
                            <option value="Sq.m">Sq.m</option>
                            <option value="Acres">Acres</option>
                            <option value="Marla">Marla</option>
                            <option value="Cents">Cents</option>
                          </select>
                        </div>
                      </div>

                      {/* Property Dimensions */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Property Dimensions <span className="step3-optional">(Optional)</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Length of plot (in Yard)"
                          value={plotLength}
                          onChange={(e) => setPlotLength(e.target.value)}
                          className="step3-input"
                          style={{ marginBottom: "10px" }}
                        />
                        <input
                          type="number"
                          placeholder="Breadth of plot (in Yard)"
                          value={plotBreadth}
                          onChange={(e) => setPlotBreadth(e.target.value)}
                          className="step3-input"
                        />
                      </div>

                      {/* Width of facing road */}
                      <div className="step3-section">
                        <label className="step3-label">Width of facing road </label>
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Enter the width"
                            value={roadWidth}
                            onChange={(e) => setRoadWidth(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowRoadUnit((p) => !p)}
                          >
                            {roadUnit || "Select"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showRoadUnit && (
                            <div className="step3-unit-dropdown">
                              {["Feet", "Meter"].map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setRoadUnit(u);
                                    setShowRoadUnit(false);
                                  }}
                                  className="step3-unit-option"
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* No. of open sides */}
                      <div className="step3-section">
                        <label className="step3-label">No. of open sides</label>
                        <div className="button-group">
                          {["1", "2", "3", "3+"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${openSides === opt ? "active" : ""}`}
                              onClick={() => setOpenSides(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>


                      {/* Existing Construction */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Any construction done on this property?
                        </label>
                        <div className="step3-button-group">
                          <button
                            type="button"
                            onClick={() => setHasConstruction(true)}
                            className={`step3-option-btn ${hasConstruction ? 'active' : ''}`}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setHasConstruction(false)}
                            className={`step3-option-btn ${hasConstruction === false ? 'active' : ''}`}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      {/* Construction Type (if hasConstruction is true) */}
                      {hasConstruction && (
                        <div className="step3-section">
                          <label className="step3-label">
                            What type of construction has been done?
                          </label>
                          <div className="step3-button-group">
                            {['Shed', 'Rooms', 'Washroom', 'Other'].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  if (constructionTypes.includes(type)) {
                                    setConstructionTypes(constructionTypes.filter(t => t !== type));
                                  } else {
                                    setConstructionTypes([...constructionTypes, type]);
                                  }
                                }}
                                className={`step3-option-btn ${constructionTypes.includes(type) ? 'active' : ''}`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}


                      {/* Property facing */}
                      <div className="step3-section">
                        <label className="step3-label">Property facing</label>
                        <div className="button-group">
                          {[
                            "North",
                            "South",
                            "East",
                            "West",
                            "North-East",
                            "North-West",
                            "South-East",
                            "South-West",
                          ].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${propertyFacing === opt ? "active" : ""}`}
                              onClick={() => setPropertyFacing(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>


                      {/* Possession By */}
                      <div className="step3-section">
                        <label className="step3-label">Possession By</label>
                        <select
                          value={possessionBy}
                          onChange={(e) => setPossessionBy(e.target.value)}
                          className="step3-input"
                        >
                          <option value="" hidden>Expected time</option>
                          <option value="Immediate">Immediate</option>
                          <option value="Within 3 Months">Within 3 Months</option>
                          <option value="Within 6 Months">Within 6 Months</option>
                          <option value="By 2026">By 2026</option>
                          <option value="By 2027">By 2027</option>
                          <option value="By 2028">By 2028</option>
                          <option value="By 2029">By 2029</option>

                        </select>
                      </div>


                    </>
                  )}

                {propertyType === "Commercial" &&
                  subPropertyType === "Storage" &&
                  (subPropertyQuestionOption === "Ware House" ||
                    subPropertyQuestionOption === "Cold Storage") && (
                    <>
                      {/* Washrooms */}
                      <div className="step3-section">
                        <label className="step3-label">Washrooms</label>
                        <div className="button-group">
                          {["None", "Shared", "1", "2", "3", "4"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${washroomBare === opt ? "active" : ""}`}
                              onClick={() => setWashroomBare(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Area Details */}
                      <div className="step3-section">
                        <div className="step3-section-header">
                          <label className="step3-label">Add Area Details</label>
                          <span className="step3-info-icon">ⓘ</span>
                        </div>
                        <p className="step3-mandatory-text">At least one area type mandatory</p>

                        {/* Plot Area (Built-up Area shown by default) */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Plot Area"
                            value={builtUpArea}
                            onChange={(e) => setBuiltUpArea(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowBuiltUpUnits((p) => !p)}
                          >
                            {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showBuiltUpUnits && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setBuiltUpUnit(u);
                                    setCarpetUnit(u); // keep units in sync
                                    setShowBuiltUpUnits(false);
                                  }}
                                  className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Add Carpet Area button + input */}
                        {!showCarpetArea ? (
                          <button
                            type="button"
                            onClick={() => setShowCarpetArea(true)}
                            className="step3-add-btn"
                          >
                            + Add Carpet Area
                          </button>
                        ) : (
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u);
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Validation */}
                        {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                          <p className="step3-error">Carpet area must be smaller than plot area</p>
                        )}
                      </div>

                      {/* Availability Status */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Availability Status
                        </label>
                        <div className="step3-button-group">
                          {["Ready to Move", "Under Construction"].map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setAvailabilityStatus(status)}
                              className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Age of property if Ready to Move */}
                      {availabilityStatus === "Ready to Move" && (
                        <div className="step3-section">
                          <label className="step3-label">
                            Age of property
                          </label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Possession By if Under Construction */}
                      {availabilityStatus === "Under Construction" && (
                        <div className="step3-section">
                          <label className="step3-label">Possession By</label>
                          <select
                            value={possessionBy}
                            onChange={(e) => setPossessionBy(e.target.value)}
                            className="step3-input"
                          >
                            <option value="" hidden>Expected time</option>
                            <option value="Within 3 Months">Within 3 Months</option>
                            <option value="Within 6 Months">Within 6 Months</option>
                            <option value="By 2026">By 2026</option>
                            <option value="By 2027">By 2027</option>
                            <option value="By 2028">By 2028</option>
                            <option value="By 2029">By 2029</option>
                            <option value="By 2030">By 2030</option>
                          </select>
                        </div>
                      )}



                    </>
                  )}

                {propertyType === "Commercial" &&
                  subPropertyType === "Industry" &&
                  (subPropertyQuestionOption === "Factory" ||
                    subPropertyQuestionOption === "Manufacturing") && (
                    <>
                      {/* Washrooms */}
                      <div className="step3-section">
                        <label className="step3-label">Washrooms</label>
                        <div className="button-group">
                          {["None", "Shared", "1", "2", "3", "4"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${washroomBare === opt ? "active" : ""}`}
                              onClick={() => setWashroomBare(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Area Details */}
                      <div className="step3-section">
                        <div className="step3-section-header">
                          <label className="step3-label">Add Area Details</label>
                          <span className="step3-info-icon">ⓘ</span>
                        </div>
                        <p className="step3-mandatory-text">At least one area type mandatory</p>

                        {/* Plot Area (Built-up Area shown by default) */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Plot Area"
                            value={builtUpArea}
                            onChange={(e) => setBuiltUpArea(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowBuiltUpUnits((p) => !p)}
                          >
                            {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showBuiltUpUnits && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setBuiltUpUnit(u);
                                    setCarpetUnit(u); // keep units in sync
                                    setShowBuiltUpUnits(false);
                                  }}
                                  className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Add Carpet Area button + input */}
                        {!showCarpetArea ? (
                          <button
                            type="button"
                            onClick={() => setShowCarpetArea(true)}
                            className="step3-add-btn"
                          >
                            + Add Carpet Area
                          </button>
                        ) : (
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u);
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Validation */}
                        {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                          <p className="step3-error">Carpet area must be smaller than plot area</p>
                        )}
                      </div>

                      {/* Availability Status */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Availability Status
                        </label>
                        <div className="step3-button-group">
                          {["Ready to Move", "Under Construction"].map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setAvailabilityStatus(status)}
                              className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Age of property if Ready to Move */}
                      {availabilityStatus === "Ready to Move" && (
                        <div className="step3-section">
                          <label className="step3-label">
                            Age of property
                          </label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Possession By if Under Construction */}
                      {availabilityStatus === "Under Construction" && (
                        <div className="step3-section">
                          <label className="step3-label">Possession By</label>
                          <select
                            value={possessionBy}
                            onChange={(e) => setPossessionBy(e.target.value)}
                            className="step3-input"
                          >
                            <option value="" hidden>Expected time</option>
                            <option value="Within 3 Months">Within 3 Months</option>
                            <option value="Within 6 Months">Within 6 Months</option>
                            <option value="By 2026">By 2026</option>
                            <option value="By 2027">By 2027</option>
                            <option value="By 2028">By 2028</option>
                            <option value="By 2029">By 2029</option>
                            <option value="By 2030">By 2030</option>
                          </select>
                        </div>
                      )}



                    </>
                  )}


                {propertyType === "Commercial" &&
                  subPropertyType === "Hospitality" &&
                  (subPropertyQuestionOption === "Hotel / Resorts" ||
                    subPropertyQuestionOption === "Guest-House / Banquet Hall") && (
                    <>
                      {/* Add Room Details */}
                      <div className="step3-section">
                        <label className="step3-label">Add Room Details</label>
                        <input
                          type="number"
                          placeholder="Enter the total no. of rooms"
                          value={totalRooms}
                          onChange={(e) => setTotalRooms(e.target.value)}
                          className="step3-input"
                          style={{ marginBottom: "12px" }}
                        />

                        <label className="step3-label" style={{ marginTop: "8px" }}>No. of Washrooms</label>
                        <div className="button-group">
                          {["None", "Shared", "1", "2", "3", "4"].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`subproperty-option ${hospitalityWash === opt ? "active" : ""}`}
                              onClick={() => setHospitalityWash(opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Area Details */}
                      <div className="step3-section">
                        <div className="step3-section-header">
                          <label className="step3-label">Add Area Details</label>
                          <span className="step3-info-icon">ⓘ</span>
                        </div>
                        <p className="step3-mandatory-text">At least one area type mandatory</p>

                        {/* Plot Area (Built-up Area shown by default) */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Plot Area"
                            value={builtUpArea}
                            onChange={(e) => setBuiltUpArea(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowBuiltUpUnits((p) => !p)}
                          >
                            {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showBuiltUpUnits && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setBuiltUpUnit(u);
                                    setCarpetUnit(u); // keep units in sync
                                    setShowBuiltUpUnits(false);
                                  }}
                                  className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Add Carpet Area button + input */}
                        {!showCarpetArea ? (
                          <button
                            type="button"
                            onClick={() => setShowCarpetArea(true)}
                            className="step3-add-btn"
                          >
                            + Add Carpet Area
                          </button>
                        ) : (
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u);
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Validation */}
                        {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                          <p className="step3-error">Carpet area must be smaller than plot area</p>
                        )}
                      </div>

                      {/* Availability Status */}
                      <div className="step3-section">
                        <label className="step3-label">
                          Availability Status
                        </label>
                        <div className="step3-button-group">
                          {["Ready to Move", "Under Construction"].map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setAvailabilityStatus(status)}
                              className={`step3-option-btn ${availabilityStatus === status ? 'active' : ''}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Age of property if Ready to Move */}
                      {availabilityStatus === "Ready to Move" && (
                        <div className="step3-section">
                          <label className="step3-label">
                            Age of property
                          </label>
                          <div className="step3-button-group">
                            {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map((age) => (
                              <button
                                key={age}
                                type="button"
                                onClick={() => setAgeOfProperty(age)}
                                className={`step3-option-btn ${ageOfProperty === age ? 'active' : ''}`}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Possession By if Under Construction */}
                      {availabilityStatus === "Under Construction" && (
                        <div className="step3-section">
                          <label className="step3-label">Possession By</label>
                          <select
                            value={possessionBy}
                            onChange={(e) => setPossessionBy(e.target.value)}
                            className="step3-input"
                          >
                            <option value="" hidden>Expected time</option>
                            <option value="Within 3 Months">Within 3 Months</option>
                            <option value="Within 6 Months">Within 6 Months</option>
                            <option value="By 2026">By 2026</option>
                            <option value="By 2027">By 2027</option>
                            <option value="By 2028">By 2028</option>
                            <option value="By 2029">By 2029</option>
                            <option value="By 2030">By 2030</option>
                          </select>
                        </div>
                      )}

                      {/* Quality Rating */}
                      <div className="step3-section">
                        <label className="step3-label">Quality Rating</label>
                        <div className="button-group">
                          {["No Rating", "1 Star", "2 Star", "3 Star", "4 Star", "5 Star", "6 Star", "7 Star"].map((rate) => (
                            <button
                              key={rate}
                              type="button"
                              className={`subproperty-option ${qualityRating === rate ? "active" : ""}`}
                              onClick={() => setQualityRating(rate)}
                            >
                              {rate}
                            </button>
                          ))}
                        </div>
                      </div>


                    </>
                  )}

                {propertyType === "Commercial" &&
                  (subPropertyType === "Others") && (
                    <>
                      {/* Area Details */}
                      <div className="step3-section">
                        <div className="step3-section-header">
                          <label className="step3-label">Add Area Details</label>
                          <span className="step3-info-icon">ⓘ</span>
                        </div>
                        <p className="step3-mandatory-text">At least one area type mandatory</p>

                        {/* Plot Area (Built-up Area shown by default) */}
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Plot Area"
                            value={builtUpArea}
                            onChange={(e) => setBuiltUpArea(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowBuiltUpUnits((p) => !p)}
                          >
                            {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showBuiltUpUnits && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setBuiltUpUnit(u);
                                    setCarpetUnit(u); // keep units in sync
                                    setShowBuiltUpUnits(false);
                                  }}
                                  className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Add Carpet Area button + input */}
                        {!showCarpetArea ? (
                          <button
                            type="button"
                            onClick={() => setShowCarpetArea(true)}
                            className="step3-add-btn"
                          >
                            + Add Carpet Area
                          </button>
                        ) : (
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u);
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Validation */}
                        {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                          <p className="step3-error">Carpet area must be smaller than plot area</p>
                        )}
                      </div>

                      {/* Possession By */}
                      <div className="step3-section">
                        <label className="step3-label">Possession By</label>
                        <select
                          value={possessionBy}
                          onChange={(e) => setPossessionBy(e.target.value)}
                          className="step3-input"
                        >
                          <option value="" hidden>Expected time</option>
                          <option value="Immediate">Immediate</option>
                          <option value="Within 3 Months">Within 3 Months</option>
                          <option value="Within 6 Months">Within 6 Months</option>
                          <option value="By 2026">By 2026</option>
                          <option value="By 2027">By 2027</option>
                          <option value="By 2028">By 2028</option>
                          <option value="By 2029">By 2029</option>

                        </select>
                      </div>


                    </>
                  )}



                {(subPropertyType.includes("Flat / Apartment") || subPropertyType.includes("Independent House / Villa") || subPropertyType.includes("1 RK / Studio Apartment") || subPropertyType.includes("Farmhouse")) && (
                  <>

                    {listingType === "Joint Venture" && propertyType === "Residential" && (
                      <>
                        <div className="step3-section">
                          <div className="step3-section-header">
                            <label className="step3-label">
                              Add Area Details
                            </label>
                            <span className="step3-info-icon">ⓘ</span>
                          </div>
                          <p className="step3-mandatory-text">
                            At least one area type mandatory
                          </p>

                          {/* Carpet Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u); // 🔹 Sync both units
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Validation for Carpet Area */}
                          {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                            <p className="step3-error">Carpet area must be smaller than built-up area</p>
                          )}

                          {/* Built-up Area */}
                          {!showBuiltUpArea ? (
                            <button
                              type="button"
                              onClick={() => setShowBuiltUpArea(true)}
                              className="step3-add-btn"
                            >
                              + Add Built-up Area
                            </button>
                          ) : (
                            <div className="step3-input-group">
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowBuiltUpUnits((p) => !p)}
                              >
                                {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                              </div>

                              {showBuiltUpUnits && (
                                <div className="step3-unit-dropdown">
                                  {UNIT_OPTIONS.map((u) => (
                                    <div
                                      key={u}
                                      onClick={() => {
                                        setBuiltUpUnit(u);
                                        setCarpetUnit(u); // 🔹 Sync both units
                                        setShowBuiltUpUnits(false);
                                      }}
                                      className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                    >
                                      {u}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>


                        <div>
                          <label className="step3-label">
                            Joint Venture Percentage
                          </label>

                          <div style={{ gap: "15px", width: "400px" }}>
                            {/* Owner Percentage Input */}
                            <div>
                              <label style={{ display: "block", marginBottom: "5px" }}>
                                Owner Percentage
                              </label>
                              <input
                                type="number"
                                value={ownerPercentage}
                                onChange={handleOwnerPercentageChange}
                                placeholder="Enter owner %"
                                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                              />
                            </div>

                            {/* Developer Percentage Input */}
                            <div>
                              <label style={{ display: "block", marginBottom: "5px", marginTop: "20px" }}>
                                Developer Percentage
                              </label>
                              <input
                                type="number"
                                value={developerPercentage}
                                onChange={handleDeveloperPercentageChange}
                                placeholder="Enter developer %"
                                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                              />
                            </div>
                          </div>
                        </div>




                      </>
                    )}


                  </>
                )}




                {(subPropertyType.includes("Office") || subPropertyType.includes("Retail") || subPropertyType.includes("Industry") || subPropertyType.includes("Hospitality")) && (
                  <>

                    {listingType === "Joint Venture" && propertyType === "Commercial" && (
                      <>
                        <div className="step3-section">
                          <div className="step3-section-header">
                            <label className="step3-label">
                              Add Area Details
                            </label>
                            <span className="step3-info-icon">ⓘ</span>
                          </div>
                          <p className="step3-mandatory-text">
                            At least one area type mandatory
                          </p>

                          {/* Carpet Area */}
                          <div className="step3-input-group">
                            <input
                              type="number"
                              placeholder="Carpet Area"
                              value={carpetArea}
                              onChange={(e) => setCarpetArea(e.target.value)}
                              className="step3-input"
                            />
                            <div
                              className="step3-unit-selector"
                              onClick={() => setShowCarpetUnits((p) => !p)}
                            >
                              {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                            </div>

                            {showCarpetUnits && (
                              <div className="step3-unit-dropdown">
                                {UNIT_OPTIONS.map((u) => (
                                  <div
                                    key={u}
                                    onClick={() => {
                                      setCarpetUnit(u);
                                      setBuiltUpUnit(u); // 🔹 Sync both units
                                      setShowCarpetUnits(false);
                                    }}
                                    className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                                  >
                                    {u}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Validation for Carpet Area */}
                          {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                            <p className="step3-error">Carpet area must be smaller than built-up area</p>
                          )}

                          {/* Built-up Area */}
                          {!showBuiltUpArea ? (
                            <button
                              type="button"
                              onClick={() => setShowBuiltUpArea(true)}
                              className="step3-add-btn"
                            >
                              + Add Built-up Area
                            </button>
                          ) : (
                            <div className="step3-input-group">
                              <input
                                type="number"
                                placeholder="Built-up Area"
                                value={builtUpArea}
                                onChange={(e) => setBuiltUpArea(e.target.value)}
                                className="step3-input"
                              />
                              <div
                                className="step3-unit-selector"
                                onClick={() => setShowBuiltUpUnits((p) => !p)}
                              >
                                {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                              </div>

                              {showBuiltUpUnits && (
                                <div className="step3-unit-dropdown">
                                  {UNIT_OPTIONS.map((u) => (
                                    <div
                                      key={u}
                                      onClick={() => {
                                        setBuiltUpUnit(u);
                                        setCarpetUnit(u); // 🔹 Sync both units
                                        setShowBuiltUpUnits(false);
                                      }}
                                      className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                    >
                                      {u}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>


                        <div>
                          <label className="step3-label">
                            Joint Venture Percentage
                          </label>

                          <div style={{ gap: "15px", width: "400px" }}>
                            {/* Owner Percentage Input */}
                            <div>
                              <label style={{ display: "block", marginBottom: "5px" }}>
                                Owner Percentage
                              </label>
                              <input
                                type="number"
                                value={ownerPercentage}
                                onChange={handleOwnerPercentageChange}
                                placeholder="Enter owner %"
                                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                              />
                            </div>

                            {/* Developer Percentage Input */}
                            <div>
                              <label style={{ display: "block", marginBottom: "5px", marginTop: "20px" }}>
                                Developer Percentage
                              </label>
                              <input
                                type="number"
                                value={developerPercentage}
                                onChange={handleDeveloperPercentageChange}
                                placeholder="Enter developer %"
                                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                              />
                            </div>
                          </div>
                        </div>

                      </>
                    )}


                  </>
                )}





                {listingType === "Joint Venture" && propertyType === "Layout/Land development" && (
                  <>
                    <div className="step3-section">
                      <div className="step3-section-header">
                        <label className="step3-label">
                          Add Area Details
                        </label>
                        <span className="step3-info-icon">ⓘ</span>
                      </div>
                      <p className="step3-mandatory-text">
                        At least one area type mandatory
                      </p>

                      {/* Carpet Area */}
                      <div className="step3-input-group">
                        <input
                          type="number"
                          placeholder="Carpet Area"
                          value={carpetArea}
                          onChange={(e) => setCarpetArea(e.target.value)}
                          className="step3-input"
                        />
                        <div
                          className="step3-unit-selector"
                          onClick={() => setShowCarpetUnits((p) => !p)}
                        >
                          {carpetUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                        </div>

                        {showCarpetUnits && (
                          <div className="step3-unit-dropdown">
                            {UNIT_OPTIONS.map((u) => (
                              <div
                                key={u}
                                onClick={() => {
                                  setCarpetUnit(u);
                                  setBuiltUpUnit(u); // 🔹 Sync both units
                                  setShowCarpetUnits(false);
                                }}
                                className={`step3-unit-option ${carpetUnit === u ? "selected" : ""}`}
                              >
                                {u}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Validation for Carpet Area */}
                      {carpetArea && builtUpArea && Number(carpetArea) >= Number(builtUpArea) && (
                        <p className="step3-error">Carpet area must be smaller than built-up area</p>
                      )}

                      {/* Built-up Area */}
                      {!showBuiltUpArea ? (
                        <button
                          type="button"
                          onClick={() => setShowBuiltUpArea(true)}
                          className="step3-add-btn"
                        >
                          + Add Built-up Area
                        </button>
                      ) : (
                        <div className="step3-input-group">
                          <input
                            type="number"
                            placeholder="Built-up Area"
                            value={builtUpArea}
                            onChange={(e) => setBuiltUpArea(e.target.value)}
                            className="step3-input"
                          />
                          <div
                            className="step3-unit-selector"
                            onClick={() => setShowBuiltUpUnits((p) => !p)}
                          >
                            {builtUpUnit || "Unit"} <span className="step3-dropdown-icon">▼</span>
                          </div>

                          {showBuiltUpUnits && (
                            <div className="step3-unit-dropdown">
                              {UNIT_OPTIONS.map((u) => (
                                <div
                                  key={u}
                                  onClick={() => {
                                    setBuiltUpUnit(u);
                                    setCarpetUnit(u); // 🔹 Sync both units
                                    setShowBuiltUpUnits(false);
                                  }}
                                  className={`step3-unit-option ${builtUpUnit === u ? "selected" : ""}`}
                                >
                                  {u}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>


                    <div>
                      <label className="step3-label">
                        Joint Venture Percentage
                      </label>

                      <div style={{ gap: "15px", width: "400px" }}>
                        {/* Owner Percentage Input */}
                        <div>
                          <label style={{ display: "block", marginBottom: "5px" }}>
                            Owner Percentage
                          </label>
                          <input
                            type="number"
                            value={ownerPercentage}
                            onChange={handleOwnerPercentageChange}
                            placeholder="Enter owner %"
                            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                          />
                        </div>

                        {/* Developer Percentage Input */}
                        <div>
                          <label style={{ display: "block", marginBottom: "5px", marginTop: "20px" }}>
                            Developer Percentage
                          </label>
                          <input
                            type="number"
                            value={developerPercentage}
                            onChange={handleDeveloperPercentageChange}
                            placeholder="Enter developer %"
                            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
                          />
                        </div>
                      </div>
                    </div>

                  </>
                )}



















                <div className="step3-continue-container">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="step3-continue-btn"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 - Photos, Videos & Voice-over */}
            {currentStep === 4 && (
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Upload Photos, Videos & Voice-over</h4>

                <div style={{ flex: 1, overflowY: "auto", paddingRight: 10 }}>

                  {/* ---- Single Drop + Click Zone ---- */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: "2px dashed #ccc",
                      padding: "30px",
                      borderRadius: "8px",
                      textAlign: "center",
                      marginBottom: "20px",
                      cursor: "pointer"
                    }}
                  >
                    Drag & Drop Photos or Videos here <br /> or <strong>Click to Browse</strong>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />

                  {/* ----- PREVIEW THUMBNAILS ----- */}
                  {previewList.length > 0 && (
                    <div style={{ border: "1px solid #eee", borderRadius: "8px", padding: "15px", marginBottom: "20px" }}>
                      <h5 style={{ marginBottom: "10px", fontWeight: 500 }}>Uploaded Files ({previewList.length})</h5>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "15px" }}>
                        {previewList.map((item, index) => (
                          <div key={index} style={{ position: "relative", height: "160px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>

                            {/* ❌ Cancel Button */}
                            <button
                              onClick={() => {
                                setPreviewList(previewList.filter((_, i) => i !== index));
                                setFiles(files.filter((_, i) => i !== index));
                              }}
                              style={{
                                position: "absolute",
                                top: "6px",
                                left: "6px",
                                width: "22px",
                                height: "22px",
                                borderRadius: "50%",
                                border: "none",
                                background: "rgba(0,0,0,0.6)",
                                color: "#fff",
                                fontSize: "14px",
                                lineHeight: "20px",
                                cursor: "pointer",
                                zIndex: 10
                              }}
                            >
                              ×
                            </button>

                            {/* Show thumbnail (image) or video preview */}
                            {item.file.type.startsWith("image/") ? (
                              <img src={item.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <video src={item.preview} controls style={{ width: "100%", height: "100%" }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {files.length === 0 && (
                    <div style={{ background: "#fff3cd", color: "#856404", padding: "10px", borderRadius: "4px", fontSize: "14px" }}>
                      Without photos or videos your ad will be ignored by buyers.
                    </div>
                  )}
                </div>
                {/* ---- Navigation Buttons ---- */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", borderTop: "1px solid #eee", background: "#fff" }}>
                  <button
                    onClick={() => setCurrentStep(3)}
                    style={{ background: "#f8f9fa", border: "1px solid #ddd", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}>
                    Back
                  </button>
                  <button
                    disabled={files.length === 0}
                    onClick={() => setCurrentStep(5)}
                    style={{
                      background: files.length > 0 ? "#ED2027" : "#ccc",
                      color: "#fff", padding: "10px 28px", borderRadius: "6px",
                      fontWeight: 600, border: "none",
                      cursor: files.length > 0 ? "pointer" : "not-allowed"
                    }}
                  >
                    Continue to Pricing
                  </button>
                </div>
              </div>
            )}


            {/* step 5 */}
            {currentStep === 5 && (
              <div style={{ padding: "20px", maxWidth: "700px" }}>
                <h4 style={{ color: "#333", fontWeight: 600, fontSize: 18, marginBottom: 20 }}>
                  Add pricing and details...
                </h4>

                {/* Ownership */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: 10 }}>
                    Ownership
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"].map(
                      (type) => {
                        const isSelected = selectedOwnership === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedOwnership(type)}
                            style={{
                              padding: "8px 18px",
                              border: "1px solid",
                              borderColor: isSelected ? "#ED2027" : "#ddd",
                              borderRadius: 20,
                              background: isSelected ? "#ED2027" : "#fff",
                              color: isSelected ? "#fff" : "#333",
                              cursor: "pointer",
                              fontSize: 14,
                              fontWeight: isSelected ? 600 : 500,
                              transition: "all 0.15s ease",
                            }}
                            // onMouseOver={(e) => !isSelected && (e.currentTarget.style.borderColor = "#ED2027")}
                            onMouseOut={(e) => !isSelected && (e.currentTarget.style.borderColor = "#ddd")}
                          >
                            {type}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Price Details */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: 10 }}>
                    Price Details
                  </label>

                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <input
                      type="text"
                      placeholder="Expected Price"
                      value={expectedPrice}
                      onChange={(e) => setExpectedPrice(e.target.value)}
                      style={{
                        flex: 1,
                        padding: 10,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        fontSize: 14,
                        transition: "border-color 0.15s ease",
                      }}
                      onMouseOver={(e) => (e.target.style.borderColor = "#ED2027")}
                      onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
                    />
                    <input
                      type="text"
                      placeholder="Price per sq.yards"
                      value={pricePerSqYards}
                      onChange={(e) => setPricePerSqYards(e.target.value)}
                      style={{
                        flex: 1,
                        padding: 10,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        fontSize: 14,
                        transition: "border-color 0.15s ease",
                      }}
                      onMouseOver={(e) => (e.target.style.borderColor = "#ED2027")}
                      onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
                    />
                  </div>

                  {/* Checkboxes */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label
                      style={{
                        fontSize: 14,
                        accentColor: "#ED2027",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checkboxes.allInclusive}
                        onChange={() => toggleCheckbox("allInclusive")}
                      />
                      All inclusive price
                    </label>

                    <label
                      style={{
                        fontSize: 14,
                        accentColor: "#ED2027",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checkboxes.taxExcluded}
                        onChange={() => toggleCheckbox("taxExcluded")}
                      />
                      Tax and Govt. charges excluded
                    </label>

                    <label
                      style={{
                        fontSize: 14,
                        accentColor: "#ED2027",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checkboxes.negotiable}
                        onChange={() => toggleCheckbox("negotiable")}
                      />
                      Price Negotiable
                    </label>
                  </div>
                </div>

                {/* Additional Pricing */}
                <div style={{ marginBottom: 20 }}>
                  {/* Toggle Button styled like nice-select */}
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      padding: "10px 40px 10px 16px",
                      background: "#fff",
                      fontSize: 14,
                      color: "#333",
                      userSelect: "none",
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseOver={(e) => (e.currentTarget.style.borderColor = "#ED2027")}
                    onMouseOut={(e) => (e.currentTarget.style.borderColor = "#ccc")}
                  >
                    <span>{isOpen ? "Close Pricing Details" : "Add More Pricing Details"}</span>
                    <span
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 12,
                        pointerEvents: "none",
                      }}
                    >
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* Collapsible Section */}
                  {isOpen && (
                    <div style={{ marginTop: 20 }}>
                      <label
                        style={{
                          fontWeight: 600,
                          display: "block",
                          marginBottom: 10,
                        }}
                      >
                        Additional Pricing Details (Optional)
                      </label>

                      {/* Maintenance & Frequency */}
                      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <input
                          type="text"
                          placeholder="Maintenance"
                          value={maintenance}
                          onChange={(e) => setMaintenance(e.target.value)}
                          style={{
                            flex: 1,
                            padding: 10,
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            fontSize: 14,
                          }}
                          onMouseOver={(e) => (e.target.style.borderColor = "#ED2027")}
                          onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
                        />

                        <select
                          value={maintenanceFreq}
                          onChange={(e) => setMaintenanceFreq(e.target.value)}
                          style={{
                            width: 160,
                            padding: 10,
                            border: "1px solid #ccc",
                            borderRadius: 4,
                            fontSize: 14,
                            background: "#fff",
                          }}
                          onMouseOver={(e) => (e.target.style.borderColor = "#ED2027")}
                          onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
                        >
                          <option>Monthly</option>
                          <option>Quarterly</option>
                          <option>Yearly</option>
                        </select>
                      </div>

                      {/* Expected Rental */}
                      <input
                        type="text"
                        placeholder="Expected rental"
                        value={expectedRental}
                        onChange={(e) => setExpectedRental(e.target.value)}
                        style={{
                          width: "100%",
                          padding: 10,
                          marginBottom: 10,
                          border: "1px solid #ccc",
                          borderRadius: 4,
                          fontSize: 14,
                        }}
                        onMouseOver={(e) => (e.target.style.borderColor = "#ED2027")}
                        onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
                      />

                      {/* Booking Amount */}
                      <input
                        type="text"
                        placeholder="Booking Amount"
                        value={bookingAmount}
                        onChange={(e) => setBookingAmount(e.target.value)}
                        style={{
                          width: "100%",
                          padding: 10,
                          marginBottom: 10,
                          border: "1px solid #ccc",
                          borderRadius: 4,
                          fontSize: 14,
                        }}
                        onMouseOver={(e) => (e.target.style.borderColor = "#ED2027")}
                        onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
                      />

                      {/* Annual Dues */}
                      <input
                        type="text"
                        placeholder="Annual dues payable"
                        value={annualDues}
                        onChange={(e) => setAnnualDues(e.target.value)}
                        style={{
                          width: "100%",
                          padding: 10,
                          marginBottom: 10,
                          border: "1px solid #ccc",
                          borderRadius: 4,
                          fontSize: 14,
                        }}
                        onMouseOver={(e) => (e.target.style.borderColor = "#ED2027")}
                        onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
                      />
                    </div>
                  )}
                </div>

                {/* Brokerage */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: 10 }}>
                    Do you charge brokerage?
                  </label>

                  {/* Yes / No Buttons */}
                  <div style={{ display: "flex", gap: 20 }}>
                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        cursor: "pointer",
                        accentColor: "#ED2027",
                        fontWeight: brokerage === "yes" ? 600 : 500,
                      }}
                    >
                      <input
                        type="radio"
                        name="brokerage"
                        value="yes"
                        checked={brokerage === "yes"}
                        onChange={() => setBrokerage("yes")}
                      />
                      Yes
                    </label>

                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        cursor: "pointer",
                        accentColor: "#ED2027",
                        fontWeight: brokerage === "no" ? 600 : 500,
                      }}
                    >
                      <input
                        type="radio"
                        name="brokerage"
                        value="no"
                        checked={brokerage === "no"}
                        onChange={() => setBrokerage("no")}
                      />
                      No
                    </label>
                  </div>

                  {/* Conditional Brokerage Amount Input */}
                  {brokerage === "yes" && (
                    <div style={{ marginTop: 15 }}>
                      <input
                        type="text"
                        placeholder="Enter Brokerage Amount"
                        value={brokerageAmount}
                        onChange={(e) => setBrokerageAmount(e.target.value)}
                        style={{
                          width: "100%",
                          padding: 10,
                          border: "1px solid #ccc",
                          borderRadius: 4,
                          fontSize: 14,
                          transition: "border-color 0.15s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.borderColor = "#ED2027")}
                        onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontWeight: 600, display: "block", marginBottom: 10 }}>
                    What makes your property unique
                  </label>
                  <textarea
                    placeholder="Add a description..."
                    rows={4}
                    value={description}
                    onChange={(e) => {
                      const onlyWords = e.target.value.replace(/[^a-zA-Z\s]/g, ""); // removes numbers & special chars
                      setDescription(onlyWords);
                    }}
                    style={{
                      width: "100%",
                      padding: 10,
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      fontSize: 14,
                      transition: "border-color 0.15s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.borderColor = "#ED2027")}
                    onMouseOut={(e) => (e.target.style.borderColor = "#ccc")}
                  />
                  <small style={{ display: "block", marginTop: 6, color: "#888" }}>
                    Minimum 30 characters required
                  </small>
                </div>


                {/* Continue Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleStep5Continue}
                    style={{
                      backgroundColor: "#ED2027",
                      color: "#fff",
                      padding: "12px 28px",
                      borderRadius: 6,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 15,
                      transition: "background-color 0.15s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c41b21")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ED2027")}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
                <h4 style={{
                  color: "#333",
                  fontWeight: 600,
                  fontSize: "clamp(16px, 4vw, 18px)",
                  marginBottom: 20
                }}>
                  Select Amenities
                </h4>

                {/* Amenities Section */}
                <div style={{ marginBottom: 25 }}>
                  <h5 style={{
                    color: "#444",
                    fontWeight: 600,
                    fontSize: "clamp(14px, 3.5vw, 15px)",
                    marginBottom: 15
                  }}>
                    Amenities
                  </h5>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                    {["Maintenance Staff", "Water Storage", "Waste Disposal", "Rain Water Harvesting",
                      "Piped-gas", "Water purifier", "Visitor Parking", "Feng Shui / Vasaru Compliant", "Park"].map(item => {
                        const key = item.toLowerCase().replace(/ /g, '');
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleAmenity(key)}
                            className={`amenity-btn ${amenities[key] ? "active" : ""}`}
                          >
                            {item}
                          </button>
                        )
                      })}
                  </div>
                </div>

                {/* Property Features Section */}
                <div style={{ marginBottom: 25 }}>
                  <h5 style={{ color: "#444", fontWeight: 600, fontSize: "clamp(14px,3.5vw,15px)", marginBottom: 15 }}>
                    Property Features
                  </h5>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                    {["High Ceiling Height", "False Ceiling Lighting", "Internet/wifi connectivity",
                      "Centrally Air Conditioned", "Security / Fire Alarm", "Recently Renovated",
                      "Private Garden / Terrace", "Natural Light", "Any Rooms", "Intercom Facility",
                      "Spacious Interiors"].map(item => {
                        const key = item.toLowerCase().replace(/ /g, '');
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleAmenity(key)}
                            className={`amenity-btn ${amenities[key] ? "active" : ""}`}
                          >
                            {item}
                          </button>
                        )
                      })}
                  </div>
                </div>

                {/* Society/Building feature Section */}
                <div style={{ marginBottom: 25 }}>
                  <h5 style={{ color: "#444", fontWeight: 600, fontSize: "clamp(14px,3.5vw,15px)", marginBottom: 15 }}>
                    Society/Building feature
                  </h5>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                    {["Fitness Centre / GYM", "Swimming Pool", "Club house / Community Center",
                      "Security Personnel", "Lift"].map(item => {
                        const key = item.toLowerCase().replace(/ /g, '');
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleAmenity(key)}
                            className={`amenity-btn ${amenities[key] ? "active" : ""}`}
                          >
                            {item}
                          </button>
                        )
                      })}
                  </div>
                </div>

                {/* Additional Features Section */}
                <div style={{ marginBottom: 25 }}>
                  <h5 style={{ color: "#444", fontWeight: 600, fontSize: "clamp(14px,3.5vw,15px)", marginBottom: 15 }}>
                    Additional Features
                  </h5>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                    {["Separate entry for servant room", "No open drainage around",
                      "Bank Attached Property", "Low Density Society"].map(item => {
                        const key = item.toLowerCase().replace(/ /g, '');
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleAmenity(key)}
                            className={`amenity-btn ${amenities[key] ? "active" : ""}`}
                          >
                            {item}
                          </button>
                        )
                      })}
                  </div>
                </div>

                {/* Water Source Section */}
                <div style={{ marginBottom: 25 }}>
                  <h5 style={{ color: "#444", fontWeight: 600, fontSize: "clamp(14px,3.5vw,15px)", marginBottom: 15 }}>
                    Water Source
                  </h5>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                    {["Municipal corporation", "Borewell/Tank", "24*7 Water"].map(item => {
                      const key = item.toLowerCase().replace(/[ /]/g, '');
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleAmenity(key)}
                          className={`amenity-btn ${amenities[key] ? "active" : ""}`}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Overlooking Section */}
                <div style={{ marginBottom: 30 }}>
                  <h5 style={{ color: "#444", fontWeight: 600, fontSize: "clamp(14px,3.5vw,15px)", marginBottom: 15 }}>
                    Overlooking
                  </h5>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                    {["Pool", "Park/Garden", "Club", "Main Road"].map(item => {
                      const key = `overlooking${item.replace(/[/]/g, '')}`;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleAmenity(key)}
                          className={`amenity-btn ${amenities[key] ? "active" : ""}`}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Submit */}

                <button
                  type="button"
                  onClick={handleSubmitPropperty}
                  className="submit-btn"
                >
                  Submit Property
                </button>




              </div>
            )}



          </div>

        </div>

      </div>

    </div >


  );
};

export default AddProperty;