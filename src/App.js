import { jwtDecode } from "jwt-decode";
import { lazy, Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./tailwind.css";
import { adminLoginJWT, userLoginJWT } from "./utils/api_calls/auth";
import Loading from "./components/utils/Loading";



//-----------------start-lazy-imports---------------------//
const CreateEventImage = lazy(() => import("./components/EventImages/CreateEventImage/CreateEventImage"));
const DeleteEventImage = lazy(() => import("./components/EventImages/DeleteEventImage/DeleteEventImage"));
const ViewEventImages = lazy(() => import("./components/EventImages/ViewEventImages/ViewEventImages"));
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
const UserSearch = lazy(() =>
  import("./components/Users/UserSearch/UserSearch")
);
const CreateAdmin = lazy(() =>
  import("./components/Admins/CreateAdmin/CreateAdmin")
);
const SearchAdmins = lazy(() =>
  import("./components/Admins/SearchAdmins/SearchAdmins")
);
const EditAdmin = lazy(() =>
  import("./components/Admins/EditAdmin/EditAdmin")
);
const DeleteAdmin = lazy(() =>
  import("./components/Admins/DeleteAdmin/DeleteAdmin")
);
const AdminProfile = lazy(() =>
  import("./components/Admins/AdminProfile/AdminProfile")
);
const MyProfileAdmin = lazy(() =>
  import("./components/Admins/MyProfileAdmin/MyProfileAdmin")
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
const RespondForm = lazy(() => import("./components/Users/RespondForm/RespondForm"));
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
//------------------------end-imports---------------------------



//------------------------start-constants------------------------
const expMap = {
  "1h": 3600,
  "1d": 86400,
};
//------------------------end-constants--------------



function App() {
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const [token, setToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  window.removeCookie = removeCookie;
  const [secsLeft, setSecsLeft] = useState(null);
  const [stopSecsLeft, setStopSecsLeft] = useState(false);

  const __useEffectTriggerForHandlingJWTCookie = () => {
    if(token) return;
    if(user || admin) return;
    if (!cookies.jwt) return;
    if (cookies.jwt === "undefined") return;
    let jwtCookie;
    try {
      jwtCookie = cookies.jwt; 
    } catch (error) {
      console.error("Error parsing JWT cookie:", error);
      removeCookie("jwt");
      return;
    }
    if (!jwtCookie) return;
    const decodedToken = jwtDecode(jwtCookie.token);
    let expirationTime ;
    if(decodedToken.exp){
      expirationTime =(decodedToken.iat + decodedToken.exp) * 1000; // exp is in seconds, convert to ms
    }else if (decodedToken.expiresIn){
      expirationTime =(decodedToken.iat + expMap[decodedToken.expiresIn]) * 1000;
    }
    const currentTime = Date.now();
    const timeLeft = expirationTime - currentTime;

    if (expirationTime && timeLeft > 0) {
      setSecsLeft(Math.floor(timeLeft / 1000));
      console.log("trying jwt login");
      tryJWTLogin(jwtCookie);
    } else {
      handleLogout();
      setSecsLeft(0);
      return;
    }
    const intervalId = setInterval(() => {
      setSecsLeft((prevSecs) => {
        if (prevSecs > 0 ) {
          return prevSecs - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  };
  useEffect(__useEffectTriggerForHandlingJWTCookie, [cookies.jwt,removeCookie]);
  
  const setLoginCookie = (role, jwtToken) => {
    const cookieValue = JSON.stringify({ role: role, token: jwtToken });
    setCookie("jwt", cookieValue, {
      path: "/",
    });
  };
  function handleLogin({ role, token, user }) {
    setToken(token);
    setLoginCookie(role, token);
    
    const intervalId = setInterval(() => { //////////TODO: clean this interval id
      setSecsLeft((prevSecs) => {
        if (prevSecs > 0 ) {
          return prevSecs - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if(decodedToken.exp){
      setSecsLeft(decodedToken.exp );
    }else if (decodedToken.expiresIn){
      setSecsLeft(expMap[decodedToken.expiresIn] );
    }
    if (role === "user") {
      setUser(user);
      setAdmin(null);
    } else if (role === "admin") {
      setAdmin(user);
      setUser(null);
    }
  }
  const handleLogout = () => {
    removeCookie("jwt");
    setUser(null);
    setAdmin(null);
    setToken(null);
    setSecsLeft(0);
  };
  function tryJWTLogin(jwtToken) {
    if(!jwtToken) return;
    const { role, token } = jwtToken; 
    if (role === "user") {
      userLoginJWT(token)
        .then((response) => {
          toast.success("Logged in successfully");
          setUser(response.user);
          setAdmin(null);
          setToken(token);
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
          setUser(null);
          setAdmin(null);
          setToken(null);
          removeCookie("jwt");
        });
    } else if (role === "admin") {
      adminLoginJWT(token)
        .then((response) => {
          setAdmin(response.admin);
          setUser(null);
          setToken(token);
        })
        .catch((error) => {
          console.error("Failed to fetch admin:", error);
          setUser(null);
          setAdmin(null);
          setToken(null);
          removeCookie("jwt");
        });
    }else {
      console.error("Invalid role in JWT token");
    }
  }

  
  const handleKeys = {
    onEsc:()=>{
      setMenu(false);
      toast.dismiss();
    },
    
  }
  return (
    <div className="w-full h-full gap-0 overflow-hidden stack d-center">
      <Suspense fallback={<Loading/>}>
        <Router>
          <Navbar isActive={menu} secsLeft={secsLeft} onEsc={handleKeys.onEsc} setIsActive={setMenu}
          state = {admin ? "admins" : user ? "users" : "notloggedin"} />
          <div className="flex w-full h-full overflow-hidden">
            
            <Menu
              isActive={menu}
              state={admin ? "admins" : user ? "users" : "notloggedin"}
              setIsActive={setMenu}
            />
            <main className="flex w-full overflow-y-auto stack">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="users">
                  <Route path="id/:id" element={<UserProfile token={token}/>} />
                  <Route path="edit/:id" element={<EditUser __user={user} token={token} />} />
                  <Route path="delete/:id" element={<DeleteUser __user={user} token={token} />} />
                  <Route path="me">
                    <Route path="" element={<MyProfile __user={user} token={token}/>} />
                    <Route path="edit" element={<EditUser __user={user} token={token} />} />
                    <Route
                      path="delete"
                      element={<DeleteUser __user={user} token={token} />}
                    />
                  </Route>
                  <Route path="create" element={<CreateUser __admin={admin} token={token}/>} />
                  <Route path="search" >
                    <Route path="" element={<UserSearch __admin={admin} token={token}/>} />
                    <Route path=":query" element={<UserSearch __admin={admin} token={token}/>} />
                  </Route>
                </Route>
                <Route path="admins">
                  <Route path="me">
                    <Route path="" element={<MyProfileAdmin __admin={admin} token={token}/>} />
                    <Route path="edit" element={<EditAdmin __admin={admin} token={token}/>} />
                    <Route path="delete" element={<DeleteAdmin __admin={admin} token={token}/>} />
                  </Route>
                  <Route path="search">
                    <Route path="" element={<SearchAdmins __admin={admin} token={token}/>} />
                    <Route path=":query" element={<SearchAdmins __admin={admin} token={token}/>} />
                  </Route>
                  <Route path="id/:id" element={<AdminProfile __admin={admin} token={token}/>} />
                  <Route path="create" element={<CreateAdmin __admin={admin} token={token}/>} />
                  <Route path="edit/:id" element={<EditAdmin __admin={admin} token={token}/>} />
                  <Route path="delete/:id" element={<DeleteAdmin __admin={admin} token={token}/>} />
                </Route>
                <Route path="auth">
                  <Route path="user">
                    <Route
                      path="login"
                      element={<UserLogin onLogin={handleLogin} />}
                    />
                    <Route
                      path="logout"
                      element={<UserLogout onLogout={handleLogout} token={token}  />}
                    />
                  </Route>
                  <Route path="admin">
                    <Route
                      path="login"
                      element={<AdminLogin onLogin={handleLogin} />}
                    />
                  <Route
                    path="logout"
                    element={<AdminLogout onLogout={handleLogout} token={token}/>}
                  />
                  </Route>
                </Route>
                <Route path="events">
                  <Route path="" element={<ShowEvents  __admin={admin} token={token}/>} />
                  <Route path="create" element={<CreateEvent  __admin={admin} token={token}/>} />
                  <Route path="id/:id">
                    <Route path="" element={<Event  __admin={admin} />} />
                    <Route path="forms">
                      <Route path="" element={<Forms  __admin={admin} token={token}/>} />
                      <Route path="id/:formId" element={<Form  __admin={admin} token={token}/>} />
                      <Route path="s/:slug" element={<Form  __admin={admin} token={token}/>} />
                      <Route path="responses/:formId" element={<Responses token={token}/>} />
                      <Route path="create" element={<CreateForm __admin={admin}  token={token}/>} />
                      <Route path="edit/:formId" element={<EditForm __admin={admin}  token={token}/>} />
                      <Route path="delete/:formId" element={<DeleteForm __admin={admin}  token={token}/>} />
                      <Route path="responses" element={<Responses token={token}/>} />
                    </Route>
                    <Route path="images">
                      <Route path="" element={<ViewEventImages __admin={admin} token={token}/>} />
                      <Route path="create" element={<CreateEventImage __admin={admin} token={token}/>} />
                      <Route path="delete/:imageId" element={<DeleteEventImage __admin={admin} token={token}/>} />
                    </Route>
                  </Route>
                  <Route path="s/:eventSlug">
                    <Route path="" element={<Event  __admin={admin} />} />
                    <Route path="forms">
                      <Route path="respond">
                        <Route path="s/:slug" element={<RespondForm __admin={admin} __user={user} token={token}/>} />
                        <Route path="id/:formId" element={<RespondForm __admin={admin} __user={user} token={token}/>} />
                      </Route>
                      <Route path="s/:slug" element={<Form  __admin={admin} token={token}/>} />
                    </Route>

                  </Route>
                  <Route path="edit/:id" element={<EditEvent __admin={admin}  token={token}/>} />
                  <Route path="delete/:id" element={<DeleteEvent __admin={admin}  token={token}/>} />
                </Route>
                <Route path="help">
                  <Route path="" element={<Help />} />
                  <Route path="backend" element={<BackendHelp __admin={admin} __user={user} token={token} />} />
                  <Route path="frontend" element={<FrontendHelp />} />
                </Route>
                <Route path="sitemap" element={<Sitemap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ToastContainer
                position="bottom-center"
                autoClose={2000}
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
