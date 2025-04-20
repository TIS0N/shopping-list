import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// 1. Define the shape of a user
type User = {
  id: string;
  name: string;
};

// 2. Static list of users
const USERS: User[] = [
  { id: "123456789", name: "Jason Momoa" },
  { id: "987654321", name: "Stephan kadner" },
  { id: "147258369", name: "Tony Stark" },
  { id: "963852741", name: "Peter Moonlit" },
  { id: "741852963", name: "James Bond" },
  { id: "741834563", name: "Scarlet White" },
];

// 3. Define the shape of your context
type UserContextType = [User, Dispatch<SetStateAction<User>>];

// 4. Create the context with a default value (we’ll override it in the provider)
const UserContext = createContext<UserContextType | undefined>(undefined);

// 5. UserProvider component
type UserProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const userState = useState<User>(USERS[0]);
  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

// 6. Dropdown component to select user
function UserSelector() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserSelector must be used within a UserProvider");
  }

  const [user, setUser] = context;

  return (
    <select
      value={user.id}
      onChange={(e) => setUser(USERS.find(({ id }) => id === e.target.value)!)}
    >
      {USERS.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}

// 7. Hook to get current user
function useUser(): User {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context[0];
}

export { UserProvider, UserSelector, useUser };
