import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useDispatch} from "react-redux";
import ProtectedRoute from "./routing/ProtectedRoute";
import AdministrationScreen, * as administrationScreen from "./screens/admin/AdministrationScreen";
import {useEffect, useState} from "react";
import MainScreen from "./screens/front/MainScreen";
// import { startConnection, stopConnection } from "./features/socket/socketSlice";

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const dispatch = useDispatch();

    /*useEffect(() => {
      dispatch(startConnection());
  
      return () => {
        dispatch(stopConnection());
      };
    }, []);
  
    const { userToken } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(startAuthorizedConnection());
  
      return () => {
        dispatch(stopAuthorizedConnection());
      };
    }, [userToken]);*/

    const router = createBrowserRouter([
        {
            path: "/*",
            element: <MainScreen />,
        },
        {
            element: <ProtectedRoute roles={["ROLE_MODERATOR", "ROLE_ADMIN"]} />,
            children: [
                {
                    path: "/administrate/*",
                    element: <AdministrationScreen />,
                    children: administrationScreen.createChildRoutes(),
                },
            ],
        },
    ]);

    return loading ? <></> : <RouterProvider router={router} />;
};
export default App;
