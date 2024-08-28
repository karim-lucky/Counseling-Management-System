"use client";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from "react-toastify";
import "./addConselling.css"

import { useRouter } from "next/navigation";

export default function CounsellingDetail() {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
  let router = useRouter();

  const users = [{ fullName: "ali" }, { fullName: "karim" }, { fullName: "altaf" }];


  const onSubmit = (data) => {

    console.log(data);
    if (data) {
      axios.post("api/counsellingApi", data).then(function (resp) {
        console.log("theis is datddddddddddddddddddddddddddddddd")
        console.log(resp.data)
      })
      toast.success("data save successfull")
    }


  };


  //used to refresh all the input and select-option of from
  const handleRefresh = () => {
    reset({
      clientSelect: '',
      clientNameAerobic: '',
      clientNameEnglish: '',
      emailAddress: '',
      phoneNumber: '',
      legalForm: '',
      address: '',
      consultationTitle: '',
      consultingType: '',
      consultingPeriod: '',
      consultationDate: '',
      consultingMethod: '',
      counsel: '',
      consultationTime: ''
    });
    // Reset PhoneInput manually
    setValue('phoneNumber', '');
  };


  const [activeTab, setActiveTab] = useState('The Case Facts');

  return (
    <div className="mainDiv"  >
      <div className="d-flex justify-content-end bg-white rounded upperDiv" >
        <div className="me-3"><button type="button" className="btn" onClick={handleSubmit(onSubmit)}><i class="fa-solid fa-user-plus me-1"></i>Add</button></div>
        <div className="me-3"><button className="btn" onClick={handleRefresh}><i class="fa-solid fa-arrows-rotate me-1"></i> Refresh</button></div>
        <div className="me-2"> <button className="btn" onClick={() => { router.push("/consulttantShow/") }}> <b><i class="fa-solid fa-arrow-left me-1 "></i></b> All-consulting</button></div>
      </div>
      <div className="row mt-4 d-flex ConsultingForm" >
        <div className="col-lg-4 col-md-4 col-sm-12 bg-white rounded pt-3 leftForm"  >
          <div className="rounded">
            <form>
              <label><b>Customer Details</b></label>
              <div className="myBorder">
                <label><b>Register Client</b></label>
                <div>
                  <select className="form-select" {...register("clientSelect", { required: true })}>
                    <option value="select..">Select</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  {errors.clientSelect && <div className="error" > required</div>}
                </div>
                <div>
                  <label><b>OR</b></label>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="nameStyle"  >
                      <span><b>Client Name</b><br /><i>Aerobic Language</i></span><span className="star ms-2">*</span>
                    </div>
                    <input
                      className="form-control"
                      {...register("clientNameAerobic", { required: true })}
                    />
                    {errors.clientNameAerobic && <div className="error" > required</div>}

                    <div  className="nameStyle">
                      <span><b>Client Name</b><br /><i>English Language</i></span><span className="star ms-2">*</span>
                    </div>
                    <input
                      className="form-control"
                      {...register("clientNameEnglish", { required: true })}
                    />
                    {errors.clientNameEnglish && <div  className="error"> required</div>}
                    <div>
                      <b><label>Email Address</label></b><span className="star ms-2">*</span>
                      <input
                        className="form-control"
                        {...register("emailAddress",{required:true} ,{
                          required: 'Email Address is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                      />
                      {errors.emailAddress && <div  className="error"> required</div>}
                    </div>
                  </div>
                  <div className="col-6">
                    <div>
                      <b><label>Phone Number</label></b><span className="star ms-2">*</span>
                      <PhoneInput
                        country={'us'}
                        inputStyle={{ width: '100%' }}
                        onChange={(phone) => setValue('phoneNumber', phone)}
                      />
                      {errors.phoneNumber && <div  className="error"> required</div>}
                    </div>
                    <div>
                      <label><b>Legal Form</b></label><span className="star ms-2">*</span>
                      <select className="form-select" {...register("legalForm",{required:true})}>
                        <option value="">Select Legal Form</option>
                        <option value="1">Form 1</option>
                        <option value="2">Form 2</option>
                      </select>
                      {errors.legalForm && <div  className="error"> required</div>}
                    </div>
                    <div>
                      <b><label>Address</label></b><span className="star ms-2">*</span>
                      <input
                        className="form-control"
                        {...register("address", { required: true })}
                      />
                      {errors.address && <div  className="error"> required</div>}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-7 col-md-7 col-sm-12 rightForm">
          <div className="row rounded bg-white">
            <form className="p-3">
              <div>
                <label><b>Counselling Detail</b></label>
              </div>
              <div className="row myBorder"  >
                <div className="col-md-8">
                  <div>
                    <b><label>Consultation Title</label></b><span className="star ms-2">*</span>
                    <input
                      className="form-control"
                      {...register("consultationTitle", { required: true })}
                    />
                    {errors.consultationTitle && <div  className="error"> required</div>}
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div>
                        <label><b>Consulting Type</b></label><span className="star ms-2">*</span>
                        <select className="form-select" {...register("consultingType", { required: true })}>
                          <option value="">Select...</option>
                          <option value="Type 1">Type 1</option>
                          <option value="Type 2">Type 2</option>
                          <option value="Type 3">Type 3</option>
                        </select>
                        {errors.consultingType && <div  className="error"> required</div>}
                      </div>
                      <div>
                        <label><b>Consulting Period</b></label><span className="star ms-2">*</span>
                        <select className="form-select" {...register("consultingPeriod", { required: true })}>
                          <option value="">Select...</option>
                          <option value="Period 1">Period 1</option>
                          <option value="Period 2">Period 2</option>
                          <option value="Period 3">Period 3</option>
                        </select>
                        {errors.consultingPeriod && <div  className="error"> required</div>}
                      </div>
                    </div>
                    <div className="col-6">
                      <div>
                        <b><label>Consultation Date</label></b><span className="star ms-2">*</span>
                        <input
                          type="date"
                          className="form-control"
                          {...register("consultationDate", { required: true })}
                        />
                        {errors.consultationDate && <div  className="error"> required</div>}
                      </div>
                      <div>
                        <label><b>Consulting Method</b></label><span className="star ms-2">*</span>
                        <select className="form-select" {...register("consultingMethod", { required: true })}>
                          <option value="">Select...</option>
                          <option value="Method 1">Method 1</option>
                          <option value="Method 2">Method 2</option>
                          <option value="Method 3">Method 2</option>
                        </select>
                        {errors.consultingMethod && <div  className="error"> required</div>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <label><b>Counsals</b></label><span className="star ms-2">*</span>
                    <select className="form-select" {...register("counsel", { required: true })}>
                      <option value="">Select...</option>
                      {users.map((option, index) => (
                        <option key={index} value={option.fullName}>{option.fullName}</option>
                      ))}
                    </select>
                    {errors.counsel && <div  className="error"> required</div>}
                  </div>
                  <div>
                    <b><label>Consultation Time</label></b><span className="star ms-2">*</span>
                    <input
                    type="time"
                      className="form-control"
                      {...register("consultationTime", { required: true })}
                    />
                    {errors.consultationTime && <div  className="error"> required</div>}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="row rounded mt-4 pt-4 bg-white">
            <div>
              <>
                {/* Tabs navs */}
                <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'The Case Facts' ? 'active' : ''}`}
                      id="tab-The Case Facts"
                      type="button"
                      role="tab"
                      onClick={() => setActiveTab('The Case Facts')}
                    >
                      The Case Facts
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'The Counseling' ? 'active' : ''}`}
                      id="tab-The Counseling"
                      type="button"
                      role="tab"
                      onClick={() => setActiveTab('The Counseling')}
                    >
                      The Counseling
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'File Attachment' ? 'active' : ''}`}
                      id="tab-File Attachment"
                      type="button"
                      role="tab"
                      onClick={() => setActiveTab('File Attachment')}
                    >
                      File Attachment
                    </button>
                  </li>
                </ul>
                <div className="d-flex justify-content-end gap-3"  >

                  <div><b>أدخل رقم هاتفك</b></div>
                  <div><b>English Language</b></div>
                </div>
                {/* Tabs content */}
                <div className="myBorder">
                <div className="tab-content" id="ex1-content">
                  <div
                    className={`tab-pane fade ${activeTab === 'The Case Facts' ? 'show active' : ''}`}
                    id="tab-The Case Facts"
                    role="tabpanel"
                  >
                    <textarea
                      className="form-control mytextArea"
                         {...register("caseFacts")}
                      placeholder="The Case Facts..."
                    ></textarea>

                  </div>
                  <div
                    className={`tab-pane fade ${activeTab === 'The Counseling' ? 'show active' : ''}`}
                    id="tab-The Counseling"
                    role="tabpanel"
                  >
                   <textarea
                      className="form-control mytextArea"
                      {...register("theCounselingFact")}
                      placeholder="The Counselling detail..."
                    ></textarea>
                  </div>
                  <div
                    className={`tab-pane fade ${activeTab === 'File Attachment' ? 'show active' : ''}`}
                    id="tab-File Attachment"
                    role="tabpanel"
                  >
                     <textarea
                      {...register("theFileAttachment")}
                     
                      className="form-control mytextArea"
                     
                      placeholder="Enter your text here..."
                    ></textarea>
                    {/* File Attachment content */}
                  </div>
                </div>
                </div>
                
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
