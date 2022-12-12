import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function DashboardToggleButtons(props) {
    let {alignment, setAlignment} = props;
//   const [alignment, setAlignment] = React.useState('add');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="getAllPawns">All Pawns</ToggleButton>
      <ToggleButton value="getTotalPrincipal">Total Principal</ToggleButton>
    </ToggleButtonGroup>
  );
}