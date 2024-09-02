import 'leaflet';
import 'leaflet-draw';

declare module 'leaflet' {
  namespace Control {
    class Draw extends L.Control {
      constructor(options?: L.Control.DrawOptions);
    }
  }

  namespace Draw {
    interface CreatedEvent extends L.DrawEvents.Created {
      layerType: string;
    }
  }
}
