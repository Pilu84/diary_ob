import { Button, IconButton, SvgIcon, Theme, Tooltip } from "@mui/material";
import React, { SyntheticEvent, useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import { useMainTheme } from "../../utils/hooks/useMainTheme";


export enum ButtonType {
  text,
  icon,
  textWithIcon
}

export interface MainBtnProps {
  readonly text: string;
  readonly type: ButtonType;
  readonly onClick?: (event: React.SyntheticEvent<HTMLElement>) => void;
  readonly icon?: typeof SvgIcon;
  readonly disabled?: boolean;
  readonly submitType?: boolean;
}


const useStyles = makeStyles<{ theme: Theme }>()(
  (theme: Theme) => ({
    btnRoot: {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[3],
      "&:hover": {
        boxShadow: theme.shadows[8],

      }
    }
  })
);


export const MainBtn = React.forwardRef<HTMLDivElement, MainBtnProps>(
  function MainBtn(_props: MainBtnProps, ref: React.ForwardedRef<HTMLDivElement>) {

    const props = _props;

    const theme = useMainTheme();
    const { classes } = useStyles({ theme });


    const clickHandler = useCallback((e: SyntheticEvent<HTMLElement>) => {
      const onClick = props.onClick;
      if (onClick != null) {
        e.preventDefault();
        onClick(e);
      }
    },
      [props.onClick]
    )

    let element;

    if (props.type === ButtonType.text) {
      element = <Button
        disabled={props.disabled}
        onClick={clickHandler}
        variant={'contained'}
        key={props.text}
        className={classes.btnRoot}
        type={props.submitType ? "submit" : "button"}
      >
        {props.text}
      </Button>
    }

    if (props.type === ButtonType.icon && props.icon) {
      element = <IconButton
        disabled={props.disabled}
        onClick={clickHandler}
        className={classes.btnRoot}
        type={props.submitType ? "submit" : "button"}
      >
        {<props.icon />}
      </IconButton>
    }


    if (props.type === ButtonType.textWithIcon && props.icon) {
      element = <Button
        disabled={props.disabled}
        onClick={clickHandler}
        variant={'contained'}
        key={props.text}
        className={classes.btnRoot}
        startIcon={<props.icon />}
        type={props.submitType ? "submit" : "button"}
      >
        {props.text}
      </Button>
    }


    return (
      <>
        {element &&
          <Tooltip title={props.text}>
            {element}
          </Tooltip>
        }
      </>
    )


  }
)