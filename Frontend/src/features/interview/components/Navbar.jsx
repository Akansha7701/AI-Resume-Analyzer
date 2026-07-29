import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const confirmLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ff0066",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      handleLogout();
    }
  };

  return (
    <header className="dashboard-navbar">
      <div
        className="dashboard-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        Interview<span>AI</span>
      </div>

      <div className="navbar-right">
        <div className="user-profile">
          <div className="avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <span>{user?.username}</span>
        </div>

        <button className="dashboard-logout-btn" onClick={confirmLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
