import { useState } from "react";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Felix",
    title: "Full Stack Developer",
    avatar: "/avatar.png",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;