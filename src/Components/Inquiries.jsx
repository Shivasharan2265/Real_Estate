import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "../api/api";
import  './Inquiries';

const Inquiries = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const inquiriesList = async () => {
    const fd = new FormData();
    fd.append("programType", "getAllInquiryDetails");
    fd.append("authToken", localStorage.getItem("authToken"));

    try {
      const response = await api.post("/properties/propertyInquiry", fd);
      console.log("InquiryDetails", response.data);

      if (response.data.success && response.data.data) {
        setProperties(response.data.data);
      }
    } catch (error) {
      console.error("Inquiries error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inquiriesList();
  }, []);

  return (
    <div className="container mt-4">
      <Header />
      <h2 className="mb-4">Property Inquiries</h2>

      {/* ✅ Skeleton loader */}
      {loading ? (
        <div className="skeleton-box" style={{ height: "200px", width: "100%" }}></div>
      ) : properties.length === 0 ? (
        <div className="no-inquiries">
          <p>No inquiries found</p>
        </div>
      ) : (
        properties.map((property) => (
          <div key={property.id} className="mb-5">
            {/* ✅ Property Title */}
            <h4 className="mb-3">{property.title}</h4>

            {property.inquiry && property.inquiry.length > 0 ? (
              <table className="inquiry-details-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {property.inquiry.map((inq) => (
                    <tr key={inq.id} className="inquiry-item">
                      <td>{inq.name}</td>
                      <td>{inq.email}</td>
                      <td>{inq.phone}</td>
                      <td>{inq.message}</td>
                      <td>{inq.status}</td>
                      <td>{inq.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-inquiries">
                <p>No inquiries for this property</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Inquiries;
