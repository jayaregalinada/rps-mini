import { cn } from '../utils/cn';

function WeaponCard({ name, onClick, className, isSelected, ...props }) {
  return (
    <div
      role='button'
      onClick={onClick}
      className={cn(
        'flex flex-col min-w-[100px] flex-1 shrink-0 snap-center relative bg-primary text-gray-900 text-sm border-8 border-gray-900 shadow-[4px_4px_0_0_black] hover:shadow-[2px_2px_0_0_black] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer',
        isSelected && 'ring-gray-500 ring-6',
        className
      )}
      {...props}
    >
      <div className="relative w-full h-full">
        <img
          src={`/assets/weapons/${name.toLowerCase()}.png`}
          alt={name}
          className='w-full h-full object-contain absolute'
        />
      </div>
      <p className='font-medium text-center text-3xl py-2 hidden lg:block'>{name}</p>
    </div>
  );
}

export default WeaponCard;
