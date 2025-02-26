const theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      light: '#FFFFFF'
    },
    border: '#E2E8F0',
    shadow: 'rgba(15, 23, 42, 0.08)',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#0EA5E9',
    gradient: {
      primary: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
      secondary: 'linear-gradient(135deg, #10B981, #34D399)',
      accent: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
      surface: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)'
    },
    state: {
      hover: '#EFF6FF',
      active: '#DBEAFE',
      selected: '#BFDBFE'
    }
  },
  spacing: {
    xxs: '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '2.5rem'
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  },
  maxWidth: '1400px',
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px'
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease'
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.1)'
  },
  container: {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    xxl: '1320px'
  }
};

export default theme; 