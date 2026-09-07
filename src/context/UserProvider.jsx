import { useState } from "react";
import { UserContext } from "./UserContext";

function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Felix Ouma",
    title: "Software Engineering Student",
    avatar: "/avatar.png",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;