import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
	Divider,
	TextField,
	ToggleButton,
	ToggleButtonGroup
} from "@mui/material";
import { useState } from "react";
import { useHttpClient } from "./http-hook";

import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import "./App.css";
import { addLogs } from "./addLogs";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	color: "black",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
};

export default function UploadCSVModal(props) {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [op, setop] = React.useState("no");

	const [file, setFile] = useState("");

	// On file select (from the pop up)
	const onFileChange = event => {
		// Update the state
		setFile({ selectedFile: event.target.files[0] });
	};

	// On file upload (click the upload button)
	const onFileUpload = async () => {
		// Create an object of formData
		// const formData = new FormData();

		// // Update the formData object
		// formData.append(
		//   "myFile",
		//   this.state.selectedFile,
		//   this.state.selectedFile.name
		// );

		// Details of the uploaded file
		console.log(file.selectedFile);

		// Create a new FileReader object
		var reader = new FileReader();
		// Read the contents of the file
		reader.readAsText(file.selectedFile);

		// Handle the load event
		reader.onload = async function() {
			// Split the contents of the file by newline
			var lines = reader.result.split("\n");

			// Loop through each line
			for (var line of lines) {
				// Split the line by comma
				var data = line.split(",");

				// Do something with the data
				console.log(data);
				try {
					let res = await sendRequest(
						process.env.REACT_APP_BACKEND_URL + "/api/stocks/add",
						"POST",
						JSON.stringify({
							product: data[0],
							quantity: data[1]
						}),
						{
							"Content-Type": "application/json"
						}
					);
                    
                    await addLogs(data[0], data[1], sendRequest,"update", "-", false );

				} catch (err) {
					console.log(err);
				}
                
			}
		};

		reader.onerror = function() {
			alert("Error reading the file.");
		};

		props.fetchStocks();
		handleClose();
		// Request made to the backend api
		// Send formData object
		// axios.post("api/uploadfile", formData);
	};
	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && (
				<div>
					<Button onClick={handleOpen} variant="outlined">
						UPLOAD CSV
					</Button>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Upload CSV
							</Typography>

							<input
								type="file"
								accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
								onChange={onFileChange}
							/>
							<Button onClick={onFileUpload} variant="outlined">
								Submit File
							</Button>
						</Box>
					</Modal>
				</div>
			)}
		</React.Fragment>
	);
}
