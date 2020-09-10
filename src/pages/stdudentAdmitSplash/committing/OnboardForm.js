import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import * as Timezones from "city-timezones";
import "../../join/Form.css"
import {Link} from "react-router-dom"
import { Autocomplete } from 'react-formik-ui';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faThLarge, faFile, faCalendar, faEnvelope, faVideo, faBook, faAppleAlt } from '@fortawesome/free-solid-svg-icons'


import {
  TextInput,
  SelectInput,
  MultipleCheckbox,
  AgreeCheckbox,
  Checkbox,
  DescriptionField
} from "../../join/JoinForm";

const escapeStringRegexp = require('escape-string-regexp');


const DEFAULT = {
    signature1: ''
 }


const CODE_OF_CONDUCT_URL = 'https://compedu.stanford.edu/codeinplace/handouts/CodeOfConduct.pdf'
const HODE_HARMLESS_URL = 'https://compedu.stanford.edu/codeinplace/handouts/HoldHarmless.pdf'

const SignatureInput = ({href, name, label, required_name}) => {
  return (
    <TextInput
        name={name}
        placeholder={required_name}
        type="text"
      />

  )
}

class OnboardForm extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const required_name = this.props.displayName;
    const name_regex = escapeStringRegexp(required_name);

    let initValues = DEFAULT;
    for(var key in DEFAULT) {
      if(key in this.props.slAboutData) {
        initValues[key] = this.props.slAboutData[key]
      }
    }

    return (
      <div>
        <h1>Committing to the class</h1>
        <p>We are very excited to have you in the class. The Code in Place teaching team chose you because we believe that you
        have what it takes to complete this short, but intensive, course. Before you join the class, read over these intentions:</p>


        <p>If you can join, great! Class starts Monday and the first section is later in the week. If you don't have time right now, that is fine!
        </p>
        <p>We also know that its a really difficult time for folks (that is why we are doing this in the first place) and as such circumstances could change. We hope you and your loved ones are well and we hope you stay well.
        As such these are "intentions" given what we know now.
        </p>


        <h3>Your intentions:</h3>
        <ol>
          <li>Attend an online discussion section, once a week, with a small group lead by a section leader.</li>
          <li>Notify the course admin, and my section leader, as soon as possible if I am not able to attend my section due to an unexpected circumstance.</li>
          <li>Work a minimum of <b>15 hours</b> a week on the course.</li>
          </ol>

        <h3>Our intentions:</h3>
        <ol>
          <li>You will be assigned a volunteer section leader will teach you once a week in a small group. Our volunteers come from many universities and institutions.
           All volunteers applied by recording a teaching demo and solving some hard programming puzzles. These videos were then watched by someone the from Stanford CS106A teaching staff who was impressed by their teaching ability.</li>
          <li>We will give you access to lectures, assignments and will give you access to a class discussion board.</li>

          <li>You won't receive a grade in the course, and completing the experience doesn't earn university credit. Instead, the main outcome is that you will have acquired a new and wonderful skill: how to program.</li>

          </ol>

        <h3>Let's do this:</h3>




        <Formik
            initialValues={initValues}
          validationSchema={Yup.object({
            signature1: Yup.string()
                           .matches(name_regex, `Signature must match your full name: ${required_name}`)
                           .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.props.onSubmit(values)
          }}
        >
          {({ errors, touched, validateField, validateForm }) => (
            <Form style={{ width: "100%" }}>



              <p>By typing my name below I acknowledge that I have read and agreed to the intentions. </p>

              <SignatureInput
                name="signature1"
                label="Code of Conduct"
                href={CODE_OF_CONDUCT_URL}
                type="text"
                required_name={required_name}
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
                Submit
              </Button>
              <Link
                className="btn btn-secondary ml-2"
                to="/admitted"
              >
               Back
              </Link>

            </Form>
          )}
        </Formik>
      </div>
    );
  }

  renderText() {
    return (
      <div className="contract">
        <h3 className="mt-1">Volunteer Liability Waiver and Agreement </h3>
        <p>
          The parties to this Agreement are the Board of Trustees of the Leland Stanford Junior University, its officers, trustees, faculty, agents, representatives, students and employees (collectively referred to hereafter as "Stanford”) and me.  I have been selected and have agreed to act as a volunteer Section Leader for Stanford’s Code in Place Program (the “Program”).  By signing below, I, the Volunteer, agree to the below terms and conditions (the “Agreement”):

        </p>
        <h4>Volunteer Obligations</h4>
        <p>
          <ul>
          <li>I agree to teach five 40 minute long sections at my section time, once a week between April 13th, 2020 and May 15th, 2020.</li>
<li>I agree to prepare for each section in advance for at least 20 minutes.</li>
<li>I agree to participate in section training sessions as may be required by the Program instructor, which will not exceed three hours in duration.
</li>
<li>I agree to notify the Program instructor as soon as possible if I am not able to teach my section due to an unexpected emergency.
</li>
</ul>
</p>
        <h4>Policies and Safety Rules</h4>
        <p>For my well being, safety, and security and that of others, including without limitation Program participants, I will comply with Stanford’s Code in Place Code of Conduct, which you can access <a target="_blank" href={CODE_OF_CONDUCT_URL}>[here]</a> and forms a part of this Agreement , Stanford’s  volunteer policies, safety rules and all other directions Stanford provides for my volunteer activities. If I become aware of any hazardous condition, inappropriate conduct, or danger at a Stanford site or connected to any Program activity, I will alert Stanford as required under the terms of the Code in Place Code of Conduct.
</p>
        <h4>Awareness and Assumption of Risk </h4>
        <p>I understand that the activities for which I am choosing to volunteer have inherent risks that may arise from the activities themselves, my own actions or inactions, or the actions or inactions of Stanford, other volunteers, Program participants, or others involved in the Program. I understand I am responsible for researching and evaluating the risks I may face and am responsible for my actions. Any activities in which I may take part have been undertaken with my understanding and acceptance of any and all risks involved, which include but are not limited to physical or psychological injury, pain, suffering, disfigurement, temporary or permanent disability, economic or emotional loss, property loss or damage, loss of income or career opportunities, and/or death. I understand that these injuries or outcomes may arise from my own or others’ actions, inaction, or negligence.  Nonetheless, I assume all related risks, both known or unknown, whether or not listed above, of my participation in the Program.
</p>
        <h4>Waiver and Release of Claims </h4>
        <p>
          In consideration for my participation in the Program, I, Volunteer, on behalf of myself, my heirs, executors, administrators, employers, agents, representatives, insurers, and attorneys,  hereby waive and release any and all claims against: Stanford, its employees (including the Program instructor(s)) for any liability, loss, damages, claims, expenses and attorneys’ fees resulting from death, or injury to my person or property, caused by or arising directly or indirectly from my participation in the Program, regardless of the cause and even if caused by negligence, whether passive or active. I agree not to sue Stanford and its employees on the basis of these waived and released claims. I waive the protections of Section 1542 of the California Civil Code, which provides that a general release does not extend to certain claims not known to me at the time I signed this waiver and release.
        </p><h4>Indemnification and Limitation of Liability </h4>
        <p>I will defend, indemnify and hold Stanford and its employees harmless from and against any and all liability, loss, damages, claims and attorney’s fees that may be suffered by Stanford resulting directly or indirectly from my Program volunteer activities, except and only to the extent the liability is caused by the gross negligence or willful misconduct of Stanford. Except as otherwise provided by law or for gross negligence or willful misconduct, Stanford and its employees shall not be liable for any expenses, losses, costs, damages, liabilities, or claims (collectively, “Losses”) with respect to any matters related to your participation in the Program. Except as otherwise agreed to in this Agreement, I understand and agree that Stanford and its employees will not be liable to me or to third parties under any circumstances, or have any responsibility whatsoever, for any special, indirect, incidental, punitive, or consequential damages that I may incur in connection with my participation in the Program, breach of this Agreement, or any termination of this Agreement.</p>
        <h4>Confidentiality</h4>
        <p>As a volunteer, I may have access to confidential information, including but not limited to personally identifiable information about Program participants or any work produced by Program participants. At all times during and after my participation, I agree to hold any such confidential information in confidence and not disclose or use it except as specifically authorized by Stanford.</p>
        <h4>Assignment of Work Product </h4>
        <p>If I prepare any work product for Stanford, I intend for Stanford to have full rights to such work product, including brochures, reports, websites, software, presentations, or other materials I create or help to create for Stanford, and any intellectual property rights in or derivatives of such work product. Accordingly, I: (a) assign to Stanford all rights, title, and interest worldwide in the work product; (b) grant to Stanford an irrevocable, royalty-free, perpetual, and worldwide license to any rights in the work product that cannot be assigned to Stanford; and (c) waive enforcement against Stanford of any rights in the work product that cannot be assigned or licensed to Stanford. </p>
        <h4>Volunteer Not an Employee </h4>
        <p>
        I understand that (i) I am not an employee of Stanford, (ii) that I will not be paid for my participation, and (iii) I am not covered by or eligible for any Stanford insurance, health care, worker’s compensation, or other benefits. I may choose at any time not to participate in an activity, or to stop my participation entirely, with Stanford.
</p>
        <h4>General Provisions</h4>
        <p>
        I understand that this agreement will be binding for the duration of my involvement with Stanford’s Program. This agreement, including all attachments, is the final, complete, and exclusive agreement between Stanford and me, and supersedes all prior or contemporaneous communications or understandings, either oral or written. This agreement will be binding to the fullest extent permitted by law. If any provision of this agreement is found to be illegal, invalid or unenforceable, the remaining terms will be effective.

        </p>
        {/*<p>Please see the Privacy Policy [here] for information on how your personal data is used. You acknowledge receipt of the Privacy Policy.
I understand that I may download a pdf copy of this Agreement by clicking [here]. </p>*/}
      </div>
    )
  }
}

export default OnboardForm;
