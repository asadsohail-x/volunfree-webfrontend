import { Routes, Route } from "react-router-dom";

import CustomIcon from "../utils/CustomIcon";

// Icons
import DashboardIcon from "../assets/icons/dashboard.png";
import DashboardSelectedIcon from "../assets/icons/dashboard-s.png";
import OrgIcon from "../assets/icons/orgs.png";
import OrgSelectedIcon from "../assets/icons/orgs-s.png";
import VolunteerIcon from "../assets/icons/volunteers.png";
import VolunteerSelectedIcon from "../assets/icons/volunteers-s.png";
import CategoriesIcon from "../assets/icons/categories.png";
import CategoriesSelectedIcon from "../assets/icons/categories-s.png";
import LogsIcon from "../assets/icons/logs.png";
import LogsSelectedIcon from "../assets/icons/logs-s.png";
import ComplaintsIcon from "../assets/icons/complaints.png";
import ComplaintsSelectedIcon from "../assets/icons/complaints-s.png";
import SettingsIcon from "../assets/icons/settings.png";
import SettingsSelectedIcon from "../assets/icons/settings-s.png";

// Components
import Organizations from "../views/admin/organizations/Organizations";
import OrgTypes from "../views/admin/organizationTypes/OrganizationTypes";

export const adminRoutes = [
  {
    icon: <CustomIcon src={DashboardIcon} />,
    selectedIcon: <CustomIcon src={DashboardSelectedIcon} />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <CustomIcon src={OrgIcon} />,
    selectedIcon: <CustomIcon src={OrgSelectedIcon} />,
    title: "Organizations",
    children: [
      {
        title: "Organizations",
        path: "/organizations",
      },
      {
        title: "Organization Types",
        path: "/organization-types",
      },
    ],
  },
  {
    icon: <CustomIcon src={VolunteerIcon} />,
    selectedIcon: <CustomIcon src={VolunteerSelectedIcon} />,
    title: "Volunteers",
    path: "/volunteers",
  },
  {
    icon: <CustomIcon src={CategoriesIcon} />,
    selectedIcon: <CustomIcon src={CategoriesSelectedIcon} />,
    title: "Shift Categories",
    path: "/shift-categories",
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
    children: [
      {
        title: "Complaints",
        path: "/complaints",
      },
      {
        title: "Complaint Types",
        path: "/complaint-types",
      },
    ],
  },
  {
    icon: <CustomIcon src={SettingsIcon} />,
    selectedIcon: <CustomIcon src={SettingsSelectedIcon} />,
    title: "Settings",
    path: "/settings",
  },
];

export const AdminRouter = () => (
  <Routes>
    <Route path="/" element={<>Dashboard </>} />
    <Route path="/organizations" element={<Organizations />} />
    <Route path="/organization-types" element={<OrgTypes />} />
    <Route path="/volunteers" element={<>Volunteers </>} />
    <Route path="/shift-categories" element={<>Shift Categories </>} />
    <Route path="/logged-hours" element={<>Volunteer Logged Hours </>} />
    <Route path="/complaints" element={<>Complaints </>} />
    <Route path="/complaint-types" element={<>Complaint Types </>} />
    <Route path="/settings" element={<>Settings </>} />
    <Route path="/notifications" element={<>Notifications </>} />
  </Routes>
);
