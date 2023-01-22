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
import { saveAs } from "file-saver";
import ConvertToCSV from "./ConvertToCSV";
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
	// console.log(`change log props ${props.product}`);

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
            templogs.sort((a, b) => {
                if(a.product > b. product){
                    return -1;
                }
                if(a.product < b.product){
                    return 1;
                }
                return 0;
            });
            templogs.reverse();
			setLogs(templogs);
			// console.log(templogs);
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
    // useEffect(() => {
    //     logs.sort();
        
    // }, [logs]);
    
	const handleToggleCross = async log => {
		toggleCross(log.time, sendRequest);
		updateLogs();
	};
    const handleExportCSV = e => {
		var csvrows = ConvertToCSV(JSON.stringify(logs));
		var type = "text/csv";
		var blob = new Blob([csvrows], { type: type });
		saveAs(blob, "stock.csv");
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
						<Paper sx={style}>
                            <div className="center">

                            <Button variant="outlined" onClick={handleRefresh}>Refresh</Button>
                            <Button variant="outlined" onClick={handleExportCSV}>Download</Button>
                            </div>
                            {LogsTable(logs, handleToggleCross)}
                            </Paper>
					</div>
				)}
			</div>
	);
}

export default ChangelogContent;
