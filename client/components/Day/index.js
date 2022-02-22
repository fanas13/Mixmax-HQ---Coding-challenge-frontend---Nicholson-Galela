import moment from 'moment';
import React from 'react';
import Button from '../Button';
import Flex, { FlexItem } from '../Flex';
import Typography from '../Typography';

export default function Day({calendarResponse}) {
  const timeslots = calendarResponse?.timeslots;
  var startOfWeek = moment().startOf('isoWeek').add(1, 'd');
  var daysOfTheWeek = [];

  var startDay = startOfWeek;
  var dayCounter = 0;
  while (dayCounter <= 6) { // push days into the object until its 7 days 
      startDay = startDay.clone().add(1, 'd'); // add a day from today
      daysOfTheWeek.push(moment(startDay).format()); // push all days added into the daysOfTheWeek object
      dayCounter++
  };

  const renderSlotDetails = (dayOftheWeek) => {
    const renderTimeslots = Object.keys(timeslots).map((key) => {
      if(moment(dayOftheWeek).format('DD') === moment(timeslots[key]).format('DD')) {
        return(
          <Button className="btnConfirmDetails" key={key}>
            <Typography className="confirmDetailsCopy">{moment(timeslots[key]).format('h:mma')} - {moment(timeslots[key]).add(calendarResponse?.timeslotLengthMinutes,'minutes').format('h:mma')}</Typography>
          </Button>
        );
      }
    });
    return(<>{renderTimeslots}</>)
  };
  
  if (daysOfTheWeek !== undefined && daysOfTheWeek.length > 0) {
    const renderDaysOfTheWeek = Object.keys(daysOfTheWeek).map((key) =>{
      const dayOftheWeek = daysOfTheWeek[key];
      return (
        <FlexItem seven key={key}>
          <Flex margin='0 0 10px' alignCenter>
            <Typography margin='0 5px 0 0' bold>
              {moment(dayOftheWeek).format('ddd')}
            </Typography>
            <Typography margin='0' small dimmed>
              {moment(dayOftheWeek).format('MMM DD')}
            </Typography>
          </Flex>
          <Flex>
            {renderSlotDetails(dayOftheWeek)}
          </Flex>
        </FlexItem>
      );
    });
    return(
      <>
        {renderDaysOfTheWeek}
      </>
    );
  } else {
    return (
      <>Please contact administrator</>
    );
  };
}
