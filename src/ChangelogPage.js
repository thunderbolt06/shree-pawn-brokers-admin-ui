import {
	Button,
	Card,
	CardContent,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "./http-hook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import { toggleCross } from "./addLogs";
import LogsTable from "./LogsTable";
import ChangelogContent from "./ChangelogContent";
const style = {
	bgcolor: "background.paper",
	boxShadow: 1,
	borderRadius: 2,
	p: 2,
	minWidth: 300
};

function createData(
	time,
	product,
	operation,
	oldValue,
	changeValue,
	crosschecked
) {
	return { time, product, operation, oldValue, changeValue, crosschecked };
}

function ChangelogPage(props) {
    
    
	return (
		<React.Fragment>
			<div>
				<div className="App">
					<Card>
						<CardContent>Logs Page</CardContent>
					</Card>
				</div>

				<div className="App">
					<Link to="/stock">
						<Button variant="contained" color="secondary">
							Stocks
						</Button>
					</Link>
					<Link to="/changelog">
						<Button variant="contained">Change Logs</Button>
					</Link>
				</div>
{/* 
				<div className="App">
					<Button variant="outlined" onClick={handleRefresh}>
						Refresh
					</Button>
				</div> */}
                <ChangelogContent/>
			</div>
		</React.Fragment>
	);
}

export default ChangelogPage;
