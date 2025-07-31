'use client';

import { useState } from 'react';
import { Skill } from 'shared';

interface InteractiveSkillsChartProps {
  skills: Skill[];
}

const SKILL_LEVELS = {
  1: 'Beginner',
  2: 'Novice',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert'
} as const;

export default function InteractiveSkillsChart({ skills }: InteractiveSkillsChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minLevel, setMinLevel] = useState<number>(1);

  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];
  
  const filteredSkills = skills.filter(skill => {
    const categoryMatch = selectedCategory === 'All' || skill.category === selectedCategory;
    const levelMatch = skill.level >= minLevel;
    return categoryMatch && levelMatch;
  });

  const getBarWidth = (level: number) => (level / 5) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Interactive Skills Overview</h3>
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Skill Level
          </label>
          <select
            id="level-filter"
            value={minLevel}
            onChange={(e) => setMinLevel(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5].map((level) => (
              <option key={level} value={level}>
                {SKILL_LEVELS[level as keyof typeof SKILL_LEVELS]} ({level}/5)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredSkills.length} of {skills.length} skills
        </p>
      </div>

      {/* Skills Chart */}
      <div className="space-y-4">
        {filteredSkills.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No skills match the current filters.
          </p>
        ) : (
          filteredSkills.map((skill) => (
            <div key={skill.name} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {skill.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{SKILL_LEVELS[skill.level]}</span>
                  <span>•</span>
                  <span>{skill.yearsOfExperience} years</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
                      skill.level === 5 ? 'bg-green-500' :
                      skill.level === 4 ? 'bg-blue-500' :
                      skill.level === 3 ? 'bg-yellow-500' :
                      skill.level === 2 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${getBarWidth(skill.level)}%` }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white mix-blend-difference">
                    {skill.level}/5
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">Skill Level Legend:</p>
        <div className="flex flex-wrap gap-4 text-xs">
          {Object.entries(SKILL_LEVELS).map(([level, label]) => (
            <div key={level} className="flex items-center gap-2">
              <div 
                className={`w-3 h-3 rounded-full ${
                  level === '5' ? 'bg-green-500' :
                  level === '4' ? 'bg-blue-500' :
                  level === '3' ? 'bg-yellow-500' :
                  level === '2' ? 'bg-orange-500' :
                  'bg-red-500'
                }`} 
              />
              <span className="text-gray-600">{label} ({level}/5)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}