import { cn } from '../utils/cn';

function SelectedWeaponCard({ name, hasWinner, isWinner = false }) {
  return (
    <div
      className={cn(
        'p-2 border-8 transition flex flex-col w-full h-full relative lg:max-w-100',
        !hasWinner && 'border-gray-900 bg-primary',
        hasWinner && isWinner && 'border-green-500 bg-green-200 animate-winner',
        hasWinner && !isWinner && 'border-red-500 bg-red-200 animate-hurt'
      )}
    >
      <div className='relative w-full h-full'>
        <img
          src={`/assets/weapons/${name.toLowerCase()}.png`}
          alt={name}
          className='w-full h-full object-contain absolute'
        />
      </div>
      <p className='font-medium text-center text-xl lg:text-3xl'>{name}</p>
    </div>
  );
}

export default SelectedWeaponCard;
