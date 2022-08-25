import {
  Box,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const ViewOpportunity = ({ handleClose, volunteer }) => {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: 5,
        my: 2,
        py: 5,
        overflowY: "auto",
        minWidth: 450,
      }}
      style={{
        paddingLeft: "calc(100vw * 0.025)",
        paddingRight: "calc(100vw * 0.025)",
      }}
    >
      <Box sx={{ mb: 1, textAlign: "center" }}>
        <Typography color="primary" variant="h5" sx={{ mb: 1 }}>
          Volunteer Details
        </Typography>
      </Box>
      <Label
        label="Name"
        value={`${volunteer.firstName} ${volunteer.lastName}`}
      />
      <Label label="Email" value={volunteer.email} />
      <Label label="Phone No" value={volunteer.phoneNo} />
      <Label label="Gender" value={volunteer.gender.name} />
      <Label
        label="Date Of Birth"
        value={new Date(volunteer.DOB).toDateString()}
      />
      <Label label="Zip Code" value={volunteer.zipCode} />
      <Label label="Experiences" />
      {volunteer.experiences.length > 0 ? (
        volunteer.experiences.map((exp, index) => (
          <Box sx={{ my: 2, width: "100%" }} key={index}>
            <Label label="Organization" value={exp.organization} horizontal />
            <Label label="Role" value={exp.role} horizontal />
            <Label
              label="Start Time"
              value={new Date(exp.startTime).toDateString()}
              horizontal
            />
            <Label
              label="End Time"
              value={
                exp.present ? "Present" : new Date(exp.endTime).toDateString()
              }
              horizontal
            />
          </Box>
        ))
      ) : (
        <Label value="No Experiences" />
      )}
      <Label label="Skills" />
      {volunteer.skills.length > 0 ? (
        volunteer.skills.map((s, i) => <Label value={s} key={i} horizontal />)
      ) : (
        <Label value="No Skills" />
      )}
    </Box>
  );
};

const Label = ({ label, value, horizontal }) => {
  if (horizontal) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            {label && (
              <TableCell sx={{ color: (theme) => theme.palette.custom.accent }}>
                {label}
              </TableCell>
            )}
            <TableCell
              sx={{
                width: "50%",
                border: "1px solid #eaeaea",
                p: 2,
                my: 1,
                borderRadius: 1,
              }}
            >
              {value}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start",
        my: 1,
      }}
    >
      {label && (
        <Box sx={{ color: (theme) => theme.palette.custom.accent }}>
          {label}
        </Box>
      )}
      {value && (
        <Box
          sx={{
            width: "100%",
            border: "1px solid #eaeaea",
            p: 2,
            my: 1,
            borderRadius: 1,
          }}
        >
          {value}
        </Box>
      )}
    </Box>
  );
};

const ViewModal = ({ open, handleClose, volunteer }) => {
  return (
    <Dialog scroll="paper" onClose={handleClose} open={open}>
      <ViewOpportunity handleClose={handleClose} volunteer={volunteer} />
    </Dialog>
  );
};

export default ViewModal;
