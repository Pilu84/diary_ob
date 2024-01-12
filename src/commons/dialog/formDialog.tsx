import { CloseOutlined, SaveOutlined } from "@mui/icons-material";
import { Container, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactNode } from "react";
import { makeStyles } from "tss-react/mui";
import { ButtonType, MainBtn } from "../mainBtn/mainBtn";

export interface FormDialogProps {
  readonly open: boolean;
  readonly handlerClose: () => void;
  readonly onSubmit: (formData: any) => void;
  readonly children: ReactNode;
  readonly dialogTitle?: string;
}


const useStyles = makeStyles()(
  () => ({
    dialogContentWrapper: {
      display: 'flex',
      justifyContent: 'center'
    },
    dialogTitleWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  })
);

export const FormDialog = (props: FormDialogProps) => {

  const { classes } = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.handlerClose}
      maxWidth={"xs"}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());

          props.onSubmit(formJson);
          props.handlerClose();
        }
      }}
    >
      <Container className={classes.dialogTitleWrapper}>
        <DialogTitle>
          {props.dialogTitle}
        </DialogTitle>
        <MainBtn
          text={"Close"}
          type={ButtonType.icon}
          icon={CloseOutlined}
          onClick={props.handlerClose}
        />
      </Container>

      <Container className={classes.dialogContentWrapper}>
        <DialogContent>
          {props.children}
        </DialogContent>
      </Container>

      <Container>
        <DialogActions>
          <MainBtn
            text={"Save diary"}
            type={ButtonType.textWithIcon}
            icon={SaveOutlined}
            submitType={true}
          />
        </DialogActions>
      </Container>
    </Dialog>
  )

}