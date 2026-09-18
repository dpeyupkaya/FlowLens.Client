const en = {
  // Meta
  language: 'Language',

  // Common
  'common.brand': 'FlowLens',
  'common.getStarted': 'Get Started',
  'common.analyze': 'Analyze',
  'common.cancel': 'Cancel',
  'common.save': 'Save',
  'common.saving': 'Saving...',
  'common.apply': 'Apply',
  'common.applying': 'Applying...',
  'common.back': 'Go Back',
  'common.start': 'Start',
  'common.search': 'Search...',
  'common.loading': 'Loading...',
  'common.export': 'Export',
  'common.close': 'Close',
  'common.yes': 'Yes',
  'common.no': 'No',
  'common.error': 'Error',
  'common.success': 'Success',
  'common.guestDeveloper': 'Guest Developer',
  'common.about': 'About',

  // Landing - Navbar
  'landing.nav.getStarted': 'Get Started',

  // Landing - Hero
  'landing.hero.trueFocus': 'Visualize Your Code Architecture',
  'landing.hero.subtitle': 'Untangle spaghetti code in seconds. FlowLens maps your C# architecture locally with zero cloud uploads.',
  'landing.hero.ctaPrimary': 'Analyze Project',
  'landing.hero.ctaSecondary': 'View on GitHub',

  // Landing - Features
  'landing.features.title': 'The Architecture You Deserve',
  'landing.features.subtitle': 'Everything you need to regain control over complex codebases, built with performance and security in mind.',
  'landing.features.local.title': '100% Local',
  'landing.features.local.desc': 'Privacy first. FlowLens never sends your code to the cloud. All analysis happens safely on your machine.',
  'landing.features.roslyn.title': 'Roslyn Engine',
  'landing.features.roslyn.desc': 'Deep C# codebase analysis powered by Roslyn. Understand relationships, dependencies, and complex structures instantly.',
  'landing.features.maps.title': 'Interactive Maps',
  'landing.features.maps.desc': 'Navigate your architecture visually with beautifully rendered 2D node graphs that make sense of spaghetti code.',

  // Landing - CTA
  'landing.cta.title': 'Ready to see the big picture?',
  'landing.cta.button': 'Start Analyzing',

  // Landing - Footer
  'landing.footer.copyright': 'FlowLens. All rights reserved.',
  'landing.footer.about': 'About',

  // App Navbar
  'navbar.quotaFull': 'Your quota is full. It will reset when the countdown ends.',
  'navbar.dailyQuota': 'Your daily analysis quota',
  'navbar.resets': 'RESETS:',
  'navbar.quota': 'QUOTA',
  'navbar.quotaRemaining': 'quota remaining',

  // App Sidebar
  'sidebar.dashboard': 'Dashboard',
  'sidebar.settings': 'Settings',
  'sidebar.about': 'About',
  'sidebar.logout': 'Sign Out',
  'sidebar.logoutSuccess': 'Signed out successfully.',
  'sidebar.logoutError': 'A problem occurred while signing out.',

  // Dashboard Header
  'dashboard.title': 'Active Repositories',
  'dashboard.subtitle': 'Manage your connected projects',
  'dashboard.githubPlaceholder': 'GitHub URL',
  'dashboard.analyzeBtn': 'Analyze',
  'dashboard.connectedProjects': 'Connected Projects',
  'dashboard.repo': 'Repo',
  'dashboard.emptyUrl': 'Please enter a GitHub repository URL or name.',
  'dashboard.invalidFormat': "Invalid format. Enter an example such as 'facebook/react' or a GitHub URL.",

  // About Page
  'about.title': 'About FlowLens',
  'about.subtitle': 'Privacy-focused code architecture visualization tool for C# developers.',
  'about.devTitle': 'About the Developer',
  'about.devText1': "Hi, I'm Eyüp Kaya.",
  'about.devText2': 'I am a software enthusiast who loves writing code, exploring modern technologies, and bringing creative ideas to life in the digital world.',
  'about.devText3': 'FlowLens is a personal project I created both to improve myself and to build something enjoyable. I hope you have fun using it!',
  'about.techTitle': 'Technology',
  'about.techText': 'Currently, our analysis engine only supports C#. However, I plan to add support for other popular languages in the future.',
  'about.contactTitle': 'Contact',
  'about.contactText': 'You can reach me through the following platforms:',
  'about.backToHome': 'Back to Home',

  // Settings Page
  'settings.myAccount': 'My Account',
  'settings.analysisPreferences': 'Analysis Preferences',
  'settings.graphAppearance': 'Graph & Appearance',
  'settings.dataManagement': 'Data Management',
  'settings.pageDesc': 'Manage FlowLens analysis engine and workspace preferences.',
  'settings.accountInfo': 'Account Information',
  'settings.username': 'Username',
  'settings.email': 'Email',
  'settings.githubProfile': 'GitHub Profile',
  'settings.analysisSettings': 'Analysis Settings',
  'settings.excludedFolders': 'Excluded Folders',
  'settings.maxDepth': 'Maximum Analysis Depth',
  'settings.showExternal': 'Show External Libraries',
  'settings.graphSettings': 'Graph Settings',
  'settings.nodeDetail': 'Node Detail Level',
  'settings.highPerformance': 'High Performance Mode',
  'settings.showMinimap': 'Show Minimap',
  'settings.dataPrefs': 'Data Preferences',
  'settings.repoVisibility': 'Repository Visibility',
  'settings.all': 'All',
  'settings.public': 'Public',
  'settings.private': 'Private',
  'settings.saveEngine': 'Save Engine Settings',
  'settings.applyAppearance': 'Apply Appearance Settings',
  'settings.dangerZone': 'Danger Zone',
  'settings.clearCache': 'Clear Analysis Cache',
  'settings.clearCacheConfirm': 'Are you sure you want to clear the analysis cache?',
  'settings.cacheCleared': 'Cache cleared.',
  'settings.settingsUpdated': 'Settings updated successfully!',
  'settings.settingsError': 'A problem occurred while saving settings.',
  'settings.userError': 'An error occurred while retrieving user information.',

  // Analysis
  'analysis.preparing': 'Preparing analysis...',
  'analysis.analyzing': 'Your code architecture is being analyzed...',
  'analysis.completed': 'Analysis completed!',
  'analysis.results': 'Analysis results',
  'analysis.exitTitle': 'END_ANALYSIS',
  'analysis.exitConfirm': 'YES, EXIT',
  'analysis.exitCancel': 'CANCEL',
  'analysis.exitMsg': 'You are about to leave the current analysis graph. Any diagram views that have not been exported will be lost.',
  'analysis.exitQuestion': 'Are you sure you want to exit?',
  'analysis.waitingData': 'WAITING_FOR_ANALYSIS_DATA...',

  // Misc
  'misc.cookieTitle': 'Cookie Usage',
  'misc.cookieMsg': 'We use essential cookies to provide a better experience and manage your session securely.',
  'misc.cookieAccept': 'Please accept the cookie policy to continue using the system.',
  'misc.refreshPage': 'Refresh Page',
  'misc.pageNotFound': 'Page Not Found',
  'misc.unauthorized': 'UNAUTHORIZED_ACCESS_REQUEST',
  'misc.rateLimitTitle': 'OVERLOAD_DETECTED',
  'misc.returnHome': 'Return to Home',
};

export default en;
