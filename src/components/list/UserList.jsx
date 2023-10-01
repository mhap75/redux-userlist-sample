import {
  Button,
  Card,
  Chip,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersTableHeadings } from "../../const/index.js";
import { deleteUser, getUsers, selectUsers } from "../../state/usersSlice.js";

const UserList = () => {
  const { users, loading } = useSelector(selectUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flexCenter h-[80dvh] w-full">
        <Spinner className="h-16 w-16" color="blue" />
      </div>
    );

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Card className="my-5 h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {usersTableHeadings.map((head) => (
              <th
                key={head}
                className="border-blue-gray-100 bg-blue-gray-50 border-b p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(({ name, id, email }, index) => {
            const isLast = index === usersTableHeadings.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className={classes}>
                  <Tooltip content={id}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="cursor-pointer font-normal"
                    >
                      {id.slice(0, 5)}...
                    </Typography>
                  </Tooltip>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Chip variant="ghost" className="w-fit" value={email} />
                </td>
                <td className={classes}>
                  <div className="flex justify-end gap-3">
                    <Button
                      size="sm"
                      className="flexCenter gap-1"
                      onClick={() => navigate(`/user/edit/${id}`)}
                    >
                      Edit <FaRegPenToSquare size={14} />
                    </Button>
                    <Popover placement="bottom-start">
                      <PopoverHandler>
                        <Button
                          size="sm"
                          className="flexCenter gap-1 bg-pink-500"
                        >
                          Delete <FaRegTrashCan size={14} />
                        </Button>
                      </PopoverHandler>
                      <PopoverContent className="w-80">
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="mb-6"
                        >
                          Are you sure you want to delete user{" "}
                          <span className="font-bold">{email}</span>?
                        </Typography>
                        <Button
                          size="sm"
                          variant="outlined"
                          color="red"
                          onClick={() => handleDeleteUser(id)}
                        >
                          Yes
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};
export default UserList;
