import { FC } from 'react';

import { Box, Button, Divider, Heading, Text } from '@chakra-ui/react';

import { Doctor } from '@/generated/core.graphql';

const DoctorSelector: FC<{
  doctors: Doctor[];
  value?: Doctor;
  onChange: (doc: Doctor | undefined) => void;
}> = ({ doctors, value, onChange }) => {
  return (
    <Box>
      <Heading as='h2' fontSize='x-large'>
        Doctors
      </Heading>
      {value && <Text>Selected: {value.name}</Text>}
      <Divider m={1} orientation='horizontal' />
      {!doctors || doctors.length === 0 ? (
        <Text>No doctors</Text>
      ) : (
        doctors.map((doc) => (
          <Button m={1} key={doc.id} onClick={() => onChange(doc)}>
            {doc.name}
          </Button>
        ))
      )}
    </Box>
  );
};

export default DoctorSelector;
