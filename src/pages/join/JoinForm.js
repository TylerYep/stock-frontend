/* tslint:disable */

import React from "react";
import firebase from "firebase";
// import Form from 'react-bootstrap/Form'

import { Formik, Field, Form, ErrorMessage, useFormik, FormikHelpers, useField } from 'formik';
import * as Yup from 'yup';

import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Form.css"


export const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    let description = props.description ? props.description : ""
    let descriptionDiv = description == "" ? <span /> : <div className="description">{description}</div>
    return (
        <div className="question-spacing">
            <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
            {descriptionDiv}

            <input className="text-input" {...field} {...props} />
            {meta.error ? (
                <div className="error">{meta.error}</div>
             ) : null}
        </div>
    );
};

const TextAreaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="question-spacing">
            <label className="form-label"  htmlFor={props.id || props.name}>{label}</label>
            <div style={{color: 'gray', marginBottom: '0.6rem'}}>{props.description ? props.description : ""}</div>

            <Field className='text-area-input' as="textarea" rows="10" {...field} {...props}/>
            {meta.error ? (
                <div className="error">{meta.error}</div>
             ) : null}
        </div>
    );
};
// <p>

export const DescriptionField = ({label, ...props}) => {
  let description = props.description ? props.description : ""
  let descriptionDiv = description == "" ? <span /> : <div className="description">{description}</div>
  return (
      <div>
          <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
          {descriptionDiv}
      </div>
  );
};

export const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "select" });

  return (
    <div className="question-spacing">
      <label className="form-label"  htmlFor={props.id || props.name}>{label}</label>
       <div className="description">{props.description ? props.description : ""}</div>


       <Field as="select" className="select-input" {...field} {...props}>
       {props.children}
       </Field>
      {meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

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

export const AgreeCheckbox = (props) => {
  const [field, meta] = useField({ ...props});
  return (
    <div className="question-spacing">
      <label className="form-label" >{props.label}</label>
      <div style={{color: 'gray', marginBottom: '0.6rem'}}>{props.description ? props.description : ""}</div>

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


const DEFAULT = {
  about_yourself: '',
  age: '',
  agree_honourable: '',
  agree_one_submission: '',
  availTime: '',
  city: '',
  country: '',
  disabilities: '',
  diversity: '',
  gender: '',
  intend_to_complete: '',
  interest: '',
  language: '',
  name: '',
  occupation: '',
  prevExperience: '',
  timezone: ''
}

export class JoinForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.title = "About me";
  }

  render() {
    let initValues = DEFAULT
    for(var key in DEFAULT) {
      if(key in this.props.aboutData) {
        initValues[key] = this.props.aboutData[key]
      }
    }
      return (
        <Formik
          initialValues={initValues}
             validationSchema={
                Yup.object({
                  about_yourself: Yup.string()
                    .required('Required'),
                  age: Yup.string()
                    .required('Required'),
                  agree_honourable: Yup.string()
                    .required('Required'),
                  agree_one_submission: Yup.string()
                    .required('Required'),
                  availTime: Yup.string()
                    .required('Required'),
                  city: Yup.string()
                    .required('Required'),
                  country: Yup.string()
                    .required('Required'),
                  disabilities: Yup.string(),
                  diversity: Yup.string(),
                  gender: Yup.string()
                    .required('Required'),
                  intend_to_complete: Yup.string()
                    .required('Required'),
                  interest: Yup.string(),
                  language: Yup.string()
                    .required('Required'),
                  name: Yup.string()
                    .required('Required'),
                  occupation: Yup.string()
                    .required('Required'),
                  prevExperience: Yup.string(),
                  timezone: Yup.string()
                    .required('Required')
              })}
          onSubmit={this.props.onSubmit}
        >
        {({ errors, touched, validateField, validateForm }) => (
            <Form style={{width: '100%'}}>
                <TextInput
                    label="What is your preferred name?"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                />

                <MultipleCheckbox name="interest" label="Why are you interested in taking this class?">
                    <Checkbox name="interest" value="learn" label="I would like to learn intro-to-programming in python" />
                    <Checkbox name="interest" value="community" label="I want to be part of a community of other students who are also learning" />
                    <Checkbox name="interest" value="section_leader" label="I want to have a section leader who I meet with once a week" />
                    <Checkbox name="interest" value="fun" label="For fun and enlightenment" />
                    <Checkbox name="interest" value="heard_of_106a" label="I have heard that CS106A has a fun + useful teaching style" />
                    <Checkbox name="interest" value="job" label="I want to get a job as a programmer" />
                    <Checkbox name="interest" value="new_experiment" label="I want to be part of a new experiment in online-learning" />
                    {/*<Checkbox name="interest" value="other" label="Other" />*/}
                </MultipleCheckbox>

                <SelectInput label="Gender" name="gender">
                    <option value=""></option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-binary</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                </SelectInput>

                <SelectInput label="Age" name="age">
                  <option value=""></option>
                  <option>&lt; 18 years old</option>
                  <option>18-21</option>
                  <option>22-25</option>
                  <option>26-30</option>
                  <option>31-35</option>
                  <option>36-40</option>
                  <option>40+</option>
                </SelectInput>

                <TextInput
                    label="What country are you in?"
                    name="country"
                    type="text"
                    placeholder="USA"
                />

                <TextInput
                    label="What city are you in?"
                    name="city"
                    type="text"
                    placeholder="New York City"
                />

                <SelectInput
                  label="Timezone"
                  name="timezone"
                  description = 'To find this value, you can Google "my timezone" and report the number to the right of either GMT or UTC. As an example, Stanford is in Pacific Daylight Time currently, which is UTC-7, so if you were currently at Stanford, you would answer UTC -7 to this question.'
                >
                  <option value=""></option>
                {
                    Array.from(Array(27).keys())
                          .map(i => i-12)
                          .map(i => <option>{`UTC ${i > 0 ? '+' : ''}${i}`}</option>)
                }

                </SelectInput>

                <SelectInput label="How much time will you have for this course?" name="availTime">
                    <option value=""></option>
                    <option>&lt; 5 hours per week</option>
                    <option>5-10 hours per week</option>
                    <option>10-20 hours per week</option>
                    <option>20+ hours per week</option>
                </SelectInput>

                <AgreeCheckbox name="intend_to_complete" label="If accepted, I intend to complete this five week course">
                    <Checkbox name="intend_to_complete" value="yes" label="Yes" />
                </AgreeCheckbox>

                <TextInput
                    label="Current Occupation"
                    name="occupation"
                    type="text"
                    placeholder="e.g. Community College Student, Retired Landscaper, Fire-fighter, etc"
                />



                <MultipleCheckbox description="We will do everything we can to be accommodating. This will in no way impact whether you are accepted. If you have other disabilities which you want us to know about send us an email" name="disabilities" label="Any disabilities that we should know about?">
                    <Checkbox name="disabilities" value="blind" label="I am legally blind, or have significant visual impairment" />
                    <Checkbox name="disabilities" value="deaf" label="I am legally deaf, or am significantly hard or hearing" />
                    {/*<Checkbox name="disabilities" value="other" label="Other" />*/}
                </MultipleCheckbox>

                 <MultipleCheckbox description="Code in Place is intended for beginners" label="How much coding experience do you have?" name="prevExperience">
                    <Checkbox name="prevExperience" value="neverProgrammed" label="I have never coded before" />
                    <Checkbox name="prevExperience" value="programmingCourse" label="I have taken a coding course" />
                    <Checkbox name="prevExperience" value="lotsOfCoding" label="I have more than 20 hours of experience coding" />
                    <Checkbox name="prevExperience" value="badClass" label="I have tried to learn before, but don't feel I understand how to code" />
                    {/*<Checkbox name="disabilities" value="other" label="Other" />*/}
                </MultipleCheckbox>

                {/*<SelectInput label="How much programming experience do you have?" name="prevExperience">
                    <option value=""></option>
                    <option>I have never programmed before</option>
                    <option>I have taken a programming course</option>
                    <option>I have programmed for 20 hours or more</option>
                    <option>I have tried to learn before, but don't feel I understand how to code</option>

                </SelectInput>*/}


                <TextInput
                    label="What is your preferred language for section?"
                    name="language"
                    type="text"
                    placeholder="The course materials will be in English, but section can be non-English"
                />

                <AgreeCheckbox
                  description="It is fine to discuss general strategies with others or to look up syntax information online, but you may not copy any code from any other person or from online sources outside of the course materials."
                  name="agree_honourable"
                  label="I promise to uphold my honor as a student and not to take unfair advantage of any other member of the community. All the work I submit will be my own.  ">
                    <Checkbox name="agree_honourable" value="yes" label="Yes" />
                </AgreeCheckbox>

                <AgreeCheckbox
                  description="Only one submission per person. Thanks!"
                  name="agree_one_submission"
                  label="I promise to only make one submission.">
                    <Checkbox name="agree_one_submission" value="yes" label="Yes" />
                </AgreeCheckbox>


                <TextAreaInput
                    label="Tell us a little about yourself:"
                    name="about_yourself"
                    description="Anything goes. What do you do for fun? Want to tell us a quick anecdote about something that makes you unique—a talent, an unusual experience, or anything of that sort?"
                />


                <TextAreaInput
                    label="We value having a diverse learning community so we can all learn from each other. What background and experiences would you bring to our online classroom?"
                    name="diversity"
                    description="Everyone is welcome here!"
                />

                {
                  Object.keys(errors).length !== 0 ?
                  <div style={{color: "red"}}>Please fix invalid entries above. </div> :
                  null
                }

                <Button className="btn btn-primary" type='submit' disabled={Object.keys(errors).length !== 0}>Save</Button>

              {

                // <Button className="btn btn-success" onClick={() => validateForm().then((e) => {
                //   console.log(e);
                // })}>Val</Button>

              }
                <a href="#/"className="btn btn-secondary ml-2" >Back</a>
            </Form>
          )}
        </Formik>
      );
    }


};
