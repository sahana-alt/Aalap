import React, { useState } from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import window from 'global'
import Button from '@material-ui/core/Button';

const localizer = momentLocalizer(moment)

var gapi = window.gapi

var CLIENT_ID = "128547648452-u0pb5agtjkjll86he4gs6gkro26gembs.apps.googleusercontent.com"
var API_KEY = "AIzaSyAmqvhTFRRsYUt_2fNR6DMDgQavxTWihVw"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.events"

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      authDisplay: 'block',
      signoutDisplay: 'none',
      visible:true,
    }

  }
  componentDidMount() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          console.log('heree')
          this.setEvents()

          // getEvents((events) => {
          //   console.log('FROM GCAL ', events)
          //   this.setState({ events })
          // })
        }
      })
    });
  }

  handleClick = () => {

    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      return alert('You have to be logged in to add events')
    }
    var event = {
      'summary': 'Awesome Event!',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'Really great refreshments',
      'start': {
        'dateTime': '2021-02-11T10:30:00',
        'timeZone': 'Asia/Kolkata'
      },
      'end': {
        'dateTime': '2021-02-11T11:00:00',
        'timeZone': 'Asia/Kolkata'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=1'
      ],
      'attendees': [
        { 'email': 'sumukhvirat18@gmail.com' },
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          { 'method': 'email', 'minutes': 15 },
          { 'method': 'popup', 'minutes': 10 }
        ]
      }
    }

    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event,
    })

    request.execute(() => {
      this.setEvents()
    })
    


  }

  handleSignin = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      this.setEvents();
    });

  }
  handleSignout = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      this.setState({ events: [] })
    });

  }
  updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      this.setState({ authDisplay: 'none', signoutDisplay: 'inline-block' })

    } else {
      this.setState({ authDisplay: 'inline-block', signoutDisplay: 'none' })
    }
  }
  setEvents = () => {
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'showDeleted': false,
      //'maxResults': 100,
      //'timeMin' : (new Date("2020-07-01T21:00:00")).toISOString(),

      'orderBy': 'updated'
    }).then((response) => {
      const events = []
      response.result.items.map((event) => {
        let start, end
        if (event.start.date) {
          start = new Date(event.start.date)
        }
        else {
          start = new Date(event.start.dateTime)
        }
        if (event.end.date) {
          end = new Date(event.start.date)
        }
        else {
          end = new Date(event.end.dateTime)
        }

        events.push({
          start,
          end,
          title: event.summary,
        })
      })
      console.log('FROM GAPI',events)
      this.setState({events})

    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
        <div style={{ width: '90%',marginLeft:'20px' }}>
        <div className="widgetPage calendarWidget" style={{ height: '600px' }}>
          <Calendar
            unbordered
            localizer={localizer}
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            className="widget"
            style={{marginLeft:'5px'}}
          />
          <div style={{marginTop:'20px',marginLeft:'80px'}}>
              <Button style={{backgroundColor:'#3174ad',color:'white'}} onClick={this.handleClick.bind(this)}>
                Add Event
              </Button>
              <Button  style={{ display: `${this.state.authDisplay}`,backgroundColor:'#3174ad',color:'white',marginLeft:'20px' }} onClick={this.handleSignin.bind(this)}>
                Sign in
              </Button>
              <Button style={{ display: `${this.state.signoutDisplay}`,backgroundColor:'#3174ad',color:'white',marginLeft:'20px' }} onClick={this.handleSignout.bind(this)}>
                Sign out
          </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyCalendar;