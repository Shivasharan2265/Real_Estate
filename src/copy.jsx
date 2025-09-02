{
  currentStep === 3 && (
    <div className="step3-container">
      {/* Property Profile Header */}
      <h4 className="step3-header">
        Tell us about your property
      </h4>


      <div className="step3-section">
        <label className="step3-label">
          Your apartment is a
        </label>
        <div className="step3-button-group">
          {['2BHK', '3BHK', '4BHK', '5BHK', 'Other'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setApartmentType(type)}
              className={`step3-option-btn ${apartmentType === type ? 'active' : ''}`}
            >
              {type}
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




      {/* {Other rooms (Optional)} */}
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


      {/* Reserved Parking */}
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




      {/* Continue Button */}
      <div className="step3-continue-container">
        <button
          onClick={() => setCurrentStep(4)}
          className="step3-continue-btn"
        >
          Continue
        </button>
      </div>
    </div>

  )
}