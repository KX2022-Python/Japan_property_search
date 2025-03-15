import React from 'https://esm.sh/react@18.2.0';
import PropertyCard from './PropertyCard.js';

const ListView = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="no-results">
        <p>没有找到符合条件的房源。请尝试调整筛选条件。</p>
      </div>
    );
  }

  return (
    <div className="list-view">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default ListView; 