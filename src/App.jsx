// import { useState, useEffect, useContext } from 'react'
import Joblist from './components/Joblist'
import { JobProvider } from './context/JobContext'
import JobDescription from './components/JobDescription'
import {Box, Flex, Container } from '@radix-ui/themes';
// import { ChakraProvider } from '@chakra-ui/react'

function App() {


  return (

    // <ChakraProvider>
      <JobProvider>
        <Box className='my-1 mx-10'>
          <Container size='4'>
            <Flex gap="5">
            {/* <div className='flex flex-row'> */}
              <Box>
                <Joblist />
              </Box>
              <div>
                <JobDescription />
              </div>
            {/* </div> */}
            </Flex>
          </Container>
        </Box>
      </JobProvider>
    // </ChakraProvider>
  )
}

export default App
