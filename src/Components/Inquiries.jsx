import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "../api/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Inquiries = () => {
  const { id } = useParams();
  const [inquiries, setInquiries] = useState([]);
  const [properties, setProperties] = useState({});

  const inquiriesList = async () => {
    const fd = new FormData();
    fd.append("programType", "getAllInquiryDetails");
    fd.append("authToken", localStorage.getItem("authToken"));
    if (id) fd.append("property_id", id);

    try {
      const response = await api.post("/properties/propertyInquiry", fd);
      if (response.data.success && response.data.data) {
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];

        const propertiesMap = {};
        const allInquiries = [];

        data.forEach((property) => {
          propertiesMap[property.id] = property.title;
          if (property.inquiry && property.inquiry.length > 0) {
            property.inquiry.forEach((inq) => {
              allInquiries.push({
                ...inq,
                propertyId: property.id,
                propertyTitle: property.title,
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
    if (currentStatus !== "new") return;

    const fd = new FormData();
    fd.append("programType", "statusChangeOfInquiry");
    fd.append("authToken", localStorage.getItem("authToken"));
    fd.append("inquiryId", inquiryId);
    fd.append("status", "respond");

    try {
      const response = await api.post("/properties/propertyInquiry", fd);
      if (response.data.success) {
        inquiriesList();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("inquiryStatus error:", error);
    }
  };

  return (
    <div style={{ background: "#f9fafc", height:"100vh" }}>
      <Header />
      <section className="flat-section py-5" >
        <div className="container-sm">
          <h2
            className="mb-4"
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: "#2c3e50",
            }}
          >
            Property Inquiries
          </h2>

          {inquiries.length === 0 ? (
            <div className="text-center py-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="no-data"
                width="100"
                className="mb-3 opacity-75"
              />
              <p className="text-muted fs-5">No inquiries found</p>
            </div>
          ) : (
            <div
              className="table-responsive shadow-sm rounded-3"
              style={{ background: "#fff" }}
            >
              <table className="table align-middle mb-0">
                <thead

                >
                  <tr>
                     <th style={{
                      backgroundColor: "#ED2027", // 🔴 red header
                      color: "white",
                      fontWeight: "600",
                    }}>#</th>
                    <th style={{
                      backgroundColor: "#ED2027", // 🔴 red header
                      color: "white",
                      fontWeight: "600",
                    }}>Property</th>
                    <th style={{
                      backgroundColor: "#ED2027", // 🔴 red header
                      color: "white",
                      fontWeight: "600",
                    }}>Name</th>
                    <th style={{
                      backgroundColor: "#ED2027", // 🔴 red header
                      color: "white",
                      fontWeight: "600",
                    }}>Email</th>
                    <th style={{
                      backgroundColor: "#ED2027", // 🔴 red header
                      color: "white",
                      fontWeight: "600",
                    }}>Phone</th>
                    <th style={{
                      backgroundColor: "#ED2027", // 🔴 red header
                      color: "white",
                      fontWeight: "600",
                    }}>Message</th>
                    <th style={{
                      backgroundColor: "#ED2027", // 🔴 red header
                      color: "white",
                      fontWeight: "600",
                    }}>Status</th>
                    <th style={{
                      backgroundColor: "#ED2027", // 🔴 red header
                      color: "white",
                      fontWeight: "600",
                    }}>Created At</th>
                  </tr>
                </thead>

                <tbody>
                  {inquiries.map((inq, index) => (
                    <tr key={inq.id} className="hover-row">
                       <td>{index + 1}</td>
                      <td className="fw-semibold">{inq.propertyTitle}</td>
                      <td>{inq.name}</td>
                      <td>
                        <span
                         
                          className="text-decoration-none"
                        >
                          {inq.email}
                        </span>
                      </td>
                      <td>{inq.phone}</td>
                      <td>
                        <span
                          style={{
                            maxWidth: "220px",
                            display: "inline-block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={inq.message}
                        >
                          {inq.message}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span
                            className={`badge rounded-pill px-3 py-2 ${inq.status === "new"
                                ? "bg-warning text-dark"
                                : inq.status === "respond"
                                  ? "bg-success"
                                  : "bg-info"
                              }`}
                          >
                            {inq.status}
                          </span>

                          {inq.status === "new" && (
                            <button
                              className="btn btn-sm ms-2 rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "32px",
                                height: "32px",
                                padding: "0",
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                              }}
                              onClick={() => handleStatusChange(inq.id, inq.status)}
                              title="Mark as responded"
                            >
                              <i className="fa-solid fa-check"></i>
                            </button>
                          )}
                        </div>
                      </td>

                      <td>
                        {new Date(inq.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .hover-row:hover {
          background: #f4f9ff !important;
          transition: background 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default Inquiries;
