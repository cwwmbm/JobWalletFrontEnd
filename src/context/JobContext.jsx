import { createContext, useState } from "react";
import { apiURL } from "../config";

export const JobContext = createContext();

import PropTypes from 'prop-types';

export const JobProvider = ({ children }) => {
  
  const [selectedJobID, setSelectedJobID] = useState(null);
  const [all_jobs, setJobs] = useState(null);
  const [updatedJob, setUpdatedJob] = useState(null);

  const selectJob = (jobID) => {
    setSelectedJobID(jobID);
    console.log({jobID})
  }
  
  const updateJobInContext = (job) => {
    setUpdatedJob(job);
  }
  
  const jobDetails = async (jobID) => {
    if (!jobID) return
    const fullURL = `${apiURL}/job_details/${jobID}`
    // const response = await fetch(`http://127.0.0.1:5001/job_details/${jobID}`, { mode: 'cors' })
    const response = await fetch(fullURL, { mode: 'cors' })
    const text = await response.text()
    const data = JSON.parse(text)
    return data
  }
  const fetchJobs = async () => {
    const response = await fetch('http://127.0.0.1:5001/get_all_jobs', { mode: 'cors' })
      const text = await response.text()
      const data = JSON.parse(text.replace(/NaN/g, 'null'))
      setJobs(data)
      return data
  }
  const generateCoverLetter = async (jobID) => {
    console.log("Generating cover letter for: " + jobID)
    const response = await fetch(apiURL + 'get_CoverLetter/' + jobID, { method: 'POST' })
    const text = await response.text()
    const data = JSON.parse(text)
    // console.log(data)
    return data.cover_letter
  }
  const generateResume = async (jobID) => {
    console.log("Generating resume for: " + jobID)
    const response = await fetch(apiURL + 'get_resume/' + jobID, { method: 'POST' })
    const text = await response.text()
    const data = JSON.parse(text)
    return data.resume
  }
  const markAsApplied = async (jobID) => {
    console.log("Marking as applied: " + jobID)
    const response = await fetch(apiURL + 'mark_applied/' + jobID, { method: 'POST' })
    const text = await response.text()
    const data = JSON.parse(text)
    return data
  }
  const markAsRejected = async (jobID) => {
    console.log("Marking as rejected: " + jobID)
    const response = await fetch(apiURL + 'mark_rejected/' + jobID, { method: 'POST' })
    const text = await response.text()
    const data = JSON.parse(text)
    return data
  }
  const markAsHide = async (jobID) => {
    console.log("Marking as hide: " + jobID)
    const response = await fetch(apiURL + 'hide_job/' + jobID, { method: 'POST' })
    const text = await response.text()
    const data = JSON.parse(text)
    return data
  }
  const markAsInterview = async (jobID) => {
    console.log("Marking as interview: " + jobID)
    const response = await fetch(apiURL + 'mark_interview/' + jobID, { method: 'POST' })
    const text = await response.text()
    const data = JSON.parse(text)
    return data
  }

  return <JobContext.Provider value={{
    fetchJobs,
    jobDetails,
    selectJob,
    generateCoverLetter,
    generateResume,
    markAsApplied,
    markAsRejected,
    markAsHide,
    markAsInterview,
    updateJobInContext,
    updatedJob,
    selectedJobID: selectedJobID,
    all_jobs: all_jobs,
    // jobs: jobs,
  }}>
    {children}
  </JobContext.Provider>;
}

JobProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

