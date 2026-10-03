import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SpecialtyDetail from "./pages/SpecialtyDetail";
import CountryDetail from "./pages/CountryDetail";
import Questions from "./pages/Questions";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:id" element={<SpecialtyDetail />} />
        <Route path="/countries/:id" element={<CountryDetail />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  );
}
