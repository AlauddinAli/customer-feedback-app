import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import "./Feedback.css";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [mode, setMode] = useState("add");
  const [existingFeedback, setExistingFeedback] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchUserFeedback();
  // }, []);
  useEffect(() => {
  fetchUserFeedback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const fetchUserFeedback = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setExistingFeedback(data[0]);
          setFeedback(data[0].content);
          setMode("edit");
        }
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      alert("Please write feedback before submitting!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (mode === "add" && !existingFeedback) {
        const response = await fetch(`${API_URL}/feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: feedback }),
        });

        if (response.ok) {
          alert("Feedback submitted successfully!");
          fetchUserFeedback();
        } else {
          const data = await response.json();
          alert(data.message || "Failed to submit feedback");
        }
      } else if (mode === "edit" && existingFeedback) {
        const response = await fetch(
          `${API_URL}/feedback/${existingFeedback._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content: feedback }),
          }
        );

        if (response.ok) {
          alert("Feedback updated successfully!");
          fetchUserFeedback();
        } else {
          const data = await response.json();
          alert(data.message || "Failed to update feedback");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h2>Feedback</h2>

        <div className="feedback-buttons">
          <button
            className={mode === "add" ? "active" : ""}
            onClick={() => {
              setMode("add");
              if (!existingFeedback) setFeedback("");
            }}
            type="button"
            disabled={!existingFeedback}
          >
            Add Feedback
          </button>
          <button
            className={mode === "edit" ? "active" : ""}
            onClick={() => {
              setMode("edit");
              if (existingFeedback) setFeedback(existingFeedback.content);
            }}
            type="button"
            disabled={!existingFeedback}
          >
            Edit Feedback
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Your Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;