import React, { useEffect, useRef, useState } from 'https://esm.sh/react@18.2.0';
import PropertyCard from './PropertyCard.js';

const MapView = ({ properties }) => {
  const mapRef = useRef(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // 初始化地图
  useEffect(() => {
    if (!mapRef.current) return;

    const initialLocation = { lat: 35.6812, lng: 139.7671 }; // 默认东京中心位置
    
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: initialLocation,
      zoom: 12,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    setMap(mapInstance);
  }, []);

  // 当地图实例和属性更改时更新标记
  useEffect(() => {
    if (!map || !properties.length) return;

    // 清除现有标记
    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];

    // 创建新标记
    properties.forEach(property => {
      const marker = new google.maps.Marker({
        position: { lat: property.lat, lng: property.lng },
        map: map,
        title: property.title
      });

      marker.addListener('click', () => {
        setSelectedProperty(property);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // 调整地图边界以适应所有标记
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => bounds.extend(marker.getPosition()));
      map.fitBounds(bounds);
      
      // 如果只有一个标记，则缩放调整
      if (newMarkers.length === 1) {
        map.setZoom(15);
      }
    }
  }, [map, properties]);

  return (
    <div className="map-view">
      <div className="map-sidebar">
        {properties.length === 0 ? (
          <div className="no-results">
            <p>没有找到符合条件的房源。请尝试调整筛选条件。</p>
          </div>
        ) : (
          properties.map(property => (
            <div 
              key={property.id} 
              className={`sidebar-property ${selectedProperty?.id === property.id ? 'selected' : ''}`}
              onClick={() => setSelectedProperty(property)}
            >
              <PropertyCard property={property} compact />
            </div>
          ))
        )}
      </div>
      <div className="map-container" ref={mapRef}></div>
    </div>
  );
};

export default MapView; 