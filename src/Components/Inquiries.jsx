import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "../api/api";
import { useParams } from "react-router-dom";
// import "./Inquiries.css";
import toast from "react-hot-toast";

const Inquiries = () => {
  const { id } = useParams(); // property id (if available)
  const [inquiries, setInquiries] = useState([]);
  const [properties, setProperties] = useState({});

  const inquiriesList = async () => {
    const fd = new FormData();
    fd.append("programType", "getAllInquiryDetails");
    fd.append("authToken", localStorage.getItem("authToken"));
    if (id) {
      fd.append("property_id", id);
    }

    try {
      const response = await api.post("/properties/propertyInquiry", fd);
      if (response.data.success && response.data.data) {
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];
        
        // Set properties for reference
        const propertiesMap = {};
        // Flatten all inquiries into a single array
        const allInquiries = [];
        
        data.forEach(property => {
          propertiesMap[property.id] = property.title;
          if (property.inquiry && property.inquiry.length > 0) {
            property.inquiry.forEach(inq => {
              allInquiries.push({
                ...inq,
                propertyId: property.id,
                propertyTitle: property.title
              });
            });
          }
        });
        
        setProperties(propertiesMap);
        setInquiries(allInquiries);
      }
    } catch (error) {
      console.error("Inquiries error:", error);
    }
  };

  useEffect(() => {
    inquiriesList();
  }, [id]);

  const handleStatusChange = async (inquiryId, currentStatus) => {
    if (currentStatus !== "new") return; // only allow if status is new

    const fd = new FormData();
    fd.append("programType", "statusChangeOfInquiry");
    fd.append("authToken", localStorage.getItem("authToken"));
    fd.append("inquiryId", inquiryId);
    fd.append("status", "respond");

    try {
      const response = await api.post("/properties/propertyInquiry", fd);
      if (response.data.success) {
        // refresh inquiry list
        inquiriesList();
        toast.success(response.data.message)
      }
    } catch (error) {
      console.error("inquiryStatus error:", error);
    }
  };

  return (
    <div>
      <Header />
      <section className="flat-section">
        <div className="container">
          <h2
            className="mb-4"
            style={{
              textAlign: "center",
              marginTop: "30px",
              fontWeight: "700",
              color: "#2c3e50",
            }}
          >
            Property Inquiries
          </h2>

          {inquiries.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted fs-5">No inquiries found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#3498db", color: "white" }}>
                  <tr>
                    <th>Property</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq.id} style={{ verticalAlign: "middle" }}>
                      <td className="fw-medium">
                        {inq.propertyTitle}
                      </td>
                      <td className="fw-medium">{inq.name}</td>
                      <td>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-decoration-none"
                        >
                          {inq.email}
                        </a>
                      </td>
                      <td>{inq.phone}</td>
                      <td>
                        <div
                          className="message-preview"
                          style={{
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {inq.message}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            inq.status === "new"
                              ? "bg-warning"
                              : inq.status === "respond"
                              ? "bg-success"
                              : "bg-info"
                          }`}
                        >
                          {inq.status}
                        </span>
                        {inq.status === "new" && (
                          <button
                            className=""
                            onClick={() =>
                              handleStatusChange(inq.id, inq.status)
                            }
                            title="Mark as responded"
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                        )}
                      </td>
                      <td>{new Date(inq.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Inquiries;