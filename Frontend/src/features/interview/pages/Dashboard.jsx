import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { useInterview } from "../hooks/useInterview";
import "../style/dashboard.scss";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
          title: "Delete Failed",
          text: "Unable to delete interview.",
        });
      }
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <main className="dashboard-content">
        <section className="welcome-section">
          <div className="welcome-left">
            <h1>Welcome back, {user?.username}</h1>

            <p>
              Generate personalized interview plans, practice technical
              questions and track your interview preparation.
            </p>
          </div>

          <button
            className="dashboard-generate-btn"
            onClick={() => navigate("/generate")}
          >
            + Generate Interview
          </button>
        </section>

        <section className="recent-section">
          <div className="history-header">
            <h2 className="history-title">Interview History</h2>

            <button
              className="view-all-btn"
              onClick={() => navigate("/history")}
            >
              View All →
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

          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <h3>No Interview History</h3>

              <p>Generate your first interview to see it here.</p>
            </div>
          ) : (
            <div className="reports-list">
              {filteredReports.slice(0, 3).map((report) => (
                <div key={report._id} className="report-card">
                  <div className="report-info">
                    <h3>{report.title || "Untitled Position"}</h3>

                    <p>
                      Created{" "}
                      {new Date(report.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="report-score">
                    <span className="score">{report.matchScore ?? 0}%</span>

                    <small>ATS Match</small>
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
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
