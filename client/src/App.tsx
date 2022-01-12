import "./App.css";
import "./components/component-styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { 
  All, About, Home, NoPage, SignIn, SignUp, SignOut, Pictures,
  Videos, Journals, Welcome, FooterBar, PrivateRoute, NavigationBar 
} from "./components/componentIndex"
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-out" element={<SignOut />} />
            <Route path="*" element={<NoPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/all" element={<All />} />
              <Route path="/pictures" element={<Pictures />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/journals" element={<Journals />} />
            </Route>
          </Routes>
          <FooterBar />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
