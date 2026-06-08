import { useEffect, useState } from "react";
import api from "../../api/axios";

function Profile() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get(
            "/auth/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUser(
          res.data.user
        );

      } catch (error) {

        console.log(error);

      }

    };

  if (!user) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }

  return (

    <div className="max-w-4xl mx-auto p-10">
        

      <h1 className="text-4xl font-bold mb-10">
        My Profile
      </h1>

      <div className="space-y-4">

        <p>
          <strong>Name:</strong>
          {" "}
          {user.name}
        </p>

        <p>
          <strong>Email:</strong>
          {" "}
          {user.email}
        </p>

        <p>
          <strong>Role:</strong>
          {" "}
          {user.role}
        </p>

        <p>
          <strong>Joined:</strong>
          {" "}
          {
            new Date(
              user.createdAt
            ).toLocaleDateString()
          }
        </p>

      </div>

    </div>

  );
}

export default Profile;