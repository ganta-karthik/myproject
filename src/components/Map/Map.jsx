import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, useMediaQuery, Typography } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import useStyles from './styles';

// Import the SVG icons
import attraction from '../icons/attraction.svg';
import hotel from '../icons/hotel.svg';
import restaurant from '../icons/restaurant.svg';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');
  const [tapCoordinates, setTapCoordinates] = useState(null);

  useEffect(() => {
    // Set initial coordinates
    const initialCoordinates = { lat: 0, lng: 0 };
    setTapCoordinates(initialCoordinates);
  }, []);

  const getIconByCategory = (category) => {
    switch (category) {
      case 'restaurant.svg':
        return <restaurant.svg />;
      case 'attraction.svg':
        return <attraction.svg />;
      case 'hotel':
        return <hotel.svg />;
      default:
        return <LocationOnOutlinedIcon color="primary" fontSize="large" />;
    }
  };

  const handleMapChange = (e) => {
    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event;
    setTapCoordinates({ lat, lng });
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key:'AIzaSyBxC3sM68psyWte2z0Lo3K3Lpc2F_Tqyuk' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={handleMapChange}
        onClick={handleMapClick}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div className={classes.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
            {!isDesktop ? (
              getIconByCategory(place.category)
            ) : (
              <Paper elevation={6} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                {getIconByCategory(place.category)}
              </Paper>
            )}
          </div>
        ))}
        {tapCoordinates && (
          <div lat={tapCoordinates.lat} lng={tapCoordinates.lng}>
            <LocationOnOutlinedIcon className={classes.pointer} fontSize="large" />
          </div>
        )}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
