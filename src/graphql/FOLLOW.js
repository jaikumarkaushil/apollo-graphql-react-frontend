import { gql } from "@apollo/client";

const FOLLOW = gql`
    mutation FollowMutation($user_id: ID!) {
        followUser(id: $user_id) {
            message
            success
        }
    }
`;

export default FOLLOW;
