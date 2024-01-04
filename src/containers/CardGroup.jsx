import React from 'react';
import { Card } from './Card.jsx';
import { Hr } from '../components/index.js';

export const CardGroup = ({ data, date }) => {
  return (
    <div style={{ display: "flex", flexFlow: 'column', marginTop: '16px' }}>
      <Hr $content={date} />
      {Object.values(data).map((el) => (
        <Card data = {el} key={el[0].id || 'unknown'} />
      ))}
    </div>
  );
};
