import React, { useRef, useState } from "react";
import {
  Stepper, Step, StepLabel, Button, TextField, MenuItem,
  Grid, Chip, Autocomplete, Box, Typography, Card, CardMedia, CardContent, FormControlLabel, Checkbox
} from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

const steps = [
  "Add Contact Details",
  "Add Business Timings",
  "Add Business Category",
  "Enter Your Business Details",
  "Add Photos",
];
const categorySuggestions = [
  "Car Rental For Outstation",
  "Car Rental With Driver",
];
const areaOptions = [
  "Andheri West", "Vile Parle West", "Bandra East", "Juhu", "Dadar", "Powai"
];

const Adddetails = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    contactPerson: "",
    mobile: "",
    whatsapp: "",
    sameAsMobile: false,
    landline: "",
    email: "",
    selectedDays: [],
    timeSlots: [{ open: "", close: "" }],
    searchCategory: "",
    selectedCategories: [],
    businessName: "",
    pincode: "",
    plot: "",
    building: "",
    street: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    address: "",
    website: "",
    photos: [],
  });

  const fileInputRef = useRef();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "sameAsMobile" && checked ? { whatsapp: prev.mobile } : {}),
    }));
  };

  const handleCategoryChange = (_, value) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: value,
    }));
  };

  // Photo upload handler
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...previews],
    }));
  };
  const handleRemovePhoto = (removeIdx) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== removeIdx),
    }));
  };


  return (
    <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
      {/* Left side image - hide on mobile */}
      <Grid
        item
        xs={false}     // 🚀 hide completely on xs
        md={6}
        sx={{
          display: { xs: "none", md: "flex" }, // Hide on xs, show on md+
          backgroundColor: "#f9f9f9",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <Box
          sx={{
            marginLeft: "50px",
            width: "100%",
            maxWidth: "330px",
            marginTop: "25px",
          }}
        >
          <img
            src="https://www.justdial.com/Free-Listing/_next/image?url=https%3A%2F%2Fakam.cdn.jdmagicbox.com%2Fimages%2Ficontent%2Flistingbusiness%2Fbusiness_detail_2x_new.png&w=1080&q=75"
            alt="Sample"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              display: "block",
              marginLeft: "200px",
            }}
          />
        </Box>
      </Grid>

      {/* Right side form - responsive full width */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          padding: { xs: "15px", md: "30px 20px" }, // smaller padding on mobile
          scrollBehavior: "smooth",
        }}
      >
        <Card sx={{ boxShadow: "none" }}>
          <CardContent>
            <Box
              sx={{
                width: "100%",
                maxWidth: 500,
                margin: "auto",
                marginLeft: { xs: "0px", md: "400px" }, // center on mobile, shifted on desktop
                marginTop: "25px",
              }}
            >

              {/* Stepper */}
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel onClick={() => setActiveStep(index)} style={{ cursor: "pointer" }}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Step 1 - Contact details */}
              {activeStep === 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Add Contact Details
                  </Typography>

                  <Grid container spacing={2}>
                    {/* Title + Contact Person */}
                    <Grid item xs={6} sx={{ width: "100%" }}>
                      <TextField
                        select
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                      >
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Mrs">Mrs</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sx={{ width: "100%" }}>
                      <TextField
                        label="Contact Person"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>

                    {/* Mobile Number */}
                    <Grid item xs={12} sx={{ width: "100%" }}>
                      <TextField
                        label="Mobile Number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                          startAdornment: <span style={{ marginRight: 8 }}>+91</span>,
                        }}
                      />
                    </Grid>

                    {/* WhatsApp Number */}
                    <Grid item xs={12} sx={{ width: "100%" }}>
                      <TextField
                        label="WhatsApp Number"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                          startAdornment: <span style={{ marginRight: 8 }}>+91</span>,
                        }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="sameAsMobile"
                            checked={formData.sameAsMobile}
                            onChange={handleChange}
                          />
                        }
                        label="Same as Mobile Number"
                      />
                    </Grid>

                    {/* Landline + Email */}
                    <Grid item xs={6} sx={{ width: "100%", minWidth: "100%" }}>
                      <TextField
                        label="Landline Number"
                        name="landline"
                        value={formData.landline}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ width: "50%", minWidth: "100%" }}>
                      <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Step 2 - Business Timings */}
              {activeStep === 1 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Add Business Timings
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Let your customers know when you are open for business
                  </Typography>

                  {/* Select Days */}
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Select Days of the Week
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button
                        key={day}
                        variant={formData.selectedDays?.includes(day) ? "contained" : "outlined"}
                        onClick={() => {
                          setFormData((prev) => {
                            const selectedDays = prev.selectedDays || [];
                            return {
                              ...prev,
                              selectedDays: selectedDays.includes(day)
                                ? selectedDays.filter((d) => d !== day)
                                : [...selectedDays, day],
                            };
                          });
                        }}
                        sx={{
                          borderRadius: "50px",
                          minWidth: "50px",
                        }}
                      >
                        {day}
                      </Button>
                    ))}
                  </Box>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.selectedDays?.length === 7}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            selectedDays: e.target.checked
                              ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                              : [],
                          }))
                        }
                      />
                    }
                    label="Select All Days"
                  />

                  {/* Time Slots */}
                  {(formData.timeSlots || []).map((slot, index) => (
                    <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
                      <Grid item xs={6} sx={{ width: "220px" }}>
                        <TextField
                          select
                          label="Open at"
                          value={slot.open || ""}
                          onChange={(e) => {
                            const newSlots = [...formData.timeSlots];
                            newSlots[index].open = e.target.value;
                            setFormData((prev) => ({ ...prev, timeSlots: newSlots }));
                          }}
                          fullWidth
                        >
                          {Array.from({ length: 24 }).map((_, i) => {
                            const hour = i % 12 === 0 ? 12 : i % 12;
                            const ampm = i < 12 ? "AM" : "PM";
                            return (
                              <MenuItem key={i} value={`${hour}:00 ${ampm}`}>
                                {hour}:00 {ampm}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      </Grid>

                      <Grid item xs={6} sx={{ width: "230px" }}>
                        <TextField
                          select
                          label="Close at"
                          value={slot.close || ""}
                          onChange={(e) => {
                            const newSlots = [...formData.timeSlots];
                            newSlots[index].close = e.target.value;
                            setFormData((prev) => ({ ...prev, timeSlots: newSlots }));
                          }}
                          fullWidth
                        >
                          {Array.from({ length: 24 }).map((_, i) => {
                            const hour = i % 12 === 0 ? 12 : i % 12;
                            const ampm = i < 12 ? "AM" : "PM";
                            return (
                              <MenuItem key={i} value={`${hour}:00 ${ampm}`}>
                                {hour}:00 {ampm}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      </Grid>
                    </Grid>
                  ))}

                  <Button
                    variant="text"
                    sx={{ mt: 2, color: "blue" }}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        timeSlots: [...prev.timeSlots, { open: "", close: "" }],
                      }));
                    }}
                  >
                    + Add Another Time Slot
                  </Button>
                </Box>
              )}

              {/* Step 3 - Business Categories */}
              {activeStep === 2 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Add Business Category
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Choose the right business categories so your customer can easily find you
                  </Typography>

                  {/* Multi-select Autocomplete with chips inside */}
                  <Autocomplete
                    multiple
                    freeSolo
                    options={categorySuggestions}
                    value={formData.selectedCategories}
                    onChange={(_, value) =>
                      setFormData((prev) => ({
                        ...prev,
                        selectedCategories: value,
                      }))
                    }
                    filterSelectedOptions
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option}
                          label={option}
                          {...getTagProps({ index })}
                          sx={{
                            backgroundColor: "rgba(0, 123, 255, 0.08)",
                            color: "#1976d2",
                            fontWeight: 500,
                            backdropFilter: "blur(2px)",
                          }}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Type or select business categories"
                        placeholder="Select or type…"
                        sx={{
                          mb: 3,
                          width: "470px",
                          background: "#f6f8fa",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                    sx={{
                      width: "470px",
                      mb: 3,
                    }}
                  />

                  {/* Optionally, keep suggested buttons if you want quick picks */}
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Suggested Categories
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {categorySuggestions.map((cat, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{
                          justifyContent: "flex-start",
                          borderRadius: "20px",
                          width: "470px",
                        }}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            selectedCategories: prev.selectedCategories.includes(cat)
                              ? prev.selectedCategories
                              : [...prev.selectedCategories, cat],
                          }))
                        }
                        disabled={formData.selectedCategories.includes(cat)}
                      >
                        {cat} +
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Step 4 - Business Details */}
              {activeStep === 3 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Enter Your Business Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ width: "100%" }}>
                      <TextField
                        label="Business Name"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ width: "100%" }}>
                      <TextField
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode || ""}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ width: "95%" }}>
                      <TextField
                        label="Plot No. / Bldg No. / Wing / Shop No. / Floor"
                        name="plot"
                        value={formData.plot || ""}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ width: "95%" }}>
                      <TextField
                        label="Building Name / Market / Colony / Society"
                        name="building"
                        value={formData.building || ""}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ width: "223px" }}>
                      <TextField
                        label="Street / Road Name"
                        name="street"
                        value={formData.street || ""}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ width: "236px" }}>
                      <TextField
                        label="Landmark"
                        name="landmark"
                        value={formData.landmark || ""}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ width: "95%" }}>
                      <TextField
                        select
                        label="Area"
                        name="area"
                        value={formData.area || ""}
                        onChange={handleChange}
                        fullWidth
                      >
                        {areaOptions.map((area) => (
                          <MenuItem key={area} value={area}>
                            {area}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sx={{ width: "223px" }}>
                      <TextField
                        label="City"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ width: "236px" }}>
                      <TextField
                        label="State"
                        name="state"
                        value={formData.state || ""}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                </Box>
              )}

              {/* Step 5 - Add Photos */}
              {activeStep === 4 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Add Photos
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Showcase photos of your business to look authentic
                  </Typography>
                  <Grid container spacing={2}>
                    {/* Add Photo upload card */}
                    <Grid item xs={6} sm={3}>
                      <Box
                        sx={{
                          border: "2px dashed #90caf9",
                          borderRadius: 2,
                          height: 120,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          color: "#1976d2",
                          position: "relative",
                        }}
                        onClick={() => fileInputRef.current.click()}
                      >
                        <AddAPhotoOutlinedIcon sx={{ fontSize: 36, mb: 1, width: "100%", minWidth: "200px" }} />
                        <Typography>Add Photo</Typography>
                        <input
                          type="file"
                          name="photos"
                          multiple
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handlePhotoChange}
                        />
                      </Box>
                    </Grid>
                    {/* Show user-selected images only */}
                    {formData.photos.map((photo, idx) => (
                      <Grid item xs={6} sm={3} key={idx}>
                        <Card sx={{ borderRadius: 2, position: "relative", height: 120, overflow: "hidden" }}>
                          <CardMedia
                            component="img"
                            height="120"
                            image={photo.url}
                            alt={`Uploaded ${idx + 1}`}
                            sx={{
                              objectFit: "contain", // Show the full photo
                              width: "100%",
                              minWidth: "200px",
                              height: "100%",
                              background: "#f0f0f0",
                            }}
                          />
                          <Button
                            size="small"
                            sx={{
                              minWidth: 0,
                              position: "absolute",
                              top: 6,
                              right: 6,
                              zIndex: 1,
                              color: "#fff",
                              background: "rgba(0,0,0,0.4)",
                              borderRadius: "50%",
                              width: 28,
                              height: 28,
                              "&:hover": {
                                background: "rgba(0,0,0,0.7)",
                              },
                            }}
                            onClick={() => handleRemovePhoto(idx)}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </Button>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, width: "95%" }}
                    onClick={handleNext}
                  >
                    Skip
                  </Button>
                </Box>
              )}



              {/* Navigation Button */}
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center", width: "100%" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: "16px",
                    minWidth: "472px",
                    height: "50px",
                    borderRadius: "8px",
                    marginRight: "27px",
                  }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Save and Continue"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Adddetails;
