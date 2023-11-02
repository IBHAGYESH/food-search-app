import { FormControl, InputLabel, Select } from "@mui/material";
import React from "react";
import { Controller, useController } from "react-hook-form";

const ReactHookFormSelect = (props) => {
  const { field, fieldState, formState } = useController(props);
  return (
    <Select {...field} {...props}>
      {props.children}
    </Select>
  );
};
export default ReactHookFormSelect;
