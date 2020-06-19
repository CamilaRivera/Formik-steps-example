import React from 'react';
import Notification from '@tds/core-notification';
import Text from '@tds/core-text';

const ErrorMessageTDS = ({ errorMessage }) => {

  return (
    <Notification variant="error" copy="en">
      <Text bold>{errorMessage}</Text>
    </Notification>
  );
};

export default ErrorMessageTDS;
