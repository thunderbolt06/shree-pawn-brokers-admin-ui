import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Divider, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { useHttpClient } from "./http-hook";

import ErrorModal from './UIElements/ErrorModal';
import LoadingSpinner from './UIElements/LoadingSpinner';
import "./App.css";
import { addLogs } from "./addLogs";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
    color: "red",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
};

export default function BasicModal(props) {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// let open = props.open;
	// let setOpen = props.setOpen;
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [op, setop] = React.useState("no");

	const handleop = e => {
		setop(e.target.value);
	};
	const [value, setValue] = useState(0);
	const handleValueChange = e => {
		setValue(e.target.value);
	};
	const handleSubmit = async e => {
		console.log(op);
		console.log(value);

		try {
			let newquantity = parseInt(props.quantity);
			if (op == "add") {
				newquantity = parseInt(props.quantity) + parseInt(value);
			} else if (op == "sub") {
				newquantity = parseInt(props.quantity) - parseInt(value);
			}
			console.log("hitting url");
			console.log(process.env.REACT_APP_BACKEND_URL + "/api/stocks/add");
			console.log(`with body ${props.product} and ${newquantity}`);
			console.log(props.product);
			console.log(newquantity);
			let res = await sendRequest(
				process.env.REACT_APP_BACKEND_URL + "/api/stocks/add",
				"POST",
				JSON.stringify({
					product: props.product,
					quantity: newquantity
				}),
				{
					"Content-Type": "application/json"
				}
			);

			console.log(res);
		} catch (err) {
			console.log(err);
		}
        
        await addLogs(props.product, value, sendRequest,"op", props.quantity, false );


		props.fetchStocks();
		handleClose();
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
					<Button onClick={handleOpen}>
						<EditIcon />
					</Button>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Change quantity
							</Typography>

							<ToggleButtonGroup
								value={op}
								exclusive
								onChange={handleop}
								aria-label="Value change"
                                color="primary"
							>

								<ToggleButton value="add" aria-label="add" >
                                    Add
									<AddIcon />
								</ToggleButton>
                                <Divider orientation="vertical" flexItem />
								<ToggleButton value="sub">
                                    Sub
									<RemoveIcon />
								</ToggleButton>
							</ToggleButtonGroup>

							<TextField
								id="outlined-basic"
								label="Value"
								variant="outlined"
								value={value}
								onChange={handleValueChange}
							/>
							<Button variant="outlined" onClick={handleSubmit}>
								Submit
							</Button>
						</Box>
					</Modal>
				</div>
			)}
		</React.Fragment>
	);
}
