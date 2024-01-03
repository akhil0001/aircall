import React from 'react';
export const ActivityContainer = () => {
    return (
        <div style={{display: 'flex', flexFlow: 'column', height: 'calc(100% - 80px)'}}>
            <div className="header-tabs" style={{display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <button>Activity Feed</button>
                <button>Archived Feed</button>
            </div>
            <div className="header-tab-info" style={{display: 'flex', flexFlow: 'column', border: '1px solid red', flexGrow: 1}}></div>
        </div>
    )
}