/*
import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const isBrowser = typeof window !== 'undefined'
const classes = theme => (!isBrowser ? {} :{
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
});
class Linear extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    const { completed } = this.props;
    return (
        <div className={classes.root}>
          <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} color="primary" />
        </div>
    )
  }
}

export default (Linear);*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LinearBuffer() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progress = React.useRef(() => {});
  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setCompleted(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 70);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
      <div className={classes.root}>
        <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
      </div>
  );
}
