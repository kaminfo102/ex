import React from 'react';

interface Props {
  onDistributionChange: (distribution: QuestionDistribution) => void;
  initialDistribution?: QuestionDistribution;
}

interface QuestionDistribution {
  easy: number;
  medium: number;
  hard: number;
}

export default function QuestionDistribution({ onDistributionChange, initialDistribution }: Props) {
  const [distribution, setDistribution] = React.useState<QuestionDistribution>(
    initialDistribution || { easy: 0, medium: 0, hard: 0 }
  );

  const handleChange = (level: keyof QuestionDistribution, value: number) => {
    const newDistribution = { ...distribution, [level]: value };
    setDistribution(newDistribution);
    onDistributionChange(newDistribution);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">توزیع سوالات</h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">سوالات آسان</label>
          <input
            type="number"
            min="0"
            value={distribution.easy}
            onChange={(e) => handleChange('easy', parseInt(e.target.value))}
            className="input mt-1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">سوالات متوسط</label>
          <input
            type="number"
            min="0"
            value={distribution.medium}
            onChange={(e) => handleChange('medium', parseInt(e.target.value))}
            className="input mt-1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">سوالات سخت</label>
          <input
            type="number"
            min="0"
            value={distribution.hard}
            onChange={(e) => handleChange('hard', parseInt(e.target.value))}
            className="input mt-1"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          مجموع سوالات: {distribution.easy + distribution.medium + distribution.hard}
        </p>
      </div>
    </div>
  );
}