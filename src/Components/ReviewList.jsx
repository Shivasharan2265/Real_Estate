import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "../api/api";
import { useParams } from "react-router-dom";

const ReviewList = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [properties, setProperties] = useState({});

  const reviewList = async () => {
    const fd = new FormData();
    fd.append("programType", "getAllInquiryDetails");
    fd.append("authToken", localStorage.getItem("authToken"));
    if (id) {
      fd.append("property_id", id);
    }

    try {
      const response = await api.post("/properties/propertyInquiry", fd);
      console.log("ReviewDetails", response.data);

      if (response.data.success && response.data.data) {
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];

        const propertiesMap = {};
        const allReviews = [];

        data.forEach((property) => {
          propertiesMap[property.id] = property.title;
          if (property.review && property.review.length > 0) {
            property.review.forEach((rev) => {
              allReviews.push({
                ...rev,
                propertyId: property.id,
                propertyTitle: property.title,
              });
            });
          }
        });

        setProperties(propertiesMap);
        setReviews(allReviews);
      }
    } catch (error) {
      console.error("Review error:", error);
    }
  };

  useEffect(() => {
    reviewList();
  }, [id]);

  return (
    <div style={{ background: "#f9fafc", minHeight: "100vh" }}>
      <Header />
      <section className="flat-section py-5">
        <div className="container-sm">
          <h2
            className="mb-4"
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: "#2c3e50",
            }}
          >
            Property Reviews
          </h2>

          {reviews.length === 0 ? (
            <div className="text-center py-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="no-data"
                width="100"
                className="mb-3 opacity-75"
              />
              <p className="text-muted fs-5">No reviews found</p>
            </div>
          ) : (
            <div
              className="table-responsive shadow-sm rounded-3"
              style={{ background: "#fff" }}
            >
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "#ED2027",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      #
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ED2027",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Property
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ED2027",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      User Name
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ED2027",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Message
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ED2027",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Star
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ED2027",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      User Type
                    </th>
                    <th
                      style={{
                        backgroundColor: "#ED2027",
                        color: "white",
                        fontWeight: "600",
                      }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((rev, index) => (
                    <tr key={rev.id} className="hover-row">
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{rev.propertyTitle}</td>
                      <td>{rev.user_name || rev.username}</td>
                      <td
                        style={{
                          maxWidth: "250px",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {rev.message}
                      </td>
                      <td>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color: i < Number(rev.star) ? "#f5c518" : "#ccc",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </td>
                      <td>{rev.userType}</td>
                      <td>
                        {rev.created_at
                          ? rev.created_at
                              .split(" ")[0]
                              .split("-")
                              .reverse()
                              .join("-")
                          : "N/A"}
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

export default ReviewList;
