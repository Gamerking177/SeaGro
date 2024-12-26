import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

export function JobFilters({ jobs, setFilters }) {
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: [],
    salary: [],
    location: [],
  });

  useEffect(() => {
    if (jobs.length) {
      const jobTypes = [...new Set(jobs.map((job) => job.job_type))];
      const locations = [...new Set(jobs.map((job) => job.candidate_required_location))];
      const salaryRanges = [
        '0k-50k',
        '50k-100k',
        '100k-150k',
        '150k-200k',
        '200k-250k',
        '250k+',
      ]; // Simplified salary ranges

      setFilters({ jobType: jobTypes, location: locations, salary: salaryRanges });
    }
  }, [jobs, setFilters]);

  const handleFilterChange = (filterCategory, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterCategory].includes(value)) {
        updatedFilters[filterCategory] = updatedFilters[filterCategory].filter(
          (filter) => filter !== value
        );
      } else {
        updatedFilters[filterCategory].push(value);
      }
      setFilters(updatedFilters); // Pass filters to the parent
      return updatedFilters;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      <div className="space-y-6">
        {/* Job Type Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Job Type
          </h3>
          {jobs.length > 0 &&
            jobs
              .map((job) => job.job_type)
              .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
              .map((jobType) => (
                <label key={jobType} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.jobType.includes(jobType)}
                    onChange={() => handleFilterChange('jobType', jobType)}
                    className="rounded text-teal-600"
                  />
                  <span className="text-gray-700">{jobType}</span>
                </label>
              ))}
        </div>

        {/* Location Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </h3>
          {['Remote', 'On-site', 'Hybrid'].map((location) => (
            <label key={location} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={selectedFilters.location.includes(location)}
                onChange={() => handleFilterChange('location', location)}
                className="rounded text-teal-600"
              />
              <span className="text-gray-700">{location}</span>
            </label>
          ))}
        </div>

        {/* Salary Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            Salary
          </h3>
          {['0k-50k', '50k-100k', '100k-150k', '150k-200k', '200k-250k', '250k+'].map((salary) => (
            <label key={salary} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={selectedFilters.salary.includes(salary)}
                onChange={() => handleFilterChange('salary', salary)}
                className="rounded text-teal-600"
              />
              <span className="text-gray-700">{salary}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
