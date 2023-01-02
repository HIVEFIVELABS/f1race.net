import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles, ...rest }) => {
  const { user } = useSelector((state) => state.auth);

  let isAuthorized = false;
  if (
    !user ||
    !user.roles ||
    !(user.roles instanceof Array) ||
    user.roles.length === 0
  ) {
    // User is not logged in or has no roles
    isAuthorized = false;
  } else {
    if (!roles || !(roles instanceof Array) || roles.length === 0) {
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
        <h1 className="text-race-red mb-4">Unauthorized :(</h1>
        <span>
          <p>Sorry, you're not authorized to view this page.<br/>If you think you should have access, contact us.</p>
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
