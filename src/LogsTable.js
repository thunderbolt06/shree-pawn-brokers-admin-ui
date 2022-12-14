import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function LogsTable(proplogs, handleToggleCross) {
	let logs = proplogs;
	let handleCrosscheckedIcon;
    
    handleCrosscheckedIcon = crosschecked => {
		return crosschecked ? (
			<CheckCircleIcon style={{ color: "green" }} />
		) : (
			<CheckCircleOutlineIcon />
		);
	};



	let cross = true;
	return (
		<TableContainer component={Paper} sx={{ maxWidth: "100vw",width:"auto" }}>
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
						// cross = log.crosschecked;
						<TableRow key={log.time}>
							<TableCell>{log.product}</TableCell>
							<TableCell>{log.time}</TableCell>
							<TableCell>{log.operation}</TableCell>
							<TableCell>{log.oldValue}</TableCell>
							<TableCell>{log.changeValue}</TableCell>
							<TableCell>
								<Button
									onClick={e => {
										handleToggleCross(log);
										// cross = !cross;
                                        log.crosschecked = !log.crosschecked;
									}}
								>
									{handleCrosscheckedIcon(log.crosschecked)}
								</Button>
							</TableCell>

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
	);
}
export default LogsTable;
