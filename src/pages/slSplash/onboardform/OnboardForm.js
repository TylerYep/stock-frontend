import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import * as Timezones from "city-timezones";
import "../../join/Form.css"
import {Link} from "react-router-dom"
import { Autocomplete } from 'react-formik-ui';

import {
  TextInput,
  SelectInput,
  MultipleCheckbox,
  AgreeCheckbox,
  Checkbox,
  DescriptionField
} from "../../join/JoinForm";

const DEFAULT = {
    nickname: '',
    sectionTime: '',
    alternateTime: '',
    city: '',
    agreeStandard: '',
    agreeTerms: '',
    signature: '',
  }

const CITIES = Timezones.cityMapping.map((entry) => {
  var cityString = entry.city + ", ";
  cityString += entry.province + ", ";
  cityString += entry.country;
  return cityString;
});

class OnboardForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let initValues = DEFAULT;
    for(var key in DEFAULT) {
      if(key in this.props.slAboutData) {
        initValues[key] = this.props.slAboutData[key]
      }
    }

    return (
      <div>
        <Formik
            initialValues={initValues}
          validationSchema={Yup.object({
            nickname: Yup.string().required("Required"),
            
          })}
          onSubmit={(values, { setSubmitting }) => {
            // get timezone from city
            var timezone;
            try {
              const matchedTimezones = Timezones.findFromCityStateProvince(values.city);
              timezone = matchedTimezones[0].timezone;
            } catch (e) {
              // TODO: display error. Could swal?

              //Couldn't find a valid timezone, we should prevent them from submitting
            }
            const newValues = {...values, timezone: timezone}
            this.props.onSubmit(newValues)
          }}
        >
          {({ errors, touched, validateField, validateForm }) => (
            <Form style={{ width: "100%" }}>
              <TextInput
                label="How would you like your name to be displayed to students? (We recommend displaying first name and first letter of your last name.)"
                name="nickname"
                type="text"
                placeholder="Jane D."
              />
              <h3>Expectations for section leaders</h3>
              <p>blurb</p>

              

              <TextInput
                label="Please sign your name to confirm your above responses:"
                name="signature"
                type="text"
              />

              {Object.keys(errors).length !== 0 ? (
                <div style={{ color: "red" }}>
                  Please fix invalid entries above.{" "}
                </div>
              ) : null}

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
