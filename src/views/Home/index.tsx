import { Heading, Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useAddDoctorAvailMutation } from '@/generated/core.graphql';

const Home = () => {
  //const [addDoctorAvail, {loading, }] = useAddDoctorAvailMutation();

  return (
    <Box>
      <Heading>Booker App</Heading>
      <Link href='/items'>Items</Link>
      <br />
      <Link href='/appointments'>Appointments</Link>
      { /*<Button
        isLoading={loading}
        onClick={() => addDoctorAvail({
          variables: {
            'dayOfWeek': 1,
            'startTimeUtc': '2022-11-09T12:39:21.603Z',
            'endTimeUtc': '2022-11-09T12:55:21.603Z',
            'doctorId': 1,
          },
        })}>
        Add Avail
      </Button>*/}
    </Box>
  );
};

export default Home;
