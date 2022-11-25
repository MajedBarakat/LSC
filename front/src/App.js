import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Page/Header";
import Landing from "./Page/Landing";
import "./App.css";
import ReactSwitch from "react-switch";


// class App extends Component {
//   componentDidMount() {}

//   render() {
//     return (
//       <div className="container">
//         <BrowserRouter>
//           <div>
//             <Header />
//             <Routes>
//               <Route path="/" element={<Landing/>} />
//             </Routes>
//           </div>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
      <BrowserRouter>
          <Header />
          <div className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
        </div>
          <Routes>
            <Route path="/" element={<Landing/>} />
          </Routes>
        
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}
export default App;