import { MenuItem, TextField } from "@mui/material"
import React from "react";
import { makeStyles } from "tss-react/mui";
import { EnumType, EnumValue } from "../../utils/types/types";
import { Utility } from "../../utils/utility";


export interface MainSelectProps<ENUM extends EnumType> {
  readonly required?: boolean;
  readonly name: string;
  readonly label: string;
  readonly enumSelect: ENUM;
  readonly handlerChange: (value: string) => void;
  readonly defaultValue: string;
  readonly labelForItem?: string;
  readonly emptyOptions?: boolean;
}


const useStyles = makeStyles()(
  () => ({
    selectRoot: {
      padding: 8,
      maxWidth: '200px',
      width: '100%'
    }
  })
);

export const MainSelect = function MainSelect<ENUM extends EnumType>(props: MainSelectProps<ENUM>) {

  const options =
    Utility.getEnumValuesArray(props.enumSelect).map((enumValue: EnumValue<ENUM>) => {
      return [
        enumValue,
        props.enumSelect[enumValue]
      ]
    })


  const { classes } = useStyles();

  return (
    <TextField
      data-testid="select-textField"
      autoFocus
      required={props.required}
      margin={"dense"}
      id={props.name}
      name={props.name}
      label={props.label}
      select
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.handlerChange(event.target.value)}
      defaultValue={props.defaultValue}
      className={classes.selectRoot}
      inputProps={{
        id: props.name,
        role: 'select-input'
      }}
    >

      {props.emptyOptions &&
        <MenuItem key={''} value={''}>
          None
        </MenuItem>
      }
      {options.map((va) => {
        return (
          <MenuItem key={va[0]} value={va[0]}>
            {props.labelForItem + ' ' + va[1]}
          </MenuItem>
        )
      })}


    </TextField>
  )
}