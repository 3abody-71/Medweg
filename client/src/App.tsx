import { Navigate, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SpecialtyDetail from "./pages/SpecialtyDetail";
import CountryDetail from "./pages/CountryDetail";
import CountryPathwayInfo from "./pages/CountryPathwayInfo";
import Questions from "./pages/Questions";
import Mentors from "./pages/Mentors";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UsmleArticle from "./pages/UsmleArticle";
import { FEATURE_VISIBILITY } from "./config/featureVisibility";

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/explore"
          element={
            FEATURE_VISIBILITY.specialties ? (
              <Explore />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/explore/:id"
          element={
            FEATURE_VISIBILITY.specialties ? (
              <SpecialtyDetail />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/countries/:id" element={<CountryDetail />} />
        <Route path="/countries/:id/pathway-info" element={<CountryPathwayInfo />} />
        <Route path="/countries/usa/pathway-info/usmle" element={<UsmleArticle />} />
        <Route
          path="/questions"
          element={
            FEATURE_VISIBILITY.questions ? (
              <Questions />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/mentors"
          element={
            FEATURE_VISIBILITY.mentors ? (
              <Mentors />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  );
}
