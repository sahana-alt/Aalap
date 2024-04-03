const isBrowser = typeof window !== 'undefined'

import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
var _ = require('underscore')
import Loadable from "react-loadable";
import Circular from "@components/Loaders/Circular";
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useStyles from '../../styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AnalogClock from 'analog-clock-react';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudIcon from '@material-ui/icons/Cloud';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import EventIcon from '@material-ui/icons/Event';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';

const style = {
    loader: {"position": "fixed", "top": "45%", "left": "36%"}
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#D8D8D8',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: 'black',
      },
    },
  },
}))(MenuItem);

const NewsCards = Loadable({
  loader: () => import('@components/NewsCards/NewsCards' /* webpackChunkName: 'NewRoute' */),
  loading: () => (<div style={style.loader}><Circular/></div>)
});

const Modal = Loadable({
  loader: () => import('@components/Modal/Modal' /* webpackChunkName: 'Home' */),
  loading: () => (<div style={style.loader}><Circular/></div>)
});
const Instructions = Loadable({
  loader: () => import('@components/Modal/Instructions' /* webpackChunkName: 'Home' */),
  loading: () => (<div style={style.loader}><Circular/></div>)
});
const Calendar = Loadable({
  loader: () => import('@components/Calendar' /* webpackChunkName: 'Home' */),
  loading: () => (<div style={style.loader}><Circular/></div>)
});

const Weather = Loadable({
  loader: () => import('@components/Weather' /* webpackChunkName: 'Home' */),
  loading: () => (<div style={style.loader}><Circular/></div>)
});

const Covid = Loadable({
  loader: () => import('@components/Covid' /* webpackChunkName: 'Home' */),
  loading: () => (<div style={style.loader}><Circular/></div>)
});

const Home = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInstOpen, setInstOpen] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [draw, setDraw] = useState(false);
  const [wdraw, setwDraw] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const classes = useStyles();
  let options = {
    width: "100px",
    border: false,
    baseColor: "#000",
    centerColor: "#d81c7a",
    centerBorderColor: "#fff",
    handColors: {
      second: "#d81c7a",
      minute: "#fff",
      hour: "#fff"
    }
};
  const dataFetch = () =>{
    const API_KEY = '8ffdaa728d064d77882bc1d79ef69e10';
    if(type==="Sources"){
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
        NEWS_API_URL = `${NEWS_API_URL}&sources=${name.toLowerCase().split(" ").join('-')}`
        fetch(NEWS_API_URL)
        .then(res => res.json())
        .then(res=>setNewsArticles(res.articles))
    }
    if(type==="Terms"){
      let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
        NEWS_API_URL = `${NEWS_API_URL}&q=${name}`
          fetch(NEWS_API_URL)
          .then(res => res.json())
          .then(res=>setNewsArticles(res.articles))
      }
      if(type==="Categories"){
        let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;
          NEWS_API_URL = `${NEWS_API_URL}&category=${name}`
            fetch(NEWS_API_URL)
            .then(res => res.json())
            .then(res=>setNewsArticles(res.articles))
        }
        setActiveArticle(-1);
  }
  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: '0f56d68d0318442a58d8964a57cc79582e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        }
        else if (command === 'back') {
          setRedirect(false);
        }
        else if (command === 'calendar') {
          setDraw(true)
        }
        else if (command === 'weather') {
          setwDraw(true)
        }
        else if(command === 'covid' ){
          setRedirect(true);
        } else if (command === 'instructions') {
          setIsOpen(true);
         }
         else if (command === 'inst') {
          setInstOpen(true);
         }
         else if (command === 'feedback') {
          setIsOpen(true);
          setFeedback(true);
        }
         else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);
  
  return (
    <div className="main">     
      <div className="home-1">
          <p className="home-2">Aalap</p>
          <AnalogClock className="home-3" {...options} />
          <p className="home-4">{new Date().toLocaleString().substring(0,9)}</p>
      </div>
      <Button 
          onClick={(event)=>{setAnchorEl(event.currentTarget)}} 
          className="home-5"
          style={{backgroundColor:'black',color:'white',cursor:'pointer',marginLeft:'30px',marginTop:'-22px'}}
          aria-controls="customized-menu"
          aria-haspopup="true">
          <MenuIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={()=>{setAnchorEl(null)}}
        className="home-6"
      >
        {redirect ?
        <StyledMenuItem onClick={()=>{ setRedirect(false);
                                        setNewsArticles([])}}>
        <ListItemIcon>
          <HomeIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </StyledMenuItem>
        :
         newsArticles.length>0?
        <StyledMenuItem onClick={()=>{ setRedirect(false);
                                        setNewsArticles([])}}>
        <ListItemIcon>
          <HomeIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </StyledMenuItem>
        :<StyledMenuItem onClick={()=>{ setRedirect(true);}}>
          <ListItemIcon>
            <AcUnitIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Covid" />
        </StyledMenuItem>
  }
        <StyledMenuItem onClick={()=>{setDraw(true)}}>
          <ListItemIcon>
            <EventIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{setwDraw(true)}}>
          <ListItemIcon>
            <CloudIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Weather" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{setIsOpen(true);
                                  setFeedback(true);}}>
          <ListItemIcon>
            <FeedbackIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{setInstOpen(true)}}>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Page of Instructions" />
        </StyledMenuItem>
      </StyledMenu>
      {redirect?
      <React.Fragment>
         <Modal isOpen={isOpen} showFeedback={feedback} setFeedback={setFeedback} setIsOpen={setIsOpen} />
         <Covid />
      </React.Fragment>
      :
      <React.Fragment>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
          </div>
        ) : 
        <div className="home-7">
        <FormControl style={{marginTop:'30px'}} className={classes.formControl}>
          <InputLabel id="demo-customized-select-label">News Type</InputLabel>
          <Select
            onChange={(value)=>{setType(value.target.value);}}
          >
            <MenuItem value="Categories">Categories</MenuItem>
            <MenuItem value="Terms">Terms</MenuItem>
            <MenuItem value="Sources">Sources</MenuItem>
          </Select>
          </FormControl>
          <FormControl>
          <TextField
            style={{marginTop:'20px'}}
            id="outlined-name"
            label="Search News"
            value={name}
            placeholder="Enter Source"
            onChange={(value)=>setName(value.target.value)}
            variant="outlined"
          />
          </FormControl>
          <Button style={{marginTop:'30px',marginLeft:'10px',backgroundColor:'black',color:'white'}} variant="contained"
          onClick={dataFetch}>Fetch News</Button>
        </div>}
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} showFeedback={feedback} setFeedback={setFeedback} setIsOpen={setIsOpen} />
      </React.Fragment>
      }
      <Instructions isInstOpen={isInstOpen} setInstOpen={setInstOpen} />
      <Drawer
            open={draw}
            onClose={()=>{setDraw(false)}}>
              <React.Fragment>
              <DialogTitle >
              <p className="title" style={{fontFamily:'AvenirNext DemiBold',fontSize:'20px',marginLeft:'140px'}}>Calendar 
                <IconButton style={{marginRight:'5px'}} onClick={()=>{setDraw(false)}}>
                  <CancelIcon />
                </IconButton></p>
              </DialogTitle>
              <Calendar />
              </React.Fragment>
        </Drawer>
        <Drawer
            open={wdraw}
            onClose={()=>{setwDraw(false)}}>
            <React.Fragment>
            <DialogTitle >
              <p className="title" style={{fontFamily:'AvenirNext DemiBold',fontSize:'20px',marginLeft:'140px'}}>Weather 
                <IconButton style={{marginRight:'5px'}} onClick={()=>{setwDraw(false)}}>
                  <CancelIcon />
                </IconButton></p>
              </DialogTitle>
              <Weather />
            </React.Fragment>
        </Drawer>
    </div>
  );
};

export default Home;