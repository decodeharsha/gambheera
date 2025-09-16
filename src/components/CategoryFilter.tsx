import React from 'react';
import { Heart, Utensils, Building, Wrench, Dumbbell, Grid } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { key: 'all', label: 'All Services', icon: Grid },
    { key: 'hospital', label: 'Healthcare', icon: Heart },
    { key: 'restaurant', label: 'Restaurants', icon: Utensils },
    { key: 'hotel', label: 'Hotels', icon: Building },
    { key: 'repair', label: 'Repairs', icon: Wrench },
    { key: 'fitness', label: 'Fitness', icon: Dumbbell }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map(category => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.key;
        
        return (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              isSelected
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
};