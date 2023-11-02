import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";

/**
 * Common component for text input
 */
export default function HookTextField(props) {
  const { field, fieldState, formState } = useController(props);
  return (
    <TextField
      InputProps={{}}
      {...field}
      {...props}
      error={
        (fieldState?.isTouched || formState?.isSubmitted) &&
        Boolean(fieldState?.error)
      }
      helperText={
        (fieldState?.isTouched || formState?.isSubmitted) &&
        fieldState?.error?.message
      }
    />
  );
}
