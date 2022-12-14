import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function LogsTable(logs, handleToggleCross) {
	const crosscheckedIcon = crosschecked => {
		return crosschecked ? (
			<CheckCircleIcon style={{ color: "green" }} />
		) : (
			<CheckCircleOutlineIcon />
		);
	};
    
	return (
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
							<TableCell>
								<Button
									onClick={e => {
										handleToggleCross(log);
									}}
								>
									{crosscheckedIcon(log.crosschecked)}
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