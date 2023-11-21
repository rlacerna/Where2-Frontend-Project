import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleReview = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    rating: "",
    date: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const reviewId = params.id;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`)
      .then((response) => response.json())
      .then((data) => {
        setForm(data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error fetching review:", error);
        setError("Failed to load review");
      })
      .finally(() => setIsLoading(false));
  }, [reviewId]);

  const handleFormChange = (e) =>
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    fetch(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then(() => {
        setIsEditing(false);
        navigate("/reviews");
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        setError("Failed to update review");
      })
      .finally(() => setIsLoading(false));
  };

  const formContainerStyle = {
    textAlign: 'center',
    padding: '20px',
    maxWidth: '400px',
    backgroundColor: 'transparent',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'absolute', 
    left: '50%', 
    top: '50%', 
    transform: 'translate(-50%, -50%)'
  };
  
  
  const inputStyle = {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px', 
    border: '1px solid #ddd' 
  };
  
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#444', 
    color: '#fff', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const pStyle = {
    color: 'white'
  };


  return (
    <div style={formContainerStyle}>
      <h2 style={{ color: "white" }}>{isEditing ? "Edit Review" : "Review Details"}</h2>
      {error && <p>{error}</p>}

      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleFormChange}
            placeholder="Title"
            style={inputStyle}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Description"
            style={inputStyle}
          />

          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleFormChange}
            placeholder="Rating"
            min="1"
            max="5"
            style={inputStyle}
          />

          <input
            type="text"
            name="date"
            value={form.date}
            onChange={handleFormChange}
            placeholder="Date"
            style={inputStyle}
          />

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleFormChange}
            placeholder="Image URL"
            style={inputStyle}
          />

          <button type="submit" disabled={isLoading}>
            Save Changes
          </button>
        </form>
      ) : (
        <>
          <p style={pStyle}>Title: {form.title}</p>
          <p style={pStyle}>Description: {form.description}</p>
          <p style={pStyle}>Rating: {form.rating}</p>
          <p style={pStyle}>Date: {form.date.split('T')[0]}</p>
          <p style={pStyle}>Image URL: {form.image}</p>
          <button onClick={handleEditClick} style={buttonStyle}>Edit Review</button>
        </>
      )}
    </div>
  );
};

export default SingleReview;
