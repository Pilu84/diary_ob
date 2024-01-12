import { TextField } from "@mui/material"
import dayjs from "dayjs";
import { HTMLInputTypeAttribute } from "react";


export interface FormTextFieldProps {
  readonly name: string;
  readonly label: string;
  readonly type?: HTMLInputTypeAttribute;
  readonly required: boolean;
  readonly multiline?: boolean;
}


export const FormTextField = (props: FormTextFieldProps) => {

  const defaultDateValue = props.type === "date" ? dayjs().format("YYYY-MM-DD") : undefined;

  return (
    <TextField
      autoFocus
      required={props.required}
      margin={"dense"}
      id={props.name}
      name={props.name}
      label={props.label}
      type={props.type ? props.type : undefined}
      variant={"standard"}
      fullWidth={true}
      multiline={props.multiline ? true : undefined}
      maxRows={props.multiline ? 5 : undefined}
      defaultValue={defaultDateValue ?? undefined}
    />
  )
}