import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MISSIONS, DELETE_MISSION } from "../graphql/queries";
import { Container, Typography, Button, Paper, Dialog, DialogActions, DialogTitle } from "@mui/material";

const MyReviews = () => {
  const { loading, error, data, refetch } = useQuery(GET_MISSIONS);
  const [deleteMission] = useMutation(DELETE_MISSION, {
    onCompleted: () => {
      alert("Mission deleted successfully!");
      refetch(); // Refresh mission list
    },
    onError: (err) => {
      console.error("❌ Error deleting mission:", err);
      alert("Error deleting mission.");
    },
  });

  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  if (loading) return <Typography>Loading missions...</Typography>;
  if (error) return <Typography color="error">Error loading missions.</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        My Saved Missions
      </Typography>

      {data.missions.length === 0 ? (
        <Typography align="center">No saved missions found.</Typography>
      ) : (
        data.missions.map((mission: { _id: string; name: string; startDate: string; unit: { name: string } }) => (
          <Paper key={mission._id} sx={{ padding: 3, marginBottom: 2 }}>
            <Typography variant="h6">{mission.name}</Typography>
            <Typography>Date: {new Date(mission.startDate).toDateString()}</Typography>
            <Typography>Unit: {mission.unit.name}</Typography>

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setSelectedMission(mission._id);
                setOpenDialog(true);
              }}
              sx={{ mt: 2 }}
            >
              Delete
            </Button>
          </Paper>
        ))
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure you want to delete this mission?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              deleteMission({ variables: { id: selectedMission } });
              setOpenDialog(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyReviews;