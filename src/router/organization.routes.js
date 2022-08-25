import { Routes, Route } from "react-router-dom";

import CustomIcon from "../utils/CustomIcon";

import DashboardIcon from "../assets/icons/dashboard.png";
import DashboardSelectedIcon from "../assets/icons/dashboard-s.png";
import OpportunitiesIcon from "../assets/icons/opportunities.png";
import OpportunitiesSelectedIcon from "../assets/icons/opportunities-s.png";
import TrackIcon from "../assets/icons/track.png";
import TrackSelectedIcon from "../assets/icons/track-s.png";
import LogsIcon from "../assets/icons/logs.png";
import LogsSelectedIcon from "../assets/icons/logs-s.png";
import ComplaintsIcon from "../assets/icons/complaints.png";
import ComplaintsSelectedIcon from "../assets/icons/complaints-s.png";
import SettingsIcon from "../assets/icons/settings.png";
import SettingsSelectedIcon from "../assets/icons/settings-s.png";

import Opportunities from "../views/organization/opportunities/Opportunities";
import Track from "../views/organization/track/Track";
import AppliedVolunteers from "../views/organization/track/AppliedVolunteers";

export const orgRoutes = [
  {
    icon: <CustomIcon src={DashboardIcon} />,
    selectedIcon: <CustomIcon src={DashboardSelectedIcon} />,
    title: "Dashboard",
    path: "/",
  },
  {
    icon: <CustomIcon src={OpportunitiesIcon} />,
    selectedIcon: <CustomIcon src={OpportunitiesSelectedIcon} />,
    title: "Opportunities",
    path: "/opportunities",
  },
  {
    icon: <CustomIcon src={TrackIcon} />,
    selectedIcon: <CustomIcon src={TrackSelectedIcon} />,
    title: "Track Opportunities",
    path: "/track",
  },
  {
    icon: <CustomIcon src={LogsIcon} />,
    selectedIcon: <CustomIcon src={LogsSelectedIcon} />,
    title: "Volunteer Logged Hours",
    path: "/logged-hours",
  },
  {
    icon: <CustomIcon src={ComplaintsIcon} />,
    selectedIcon: <CustomIcon src={ComplaintsSelectedIcon} />,
    title: "Complaints",
    path: "/complaints",
  },
  {
    icon: <CustomIcon src={SettingsIcon} />,
    selectedIcon: <CustomIcon src={SettingsSelectedIcon} />,
    title: "Settings",
    path: "/settings",
  },
];

export const OrgRouter = () => (
  <Routes>
    <Route path="/" element={<>Dashboard </>} />
    <Route path="/opportunities" element={<Opportunities />} />
    <Route path="/track" element={<Track />} />
    <Route path="/applied-volunteers" element={<AppliedVolunteers />} />
    <Route path="/logged-hours" element={<>Volunteer Logged Hours </>} />
    <Route path="/complaints" element={<>Complaints </>} />
    <Route path="/settings" element={<>Settings </>} />
    <Route path="/notifications" element={<>Notifications </>} />
  </Routes>
);
