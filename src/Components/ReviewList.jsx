import React, { useEffect, useState } from "react";
import Header from "./Header";
import api from "../api/api";
import { useParams } from "react-router-dom";
import "./Inquiries.css";

const ReviewList = () => {
    const { id } = useParams(); // optional property id
    const [properties, setProperties] = useState([]);


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
                setProperties(
                    Array.isArray(response.data.data)
                        ? response.data.data
                        : [response.data.data]
                );
            }
        } catch (error) {
            console.error("Review error:", error);
        }
    };



    useEffect(() => {
        reviewList();
    }, [id]);




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
                        Property Reviews
                    </h2>

                    {properties.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted fs-5">No reviews found</p>
                        </div>
                    ) : (
                        properties.map((property) => (
                            <div
                                key={property.id}
                                className="property-card mb-5 p-4 rounded shadow-sm"
                            >
                                {/* Property Header */}
                                <div
                                    className="property-header mb-4 p-3 rounded"
                                    style={{
                                        backgroundColor: "#f8f9fa",
                                        borderLeft: "4px solid #ED2027",
                                    }}
                                >
                                    <h4 className="mb-0">
                                        <span className="text-muted me-2">Property Name:</span>
                                        <span style={{ color: "#2c3e50", fontWeight: "600" }}>
                                            {property.title}
                                        </span>
                                    </h4>
                                </div>

                                {/* Reviews Table */}
                                {property.review && property.review.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead style={{ backgroundColor: "#3498db", color: "white" }}>
                                                <tr>
                                                    <th>User Name</th>
                                                    <th>Message</th>
                                                    <th>Star</th>
                                                    <th>User Type</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {property.review.map((rev) => (
                                                    <tr key={rev.id} style={{ verticalAlign: "middle" }}>
                                                        <td className="fw-medium">{rev.user_name || rev.username}</td>
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
                                ) : (
                                    <div className="text-center py-4 bg-light rounded">
                                        <p className="text-muted mb-0">No reviews for this property.</p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default ReviewList;
