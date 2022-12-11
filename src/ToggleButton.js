import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton(props) {
    let {alignment, setAlignment, setMessage} = props;
//   const [alignment, setAlignment] = React.useState('add');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setMessage("");
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="add">Add Pawn</ToggleButton>
      <ToggleButton value="del">Delete Pawn</ToggleButton>
    </ToggleButtonGroup>
  );
}