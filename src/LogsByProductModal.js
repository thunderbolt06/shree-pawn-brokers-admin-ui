import { Button, createTheme, Modal, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ChangelogContent from "./ChangelogContent";
import ChangelogPage from "./ChangelogPage";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	color: "red",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
};
const theme = createTheme({      
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  });
const style2 = {
  "fontSize": "0.8rem"
}
function LogsByProductModal(props) {
    
	const { product } = props;
	// console.log(product);
    const [open, setOpen] = useState(false);
    
	return (
		<React.Fragment><ThemeProvider theme={theme}>

			<Button onClick={() => {setOpen(true)}} variant="outlined" style={style2}>
                {product}
                </Button>
        </ThemeProvider>
			<Modal
				open={open}
				onClose={() => {setOpen(false)}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{/* <div className="App">
						<Card>
							<CardContent>Logs</CardContent>
						</Card>
					</div> */}
                    <ChangelogContent product={product} />
				</Box>
			</Modal>
		</React.Fragment>
	);
}

export default LogsByProductModal;
