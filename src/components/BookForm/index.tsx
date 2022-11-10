import { FC, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import {
  FlexProps,
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  Input,
  ModalContent, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, FormErrorMessage, ModalHeader,
} from '@chakra-ui/react';


import { SlotWithKey } from '@/types/domain';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

type Values = {
  patientName: string;
  description: string;
}

type Props = {
  selectedSlot: SlotWithKey | undefined;
  submitBook: (values: FieldValues) => void;
  styleProps?: FlexProps;
  isOpen: boolean;
  onClose: (() => void);
}

const BookForm: FC<Props> = ({
                               selectedSlot,
                               styleProps,
                               submitBook,
                               isOpen,
                               onClose,
                               ...props
                             }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    reset();
  }, [isOpen])

  const onSubmit = (values: FieldValues) => {
    submitBook(values);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Appointment</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={!!errors.patientName}>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input
                  id='patientName'
                  placeholder='Enter your name...'
                  {...register('patientName', {
                    required: 'This is required',
                    minLength: { value: 1, message: 'Minimum length should be 1' },
                  })}
                />
                <FormErrorMessage>
                  {errors?.patientName && errors?.patientName?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
              <FormControl mt={3} isInvalid={!!errors.description}>
                <FormLabel htmlFor='description'>Additional details</FormLabel>
                <Input
                  id='description'
                  placeholder='Enter details...'
                  {...register('description', {
                    required: 'This is required',
                    minLength: { value: 1, message: 'Minimum length should be 1' },
                  })}
                />
                <FormErrorMessage>
                  {errors?.description && errors?.description?.message?.toString()}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookForm;
