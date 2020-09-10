import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import "../../join/Form.css"
import {Link} from "react-router-dom"

import {
  SelectInput,
} from "../../join/JoinForm";

import {
  ONBOARD_DEFAULT,
  ALL_TIMEZONES,
  shiftToTimezone,
  addOffset
} from "./OnboardFormUtil";

const getFormattedString = function(dayName, hours, mins) {
  console.log(dayName, hours, mins)
    if(mins == 0) {
      // special case for midnight
      if(hours == 0) {
        return dayName + ', Midnight'
      }
      if(hours == 12) {
        return dayName + ', Noon'
      }
      // special case for noon
      var suffix = 'am'
      if(hours >12) {
        suffix = 'pm'
        hours -= 12
      }
      return dayName + ', ' + hours + suffix
    }
    if(mins == 30) {
      // special case for noon
      var suffix = 'am'
      if(hours == 0) {
        return dayName + ', ' + '12:30am (just after Midnight)'
      } else if(hours == 12) {
        return dayName + ', ' + '12:30pm (just after Noon)'
      } else if(hours >=12) {
        suffix = 'pm'
        hours -= 12
      }
      return dayName + ', ' + hours+':30' + suffix
    }
  }

  // get the label for the ith option given user is in timeZoneStr (eg "UTC+4:00")
  const getOptionLabel = function(timeZoneStr, i) {
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    let time = new Date(2020,3,15,16 + i,0); // sections start at 4pm on Wednesday
    console.log(i, time)
    let shiftedTime = shiftToTimezone(time, 'UTC-7:00', timeZoneStr)

    let dayName = days[shiftedTime.getDay()]
    let hours = shiftedTime.getHours()
    let mins = shiftedTime.getMinutes()

    return getFormattedString(dayName, hours, mins)
  }

class TranslatedTimes extends React.Component {
  render() {
    let tz = this.props.timeZone
    let i = this.props.sectionTimeIndex
    let timeZones = [
      {city:'San Francisco', timeZone:'UTC-7:00'},
      {city:'New York', timeZone:'UTC-4:00'},
      {city:'London', timeZone:'UTC+1:00'},
      {city:'Istanbul', timeZone:'UTC+3:00'},
      {city:'Singapore', timeZone:'UTC+8:00'},
    ]
    const listItems = timeZones.map((value) =>
      <li key={value}>
        {value['city']}: {getOptionLabel(value['timeZone'], i)}
      </li>
    );
    return (
      <div className="card mb-5">
        <div className="card-body">
          <p>In case you are curious. Here is the local time of your section in different cities:</p>
          <ul>
          {listItems}
          <li>Your timezone: {getOptionLabel(tz, i)}</li>
          </ul>
        </div>
      </div>
    )
  }

}

class OnboardForm extends React.Component {
  constructor(props) {
    super(props);
  }





  render() {
    let initValues = ONBOARD_DEFAULT;
    for(var key in ONBOARD_DEFAULT) {
      if(key in this.props.slAboutData) {
        initValues[key] = this.props.slAboutData[key]
      }
    }

    return (
      <div>
        <h5>Section times</h5>
        <p className="mb-5">You will teach a 40 minute section once a week for 5 weeks. Your first section will be the week of April 13th, and your last section will be the week of May 11th. Sections are during the week between the "Wednesday" class and the "Friday" class. Once students are assigned to your section it is very hard to change. You can chose any time in this window that works for you -- and we will put students in your section for you.</p>
        <Formik
            initialValues={initValues}
          validationSchema={Yup.object({
            sectionTime: Yup.string().required("Required"),
            userTimezone: Yup.string().required("Required")
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.props.onSubmit(values)
          }}
        >
          {({ errors, touched, validateField, validateForm }) => (
            <Form style={{ width: "100%" }}>
              <SelectInput
                  label="First, verify your current timezone"
                  name="userTimezone"
                  value={this.props.slAboutData.userTimezone}
                  description={
                    `We believe that your current time zone is ${this.props.slAboutData.userTimezone}.
                     If this is incorrect (which may be the case if you live in parts of
                     India, New Zealand, Canada or other countries that use half hour offsets)
                     or if you've recently changed time zones, you can manually adjust your time zone below. If no time works for you, please email codeinplace-sl@cs.stanford.edu`}
                  onChange={this.props.handleTimezoneChange}>
                  {
                      ALL_TIMEZONES.map(tz => (
                          <option>{tz}</option>
                      ))
                  }
              </SelectInput>

              <SelectInput
                label="Then, choose a time for your section!"
                name="sectionTime"
                description={
                (<span>Please select a single section time that you can commit to for the next
                 five weeks. Each section runs for 40 minutes. Note that all times refer
                 to your <b>current time zone</b> ({this.props.slAboutData.userTimezone}).</span>)}
                onChange={this.props.handleSectionChange}>
              >
                <option value="">Please select a time</option>
                {
                  Array.from(Array(46).keys())
                    .map(i => (
                      <option value={i}>{getOptionLabel(this.props.slAboutData.userTimezone, i)}</option>
                    )
                  )
                }
              </SelectInput>

              <TranslatedTimes
                timeZone = {this.props.slAboutData.userTimezone}
                sectionTimeIndex = {this.props.slAboutData.sectionTime}
              />


              <Button
                className="btn btn-primary"
                type="submit"
                disabled={Object.keys(errors).length !== 0}
              >
                Save
              </Button>

              <Link className="btn btn-secondary ml-2" to="/sl/splash" >Back</Link>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default OnboardForm;
