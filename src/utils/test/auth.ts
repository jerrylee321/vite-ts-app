import { User } from "../../models/user";

export const testUser: User = Object.freeze({
  userID: "24601",
  role: "User",
  name: "John Doe",
  username: "johndoe",
  email: "johndoe@example.com",
});

export const testUserWithUserID = (userID: string): User => {
  return { ...testUser, userID };
};
