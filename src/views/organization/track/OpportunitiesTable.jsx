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

const OpportunitiesTable = ({ opportunities, showMenu }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Volunteers Needed</TableCell>
            <TableCell>Skills Required</TableCell>
            <TableCell>Event Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {opportunities.length > 0 ? (
            opportunities.map(
              ({ _id, title, category, volunteersNeeded, skills, date }, i) => (
                <TableRow hover key={i}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{volunteersNeeded}</TableCell>
                  <TableCell>
                    {skills.length > 0
                      ? skills.map((skill, index) => (
                          <Fragment key={index}>
                            {skill} <br />
                          </Fragment>
                        ))
                      : "-"}
                  </TableCell>
                  <TableCell>{new Date(date).toDateString()}</TableCell>
                  <TableCell>
                    <Button color="custom" onClick={() => showMenu(_id)}>
                      Track
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell>No Opportunities</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OpportunitiesTable;
