import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Reviews = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    rating: "",
    date: "",
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/reviews`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("Fetched data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);
  const handleAddReview = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((newReview) => {
        console.log("Success:", newReview); // Update reviews with the new review
        setReviews((prevReviews) => [...prevReviews, newReview]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteReview = (reviewId) => {
    fetch(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Review deleted"); // Filter out the deleted review
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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

  const arrayStyle = {
    display: 'row',
    justifyContent: 'space-between',
    color: 'white',
  };


  return (
    <div className="addReviewsPage" style={formContainerStyle}>
      <div>
        <h1 style={{color: 'white'}}>Reviews</h1>

        <ul style={{color: 'white'}}>
          {reviews &&
            Array.isArray(reviews) &&
            reviews.map((review) => (
              <li key={review._id} style={arrayStyle}>
                <Link to={`/reviews/${review._id}`} style={{color: 'white'}}>{review.title}                
                </Link>

                <button onClick={() => handleDeleteReview(review._id)} style={buttonStyle}>
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h2 style={{color: 'white'}}>Add a Review</h2>

        <form onSubmit={handleAddReview}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <input
              type="number"
              name="rating"
              placeholder="Rating"
              value={form.rating}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={form.date}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="image"
              placeholder="Image"
              value={form.image}
              onChange={handleFormChange}
            />
          </div>

          <button type="submit" style={buttonStyle}>Add Review</button>
        </form>
      </div>
    </div>
  );
};
export default Reviews;
