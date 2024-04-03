import React from 'react';
import { Typography, Divider, Chip, TextField, Button } from '@material-ui/core';
import SimpleModal from '@material-ui/core/Modal';

import useStyles from './styles';

const Instructions = ({ isInstOpen, setInstOpen }) => {
  const classes = useStyles();
  let body;

  if (isInstOpen) {
    body = (
            <div className={classes.paper}>
              <Typography variant="h3">Page Of Instructions</Typography>
              <Divider />
              <div className={classes.infoContainer}>
                <Typography variant="h5">News by Categories</Typography>
              </div>
              <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;Give me the latest <strong><em>Business</em></strong> news&quot;</Typography>
              <Divider />
              <div className={classes.infoContainer}>
                <Typography variant="h5">News by Terms</Typography>
              </div>
              <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;What&apos;s up with <strong><em>PlayStation 5</em></strong>&quot;</Typography>
              <Divider />
              <div className={classes.infoContainer}>
                <Typography variant="h5">News by Sources</Typography>
              </div>
              <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;Give me the news from <strong><em>CNN</em></strong>&quot;</Typography>
              <Divider />
              <div className={classes.infoContainer}>
                <Typography variant="h5">Weather Updates</Typography>
              </div>
              <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;Open Weather Widget &quot;</Typography>
              <Divider />
              <div className={classes.infoContainer}>
                <Typography variant="h5">Calendar</Typography>
              </div>
              <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;Open Calendar &quot;</Typography>
              <Divider />
              <div className={classes.infoContainer}>
                <Typography variant="h5">Covid Statistics</Typography>
              </div>
              <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;Give me Covid-19 statistics &quot;</Typography>
              <Divider />
              <div className={classes.infoContainer}>
                <Typography variant="h5">Feedback </Typography>
              </div>
              <Typography variant="body1" className={classes.trySaying}>Try saying: &quot;Open Feedback Form &quot;</Typography>
              <Divider />
            </div>
    );
  } 

  return (
    <SimpleModal open={isInstOpen} onClose={() => {setInstOpen(false); }}>
      {body}
    </SimpleModal>
  );
};

export default Instructions;
