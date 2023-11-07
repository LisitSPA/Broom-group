import classNames from 'classnames';

export const sidebarItemClass = (active) => {
  return classNames('flex', 'align-middle', 'p-5', 'px-9', 'select-none', 'cursor-pointer', {
    'bg-LightCyan': active,
    'hover:bg-slate-500': !active
  });
};

export const titleClass = (active) => {
  return classNames('text-sm', 'self-center', 'font-medium', {
    'text-NavyBlue font-semibold': active
  });
};

export const iconClass = (active) => {
  return classNames({
    'text-NavyBlue': active
  });
};
