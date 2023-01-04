import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

type Props = {
  roles?: string[];
};

const ProtectedRoute = ({ roles, ...rest }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  let isAuthorized: boolean;

  if (!user || !user.roles || user.roles.length === 0) {
    // User is not logged in or has no roles
    isAuthorized = false;
  } else {
    if (!roles || roles.length === 0) {
      // User is logged in and no roles are specified
      isAuthorized = true;
    } else {
      // User is logged in and roles are specified
      isAuthorized = roles.some((role) => user.roles.includes(role));
    }
  }

  // show unauthorized screen if no user is found in redux store
  if (!isAuthorized) {
    return (
      <div className="unauthorized m-auto text-center">
        <h1 className="mb-4 text-race-red">Unauthorized :(</h1>
        <span>
          <p>
            Sorry, you're not authorized to view this page.
            <br />
            If you think you should have access, contact us.
          </p>
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
