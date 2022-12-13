import { Button, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "./http-hook";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "./UIElements/LoadingSpinner";
const style = {
	bgcolor: "background.paper",
	boxShadow: 1,
	borderRadius: 2,
	p: 2,
	minWidth: 300
};

function createData( time, product, operation, oldValue, changeValue, crosschecked) {
	return { time, product, operation, oldValue, changeValue, crosschecked };
}

function ChangelogPage(props) {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [logs, setLogs] = useState();
	const updateLogs = async () => {
		try {
			const res = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/api/changelog/getall`
			);
			let templogs = [];
			res.changelogs.forEach(logs => {
				templogs.push(
					createData(
						logs.time,
						logs.product,
						logs.operation,
						logs.oldValue,
						logs.changeValue,
						logs.crosschecked
					)
				);
			});
			setLogs(templogs);
			console.log(templogs);
		} catch (error) {
			console.log(error);
		}
	};
	const handleRefresh = () => {
		updateLogs();
	};
    useEffect(() => {
        updateLogs();
    }, []);


	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div>
				<div className="App">
					<Card>
						<CardContent>Change Log Page</CardContent>
					</Card>
				</div>

				<div className="App">
					<Link to="/stock">
						<Button variant="contained" color="secondary">
							Stocks
						</Button>
					</Link>
					<Link to="/changelog">
						<Button variant="contained">Change Log</Button>
					</Link>
				</div>

				<div className="App">
					<Button variant="outlined" onClick={handleRefresh}>
						Refresh
					</Button>
				</div>

				{isLoading && (
					<div className="center">
						<LoadingSpinner />
					</div>
				)}
				{!isLoading && logs && (
					<div className="App">
						<Paper sx={style}>
                            
				<TableContainer component={Paper} sx={{ maxWidth: 800 }}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Product</TableCell>
								<TableCell align="center">Time</TableCell>
								<TableCell align="center">Operation</TableCell>
								<TableCell align="center">From</TableCell>
								<TableCell align="center">Change</TableCell>
								<TableCell align="center">Check box</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
                            
                        {logs.map(log => (
								<TableRow key={log.time}>

									<TableCell>{log.product}</TableCell>
									<TableCell>{log.time}</TableCell>
									<TableCell>{log.operation}</TableCell>
									<TableCell>{log.oldValue}</TableCell>
									<TableCell>{log.changeValue}</TableCell>
									<TableCell>{log.crosschecked ? <CheckCircleIcon/>:<CheckCircleOutlineIcon/>}</TableCell>
							
									{/* <CardContent>
										<Typography id="logs" variant="h6" component="h2">
											{log.product}
										</Typography>
									</CardContent> */}
                                </TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
						</Paper>
					</div>
				)}
			</div>
		</React.Fragment>
	);
}

export default ChangelogPage;
