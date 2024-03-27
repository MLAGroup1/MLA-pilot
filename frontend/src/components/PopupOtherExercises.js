import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { createCustomExercise, getCustomExercises } from "../services/api";
import "./PopupOtherExercises.css";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  title: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
});

function PopupOtherExercises({ isOpen, onClose, onSelectExercise }) {
  const [customExercises, setCustomExercises] = useState([]);
  const [open, setOpen] = React.useState(isOpen);
  const [showNewExercise, setShowNewExercise] = useState(false);
  const [newExercise, setNewExercise] = useState({
    exerciseName: "",
    calories: 0,
  });

  const classes = useStyles();

  useEffect(() => {
    async function fetchCustomExercises() {
      try {
        const response = await getCustomExercises();
        setCustomExercises(response.data);
      } catch (error) {
        console.error("Error fetching custom exercises:", error);
      }
    }
    fetchCustomExercises();
  }, []);

  const DialogTitle = withStyles(styles)((props) => {
    const { classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6" className={classes.title}>
          Custom Exercises
        </Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const handleSelectExercise = (exercise) => {
    onSelectExercise(exercise);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleClick = async () => {
    try {
      const response = await createCustomExercise(newExercise);
      setCustomExercises([...customExercises, response.data]);
      setShowNewExercise(false);
      setNewExercise({
        exerciseName: "",
        calories: 0,
      });
    } catch (error) {
      console.error("Error creating custom exercise:", error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle onClose={handleClose} />

      <List>
        {customExercises.map((exercise, index) => (
          <ListItem key={index} onClick={() => handleSelectExercise(exercise)} button>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <FitnessCenterIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={exercise.exerciseName} />
          </ListItem>
        ))}

        <ListItem autoFocus button>
          <ListItemAvatar>
            {showNewExercise === false ? (
              <Avatar>
                <AddIcon />
              </Avatar>
            ) : (
              <Avatar
                style={{ backgroundColor: "green" }}
                onClick={handleClick}
              >
                <AddIcon />
              </Avatar>
            )}
          </ListItemAvatar>
          {showNewExercise === false ? (
            <ListItemText
              onClick={() => setShowNewExercise(true)}
              primary="Add a Custom Exercise"
            />
          ) : (
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={1}>
                <TextField
                  onChange={(e) =>
                    setNewExercise((data) => ({
                      ...data,
                      exerciseName: e.target.value,
                    }))
                  }
                  label="Name Exercise"
                  variant="outlined"
                />
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <p></p>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <TextField
                  onChange={(e) =>
                    setNewExercise((data) => ({
                      ...data,
                      calories: e.target.value,
                    }))
                  }
                  label="Calories/30 min"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          )}
        </ListItem>
      </List>
    </Dialog>
  );
}

export default PopupOtherExercises;
