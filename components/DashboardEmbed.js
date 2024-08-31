import React from 'react';

const DashboardEmbed = () => {
  return (
    <iframe
      style={{
        background: '#F1F5F4',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        width: '100vw',
        height: '100vh',
      }}
      src="https://charts.mongodb.com/charts-sih2024-rhytdsz/embed/dashboards?id=66d1ce6a-a1d1-42e9-8ffe-4054aa4dfcca&theme=light&autoRefresh=true&maxDataAge=1800&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
      allowFullScreen
    />
  );
};

export default DashboardEmbed;
