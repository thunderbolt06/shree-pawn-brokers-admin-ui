import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import {
	Box,
	Button,
	IconButton,
	Modal,
	SvgIcon,
	TextField,
	Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHttpClient } from "./http-hook";
import { useState, useEffect } from "react";
import BasicModal from "./EditProductModal";
import { addLogs } from "./addLogs";
import LogsByProductModal from "./LogsByProductModal";
import { saveAs, File } from "file-saver";
import UploadCSVModal from "./UploadCSVModal";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	margin: "2rem",
	p: 4
};

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

let handleDelete = async e => {
	let a = 1;
};

let handleEdit = async e => {
	let a = 1;
};
function issubsequence(s1, s2) {
	let n = s1.length,
		m = s2.length;
	let i = 0,
		j = 0;
	while (i < n && j < m) {
		if (s1[i].toUpperCase() == s2[j].toUpperCase()) i++;
		j++;
	}
	/*If i reaches end of s1,that mean we found all
    characters of s1 in s2,
    so s1 is subsequence of s2, else not*/
	return i == n;
}
function ConvertToCSV(objArray) {
	var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
	var str = "";

	for (var i = 0; i < array.length; i++) {
		var line = "";
		for (var index in array[i]) {
			if (line != "") line += ",";

			line += array[i][index];
		}

		str += line + "\r\n";
	}

	return str;
}
export default function BasicTable(props) {
	let rows = props.rows;
	let fetchStocks = props.fetchStocks;
	// let filteredRows = rows;
	const [filteredRows, setFilteredRows] = useState(rows);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	// console.log(rows);
	// let {rows} = props.rows;
	// console.log(rows);

	const [filterValue, setFilterValue] = useState("");

	// var csvrows = ConvertToCSV(JSON.stringify(rows));
	// var type = "text/csv";
	// var blob = new Blob( [csvrows], { type: type } );
	// saveAs(blob, "stock.csv");
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	useEffect(() => {
		// console.log("filterring rows");
		let tempRows = [];
		rows.forEach(row => {
			if (issubsequence(filterValue, row.product)) {
				tempRows.push(row);
			}
		});
		tempRows.sort((a, b) => {
			// console.log(`sorting ${a.product} and ${b.product}`);
			if (a.product < b.product) {
				return -1;
			}
			if (a.product > b.product) {
				return 1;
			}
			return 0;
			// return a.product - b.product;
		});
		setFilteredRows(tempRows);
	}, [rows, filterValue]);

	const handleClose = () => setOpen(false);
	const [newProductValue, setNewProductValue] = useState("");

	const handleEdit = (productName, quantity) => {
		setOpen(true);
		// props.setOpenEdit(true);
		// console.log("Editing product and quantity");
		// console.log(productName);
		// console.log(quantity);

		fetchStocks();
		//edit value in db
	};
	const handleDelete = async (productName, quantity) => {
		try {
			// console.log("hitting url");
			// console.log(process.env.REACT_APP_BACKEND_URL + "/api/stocks/del");

			// console.log("Deleting product and quantity");
			// console.log(productName);
			// console.log(quantity);
			let res = await sendRequest(
				process.env.REACT_APP_BACKEND_URL + "/api/stocks/del",
				"POST",
				JSON.stringify({
					product: productName
				}),
				{
					"Content-Type": "application/json"
				}
			);

			// console.log(res);
		} catch (err) {
			console.log(err);
		}

		await addLogs(productName, "-", sendRequest, "delete", "-", false);

		// for(var i = 0; i < props.rows.length; i++ ) {
		//   if(props.rows[i] == productName) {
		//     props.rows.splice(i, 1);
		//     break;
		//   }
		// }
		fetchStocks();
		// delete values in db
	};
	const handleExportCSV = e => {
		var csvrows = ConvertToCSV(JSON.stringify(filteredRows));
		var type = "text/csv";
		var blob = new Blob([csvrows], { type: type });
		saveAs(blob, "stock.csv");
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
				<TableContainer
					component={Paper}
					sx={{ maxWidth: "100vw", width: "auto" }}
				>
					{/* <Typography className="AppLeft">

                    Filter
                    </Typography> */}
					<TextField
						id="outlined-basic"
						label="Filter"
						variant="outlined"
						value={filterValue}
						onChange={e => {
							// console.log(e.target.value);
							setFilterValue(e.target.value);
						}}
						size="small"
						className="AppLeft"
					/>
					<Button onClick={handleExportCSV} variant="outlined">
						Download CSV
					</Button>
					<UploadCSVModal
						fetchStocks={fetchStocks}
					/>

					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Product</TableCell>
								<TableCell align="right">Quantity</TableCell>
								<TableCell align="center">Edit</TableCell>
								<TableCell align="center">Delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredRows.map(row => (
								<TableRow key={row.product}>
									<TableCell>
										<LogsByProductModal product={row.product} />
									</TableCell>
									<TableCell align="right">{row.quantity}</TableCell>
									<TableCell align="center">
										<BasicModal
											product={row.product}
											quantity={row.quantity}
											fetchStocks={fetchStocks}
										/>
									</TableCell>
									<TableCell align="center">
										<IconButton
											color="primary"
											aria-label="upload picture"
											component="label"
											onClick={e => handleDelete(row.product, row.quantity)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</React.Fragment>
	);
}
