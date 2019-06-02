import React, { useState, useEffect } from 'react';

import WontShow from './WontShow';
import {
  getAirports,
  getNoShow,
  Airport,
  NoShow
} from '../../../api';

const Container = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [noShow, setNoShow] = useState<NoShow|undefined>(undefined);

  useEffect(() => {
    setIsLoading(true);
    getAirports()
      .then(airports => {
        const sortedAirports = airports
          .sort((airport1, airport2) => airport1.code.localeCompare(airport2.code));

        setAirports(sortedAirports);
      })
      .finally(() => setIsLoading(false));
  }, [ ]);

  function submitData(args: { origin: string, destination: string, date: string, time: string }) {
    setIsLoading(true);
    getNoShow(args)
      .then(noShow => setNoShow(noShow))
      .finally(() => setIsLoading(false));
  }

  return (
    <WontShow
      isLoading={isLoading}
      airports={airports}
      noShow={noShow}
      handleSearchWontShow={submitData}
    />
  );
};

export default Container;
