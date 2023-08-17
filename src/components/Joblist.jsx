// import { JobProvider } from "../JobContext"
import { JobContext } from '../context/JobContext'
import Jobcard from "./Jobcard"
import { useEffect, useState, useContext } from "react"
import { Text, Switch, Flex, Box } from '@radix-ui/themes';
// import * as Switch from '@radix-ui/react-switch';
// import { FormControl, FormLabel, Switch } from "@chakra-ui/react"

// import PropTypes from 'prop-types';

export default function Joblist() {  
  const [jobs, setJobs] = useState([])
  const [showHidden, setShowHidden] = useState(false) // Needed to handle whether to show hidden jobs

  const { fetchJobs, updatedJob } = useContext(JobContext) // importing fetchJobs and updatedJob function from the context.
                                                          // fetchJobs gets the jobs from API
                                                          // updatedJob is a function that updates the job in the context when the state of the job (applied/interview/hide/etc) changes

  //The bellow useEffect executes once in order to fetch the jobs from the backend.
  useEffect(() => {
    // Define an async function to handle the fetching of jobs
    const getJobs = async () => {
      const fetchedJobs = await fetchJobs()
      setJobs(fetchedJobs)
    }
    
    // Call the async function
    getJobs()
  }, []) // Adding fetchJobs as a dependency to the effect

  // The bellow useEffect executes when the state of the job (applied/interview/hide/etc) changes
  useEffect(() => {
    // Listen for changes in the updatedJob value from the context
    if (updatedJob) {
      console.log("Joblist: updatedJob: ", updatedJob)
      setJobs((prevJobs) => {
        return prevJobs.map((job) => {
          if (job.id === updatedJob.id) {
            return updatedJob;  // Replace the job with the updated job
          }
          return job;
        });
      });
    }
  }, [updatedJob]);

  return (
    <Box className='overflow-y-auto max-h-screen'>
      <Flex gap="1" direction="column">
      <div>
          <Text>Show Hidden?</Text>
          <Switch id='Show-hidden' onClick={() => setShowHidden(!showHidden)}/>
      </div>
      {jobs.map((job) => (
        (showHidden || job.hidden === 0) && 
            <Jobcard key={job.id} job={job}/>
      ))}
      </Flex>
    </Box>
  )
}

// Joblist.propTypes = {
//   jobs: PropTypes.array.isRequired
// }
