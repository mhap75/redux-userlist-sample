import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  IconButton,
  Input,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaCirclePlus, FaUserPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { UserList } from "./components";
import { createUser } from "./state/usersSlice.js";

const initialFormValues = {
  name: "",
  email: "",
};

const initialErrors = {
  name: false,
  email: false,
};

function App() {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState(initialErrors);
  const dispatch = useDispatch();

  // Control Modal open status
  const handleOpen = () => setOpen((s) => !s);

  // Control inputs' changes
  const handleInputChange = ({ target: { value, name } }) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (value !== "") {
      setError((prev) => ({ ...prev, [name]: false }));
    } else {
      setError((prev) => ({ ...prev, [name]: true }));
    }
  };

  // Save new user to database as well as the redux state
  const handleAddUser = () => {
    if (formValues.name !== "" && formValues.email !== "") {
      const uniqueId = uuidv4();
      const body = {
        id: uniqueId,
        ...formValues,
      };
      dispatch(createUser(body));
      setFormValues(initialFormValues);
      handleOpen();
    } else {
      alert("Please fill all the required inputs");
    }
  };

  return (
    <>
      <main className="container mx-auto">
        <Typography variant="h1" className="my-5 text-center">
          Manage Users
        </Typography>

        {/* Open modal action */}
        <SpeedDial placement="right" className="w-fit">
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <FaCirclePlus className="h-7 w-7 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction onClick={handleOpen}>
              <FaUserPlus className="h-5 w-5" />
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>

        <UserList />
      </main>

      {/* User addition form modal */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              New User
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="lg"
              name="name"
              onChange={handleInputChange}
              value={formValues.name}
              error={error.name}
              required
            />
            <Input
              label="Email"
              type="email"
              size="lg"
              name="email"
              onChange={handleInputChange}
              value={formValues.email}
              error={error.email}
              required
            />

            {/* Check for errors */}
            {(error.name || error.email) && (
              <Typography variant="paragraph" color="red" className="text-sm">
                You may not leave any inputs empty!
              </Typography>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleAddUser} fullWidth>
              Save
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default App;
