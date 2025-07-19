import React, { useState } from 'react';
import '../css/SystemSettings.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    registrationDeadline: '2025-08-01',
    votingDuration: '24',
    enableEmailNotifications: true,
    enableTwoFactor: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
    console.log('Saved settings:', settings);
  };

  return (
    <div className="settings-container">
      <h2>System Settings</h2>

      <div className="form-group">
        <label>Registration Deadline</label>
        <input
          type="date"
          name="registrationDeadline"
          value={settings.registrationDeadline}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Voting Duration (hours)</label>
        <input
          type="number"
          name="votingDuration"
          value={settings.votingDuration}
          onChange={handleChange}
          min="1"
          max="72"
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="enableEmailNotifications"
            checked={settings.enableEmailNotifications}
            onChange={handleChange}
          />
          Enable Email Notifications
        </label>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="enableTwoFactor"
            checked={settings.enableTwoFactor}
            onChange={handleChange}
          />
          Enable Two-Factor Authentication
        </label>
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
};

export default SystemSettings;
