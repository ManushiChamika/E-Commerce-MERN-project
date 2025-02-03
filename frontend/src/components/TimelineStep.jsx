import React from 'react'

const TimelineStep = ({ step, isCompleted, isCurrent, isLastStep, icon, description }) => {
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon?.bgColor}` : 'bg-gray-100';
    const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon?.textColor}`;
    const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-200';
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';

    return (
        <li className='relative mb-6 sm:mb-0 sm:pl-10'>
            <div className='flex items-center'>
                <div className={`z-10 flex items-center justify-center h-6 w-6 ${iconBgColor} ${iconTextColor} rounded-full ring-white shrink-0`}>
                    <i className={`ri-${icon.iconName} text-xl`}></i>
                </div>
                {!isLastStep && (<div />)}
            </div>
        
        </li>
  )
}

export default TimelineStep