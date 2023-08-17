import PropTypes from 'prop-types'
import { JobContext } from '../context/JobContext'
import { useContext, useState } from 'react'
import { Card, Avatar, Heading, Flex, Text } from '@radix-ui/themes';
// import { Card, CardHeader, CardBody, CardFooter, Heading, Avatar } from '@chakra-ui/react'
// import {}
import './Jobcard.css';

function Jobcard({job}) {
  const [isSelected, setIsSelected] = useState(false)
  const [prevID, setPrevID] = useState(null)
  const { selectJob, selectedJobID } = useContext(JobContext)

  const handleClick = () => {
    selectJob(job.id)
  }

  return (

      <Card 
          // this style is for BG color when the card is selected
          style={{ backgroundColor: selectedJobID === job.id ? '#cacaca' : 'initial'}}
          // some Tailwind styles. "card-hover" is for hover useEffect, styling is in Jobcard.css
          className="card-hover mx-3 w-96 gap-3 max-w-md hover:cursor-pointer"
          //What happens when we click on the card
          onClick={() => handleClick()}
        >
        <Flex justify="between">
          <Flex direction="column" className='mr-16'>
            <Heading size="5">{job.title}</Heading>
            <Flex direction="column">
              <Text>{job.company}</Text>
              <Text>{job.location}</Text>
              <div>{job.date}</div>
            </Flex>
          </Flex>
          <Flex direction="column">
            {job.applied === 1 && <Avatar src="/assets/applied.png" />}
            {job.interview === 1 && <Avatar src="/assets/interview.png" />}
            {job.rejected === 1 && <Avatar src="/assets/rejected.png" />}
          </Flex>
        </Flex>
      </Card>
    // </div>
  );
}

export default Jobcard

Jobcard.propTypes = {
  job: PropTypes.object.isRequired
}