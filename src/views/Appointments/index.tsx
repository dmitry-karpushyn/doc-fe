import { useEffect, useState } from 'react';

import { Heading, Box, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { addDays, add } from 'date-fns';

import DoctorSelector from '@/components/DoctorSelector';
import SlotSelector from '@/components/SlotSelector';
import { Doctor, Slot, useBookAppointmentMutation, useDoctorsQuery, useSlotsQuery } from '@/generated/core.graphql';
import { SlotWithKey } from '@/types/domain';
import BookForm from '@/components/BookForm';
import { FieldValues } from 'react-hook-form';

const startDate = new Date();
const MAX_DAYS = 30;

const generateSlots = (slots: Slot[]): SlotWithKey[] => {
  return slots?.map((slot) => ({
    key: `${slot.start.toString()}${slot.doctorId}`,
    start: Date.parse(slot.start),
    end: Date.parse(slot.end),
    doctorId: slot.doctorId,
  }));
};

const Appointments = () => {
  const toast = useToast();
  const { data, loading } = useDoctorsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<string>();
  const [slots, setSlots] = useState<SlotWithKey[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [isLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotWithKey>();
  const minimumStartDate = slots?.[0]?.start;
  const maximumStartDate = minimumStartDate && addDays(minimumStartDate, MAX_DAYS);
  const [bookAppointment] = useBookAppointmentMutation();
  const slotsResp = useSlotsQuery({
    variables: {
      from: startDate,
      to: add(startDate, { days: MAX_DAYS }),
    },
  });

  useEffect(() => {
    if (selectedDoctor) {
      const slotsData = slotsResp?.data?.slots.filter((slot) => slot.doctorId === selectedDoctor.id);
      if (!slotsData?.length) {
        toast({
          title: 'No slots available',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
        setSlots([]);
      } else {
        const generatedSlots = generateSlots(slotsData as Slot[]);
        setSlots(generatedSlots);
      }
    } else {
      setSlots([]);
    }
  }, [selectedDoctor]);

  const handleSubmit = async (values: FieldValues) => {
    if (selectedSlot?.doctorId) {
      try {
        await bookAppointment({
          variables: {
            bookAppointmentInput: {
              slot: {
                doctorId: selectedSlot.doctorId,
                start: new Date(selectedSlot?.start),
                end: new Date(selectedSlot?.end),
              },
              patientName: values?.patientName,
              description: values?.description,
            },
          },
        });
        toast({
          title: 'Appointment created.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setSelectedSlot(undefined);
        const filteredSlots = slots.filter((s) => s.key !== selectedSlot.key);
        setSlots(filteredSlots);
        onClose();
      } catch (e) {
        toast({
          title: 'Error',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }

    }
  };

  return (
    <Box>
      <Heading>Appointments</Heading>
      {error && (
        <Box>
          <Text>{error}</Text>
        </Box>
      )}
      <DoctorSelector
        doctors={data?.doctors as Doctor[]}
        value={selectedDoctor}
        onChange={setSelectedDoctor}
      />
      {
        !!slots?.length && (
          <SlotSelector
            minimumStartDate={minimumStartDate}
            maximumStartDate={maximumStartDate}
            availableSlots={slots}
            value={selectedSlot}
            onChange={setSelectedSlot}
            loadingSlots={isLoading}
            onOpenModal={onOpen}
          />
        )
      }

      <BookForm
        isOpen={isOpen}
        onClose={onClose}
        selectedSlot={selectedSlot}
        submitBook={handleSubmit}
      />
    </Box>
  );
};

export default Appointments;
