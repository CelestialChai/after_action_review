import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      role
      unit {
        _id
        name
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      role
      unit {
        _id
        name
      }
    }
  }
`;

export const GET_MISSIONS = gql`
  query GetMissions {
    missions {
      _id
      name
      startDate
      endDate
    }
  }
`;

export const DELETE_MISSION = gql`
  mutation DeleteMission($id: ID!) {
    deleteMission(id: $id) {
      _id
    }
  }
`;