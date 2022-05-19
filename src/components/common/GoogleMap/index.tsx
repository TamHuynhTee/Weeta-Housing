import React, { ReactNode } from 'react';
import GoogleMapReact, { ClickEventValue, Coords } from 'google-map-react';
import {
  DEFAULT_CENTER_COORDINATES,
  DEFAULT_CENTER_ZOOM,
} from '@/constants/base.constants';

type Props = {
  markers?: ReactNode | ReactNode[];
  coordinates?: Coords;
  onClick?: (clickEvent: ClickEventValue) => void;
};

const GoogleMap = (props: Props) => {
  const {
    coordinates,
    markers,
    onClick = () => {
      return;
    },
  } = props;
  return (
    <div className="h-full w-full">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.API_KEY_GOOGLE_MAP as string,
        }}
        defaultCenter={coordinates || DEFAULT_CENTER_COORDINATES}
        defaultZoom={DEFAULT_CENTER_ZOOM}
        onClick={onClick}
      >
        {markers}
        {/* <AnyReactComponent
      lat={10.779454}
      lng={106.693039}
      text="My Marker"
    /> */}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
