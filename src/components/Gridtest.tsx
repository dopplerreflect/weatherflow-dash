import React, { memo } from 'react';
import './Gridtest.less';
import clock from './clock.svg';
import Stat from './Stat';

const Gridtest: React.FC = () => {
  return (
    <div id='Gridtest'>
      <div id='clock'>
        <iframe frameBorder={0} src={clock} width='100%' height='100%' />
      </div>
      <div id='temp'>
        <Stat value='71' label='Temperature' unit='°F' />
      </div>
      <div id='humidity'>
        <Stat value='81' label='Humidity' unit='%' />
      </div>
      <div id='feelslike'>
        <Stat value='75' label='Feels Like' unit='°F' />
      </div>
      <div id='anemometer'>anemometer</div>
      <div id='windgraph'>windgraph</div>
      <div id='rest'>rest</div>
    </div>
  );
};

export default memo(Gridtest);
