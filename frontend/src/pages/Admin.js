// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./Admin.css";

// // function Admin() {
// //   const [feedbacks, setFeedbacks] = useState([]);
// //   const navigate = useNavigate();

// //   // Fetch feedback list
// //   useEffect(() => {
// //     fetch("http://localhost:5000/feedback")
// //       .then((res) => res.json())
// //       .then((data) => setFeedbacks(data))
// //       .catch((err) => console.error("Error fetching feedbacks:", err));
// //   }, []);

// //   // Delete feedback
// //   const handleDelete = (id) => {
// //     fetch(`http://localhost:5000/feedback/${id}`, { method: "DELETE" })
// //       .then(() => setFeedbacks(feedbacks.filter((f) => f._id !== id)))
// //       .catch((err) => console.error("Error deleting feedback:", err));
// //   };

// //   // Edit feedback
// //   const handleEdit = (id) => {
// //     const newText = prompt("Enter new feedback:");
// //     if (!newText) return;
// //     fetch(`http://localhost:5000/feedback/${id}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ content: newText }),
// //     })
// //       .then((res) => res.json())
// //       .then((updated) => {
// //         setFeedbacks(feedbacks.map((f) => (f._id === id ? updated : f)));
// //       })
// //       .catch((err) => console.error("Error editing feedback:", err));
// //   };

// //   // View feedback
// //   const handleView = (content) => {
// //     alert(`Feedback: ${content}`);
// //   };

// //   // Logout
// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); // remove JWT
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="admin-container">
// //       <h2 className="admin-title">Admin Feedback Dashboard</h2>
// //       <table className="admin-table">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Feedback</th>
// //             <th>Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {feedbacks.length > 0 ? (
// //             feedbacks.map((f, index) => (
// //               <tr key={f._id}>
// //                 <td>{index + 1}</td>
// //                 <td>{f.content}</td>
// //                 <td>{new Date(f.createdAt).toISOString().split("T")[0]}</td>
// //                 <td>
// //                   <button onClick={() => handleView(f.content)}>View</button>
// //                   <button onClick={() => handleEdit(f._id)}>Edit</button>
// //                   <button onClick={() => handleDelete(f._id)}>Delete</button>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="4">No feedback available</td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //       <button className="logout-btn" onClick={handleLogout}>
// //         Log Out
// //       </button>
// //     </div>
// //   );
// // }

// // export default Admin;

// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./Admin.css";

// // function Admin() {
// //   const [feedbacks, setFeedbacks] = useState([]);
// //   const navigate = useNavigate();

// //   // Check if user is admin
// //   useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     if (!user || user.role !== "admin") {
// //       alert("Access denied. Admin only!");
// //       navigate("/login");
// //     }
// //   }, [navigate]);

// //   // Fetch feedback list
// //   useEffect(() => {
// //     fetchFeedbacks();
// //   }, []);

// //   const fetchFeedbacks = () => {
// //     const token = localStorage.getItem("token");
    
// //     fetch("http://localhost:5000/feedback", {
// //       headers: { Authorization: `Bearer ${token}` },
// //     })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to fetch");
// //         return res.json();
// //       })
// //       .then((data) => setFeedbacks(data))
// //       .catch((err) => console.error("Error fetching feedbacks:", err));
// //   };

// //   // Delete feedback
// //   const handleDelete = (id) => {
// //     if (!window.confirm("Are you sure you want to delete this feedback?")) {
// //       return;
// //     }

// //     const token = localStorage.getItem("token");
    
// //     fetch(`http://localhost:5000/feedback/${id}`, {
// //       method: "DELETE",
// //       headers: { Authorization: `Bearer ${token}` },
// //     })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to delete");
// //         return res.json();
// //       })
// //       .then(() => {
// //         alert("Deleted successfully!");
// //         setFeedbacks(feedbacks.filter((f) => f._id !== id));
// //       })
// //       .catch((err) => console.error("Error deleting feedback:", err));
// //   };

// //   // Edit feedback
// //   const handleEdit = (id) => {
// //     const newText = prompt("Enter new feedback:");
// //     if (!newText || newText.trim() === "") return;

// //     const token = localStorage.getItem("token");
    
// //     fetch(`http://localhost:5000/feedback/${id}`, {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify({ content: newText }),
// //     })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to update");
// //         return res.json();
// //       })
// //       .then((updated) => {
// //         alert("Updated successfully!");
// //         setFeedbacks(feedbacks.map((f) => (f._id === id ? updated : f)));
// //       })
// //       .catch((err) => console.error("Error editing feedback:", err));
// //   };

// //   // View feedback
// //   const handleView = (content) => {
// //     alert(`Feedback: ${content}`);
// //   };

// //   // Logout
// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="admin-container">
// //       <h2 className="admin-title">Admin Feedback Dashboard</h2>
// //       <table className="admin-table">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>User</th>
// //             <th>Feedback</th>
// //             <th>Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {feedbacks.length > 0 ? (
// //             feedbacks.map((f, index) => (
// //               <tr key={f._id}>
// //                 <td>{index + 1}</td>
// //                 <td>{f.user?.email || "Unknown"}</td>
// //                 <td>{f.content}</td>
// //                 <td>{new Date(f.createdAt).toLocaleDateString()}</td>
// //                 <td>
// //                   <button onClick={() => handleView(f.content)}>View</button>
// //                   <button onClick={() => handleEdit(f._id)}>Edit</button>
// //                   <button onClick={() => handleDelete(f._id)}>Delete</button>
// //                 </td>
// //               </tr>
// //             ))
// //           ) : (
// //             <tr>
// //               <td colSpan="5">No feedback available</td>
// //             </tr>
// //           )}
// //         </tbody>
// //       </table>
// //       <button className="logout-btn" onClick={handleLogout}>
// //         Log Out
// //       </button>
// //     </div>
// //   );
// // }

// // export default Admin;






// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin.css";

// function Admin() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const navigate = useNavigate();

//   // Check if user is admin
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || user.role !== "admin") {
//       alert("Access denied. Admin only!");
//       navigate("/login");
//     }
//   }, [navigate]);

//   // Fetch feedback list
//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   const fetchFeedbacks = () => {
//     const token = localStorage.getItem("token");
    
//     fetch("http://localhost:5000/feedback", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch");
//         return res.json();
//       })
//       .then((data) => setFeedbacks(data))
//       .catch((err) => console.error("Error fetching feedbacks:", err));
//   };

//   // Delete feedback
//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this feedback?")) {
//       return;
//     }

//     const token = localStorage.getItem("token");
    
//     fetch(`http://localhost:5000/feedback/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to delete");
//         return res.json();
//       })
//       .then(() => {
//         alert("Deleted successfully!");
//         setFeedbacks(feedbacks.filter((f) => f._id !== id));
//       })
//       .catch((err) => console.error("Error deleting feedback:", err));
//   };

//   // Edit feedback
//   const handleEdit = (id) => {
//     const newText = prompt("Enter new feedback:");
//     if (!newText || newText.trim() === "") return;

//     const token = localStorage.getItem("token");
    
//     fetch(`http://localhost:5000/feedback/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ content: newText }),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to update");
//         return res.json();
//       })
//       .then((updated) => {
//         alert("Updated successfully!");
//         setFeedbacks(feedbacks.map((f) => (f._id === id ? updated : f)));
//       })
//       .catch((err) => console.error("Error editing feedback:", err));
//   };

//   // View feedback
//   const handleView = (content) => {
//     alert(`Feedback: ${content}`);
//   };

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="admin-container">
//       <h2 className="admin-title">Admin Feedback Dashboard</h2>
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User</th>
//             <th>Feedback</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {feedbacks.length > 0 ? (
//             feedbacks.map((f, index) => (
//               <tr key={f._id}>
//                 <td>{index + 1}</td>
//                 <td>{f.user?.email || "Unknown"}</td>
//                 <td>{f.content}</td>
//                 <td>{new Date(f.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <button onClick={() => handleView(f.content)}>View</button>
//                   <button onClick={() => handleEdit(f._id)}>Edit</button>
//                   <button onClick={() => handleDelete(f._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No feedback available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <button className="logout-btn" onClick={handleLogout}>
//         Log Out
//       </button>
//     </div>
//   );
// }

// export default Admin;





















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import "./Admin.css";

function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("Access denied. Admin only!");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    const token = localStorage.getItem("token");
    
    fetch(`${API_URL}/feedback`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }

    const token = localStorage.getItem("token");
    
    fetch(`${API_URL}/feedback/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        return res.json();
      })
      .then(() => {
        alert("Deleted successfully!");
        setFeedbacks(feedbacks.filter((f) => f._id !== id));
      })
      .catch((err) => console.error("Error deleting feedback:", err));
  };

  const handleEdit = (id) => {
    const newText = prompt("Enter new feedback:");
    if (!newText || newText.trim() === "") return;

    const token = localStorage.getItem("token");
    
    fetch(`${API_URL}/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newText }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then((updated) => {
        alert("Updated successfully!");
        setFeedbacks(feedbacks.map((f) => (f._id === id ? updated : f)));
      })
      .catch((err) => console.error("Error editing feedback:", err));
  };

  const handleView = (content) => {
    alert(`Feedback: ${content}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Feedback Dashboard</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Feedback</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((f, index) => (
              <tr key={f._id}>
                <td>{index + 1}</td>
                <td>{f.user?.email || "Unknown"}</td>
                <td>{f.content}</td>
                <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleView(f.content)}>View</button>
                  <button onClick={() => handleEdit(f._id)}>Edit</button>
                  <button onClick={() => handleDelete(f._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No feedback available</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="logout-btn" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Admin;