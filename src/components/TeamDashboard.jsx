import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { API_URL } from "../constants";
import { FlexContainer } from "./PostReviews";
import { SelectRating } from "./Review";

const ReviewItem = styled.div`
  border-bottom: 1px solid #777777;
  padding: 1rem;
  width: 20%;
`;

const TeamDashboard = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [hasReviews, setHasReviews] = useState(true);
  const [loading, setLoading] = useState(false);

  const handlerFilterRatings = (event) => {
    setLoading(true);
    fetch(`${API_URL}/reviews/?ratingFilter=${event.target.value}`, {
      method: "GET",
      cors: "cors",
    })
      .then((response) => response.json())
      .then((reviews) => {
        if (reviews.length > 0) {
          setReviewsData([...reviews]);
          setLoading(false);
          setHasReviews(true);
        } else {
          setHasReviews(false);
          setLoading(false);
          setReviewsData([]);
        }
      })
      .catch((error) => console.log("Error:", error));
  };

  return (
    <FlexContainer paddingLeft="1rem">
      <h1>Team Dashboard</h1>
      <SelectRating onChange={handlerFilterRatings}>
        <option value="null">Select a rating to filter reviews for</option>
        {[1, 2, 3, 4, 5].map((rating, index) => (
          <option key={`rating-${index}`} value={rating}>
            {rating}
          </option>
        ))}
      </SelectRating>
      {!loading && reviewsData.length > 0 && (
        <FlexContainer>
          <FlexContainer flexDirection="row">
            <ReviewItem>User Name</ReviewItem>
            <ReviewItem>Session Id</ReviewItem>
            <ReviewItem>Rating</ReviewItem>
            <ReviewItem>Comments</ReviewItem>
          </FlexContainer>
          {reviewsData.map((review) => (
            <FlexContainer flexDirection="row" key={review.id}>
              <ReviewItem>{review.userName}</ReviewItem>
              <ReviewItem>{review.sessionId}</ReviewItem>
              <ReviewItem>{review.rating}</ReviewItem>
              <ReviewItem>{review.comments}</ReviewItem>
            </FlexContainer>
          ))}
        </FlexContainer>
      )}
      {loading && (
        <Loader type="ThreeDots" color="#309DF4" height={50} width={50} />
      )}
      {!hasReviews && <FlexContainer>No reviews found!</FlexContainer>}
    </FlexContainer>
  );
};

export default TeamDashboard;
