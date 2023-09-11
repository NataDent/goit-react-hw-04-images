import { Hourglass } from 'react-loader-spinner';
import { LoaderBox } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderBox>
      <Hourglass
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        colors={['#306cce', '#72a1ed']}
      />
    </LoaderBox>
  );
};
