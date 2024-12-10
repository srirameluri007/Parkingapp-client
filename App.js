import React, { useState, useEffect } from 'react';
import ParkingGrid from './components/ParkingGrid';
import TimingForm from './components/TimingForm';

const App = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/slots')
      .then((res) => res.json())
      .then((data) => setSlots(data))
      .catch((err) => console.error(err));
  }, []);

  const updateSlot = (slotData) => {
    fetch('http://localhost:5000/update-slot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slotData),
    })
      .then((res) => res.json())
      .then((data) => setSlots(data.slots))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Parking Management</h1>
      <ParkingGrid slots={slots} />
      <TimingForm updateSlot={updateSlot} />
    </div>
  );
};

export default App;
