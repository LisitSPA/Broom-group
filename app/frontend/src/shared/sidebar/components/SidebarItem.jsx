import React from 'react';
import { 
  sidebarItemClass,
  titleClass,
  iconClass
} from '../../assets/SidebarItemStyles';

const SidebarItem = ({
  icon,
  title,
  path,
}) => {
  const isActive = window.location.pathname === path;

  const handleClick = () => {
    if (!isActive) {
      window.location.pathname = path;
    }
  }
  
  return (
    <div 
      className={sidebarItemClass(isActive)}
      onClick={handleClick}
    >
      <div className="mr-3 self-center">
        {React.cloneElement(icon, { className: iconClass(isActive) })}
      </div>
      <div className={titleClass(isActive)}>
        {title}
      </div>
    </div>
  )
}

export default SidebarItem