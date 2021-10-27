import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { API_URL } from "../constants";
import Review from "./Review";

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "column"};
  padding-left: ${(props) => props.paddingLeft || null};
`;
const Select = styled.select`
  width: 30%;
  height: auto;
  background: white;
  color: gray;
  padding: 12px;
  font-size: 16px;
  border: 1px solid gray;
  border-radius: 5px;

  option {
    color: black;
    background: white;
    display: flex;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const PostReviews = () => {
  const [userData, setUserData] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/users`, { method: "GET", cors: "cors" })
      .then((response) => response.json())
      .then((users) => setUserData([...users]))
      .catch((error) => console.log("Error:", error));
  }, []);

  const userSelectHandler = (event) => {
    setUserSelected(
      userData.filter((user) => user.id === Number(event.target.value))[0],
    );
  };

  return (
    <FlexContainer paddingLeft="1rem">
      <h1>Post a Review</h1>
      {userData.length > 0 ? (
        <Select onChange={userSelectHandler}>
          <option value="" hidden>
            Select a user
          </option>
          {userData.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
      ) : (
        <FlexContainer>No users found!</FlexContainer>
      )}

      {userSelected ? <Review userData={userSelected} /> : null}
    </FlexContainer>
  );
};

export default PostReviews;
