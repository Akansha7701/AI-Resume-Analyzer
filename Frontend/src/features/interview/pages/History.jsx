import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview";
import "../style/history.scss";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

const History = () => {
  const navigate = useNavigate();
  const { reports, deleteInterview } = useInterview();

  const [search, setSearch] = useState("");

  const filteredReports = reports.filter((report) =>
    (report.title || "").toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Interview?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ff0066",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      try {
        await deleteInterview(id);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Interview deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete interview.",
        });
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="history-page">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>

        <div className="history-top">
          <div>
            <h1>Interview History</h1>
            <p>Manage all your previous interview reports.</p>
          </div>

          <button
            className="dashboard-generate-btn"
            onClick={() => navigate("/generate")}
          >
            + Generate Interview
          </button>
        </div>

        <div className="history-search">
          <input
            type="text"
            placeholder="🔍 Search interview..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="reports-list">
          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <h2>No interview reports yet</h2>

              <p>Generate your first AI interview report to get started.</p>

              <button
                className="dashboard-generate-btn"
                onClick={() => navigate("/generate")}
              >
                + Generate Interview
              </button>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report._id} className="report-card">
                <div className="report-info">
                  <h3>{report.title}</h3>

                  <p>
                    Created {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="report-score">
                  <span className="score">{report.matchScore ?? 0}%</span>

                  <small>ATS Score</small>
                </div>

                <div className="report-actions">
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/interview/${report._id}`)}
                  >
                    View Report
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(report._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default History;
