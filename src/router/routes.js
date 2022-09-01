import { Routes, Route } from "react-router-dom";

import RoleSelect from "../views/login/RoleSelect";
import VolLogin from "../views/login/VolLogin";
import OrgLogin from "../views/login/OrgLogin";
import AdminLogin from "../views/login/AdminLogin";

const VolSignup = () => <>Vol Signup</>
const OrgSignup = () => <>Vol Signup</>

export const Router = () => (
    <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/organization" element={<OrgLogin />} />
        <Route path="/org-signup" element={<OrgSignup />} />
        <Route path="/volunteer" element={<VolLogin />} />
        <Route path="/volunteer-signup" element={<VolSignup />} />
        <Route path="/admin" element={<AdminLogin />} />
    </Routes>
);
