import React from "react";

declare interface EmptyStateProps {
  url: string;
  dataCY: string;
}

function EmptyState({url, dataCY}: EmptyStateProps) {
  return (
    <div className="d-flex justify-content-center" data-cy={dataCY}>
      <img src={url} alt="empty-state" width="100%" style={{maxWidth: "500px"}}/>
    </div>
  );
}

export default EmptyState;
