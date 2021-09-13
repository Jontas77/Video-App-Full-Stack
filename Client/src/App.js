import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Import Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;

// import React, { useState, useEffect } from "react";

// //Import components
// import Header from "./components/Header";
// import AddVideo from "./components/AddVideo";
// import AllVideos from "./components/AllVideos";

// const App = () => {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/v1/videos`)
//       .then((res) => res.json())
//       .then((data) => setData(data));
//   }, []);

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   return (
// //     <div className="App">
// //       <Header />
// //       <main>
// //         <AddVideo search={search} handleSearch={handleSearch} />
// //         <div className="d-flex justify-content-center flex-wrap">
// //           {data
// //             .filter((val) => {
// //               return search === ""
// //                 ? val
// //                 : val.title.toLowerCase().includes(search.toLowerCase())
// //                 ? val
// //                 : null;
// //             })
// //             .map((value, idx) => (
// //               <AllVideos data={value} key={idx} />
// //             ))}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// export default App;
