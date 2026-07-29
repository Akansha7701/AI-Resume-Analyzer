import { useNavigate } from "react-router";

const ReportCard = ({ report, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="report-card">
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

        <small>ATS Score</small>
      </div>

      <div className="report-actions">
        <button
          className="view-btn"
          onClick={() => navigate(`/interview/${report._id}`)}
        >
          View Report
        </button>

        <button className="delete-btn" onClick={() => onDelete(report._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
