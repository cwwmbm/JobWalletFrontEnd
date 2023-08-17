import { JobContext } from "../context/JobContext"
import { useContext, useState, useEffect } from "react"
import { Card, Button, Box, Flex, Container, Tabs, Text, Heading } from '@radix-ui/themes';
// import { Button, ButtonGroup } from '@chakra-ui/react'
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// import { customColorScheme } from "../config"


function JobDescription() {
    const { selectedJobID, jobDetails, generateCoverLetter, generateResume, markAsApplied, markAsHide, markAsInterview, markAsRejected, updateJobInContext } = useContext(JobContext)
    const [job, setJob] = useState([])
    const [coverLetter, setCoverletter] = useState("")
    const [resume, setResume] = useState("")

    useEffect(() => {
        const getDetails = async () => {
            const row = await jobDetails(selectedJobID)
            // const descr = job_deets.job_description
            // console.log(row)
            setJob(row)
            setCoverletter(row.cover_letter)
            setResume(row.resume)
        }

        if (selectedJobID !== null) {
            getDetails()
        } 
    }, [selectedJobID])

    const handleClick = async (action) => {
        console.log(action)
        let res;
        let updatedJobDetails;
        switch (action) {
            case 'URL':
                window.open(job.job_url, '_blank')
                break;
            case 'Applied':
                res = await markAsApplied(job.id);
                updatedJobDetails = await jobDetails(job.id);
                // setJob(job.applied = 1)
                setJob(updatedJobDetails);
                updateJobInContext(updatedJobDetails); // Update the job in the context
                break;
            case 'Interview':
                res = await markAsInterview(job.id);
                updatedJobDetails = await jobDetails(job.id);
                // setJob(job.applied = 1)
                setJob(updatedJobDetails);
                updateJobInContext(updatedJobDetails); // Update the job in the context
                break;
                
            case 'Rejected':
                res = await markAsRejected(job.id);
                updatedJobDetails = await jobDetails(job.id);
                // setJob(job.applied = 1)
                setJob(updatedJobDetails);
                updateJobInContext(updatedJobDetails); // Update the job in the context
                break;
            case 'Hide':
                res = await markAsHide(job.id);
                updatedJobDetails = await jobDetails(job.id);
                // setJob(job.applied = 1)
                setJob(updatedJobDetails);
                updateJobInContext(updatedJobDetails); // Update the job in the context
                break;
            default:
                break;
        }
    }

    return (
        <Container size='4'>
            <Box>
                <Card align="center">
                    <Heading as="h1" align="center">{job.title}</Heading>
                    {/* <h2 className="text-xl font-bold">{job.title}</h2> */}
                    <Flex align="stretch" justify="between">
                        <Text></Text>
                        <Text color="gray">{job.company}</Text>
                        <Text color="gray">{job.location}</Text>
                        <Text color="gray">{job.date}</Text>
                        <Text></Text>
                    </Flex>
                    {/* <div>{job.location}</div>
                    <div>{job.date}</div> */}
                </Card>
                {/* Buttons to mark as applied, interview, rejected, hide */}
                <Flex gap="3">
                    <Button onClick={() => handleClick('URL')}>Go to job</Button>
                    <Button onClick={() => handleClick('Applied')}>Applied</Button>
                    <Button onClick={() => handleClick('Interview')}>Interview</Button>
                    <Button onClick={() => handleClick('Rejected')}>Rejected</Button>
                    <Button onClick={() => handleClick('Hide')}>Hide</Button>
                </Flex>
                <Tabs.Root defaultValue="description">
                    <Tabs.List>
                        <Tabs.Trigger value="description">Job Description</Tabs.Trigger>
                        <Tabs.Trigger value="Cover Letter">Cover Letter</Tabs.Trigger>
                        <Tabs.Trigger value="Resume">Resume</Tabs.Trigger>
                    </Tabs.List>
                    <Box px="4" pt="3" pb="2">
                        <Tabs.Content value="description">
                            <Text size="2">
                                {job.job_description && job.job_description.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index !== job.job_description.split('\n').length - 1 && <br />}
                                </span>
                                ))}
                            </Text>
                        </Tabs.Content>
                        <Tabs.Content value="Cover Letter">
                            <Text size="2">
                                <Button onClick={async () => {
                                    const response = await generateCoverLetter(job.id);
                                    console.log(response)
                                    setCoverletter(response);
                                }}>Generate Cover Letter</Button>
                                <br/>
                                {coverLetter && coverLetter.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index !== coverLetter.split('\n').length - 1 && <br />}
                                </span>
                                ))}
                            </Text>
                        </Tabs.Content>
                        <Tabs.Content value="Resume">
                            <Text size="2">
                                <Button onClick={async () =>{
                                    const response = await generateResume(job.id);
                                    console.log(response)
                                    setResume(response);
                                }}>Generate Resume</Button>
                                <br/>
                                {resume && resume.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index !== resume.split('\n').length - 1 && <br />}
                                </span>
                                ))}
                            </Text>
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            </Box>
        </Container>

    )
}

export default JobDescription