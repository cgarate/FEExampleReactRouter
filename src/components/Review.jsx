import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API_URL } from "../constants";
import Button from "./Button";
import { FlexContainer } from "./PostReviews";

const CommentsBox = styled.textarea`
  width: 50%;
  height: 100px;
  margin: 0.5rem 0;
`;

export const SelectRating = styled.select`
  width: max-content;
  height: auto;
  background: white;
  color: gray;
  padding: 12px;
  font-size: 16px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0.5rem 0;

  option {
    color: black;
    background: white;
    display: flex;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const Review = ({ userData }) => {
  const [rating, setRating] = useState(null);
  const [hasUserReviewedAlready, setHasUserReviewedAlready] = useState(false);
  const [comments, setComments] = useState(null);
  const { lastGameSession, id, name } = userData;

  useEffect(() => {
    setHasUserReviewedAlready(false);
  }, [userData.id]);

  const handleResponseNotOk = () => {
    setRating(null);
    setComments(null);
    setHasUserReviewedAlready(true);
  };

  const submitHandler = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating,
        comments,
        sessionId: lastGameSession,
        userId: id,
        userName: name,
      }),
    };
    fetch(`${API_URL}/reviews/new`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          handleResponseNotOk({
            status: response.status,
            statusText: response.statusText,
          });
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.log("Error:", error));
  };
  const handleComments = (event) => {
    setComments(event.target.value);
  };

  const handleRating = (event) => {
    setRating(event.target.value);
  };

  return (
    <FlexContainer>
      {hasUserReviewedAlready && (
        <FlexContainer>
          User has already reviewed their last game session. Try another user.
        </FlexContainer>
      )}
      <SelectRating onChange={handleRating}>
        <option value="null">Rate your last game session</option>
        {[1, 2, 3, 4, 5].map((rating, index) => (
          <option key={`rating-${index}`} value={rating}>
            {rating}
          </option>
        ))}
      </SelectRating>

      <CommentsBox
        onChange={handleComments}
        placeholder="You can add a comment here"
        value={comments}
      />
      <Button disabled={!rating} onClick={submitHandler}>
        Submit Review
      </Button>
    </FlexContainer>
  );
};

export default Review;
