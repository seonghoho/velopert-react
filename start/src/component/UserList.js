import React from "react";

const User = ({ user }) => {
  return (
    <div>
      {user.username} ({user.email})
    </div>
  );
};

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
};

export default UserList;
