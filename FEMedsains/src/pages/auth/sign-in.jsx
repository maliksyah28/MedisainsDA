import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { login } from "@/api/userApi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userDataLogin, setUserDataLogin] = useState({
    userData: "",
    password: "",
  });

  const loginUser = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.data.accessToken);
      toast.success(data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/dashboard/home");
    },
    onError: (data) => {
      toast.error(
        `Error : ${data.response.data.statusCode} "${data.response.data.message}"`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    },
  });

  const onLoginClick = () => {
    loginUser.mutate(userDataLogin);
    setUserDataLogin({
      userData: "",
      password: "",
    });
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              name="userData"
              label="Email"
              size="lg"
              value={userDataLogin.userData}
              onChange={(e) =>
                setUserDataLogin({
                  ...userDataLogin,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              type="password"
              name="password"
              label="Password"
              size="lg"
              value={userDataLogin.password}
              onChange={(e) =>
                setUserDataLogin({
                  ...userDataLogin,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={onLoginClick}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
