import { AssignmentOutlined, DeleteOutlined, SettingsOutlined } from "@mui/icons-material";
import { Avatar, Card, CardActions, CardContent, CardHeader, Container, Tooltip, Typography } from "@mui/material"
import { useCallback } from "react";
import { Tag } from "../../utils/types/types";
import { ButtonType, MainBtn } from "../mainBtn/mainBtn";

export interface MainCardProps {
  readonly cardContent: string;
  readonly cardTitle: string;
  readonly date: Date;
  readonly handlerDelete?: (id: number) => void;
  readonly id: number;
  readonly tag?: Tag;
}

export const MainCard = (props: MainCardProps) => {

  const { cardContent, cardTitle, tag } = props;

  const handlerClickDeleteBtn = useCallback(() => {
    if (props.handlerDelete != null) {
      props.handlerDelete(props.id);
    }
  },
    [props]
  )


  const handlerClickChangeBtn = useCallback(() => {
    console.log('change');
  },
    []
  )

  return (
    <Card sx={{ minWidth: 275, margin: 8 }}>
      <CardHeader
        title={cardTitle}
        avatar={
          tag != null ?
            <Tooltip title={tag.name}>
              <Avatar
                sx={{ bgcolor: `#${tag.color}` }}
              >
                <AssignmentOutlined />
              </Avatar>
            </Tooltip>
            : undefined
        }
        subheader={
          <Container>
            {props.date.toDateString()}
          </Container>
        }
      />
      <CardContent>
        <Typography variant="body1">
          {cardContent}
        </Typography>
      </CardContent>

      <CardActions>
        <MainBtn
          text={"Delete"}
          type={ButtonType.icon}
          icon={DeleteOutlined}
          onClick={handlerClickDeleteBtn}
        />

        <MainBtn
          text={"Change Diary"}
          type={ButtonType.icon}
          icon={SettingsOutlined}
          onClick={handlerClickChangeBtn}
        />
      </CardActions>

    </Card>
  )
}