import "./App.css";
import { useEffect, useState } from "react";
import { useHttpClient } from "./http-hook";
import ColorToggleButton from "./ToggleButton";
import { Box, Button, Card, Modal, TextField } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import BasicTable from "./BasicTable";
import React, { Component } from "react";
import AddProduct from "./AddProduct";
import { addLogs } from "./addLogs";
import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import { Link } from "react-router-dom";
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

function createData1(product, quantity) {
    return { product, quantity };
}
export default function StockPage() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedStocks, setLoadedStocks] = useState();
	const [openCreateModal, setOpenCreateModal] = useState(false);

	// const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [productValue, setProductValue] = useState();
	const [quantityValue, setQuantityValue] = useState();

	const fetchStocks = async () => {
		try {
			const res = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/api/stocks/getall`
			);
			let stocks = [];
			res.stocks.forEach(stock => {
				stocks.push(createData1(stock.product, stock.quantity));
			});
			setLoadedStocks(stocks);
			console.log(stocks);
		} catch (error) {
			console.log(error);
		}
	};
	const handleSubmit = async (e) => {
		console.log(productValue);
		try {
			const res = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/api/stocks/add`,
				"POST",
				JSON.stringify({
					product: productValue,
					quantity: quantityValue
				}),
				{
					"Content-Type": "application/json"
				}
			);
		} catch (error) {
			console.log(error);
		}
        
        await addLogs(productValue, quantityValue, sendRequest,"new", "-", false );

		fetchStocks();
		setOpenCreateModal(false);
	};
	useEffect(() => {
		fetchStocks();
	}, [sendRequest]);


	// const rows = [
	//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3)
	// ];
	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<div className="App">
				<Card>
					<CardContent>Welcome To Shree Traders</CardContent>
				</Card>
			</div>
			<div className="App">
				<Link to="/stock">
					<Button variant="contained" onClick={true} color="secondary">
						Stocks
					</Button>
				</Link>
				<Link to="/changelog">
					<Button variant="contained" onClick={true}>
						Change Log
					</Button>
				</Link>
			</div>
			<div className="App">
				{/* <AddProduct
					openCreateModal={openCreateModal}
					setOpenCreateModal={setOpenCreateModal}
				/> */}
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
			</div>
			<div className="App">
				{isLoading && (
					<div className="center">
						<LoadingSpinner />
					</div>
				)}
				{!isLoading && loadedStocks && (
					<BasicTable rows={loadedStocks} fetchStocks={fetchStocks} />
				)}
			</div>
		</React.Fragment>
	);
}
// async function addLogs(productValue, quantityValue, sendRequest,op, old, cross ) {
//     try {
//         console.log("added logs");
//         const event = new Date(Date.now());
//         var time = event.toLocaleString('en-GB', { timeZone: 'UTC' });

//         console.log(time.substring(0, time.length - 1));
//         console.log(productValue);
//         console.log(quantityValue);

//         const res1 = await sendRequest(
//             `${process.env.REACT_APP_BACKEND_URL}/api/changelog/add`,
//             "POST",
//             JSON.stringify({
//                 time: time.substring(0, time.length - 1),
//                 product: productValue,
//                 operation: op,
//                 changeValue: quantityValue,
//                 oldValue: old,
//                 crosschecked: cross
//             }),
//             {
//                 "Content-Type": "application/json"
//             }
//         );
//         console.log("added these logs");
//         console.log(res1.body);
//     } catch (error) {
//         console.log(error);
//     }
// }

