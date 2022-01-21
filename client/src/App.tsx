import "./App.css";
import "./components/component-styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  All,
  About,
  CreatePost,
  EditProfile,
  NoPage,
  SignIn,
  SignUp,
  SignOut,
  Pictures,
  Videos,
  Home,
  Journals,
  Welcome,
  FooterBar,
  PrivateRoute,
  ResetPassword,
  NavigationBar,
  Profile,
  Settings,
} from "./components/componentIndex";
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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NoPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/sign-out" element={<SignOut />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/all" element={<All />} />
              <Route path="/pictures" element={<Pictures />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/journals" element={<Journals />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
          <FooterBar />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
