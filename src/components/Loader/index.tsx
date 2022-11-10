import { FC } from 'react';
import {
  FlexProps, Spinner,
} from '@chakra-ui/react';

import { Container } from './styled';

type Props = {
  styleProps?: FlexProps;
}

const Loader: FC<Props> = ({
                             styleProps,
                           }) => {

  return (
    <Container {...styleProps}>
      <Spinner />
    </Container>
  );
};

export default Loader;
