import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import * as turf from '@turf/turf';

const PolygonDrawer: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    // Create a FeatureGroup to store drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialize Leaflet Draw with editing capabilities
    const drawControl = new L.Control.Draw({
      draw: {
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
    map.addControl(drawControl);

    // Function to convert Leaflet LatLngs to Turf.js Polygon
    const leafletToTurfPolygon = (latLngs: L.LatLng[]) => {
      const coords = latLngs.map(latlng => [latlng.lng, latlng.lat]);
      coords.push(coords[0]); // Close the polygon
      return turf.polygon([coords]);
    };

    // Function to check intersection
    const checkIntersection = () => {
      const layers = drawnItems.getLayers();
      for (let i = 0; i < layers.length; i++) {
        const layerA = layers[i] as L.Polygon; // Type assertion
        const polygonA = leafletToTurfPolygon(layerA.getLatLngs().flat() as L.LatLng[]);

        for (let j = i + 1; j < layers.length; j++) {
          const layerB = layers[j] as L.Polygon; // Type assertion
          const polygonB = leafletToTurfPolygon(layerB.getLatLngs().flat() as L.LatLng[]);

          if (turf.booleanOverlap(polygonA, polygonB)) {
            layerA.setStyle({ color: 'red' });
            layerB.setStyle({ color: 'red' });
            alert('Polygons intersection detected!');
          }
        }
      }
    };

    // Handle the creation of new shapes
    map.on(L.Draw.Event.CREATED, (e: any) => {
      const { layer } = e as L.DrawEvents.Created;
      drawnItems.addLayer(layer);
      checkIntersection(); // Check for intersections when a new polygon is added
    });

    // Handle editing of shapes
    map.on(L.Draw.Event.EDITED, () => {
      checkIntersection(); // Check for intersections after editing
    });

    // Handle deletion of shapes
    map.on(L.Draw.Event.DELETED, () => {
      checkIntersection(); // Check for intersections after deletion
    });

    // Cleanup on unmount
    return () => {
      map.off();
      map.removeControl(drawControl);
    };
  }, [map]);

  return null;
};

export default PolygonDrawer;
