import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function Contact(props) {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  async function submitHandler(event) {
    event.preventDefault();
    const movie = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate,
    };
    const response = await fetch(
      "https://e-commerce-14a74-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    alert("form submitted we will contact you shortly");
    setOpeningText("");
    setReleaseDate("");
    setTitle("");
    console.log(data);
  }
  function titleChangeHandler(event) {
    setTitle(event.target.value);
  }
  function openingTextChangeHandler(event) {
    setOpeningText(event.target.value);
  }
  function releaseDateChangeHandler(event) {
    setReleaseDate(event.target.value);
  }
  return (
    <>
      <div
        style={{
          height: "15rem",
          width: "30rem",
          margin: "10rem",
          alignContent: "center",
        }}
      >
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="title" className="form-label mb-3">
              Full Name
            </label>
            <input
              type="text"
              placeholder="first middle last"
              id="title"
              className="form-control mb-3"
              value={title}
              onChange={titleChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="opening-text" className="form-label mb-3">
              Email Id
            </label>
            <input
              id="opening-text"
              className="form-control mb-3"
              type="email"
              placeholder="name@example.com"
              value={openingText}
              onChange={openingTextChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="date" className="form-label mb-3">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="0123456789"
              id="date"
              className="form-control mb-3"
              value={releaseDate}
              onChange={releaseDateChangeHandler}
            />
          </div>
          <button type="submit" className="btn btn-success mb-3">
            Submit Form
          </button>
        </form>
      </div>
    </>
  );
}
export default Contact;
