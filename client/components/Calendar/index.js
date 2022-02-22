import React from 'react';
import Day from '../Day';
import Flex from '../Flex';

export default function Calendar({ calendarResponse })  {
  return (
    <Flex>
      <Day calendarResponse={calendarResponse} />
    </Flex>
  );
}