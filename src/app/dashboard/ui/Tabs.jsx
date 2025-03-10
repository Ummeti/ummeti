'use client';
import { useState, useMemo } from 'react';

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.key);

  const getTabStyles = (isActive) =>
    `inline-flex shrink-0 items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'border-gray-500 text-gray-700'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`;

  const tabContent = useMemo(() => {
    const contentMap = {};
    tabs?.forEach(({ key, content }) => {
      contentMap[key] = content;
    });
    return contentMap;
  }, [tabs]);

  return (
    <div className="px-4 sm:px-6 md:px-8">
      {/* Mobile Dropdown */}
      <div className="sm:hidden p-4">
        <label htmlFor="tabSelect" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabSelect"
          className="w-full rounded-md border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {tabs?.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {tabs?.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={getTabStyles(activeTab === key)}
                aria-current={activeTab === key ? 'page' : undefined}
              >
                {icon}
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div>{activeTab in tabContent ? tabContent[activeTab] : null}</div>
    </div>
  );
}
