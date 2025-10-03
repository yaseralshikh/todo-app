'use client';

import { motion } from 'framer-motion';
import { FilterType } from '@/lib/types';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'active', label: 'النشطة' },
  { key: 'completed', label: 'المكتملة' },
];

export function FilterTabs({ activeFilter, onFilterChange, todoCounts }: FilterTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-2xl mx-auto px-4 mb-6"
    >
      <div className="flex bg-muted rounded-xl p-1">
        {filters.map((filter) => (
          <motion.button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`relative flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeFilter === filter.key
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeFilter === filter.key && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-primary-500 rounded-lg shadow-sm"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {filter.label} ({todoCounts[filter.key]})
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
