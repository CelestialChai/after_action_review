import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      token
      user {
        _id
        username
        email
        role
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        _id
        username
        email
        role
      }
    }
  }
`;

export const CREATE_MISSION = gql`
  mutation CreateMission($input: CreateMissionInput!) {
    createMission(input: $input) {
      _id
      name
      startDate
      endDate
      unit {  # Ensure unit is populated correctly
        _id
        name
      }
    }
  }
`;


export const DELETE_MISSION = gql`
  mutation DeleteMission($id: ID!) {
    deleteMission(id: $id) {
      _id
      name
    }
  }
`;

export const SAVE_MISSION = gql`
  mutation SaveMission($input: CreateMissionInput!) {
    createMission(input: $input) {
      _id
      name
      startDate
      endDate
      unit {
        _id
        name
      }
    }
  }
`;