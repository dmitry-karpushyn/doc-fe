/* eslint-disable import/prefer-default-export */
import { chakra, Flex } from '@chakra-ui/react';

export const Container = chakra(Flex, {
  baseStyle: {
    position: 'absolute',
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(255,255,255,0.5)",
    zIndex: 10,
  },
});
