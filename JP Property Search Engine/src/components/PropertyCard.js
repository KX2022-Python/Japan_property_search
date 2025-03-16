import React from 'https://esm.sh/react@18.2.0';

const PropertyCard = ({ property, compact = false }) => {
  const {
    id,
    title,
    price,
    address,
    size,
    rooms,
    yearBuilt,
    image,
    sources
  } = property;

  const formatPrice = (price) => {
    if (price >= 10000) {
      return `${(price / 10000).toFixed(1)}万円`;
    }
    return `${price.toLocaleString()}円`;
  };

  const cardClass = compact ? 'property-card compact' : 'property-card';

  return (
    <div className={cardClass}>
      <div className="property-image">
        <img src={image} alt={title} />
        <div className="property-sources">
          {sources.length}个来源
        </div>
      </div>

      <div className="property-content">
        <div className="property-price">{formatPrice(price)}</div>
        <div className="property-address">{address}</div>
        
        <div className="property-details">
          <div className="property-detail">{size}㎡</div>
          <div className="property-detail">{rooms}</div>
          <div className="property-detail">建于{yearBuilt}年</div>
        </div>

        <div className="property-source-links">
          {sources.map((source, index) => (
            <a 
              key={index} 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="source-link"
            >
              {source.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 