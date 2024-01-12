import React, { useCallback, useRef, useState } from "react";
import { useMainTheme } from "../../utils/hooks/useMainTheme";
import { makeStyles } from "tss-react/mui";
import { Container, Theme, Typography } from "@mui/material";
import { ButtonType, MainBtn } from "../../commons/mainBtn/mainBtn";
import { PlaylistAddOutlined } from "@mui/icons-material";
import { Diary, SortByType, TagEnum, TagObj } from "../../utils/types/types";
import { MainCard } from "../../commons/card/mainCard";
import { FormDialog } from "../../commons/dialog/formDialog";
import { FormTextField } from "../../commons/formTextField/FormTextField";
import { Utility } from "../../utils/utility";
import { MainSelect } from "../../commons/mainSelect/mainSelect";

export interface MainProps { }

const useStyles = makeStyles<{ theme: Theme }>()(
  (theme: Theme) => ({
    titleTextWrapper: {
      display: 'flex',
      justifyContent: 'center',
      margin: '8px'
    },
    mainContainer: {
      boxShadow: theme.shadows[1],
      marginTop: 8,
      padding: 24,
      borderRadius: 5
    },
    select: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 8
    }
  })
);


const tags: TagObj = {
  todo: { name: 'Todo', color: '0007FF' },
  important: { name: 'Important', color: 'd32f2f' },
  privat: { name: 'Privat', color: '4caf50' }
}



export const Main = (_props: MainProps) => {

  const theme = useMainTheme();

  const { classes } = useStyles({ theme });

  const [sortedBy, setSortedBy] = useState<string>(Utility.getenumValue(SortByType, SortByType.desc));
  const [selected, setSelected] = useState<number[]>([]);

  const todoList = useRef<Diary[]>([]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const selectedTag = useRef<string>('');

  const handlerClickDiary = useCallback(() => {
    setOpenDialog(prevState => !prevState);
  },
    []
  )

  const handlerSubmit = useCallback((formData: any) => {

    const oldData = todoList;

    const newData: Diary = {
      id: Math.random(),
      tag: tags[selectedTag.current],
      content: formData.diaryContent,
      title: formData.diaryName,
      date: Date.parse(formData.date)
    };

    const mergeData = Utility.sortBy(SortByType, sortedBy, [...oldData.current, newData], 'date');

    todoList.current = mergeData;
    setSelected(prev => [...prev, newData.id]);
  },
    [todoList, sortedBy]
  )

  const handlerSort = useCallback((sortType: string) => {
    const data = selected.length !== 0 ? todoList.current.filter((list) => selected.includes(list.id)) : todoList.current;

    const sortedData = Utility.sortBy(SortByType, sortType, data, 'date').map((v) => { return v.id });

    setSelected(sortedData);
    setSortedBy(Utility.getenumValue(SortByType, sortType));
  },
    [selected]
  )


  const handlerFilter = useCallback((filterBy: string) => {
    const filter = Utility.getEnumValueFromKey(TagEnum, filterBy);

    const selected: number[] = [];

    todoList.current.forEach((list) => {

      if (filterBy === '') {
        selected.push(list.id)
      }
      if (list.tag.name === filter) {
        selected.push(list.id);
      }


    })

    setSelected(selected);

  },
    []
  )

  const handlerDelete = useCallback((id: number) => {
    const newList = todoList.current.filter((list) => list.id !== id);

    todoList.current = newList;
    setSelected(prev => prev.filter((p) => p !== id))

  },
    []
  )
  return (
    <div>
      <Container maxWidth="sm" className={classes.mainContainer}>
        <Container className={classes.titleTextWrapper}>
          <Typography variant="h1">
            List of Diary
          </Typography>
        </Container>

        <Container>
          <MainBtn
            text={"Add new Diary"}
            type={ButtonType.textWithIcon}
            icon={PlaylistAddOutlined}
            onClick={handlerClickDiary}
          />
        </Container>

        {todoList.current && todoList.current.length !== 0 &&
          <Container className={classes.select}>
            <MainSelect<typeof SortByType>
              label={'Sort'}
              name={'select'}
              enumSelect={SortByType}
              handlerChange={handlerSort}
              defaultValue={'desc'}
              labelForItem={'Date'}
            />


            <MainSelect
              defaultValue={''}
              enumSelect={TagEnum}
              label={"Filter"}
              name={"filter"}
              handlerChange={(tag: string) => handlerFilter(tag)}
              labelForItem={""}
              emptyOptions
            />
          </Container>
        }

        {selected && selected.length !== 0 &&
          <Container>
            {selected.map((id: number) => {

              const idx = todoList.current.findIndex((value) => value.id === id);

              if (idx === -1) {
                return null;
              }
              return (
                <MainCard
                  cardTitle={todoList.current[idx].title}
                  cardContent={todoList.current[idx].content}
                  tag={todoList.current[idx].tag}
                  key={'diary_' + todoList.current[idx].id}
                  date={new Date(todoList.current[idx].date)}
                  handlerDelete={handlerDelete}
                  id={todoList.current[idx].id}
                />
              )
            })}
          </Container>
        }

        {openDialog &&
          <FormDialog
            open={openDialog}
            dialogTitle={"Add new Diary"}
            handlerClose={handlerClickDiary}
            onSubmit={handlerSubmit}
          >
            <FormTextField
              required={true}
              name={"diaryName"}
              label={"Name of diary"}
              type={"text"}
            />

            <FormTextField
              required={true}
              name={"diaryContent"}
              label={"Details of diary"}
              multiline
            />

            <FormTextField
              required={true}
              name={"date"}
              label={"Date"}
              type={"date"}
            />

            <MainSelect
              defaultValue={''}
              enumSelect={TagEnum}
              label={"Tag"}
              name={"tag"}
              handlerChange={(tag: string) => selectedTag.current = tag}
              labelForItem={""}
              required
            />

          </FormDialog>
        }
      </Container>
    </div>
  )
}