import { Button, Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUsers } from "../../state/usersSlice.js";

const initialErrors = {
  name: false,
  email: false,
};

export default function EditUser() {
  const navigate = useNavigate();

  // Find the user by ID
  const { users } = useSelector(selectUsers);
  const { userId } = useParams();
  const { id, name, email } = users.find((user) => user.id === userId);

  if (!id) navigate("/", { replace: true });

  const [formValues, setFormValues] = useState({ name, email });
  const [error, setError] = useState(initialErrors);

  // Control inputs' changes
  const handleInputChange = ({ target: { value, name } }) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (value !== "") {
      setError((prev) => ({ ...prev, [name]: false }));
    } else {
      setError((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleUpdateUser = async () => {
    if (formValues.name !== "" && formValues.email !== "") {
      try {
        await axios.put(`http://localhost:3004/users/${userId}`, formValues);
        setFormValues(null);
        navigate("/");
      } catch (err) {
        alert(err.response.message);
      }
    } else {
      alert("Please fill all the required inputs");
    }
  };

  return (
    <main className="flexCenter container mx-auto h-[100dvh]">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit user
        </Typography>
        <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              label="Name"
              size="lg"
              name="name"
              onChange={handleInputChange}
              value={formValues.name}
              error={error.name}
            />
            <Input
              label="Email"
              type="email"
              size="lg"
              name="email"
              onChange={handleInputChange}
              value={formValues.email}
              error={error.email}
            />

            {/* Check for errors */}
            {(error.name || error.email) && (
              <Typography variant="paragraph" color="red" className="text-sm">
                You may not leave any inputs empty!
              </Typography>
            )}
          </div>
          <div className="flexCenter gap-3">
            <Button
              onClick={() => navigate(-1)}
              color="red"
              variant="text"
              className="mt-6"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} className="mt-6 flex-1">
              Save
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
