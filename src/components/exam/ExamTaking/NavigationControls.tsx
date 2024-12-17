import React from 'react';

interface Props {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function NavigationControls({ onPrevious, onNext, onSubmit, isFirst, isLast }: Props) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className={`btn-secondary ${isFirst ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        سوال قبلی
      </button>

      {isLast ? (
        <button
          onClick={onSubmit}
          className="btn-primary"
        >
          پایان آزمون
        </button>
      ) : (
        <button
          onClick={onNext}
          className="btn-primary"
        >
          سوال بعدی
        </button>
      )}
    </div>
  );
}