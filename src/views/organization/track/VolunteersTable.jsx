import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import { Fragment } from "react";

const VolunteersTable = ({ volunteers, view, opportunity }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Applied For</TableCell>
            <TableCell>Event Date</TableCell>
            <TableCell>Skills</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {volunteers.length > 0 ? (
            volunteers.map(({ _id, firstName, lastName, email, skills }, i) => (
              <TableRow hover key={i}>
                <TableCell>
                  {firstName} {lastName}
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{opportunity.title}</TableCell>
                <TableCell>
                  {new Date(opportunity.date).toDateString()}
                </TableCell>
                <TableCell>
                  {skills.length > 0
                    ? skills.map((skill, index) => (
                        <Fragment key={index}>
                          {skill} <br />
                        </Fragment>
                      ))
                    : "-"}
                </TableCell>
                <TableCell>
                  <Button color="custom" onClick={() => view(_id)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No Volunteers</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default VolunteersTable;
