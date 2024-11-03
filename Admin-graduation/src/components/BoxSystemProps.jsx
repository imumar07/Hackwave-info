import React, { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const BoxSystemProps = () => {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [teamData, setTeamData] = useState([]);
  const [rollNumbers, setRollNumbers] = useState({});

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setLoading(true);

    try {
      // Fetch team data from the backend
      const values = await axios.get(`http://34.93.68.84:5000/get_team_members?team_name=${selectedValue}`);
      setTeamData(values.data);

      toast.success("Team data retrieved successfully", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Failed to retrieve team data:", error);
      toast.error("Failed to retrieve team data", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRollNoChange = (event, index) => {
    const { value } = event.target;
    setRollNumbers((prevRollNumbers) => ({
      ...prevRollNumbers,
      [index]: value,
    }));
  };

  const handleSubmit = async () => {
    const rollNoPattern = /^[0-9]{2}A[0-9]{2}A[0-9]{4}$/;
    let allValid = true;

    const formattedData = teamData.map((member, index) => {
      const rollNo = rollNumbers[index];
      if (!rollNo || !rollNoPattern.test(rollNo)) {
        allValid = false;
        toast.error(`Invalid roll number for ${member.candidate_name}`, {
          position: "top-center",
          autoClose: 800,
          theme: "dark",
        });
      }
      return { roll_no: rollNo, candidate_email: member.candidate_email };
    });

    if (allValid) {
      try {
        // Send formatted data to the backend
        await axios.post("http://34.93.68.84:5000/insert_rollno", { team: formattedData });
        toast.success("Data submitted successfully!", {
          position: "top-center",
          autoClose: 800,
          theme: "dark",
        });
      } catch (error) {
        console.error("Failed to submit team data:", error);
        toast.error("Failed to submit team data", {
          position: "top-center",
          autoClose: 800,
          theme: "dark",
        });
      }
    }
  };

  const teamOptions = [
    "Team FIZ", "Hacky", "BSH_ AI", "Alpha@CAI-A", "Team GARUDA", "Hedwig",
    "TechWizards", "Amrutha", "HackHive", "Team Little Coders", "Team Unstoppable",
  ];

  return (
    <Container>
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none pt-3">
          Please Select an Option
        </h2>
      </BlurFade>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <ToastContainer position="top-center" autoClose={5000} theme="dark" />
        
        <FormControl sx={{ mb: 2, width: "300px" }}>
          <InputLabel id="dropdown-label" style={{ color: "black" }}>
            Select Team
          </InputLabel>
          <Select
            labelId="dropdown-label"
            value={selectedOption}
            onChange={handleOptionChange}
            style={{ color: "black" }}
          >
            {teamOptions.map((team, index) => (
              <MenuItem key={index} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          teamData.length > 0 && (
            <Box>
              {teamData.map((member, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <p>Participant: {index+1}</p>
                  <p>Name: {member.candidate_name}</p>
                  <p>Email: {member.candidate_email}</p>
                  <TextField
                    label="Enter Roll Number"
                    value={rollNumbers[index] || ""}
                    onChange={(event) => handleRollNoChange(event, index)}
                    style={{ marginBottom: "8px" }}
                  />
                </div>
              ))}

              <Button
                variant="contained"
                style={{ backgroundColor: "black", marginTop: "16px" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          )
        )}
      </Box>
    </Container>
  );
};

export default BoxSystemProps;
