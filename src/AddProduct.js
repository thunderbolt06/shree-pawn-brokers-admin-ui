import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHttpClient } from "./http-hook";
import ErrorModal from './UIElements/ErrorModal';
import LoadingSpinner from './UIElements/LoadingSpinner';
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
};

function AddProduct(props) {
	const { openCreateModal, setOpenCreateModal } = props;
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [productValue, setProductValue] = useState();
	const [quantityValue, setQuantityValue] = useState();

	const handleSubmit = async e => {
		console.log(productValue);

		setOpenCreateModal(false);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			<Button variant="outlined" onClick={() => setOpenCreateModal(true)}>
				Add Product
			</Button>
			<Modal
				open={openCreateModal}
				onClose={() => setOpenCreateModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Change quantity
					</Typography>

					<TextField
						id="outlined-basic"
						label="Product Name"
						variant="outlined"
						value={productValue}
						onChange={e => setProductValue(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="Quantity"
						variant="outlined"
						value={quantityValue}
						onChange={e => setQuantityValue(e.target.value)}
					/>
					<Button variant="outlined" onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

export default AddProduct;
