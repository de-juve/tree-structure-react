import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    label: {
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(),
    },
    input: {
      display: 'none',
    },
  });


const useStyles = makeStyles(styles);

export interface IInputFileComponentProps {
  onChange: (e: React.ChangeEvent) => void
}

export default function InputFileComponent(props: IInputFileComponentProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <input
        data-testid="input-file"
        accept="text/csv"
        className={classes.input}
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={props.onChange}
      />
      <label htmlFor="raised-button-file" className={classes.label}>
        <Button
        data-testid="download-file"
          variant="contained"
                component="span"
                className={classes.button}>
          Загрузить файл
        </Button>
      </label>
    </div>
  );
}
