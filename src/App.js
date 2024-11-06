import logo from "./logo.svg";
import "./App.css";
import "./tailwind.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { adminLoginJWT, userLoginJWT } from "./utils/api_calls/auth";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
const Sitemap = lazy(() => import("./components/Sitemap/Sitemap"));
const Welcome = lazy(() => import("./components/Welcome/Welcome"));
const UserLogin = lazy(() =>
  import("./components/Auth/User/UserLogin/UserLogin")
);
const UserLogout = lazy(() => 
  import("./components/Auth/User/UserLogout/UserLogout")
);
const AdminLogin = lazy(() =>
  import("./components/Auth/Admin/AdminLogin/AdminLogin")
);
const AdminLogout = lazy(() =>
  import("./components/Auth/Admin/AdminLogout/AdminLogout")
);
const UserProfile = lazy(() =>
  import("./components/Users/UserProfile/UserProfile")
);
const MyProfile = lazy(() => import("./components/Users/MyProfile/MyProfile"));
const EditUser = lazy(() => import("./components/Users/EditUser/EditUser"));
const DeleteUser = lazy(() =>
  import("./components/Users/DeleteUser/DeleteUser")
);
const CreateUser = lazy(() =>
  import("./components/Users/CreateUser/CreateUser")
);
const CreateAdmin = lazy(() =>
  import("./components/Admins/CreateAdmin/CreateAdmin")
);
const ShowEvents = lazy(() =>
  import("./components/Events__/ShowEvents/ShowEvents")
);
const CreateEvent = lazy(() =>
  import("./components/Events__/CreateEvent/CreateEvent")
);
const Event = lazy(() => import("./components/Events__/Event/Event"));
const EditEvent = lazy(() =>
  import("./components/Events__/EditEvent/EditEvent")
);
const DeleteEvent = lazy(() =>
  import("./components/Events__/DeleteEvent/DeleteEvent")
);
const Forms = lazy(() => import("./components/Forms__/Forms/Forms"));
const Form = lazy(() => import("./components/Forms__/Form/Form"));
const CreateForm = lazy(() =>
  import("./components/Forms__/CreateForm/CreateForm")
);
const EditForm = lazy(() => import("./components/Forms__/EditForm/EditForm"));
const DeleteForm = lazy(() =>
  import("./components/Forms__/DeleteForm/DeleteForm")
);
const Responses = lazy(() => import("./components/Responses/Responses"));
const Help = lazy(() => import("./components/Help__/Help/Help"));
const BackendHelp = lazy(() =>
  import("./components/Help__/BackendHelp/BackendHelp")
);
const FrontendHelp = lazy(() =>
  import("./components/Help__/FrontendHelp/FrontendHelp")
);
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Menu = lazy(() => import("./components/Menu/Menu"));
function App() {
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "user") {
        userLoginJWT(token)
          .then((data) => {
            if (data) {
              setUser(data.user);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (decodedToken.role === "admin") {
        adminLoginJWT(token).then((data) => {
          if (data) {
            setAdmin(data.admin);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);
  return (
    <div className="w-full h-full gap-0 overflow-hidden stack d-center">
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Navbar onClick={() => setMenu((e) => !e)} />
          <div className="flex w-full h-full overflow-hidden">
            <Menu
              isActive={menu}
              state={admin ? "admins" : user ? "users" : "notloggedin"}
            />
            <main className="flex w-full overflow-y-auto stack">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="users">
                  <Route path="id/:id" element={<UserProfile />} />
                  <Route path="edit/:id" element={<EditUser __user={user} />} />
                  <Route path="me">
                    <Route path="" element={<MyProfile __user={user} />} />
                    <Route path="edit" element={<EditUser __user={user} />} />
                    <Route path="delete" element={<DeleteUser />} />
                  </Route>
                  <Route path="create" element={<CreateUser />} />
                </Route>
                <Route path="admins">
                  <Route path="create" element={<CreateAdmin />} />
                </Route>
                <Route path="auth">
                  <Route path="user">
                    <Route
                      path="login"
                      element={
                        <UserLogin
                          setUser={(e) => {
                            setUser(e);
                            setAdmin(null);
                          }}
                          setToken={setToken}
                        />
                      }
                    />
                    <Route
                      path="logout"
                      element={
                        <UserLogout
                          setUser={(e) => {
                            setUser(e);
                            setAdmin(null);
                          }}
                          setToken={setToken}
                        />
                      }
                    />
                  </Route>
                  <Route path="admin">
                    <Route
                      path="login"
                      element={
                        <AdminLogin
                          setAdmin={(e) => {
                            setAdmin(e);
                            setUser(null);
                          }}
                          setToken={setToken}
                        />
                      }
                    />
                  </Route>
                </Route>
                <Route path="events">
                  <Route path="" element={<ShowEvents />} />
                  <Route path="create" element={<CreateEvent />} />
                  <Route path="id/:id">
                    <Route path="" element={<Event />} />
                    <Route path="forms">
                      <Route path="" element={<Forms />} />
                      <Route path="id/:id" element={<Form />} />
                      <Route path="responses/:id" element={<Responses />} />
                      <Route path="create" element={<CreateForm />} />
                      <Route path="edit/:id" element={<EditForm />} />
                      <Route path="delete/:id" element={<DeleteForm />} />
                    </Route>
                  </Route>
                  <Route path="edit/:id" element={<EditEvent />} />
                  <Route path="delete/:id" element={<DeleteEvent />} />
                </Route>
                <Route path="help">
                  <Route path="" element={<Help />} />
                  <Route path="backend" element={<BackendHelp />} />
                  <Route path="frontend" element={<FrontendHelp />} />
                </Route>
                <Route path="sitemap" element={<Sitemap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
              />
            </main>
          </div>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
