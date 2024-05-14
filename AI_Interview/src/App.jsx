import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Courses from "./Components/Courses/Courses";
import Header from "./Components/Header"
import Navbar from "./Components/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// function App() {


//   return (
//     <Router>
// <>

// <Routes>

// <Route path="/courses" element={<Courses />}/>
// </Routes>

//       <div className="min-h-screen px-40 py-6 dark dark:bg-slate-950 flex flex-col lg:gap-40">
//        <Navbar />
//        <Header />
//         </div>
        
      
//     </>
//     </Router>
    
//   )
// }

// export default App


// function App() {
//   return (
//     <Router>
//       <>
//         <div className="min-h-screen px-40 py-6 dark dark:bg-slate-950 flex flex-col lg:gap-40">
//           {/* Navbar and Header are always displayed */}
//           <Navbar />
//           <Header />
//         </div>

//         <Routes>
//           <Route
//             path="/"
//             element={<div />} // This will render nothing for the root route
//           />
//           <Route path="/courses" element={<Courses />} />
//         </Routes>
//       </>
//     </Router>
//   );
// }

// export default App;

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen px-40 py-6 dark dark:bg-slate-950 flex flex-col lg:gap-40">
                {/* Navbar and Header always displayed */}
                <Navbar />
                <Header />
              </div>
            }
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Register />}/>

        </Routes>
      </>
    </Router>
  );
}

export default App;
