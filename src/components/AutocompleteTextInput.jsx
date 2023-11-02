import React from "react";
import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AutocompleteTextInput(props) {
  return (
    <Autocomplete
      {...props}
      multiple
      options={props.options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      value={props.dietState.selectedOptions}
      renderTags={(values) =>
        values.map((value) => (
          <Chip
            key={value.id}
            label={value.title}
            onDelete={() => {
              props.removeDietOption(value.id);
            }}
          />
        ))
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            key={option.id}
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      onChange={props.handleDietChange}
      renderInput={(params) => (
        <TextField {...props} {...params} variant="outlined" />
      )}
    />
  );
}
