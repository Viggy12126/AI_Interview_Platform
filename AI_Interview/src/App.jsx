import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { useEffect } from "react";
import Courses from "./Components/Courses/Courses";
import Header from "./Components/Header"
import Navbar from "./Components/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import CoursePage from "./Components/Courses/CoursePage.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subscribe from "./Components/Payments/Subscribe.jsx";

function App() {

  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {

    // console.log(message);
    if (error) {
      // toast.error(error);

      toast(error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
       
        });

      // dispatch({ type: 'clearError' });
    }

    if (message) {
      // toast.success(message);

      toast(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      
        });
      // dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(()=>{
 dispatch(loadUser())
  },[dispatch])

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen px-40 py-6 dark dark:bg-slate-950 flex flex-col lg:gap-40">
                
                <Navbar isAuthenticated={isAuthenticated} user={user}/>
                <Header />
              </div>
            }
          />
          <Route path="/courses" element={<Courses />} />

          <Route path="/login" element={
          <ProtectedRoute 
          isAuthenticated={!isAuthenticated}
          redirect="/"
          >
          <Login />
          </ProtectedRoute>
        }

          />

          <Route path="/register" element={
<ProtectedRoute 
isAuthenticated={!isAuthenticated}
 redirect="/login"
>
          <Register />
          </ProtectedRoute>
          }
          
          />

<Route
              path="/course/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CoursePage isAuthenticated={isAuthenticated} user={user} />
                </ProtectedRoute>
              }
            />

<Route
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe user={user}/>
                </ProtectedRoute>
              }
            />

        </Routes>
      </>
    </Router>
  );
}

export default App;
