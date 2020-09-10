import React from "react";
import { Formik, Field, Form, ErrorMessage, useFormik, FormikHelpers, useField } from 'formik';
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
  // console.log(dayName, hours, mins)
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
    // console.log(i, time)
    let shiftedTime = shiftToTimezone(time, 'UTC-7:00', timeZoneStr)

    let dayName = days[shiftedTime.getDay()]
    let hours = shiftedTime.getHours()
    let mins = shiftedTime.getMinutes()

    return getFormattedString(dayName, hours, mins)
  }

  const getOption = function(timeZoneStr, i){
    return (
      <Checkbox
        name="sectionTimePrefs"
        value={`${i}`}    // so weird that you need a string here...
        label={getOptionLabel(timeZoneStr, i)} />
    )
  }

export const MultipleCheckbox = (props) => {
  // const [field, meta] = useField({ ...props, type: "select" });
  const [field, meta] = useField({ ...props});
  const msg = props.description ? props.description : "Select all that apply"

  return (
    <div className="question-spacing">
      <label  className="form-label" >{props.label}</label>
      <div className="description">{msg}</div>
      {props.children}
      {meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
    </div>
  )
}

export const Checkbox = (props) => {
  const [field, meta] = useField({ ...props});
  return (
    <div className="checkbox">
      <label className="form-label"  >
        <Field type="checkbox" {...props}/>
        {props.label}
      </label>
    </div>
  );
}

class OnboardForm extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let initValues = ONBOARD_DEFAULT;
    for(var key in ONBOARD_DEFAULT) {
      if(key in this.props.savedData) {
        initValues[key] = this.props.savedData[key]
      }
    }

    return (
      <div>
        <p >You will join a 40 minute section, once a week, for 5 weeks.
        Your first section will be the week of April 13th (coming up),
        and your last section will be the week of May 11th.</p>

        <p className="mb-4">Submit your preferences and we will do our best to get you a time that works:</p>
        <Formik
            initialValues={initValues}
          validationSchema={Yup.object({
            sectionTimePrefs: Yup.array().ensure().required("Required").min(3, "Please select at least 3 section times."),
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
                  value={this.props.savedData.userTimezone}

                  description={
                    `Section times will be listed in your local timezone. We believe that your current time zone is ${this.props.savedData.userTimezone}.
                     If this is incorrect (which may be the case if you live in parts of
                     India, New Zealand, Canada or other countries that use half hour offsets)
                     or if you've recently changed time zones, you can manually adjust your time zone below.`}
                     onChange={this.props.handleTimezoneChange}>
                  {
                      ALL_TIMEZONES.map(tz => (
                          <option>{tz}</option>
                      ))
                  }
              </SelectInput>

               <MultipleCheckbox
                name="sectionTimePrefs"
                label="Then, tell us your preferences for a section time"
                description={(<span>Please let us know what times you can make section. Please select at least <b>three</b>, and preferably <b>five</b>. Each section runs for 40 minutes. Note that all times refer
                 to your <b>current time zone</b> ({this.props.savedData.userTimezone}).</span>)}
              >
                {
                  Array.from(Array(46).keys())
                    .map(i =>  getOption(this.props.savedData.userTimezone, i)
                  )
                }


                </MultipleCheckbox>




              <Button
                className="btn btn-primary"
                type="submit"
                disabled={Object.keys(errors).length !== 0}
              >
                Save
              </Button>

              <Link className="btn btn-secondary ml-2" to="/admitted" >Back</Link>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default OnboardForm;
