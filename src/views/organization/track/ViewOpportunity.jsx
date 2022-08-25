import {
  Box,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const ViewOpportunity = ({ handleClose, item }) => {
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
      <Box sx={{ my: 3, textAlign: "center" }}>
        <Typography color="primary" variant="h5" sx={{ mb: 1 }}>
          Opportunity Details
        </Typography>
      </Box>
      <Label label="Title" value={item.title} />
      <Label label="Description" value={item.description} />
      <Label label="Volunteers Needed" value={item.volunteersNeeded} />
      <Label label="Category" value={item.category.name} />
      <Label label="Event Date" value={new Date(item.date).toDateString()} />
      <Label label="Commitment Time" />
      <Box sx={{ my: 2 }}>
        <Label label="Start Time" value={item.startTime} horizontal />
        <Label label="End Time" value={item.endTime || "Not Set"} horizontal />
      </Box>
      <Label label="Location" />
      <Box sx={{ my: 2 }}>
        <Label label="City" value={item.city} horizontal />
        <Label label="State" value={item.state} horizontal />
        <Label label="Zip Code" value={item.zipCode} horizontal />
      </Box>
      <Label label="Required Skills" />
      <Box sx={{ my: 2 }}>
        {item.skills.map((s, i) => (
          <Label value={s} key={i} horizontal />
        ))}
      </Box>
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

const ViewModal = ({ open, handleClose, item }) => {
  return (
    <Dialog scroll="paper" onClose={handleClose} open={open}>
      <ViewOpportunity handleClose={handleClose} item={item} />
    </Dialog>
  );
};

export default ViewModal;
