\
import React, { useState, useEffect } from 'react';
import {
  Heart,
  Book,
  Target,
  Settings,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  Star,
  User,
  BookOpen,
  Edit3,
  Clock,
} from 'lucide-react';

// ---------- helpers: safe localStorage ----------
const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const lsGetJSON = (key, fallback) => {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const lsGet = (key, fallback = '') => {
  if (!isBrowser) return fallback;
  const v = window.localStorage.getItem(key);
  return v == null ? fallback : v;
};

const lsSet = (key, value) => {
  if (!isBrowser) return;
  if (typeof value === 'string') {
    window.localStorage.setItem(key, value);
  } else {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

// ---------- data ----------
const studyData = {
  currentStudy: {
    id: 'christ-during-trials',
    title: "Christ's Character During Trials",
    duration: '2 Week Personal Study',
    description:
      'An intimate examination of how Jesus responded to opposition, betrayal, and suffering, and how His responses can transform your character.',
    week: 1,
    day: 3,
    personalProgress: 65,
    sections: [
      {
        id: 'garden-gethsemane',
        title: 'The Garden of Gethsemane',
        completed: false,
        scriptures: [
          {
            reference: 'Matthew 26:36-46',
            text: 'Then cometh Jesus with them unto a place called Gethsemane, and saith unto the disciples, Sit ye here, while I go and pray yonder. And he took with him Peter and the two sons of Zebedee, and began to be sorrowful and very heavy.',
            deepLink: 'gospellibrary://content/scriptures/nt/matt/26',
          },
          {
            reference: 'Luke 22:39-44',
            text: 'And he came out, and went, as he was wont, to the mount of Olives; and his disciples also followed him. And when he was at the place, he said unto them, Pray that ye enter not into temptation.',
            deepLink: 'gospellibrary://content/scriptures/nt/luke/22',
          },
          {
            reference: 'D&C 19:16-19',
            text: 'For behold, I, God, have suffered these things for all, that they might not suffer if they would repent; But if they would not repent they must suffer even as I; Which suffering caused myself, even God, the greatest of all, to tremble because of pain...',
            deepLink: 'gospellibrary://content/scriptures/dc-testament/dc/19',
          },
        ],
        personalQuestions: [
          "How has Christ's willingness to submit helped me understand my own relationship with God's will?",
          "What trials in my life have taught me about Jesus's perfect empathy?",
          'When have I felt divine strength beyond my own capacity, like Christ received from the angel?',
          "How can Christ's example in Gethsemane guide me through my current challenges?",
        ],
        characterTraits: [
          'Divine Submission: Perfect obedience even in suffering',
          'Willing Sacrifice: Choosing love over self-preservation',
          'Prayerful Dependence: Seeking the Father in darkest hours',
        ],
        applicationGoals: [
          'Pray more earnestly during my personal trials',
          "Practice choosing God's will over my comfort",
          'Seek divine help instead of trying to endure alone',
        ],
      },
      {
        id: 'betrayal-arrest',
        title: 'Betrayal and Arrest',
        completed: false,
        scriptures: [
          {
            reference: 'Matthew 26:47-56',
            text: 'And while he yet spake, lo, Judas, one of the twelve, came, and with him a great multitude with swords and staves, from the chief priests and elders of the people.',
            deepLink: 'gospellibrary://content/scriptures/nt/matt/26',
          },
        ],
        personalQuestions: [
          'How did Jesus respond to betrayal, and what does this teach me about forgiveness?',
          "What does Christ's restraint of Peter teach me about responding to injustice?",
        ],
        characterTraits: ['Perfect Forgiveness: No retaliation against betrayers', 'Peaceful Strength: Power controlled by love'],
        applicationGoals: ['Forgive those who have hurt me', 'Respond to conflict with Christlike restraint'],
      },
    ],
  },
  personalStats: {
    totalStudyDays: 47,
    characterTraitsStudied: 12,
    scripturesRead: 156,
    personalInsights: 89,
    applicationsCompleted: 23,
  },
};

const spiritualGoals = [
  {
    id: 'daily-prayer',
    title: 'Daily Morning Prayer',
    description: 'Start each day connecting with Heavenly Father',
    streak: 12,
    target: 30,
    category: 'Prayer',
  },
  {
    id: 'christlike-love',
    title: 'Practice Christlike Love',
    description: 'Look for opportunities to serve others daily',
    streak: 5,
    target: 21,
    category: 'Service',
  },
  {
    id: 'scripture-study',
    title: 'Deep Scripture Study',
    description: 'Study with intent to understand Christ better',
    streak: 8,
    target: 14,
    category: 'Study',
  },
];

const PersonalGospelApp = () => {
  const [currentTab, setCurrentTab] = useState('study');
  const [theme, setTheme] = useState('light');
  const [currentSection, setCurrentSection] = useState('garden-gethsemane');
  const [studyNotes, setStudyNotes] = useState({});
  const [personalInsights, setPersonalInsights] = useState({});
  const [applicationCommitments, setApplicationCommitments] = useState({});
  const [completedSections, setCompletedSections] = useState(new Set());
  const [dailyReflection, setDailyReflection] = useState('');

  useEffect(() => {
    // load saved state safely (works in SSR too)
    setTheme(lsGet('theme', 'light'));
    setStudyNotes(lsGetJSON('studyNotes', {}));
    setPersonalInsights(lsGetJSON('personalInsights', {}));
    setApplicationCommitments(lsGetJSON('applicationCommitments', {}));
    setCompletedSections(new Set(lsGetJSON('completedSections', [])));
    setDailyReflection(lsGet('dailyReflection', ''));
  }, []);

  const saveData = (key, value) => {
    if (value instanceof Set) {
      lsSet(key, [...value]);
    } else {
      lsSet(key, value);
    }
  };

  const completeSection = (sectionId) => {
    const next = new Set(completedSections);
    next.add(sectionId);
    setCompletedSections(next);
    saveData('completedSections', next);
  };

  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    parchment: 'bg-amber-50 text-amber-900',
  };

  const cardClasses = {
    light: 'bg-white border-gray-200 shadow-sm',
    dark: 'bg-gray-800 border-gray-700',
    parchment: 'bg-amber-100 border-amber-200',
  };

  const StudyScreen = () => {
    const section = studyData.currentStudy.sections.find((s) => s.id === currentSection);
    const isCompleted = completedSections.has(currentSection);

    if (!section) {
      return (
        <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
          <p className="text-sm">This section could not be found.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 pb-20">
        {/* Personal Study Progress */}
        <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-blue-900">{studyData.currentStudy.title}</h2>
              <p className="text-sm text-gray-600">{studyData.currentStudy.duration}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-700">{studyData.currentStudy.personalProgress}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-4">{studyData.currentStudy.description}</p>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${studyData.currentStudy.personalProgress}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            <span>
              Week {studyData.currentStudy.week}, Day {studyData.currentStudy.day}
            </span>
            <span>{studyData.personalStats.totalStudyDays} days studied</span>
          </div>
        </div>

        {/* Current Section Study */}
        <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-bold text-blue-900">{section.title}</h3>
            </div>
            {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
          </div>

          {/* Scripture Passages */}
          <div className="space-y-4 mb-6">
            {section.scriptures.map((scripture) => (
              <div
                key={scripture.reference}
                className={`p-4 rounded-lg border-l-4 border-yellow-500 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}
              >
                <blockquote className="font-serif text-base leading-relaxed mb-3 italic">"{scripture.text}"</blockquote>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-blue-800">— {scripture.reference}</p>
                  {/* Using <a> so browsers can try to route custom scheme; window.open can be blocked */}
                  <a
                    href={scripture.deepLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <Book className="w-3 h-3" />
                    <span>Read Full Chapter</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Personal Study Questions */}
          <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <div className="flex items-center space-x-2 mb-3">
              <User className="w-4 h-4 text-purple-600" />
              <h4 className="font-semibold text-purple-800">Personal Reflection Questions</h4>
            </div>
            <ul className="space-y-3 text-sm">
              {section.personalQuestions.map((question, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-purple-600 font-medium min-w-[20px]">{index + 1}.</span>
                  <span className="text-purple-700">{question}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Character Traits to Learn */}
          <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}`}>
            <div className="flex items-center space-x-2 mb-3">
              <Star className="w-4 h-4 text-green-600" />
              <h4 className="font-semibold text-green-800">Christ&apos;s Character to Develop</h4>
            </div>
            <ul className="space-y-2 text-sm">
              {section.characterTraits.map((trait, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-green-700">{trait}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Personal Application Goals */}
          <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-50'}`}>
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-4 h-4 text-yellow-600" />
              <h4 className="font-semibold text-yellow-800">My Application Goals</h4>
            </div>
            <ul className="space-y-2 text-sm">
              {section.applicationGoals.map((goal, index) => {
                const key = `${currentSection}-${index}`;
                const checked = !!applicationCommitments[key];
                return (
                  <li key={key} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      className="mt-1 rounded text-yellow-600"
                      onChange={(e) => {
                        const updated = { ...applicationCommitments, [key]: e.target.checked };
                        setApplicationCommitments(updated);
                        saveData('applicationCommitments', updated);
                      }}
                      checked={checked}
                    />
                    <span className="text-yellow-700">{goal}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Personal Study Notes */}
          <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <div className="flex items-center space-x-2 mb-3">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-blue-800">My Study Notes</h4>
            </div>
            <textarea
              value={studyNotes[currentSection] || ''}
              onChange={(e) => {
                const updated = { ...studyNotes, [currentSection]: e.target.value };
                setStudyNotes(updated);
                saveData('studyNotes', updated);
              }}
              placeholder="What is the Spirit teaching me? What insights am I receiving?"
              className={`w-full h-24 p-3 rounded border resize-none text-sm ${
                theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          {/* Personal Insights */}
          <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-4 h-4 text-orange-600" />
              <h4 className="font-semibold text-orange-800">Personal Revelation &amp; Insights</h4>
            </div>
            <textarea
              value={personalInsights[currentSection] || ''}
              onChange={(e) => {
                const updated = { ...personalInsights, [currentSection]: e.target.value };
                setPersonalInsights(updated);
                saveData('personalInsights', updated);
              }}
              placeholder="What is Heavenly Father teaching me personally? How does this apply to my life right now?"
              className={`w-full h-24 p-3 rounded border resize-none text-sm ${
                theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          {/* Complete Section Button */}
          {!isCompleted && (
            <button
              onClick={() => completeSection(currentSection)}
              className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Section Complete</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  const GoalsScreen = () => (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Spiritual Goals</h2>
          <p className="text-sm text-gray-600">Building Christlike character daily</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">{spiritualGoals.filter((g) => g.streak >= 7).length}/3</div>
          <div className="text-xs text-gray-500">Goals on track</div>
        </div>
      </div>

      {/* Personal Stats */}
      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <h3 className="text-lg font-bold text-blue-900 mb-4">My Gospel Study Journey</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">{studyData.personalStats.totalStudyDays}</div>
            <div className="text-xs text-gray-600">Study Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">{studyData.personalStats.characterTraitsStudied}</div>
            <div className="text-xs text-gray-600">Character Traits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">{studyData.personalStats.personalInsights}</div>
            <div className="text-xs text-gray-600">Personal Insights</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-700">{studyData.personalStats.applicationsCompleted}</div>
            <div className="text-xs text-gray-600">Applications</div>
          </div>
        </div>
      </div>

      {/* Spiritual Goals */}
      <div className="space-y-4">
        {spiritualGoals.map((goal) => (
          <div key={goal.id} className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-blue-900">{goal.title}</h3>
                <p className="text-sm text-gray-600">{goal.description}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 mt-2 inline-block">{goal.category}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{goal.streak}</div>
                <div className="text-xs text-gray-500">day streak</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300 bg-green-500"
                  style={{ width: `${Math.min((goal.streak / goal.target) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">{goal.target} days</span>
            </div>

            <div className="flex justify-between text-xs text-gray-600">
              <span>{Math.round((goal.streak / goal.target) * 100)}% to goal</span>
              <span>{Math.max(goal.target - goal.streak, 0)} days remaining</span>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Reflection */}
      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <div className="flex items-center space-x-2 mb-4">
          <Heart className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-bold text-blue-900">Today&apos;s Reflection</h3>
        </div>
        <textarea
          value={dailyReflection}
          onChange={(e) => {
            setDailyReflection(e.target.value);
            lsSet('dailyReflection', e.target.value);
          }}
          placeholder="How did I grow closer to Christ today? What did I learn about His character?"
          className={`w-full h-24 p-3 rounded border resize-none text-sm ${
            theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
          }`}
        />
      </div>
    </div>
  );

  const LibraryScreen = () => (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-900">Study Library</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <BookOpen className="w-4 h-4" />
          <span>Personal Collection</span>
        </div>
      </div>

      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <h3 className="text-lg font-bold mb-4">Character Study Series</h3>
        <div className="space-y-3">
          {[
            { title: 'Christ During Trials', progress: 65, active: true },
            { title: 'Christ as Teacher', progress: 0, active: false },
            { title: "Christ's Love & Service", progress: 0, active: false },
            { title: "Christ's Relationships", progress: 0, active: false },
            { title: "Christ's Divine Mission", progress: 0, active: false },
          ].map((study) => (
            <div
              key={study.title}
              className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : study.active ? 'bg-blue-50' : 'bg-gray-50'} flex items-center justify-between`}
            >
              <div className="flex items-center space-x-3">
                <BookOpen className={`w-4 h-4 ${study.active ? 'text-blue-700' : 'text-gray-400'}`} />
                <div>
                  <span className={`font-medium ${study.active ? 'text-blue-900' : 'text-gray-600'}`}>{study.title}</span>
                  {study.active && <div className="text-xs text-blue-600">Currently Studying</div>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {study.progress > 0 && <span className="text-xs text-green-600">{study.progress}%</span>}
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <h3 className="text-lg font-bold mb-4">My Study History</h3>
        <div className="space-y-3">
          {[
            { date: 'Yesterday', sections: 2, insights: 3 },
            { date: 'Dec 18', sections: 1, insights: 2 },
            { date: 'Dec 17', sections: 1, insights: 1 },
            { date: 'Dec 16', sections: 2, insights: 4 },
          ].map((day) => (
            <div key={day.date} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}>
              <span className="text-sm font-medium">{day.date}</span>
              <div className="flex items-center space-x-4 text-xs text-gray-600">
                <span>{day.sections} sections</span>
                <span>{day.insights} insights</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Settings</h2>

      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <h3 className="font-semibold mb-4">Study Preferences</h3>
        <div className="space-y-4">
          {[
            { label: 'Daily study reminders', desc: 'Get reminded to study each day' },
            { label: 'Reflection prompts', desc: 'Receive thoughtful questions for deeper study' },
            { label: 'Progress tracking', desc: 'Track your spiritual growth journey' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{row.label}</div>
                <div className="text-sm text-gray-600">{row.desc}</div>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <h3 className="font-semibold mb-4">Appearance</h3>
        <div className="space-y-2">
          {[
            { value: 'light', label: 'Light Mode' },
            { value: 'dark', label: 'Dark Mode' },
            { value: 'parchment', label: 'Parchment Mode' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                lsSet('theme', value);
              }}
              className={`w-full p-3 rounded-lg border text-left ${theme === value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={`rounded-lg p-6 border ${cardClasses[theme]}`}>
        <h3 className="font-semibold mb-4">Study Time</h3>
        <div className="flex items-center space-x-3">
          <Clock className="w-4 h-4" />
          <input
            type="time"
            defaultValue="07:00"
            className={`flex-1 p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">When would you like to be reminded to study?</p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${themeClasses[theme]} font-sans`}>
      <div className="max-w-md mx-auto">
        <header className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-900 text-center">My Gospel Study</h1>
          <p className="text-sm text-gray-600 text-center mt-1">Personal Journey with Christ</p>
        </header>

        <main className="p-6">
          {currentTab === 'study' && <StudyScreen />}
          {currentTab === 'goals' && <GoalsScreen />}
          {currentTab === 'library' && <LibraryScreen />}
          {currentTab === 'settings' && <SettingsScreen />}
        </main>

        <nav className={`fixed bottom-0 left-0 right-0 ${cardClasses[theme]} border-t max-w-md mx-auto`}>
          <div className="flex">
            {[
              { id: 'study', label: 'Study', icon: Book },
              { id: 'goals', label: 'Goals', icon: Target },
              { id: 'library', label: 'Library', icon: Heart },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentTab(id)}
                className={`flex-1 p-4 text-center ${currentTab === id ? 'text-blue-900' : 'text-gray-500'}`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default PersonalGospelApp;
