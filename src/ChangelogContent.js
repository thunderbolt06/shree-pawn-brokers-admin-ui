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

function ChangelogContent(props) {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [logs, setLogs] = useState();
	const endPoint = props.product
		? `/getLogsByProduct/${props.product}`
		: "/getall";
	console.log(`change log props ${props.product}`);

	const updateLogs = async () => {
		try {
			const res = props.product ?  
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/changelog/getLogsByProduct`,
                "POST",
                JSON.stringify({
                    product: props.product,
                }),
                {
                    "Content-Type": "application/json"
                }
            )
            :
            await sendRequest(
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

	const handleToggleCross = log => {
		toggleCross(log.time, sendRequest);
		updateLogs();
	};
    
    
	return (
			<div>
			<ErrorModal error={error} onClear={clearError} />
                
				{isLoading && (
					<div className="center">
						<LoadingSpinner />
					</div>
				)}
				{!isLoading && logs && (
					<div className="App">
						<Paper sx={style}>{LogsTable(logs, handleToggleCross)}</Paper>
					</div>
				)}
			</div>
	);
}

export default ChangelogContent;
